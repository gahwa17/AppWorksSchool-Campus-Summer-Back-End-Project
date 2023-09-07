const errorHandler = require("../../util/error_handler");
const {
  bcrypt,
  jwt,
  jwtSecret,
  extractUserIdFromToken,
  validateEmail,
  validateProvider,
} = require("../../util/common");
const Redis = require("../../util/redis");

const User = require("../models/userModel");
const {
  checkFriendship,
  getStatus,
  countFriends,
} = require("../models/friendModel");

module.exports = {
  sayhi: (req, res, next) => {
    res.json({ message: "hi" });
  },
  signUp: async (req, res) => {
    try {
      let user = req.body;

      if (Object.keys(user).length != 3) {
        errorHandler.handleClientError(res, "inputFeild", 400);
      } else {
        let { name, email, password } = user;

        name = name.trim();
        email = email.trim();
        password = password.trim();

        // Check white space
        if (!name || !email || !password) {
          errorHandler.handleClientError(res, "inputFeild", 400);
        } else if (!validateEmail(email)) {
          errorHandler.handleClientError(res, "emailValidate", 400);
        } else {
          // Check duplicate email
          const user = await User.getUserByEmail(email);
          if (user) {
            errorHandler.handleClientError(res, "emailExist", 403);
          } else {
            // Hash user's password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Get user's id from newly inserted data
            const [result] = await User.insertNewUser(
              name,
              email,
              hashedPassword
            );
            const userID = result.insertId;

            // Get user's data by id
            const user = await User.getUserById(userID);

            // Generate JWT
            const payload = {
              id: user.id,
              provider: user.provider,
              name: user.name,
              email: user.email,
              picture: user.picture,
            };
            const accessToken = jwt.sign(payload, jwtSecret);

            const responseData = {
              data: {
                access_token: accessToken,
                user: payload,
              },
            };
            res.status(200).json(responseData);
          }
        }
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  signIn: async (req, res) => {
    try {
      let user = req.body;

      if (Object.keys(user).length != 3) {
        errorHandler.handleClientError(res, "inputFeild", 400);
      } else {
        let { provider, email, password } = user;

        provider = provider.trim();
        email = email.trim();
        password = password.trim();

        // Validate user input
        if (!provider || !email || !password) {
          errorHandler.handleClientError(res, "inputFeild", 400);
        } else {
          // Validate if user exist in our database
          const user = await User.getUserByEmail(email);

          if (
            user &&
            validateProvider(user.provider) &&
            (await bcrypt.compare(password, user.password))
          ) {
            // Generate JWT
            const payload = {
              id: user.id,
              provider: user.provider,
              name: user.name,
              email: user.email,
              picture: user.picture,
            };
            const accessToken = jwt.sign(payload, jwtSecret);

            const responseData = {
              data: {
                access_token: accessToken,
                user: payload,
              },
            };
            res.status(200).json(responseData);
          } else {
            errorHandler.handleClientError(res, "signInFailed", 403);
          }
        }
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  UserAuthorization: async (req, res, next) => {
    // Check if token exist
    if (!req.header("Authorization")) {
      errorHandler.handleClientError(res, "noToken", 401);
    } else {
      try {
        // Verify user token
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, jwtSecret);

        const userData = {
          id: decoded.id,
          name: decoded.name,
        };

        next();
      } catch (error) {
        errorHandler.handleClientError(res, "invalidToken", 403);
      }
    }
  },
  getUserProfile: async (req, res) => {
    try {
      const currentId = extractUserIdFromToken(req);
      const otherUserId = req.params.id;

      const cacheResult = await Redis.getUserProfileCache(
        currentId,
        otherUserId
      );

      if (cacheResult) {
        const responseData = {
          // fromCache: true,
          data: {
            user: { ...cacheResult },
          },
        };

        res.status(200).json(responseData);
      } else {
        const userRow = await User.getUserById(otherUserId);
        const friend_count = await countFriends(otherUserId);
        const isFriend = await checkFriendship(currentId, otherUserId);
        const friendship = !isFriend
          ? null
          : { id: isFriend.id, status: getStatus(isFriend, currentId) };

        const basicProfile = {
          id: userRow.id,
          name: userRow.name,
          picture: userRow.picture,
          introduction: userRow.introduction,
          tags: userRow.tags,
        };

        const user = {
          ...basicProfile,
          friend_count: friend_count,
          friendship: friendship,
        };

        const cacheKeyProfile = `profile:basics#${otherUserId}`;
        const cacheKeyFriendCount = `profile:friend:count#${otherUserId}`;
        const cacheKeyFriendship = `profile:friendship#${currentId}#${otherUserId}`;

        const expireDay = 24 * 60 * 60;
        const expireWeek = 24 * 60 * 60 * 7;

        await Redis.setCache(
          cacheKeyProfile,
          JSON.stringify(basicProfile),
          expireWeek
        );
        await Redis.setCache(
          cacheKeyFriendCount,
          parseInt(friend_count),
          expireDay
        );
        await Redis.setCache(
          cacheKeyFriendship,
          JSON.stringify(friendship),
          expireWeek
        );

        const responseData = {
          // fromCache: false,
          data: { user },
        };

        res.status(200).json(responseData);
      }
    } catch (error) {
      console.error(error);
      errorHandler.handleClientError(res, "userNotFound", 400);
    }
  },
  updateUserProfile: async (req, res) => {
    const userId = extractUserIdFromToken(req);

    // Extract user profile data from request body
    const { name, introduction, tags } = req.body;

    // Update user profile in the database
    await User.updateUser(userId, name, introduction, tags);

    const cacheKey = `profile:basics#${userId}`;
    await Redis.delCache(cacheKey);

    const responseData = {
      data: {
        user: {
          id: userId,
        },
      },
    };
    res.status(200).json(responseData);
  },
  updateUserPicture: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);

      // Invalid file type
      if (req.fileError) {
        res.status(400).json({ error: req.fileError });
      }
      // If no file is provided
      else if (!req.file) {
        res.status(400).json({ error: "No picture provided" });
      } else {
        try {
          const pictureUrl = await User.pictureUpdate(
            userId,
            req.file.filename
          );

          const cacheKey = `profile:basics#${userId}`;
          await Redis.delCache(cacheKey);

          const responseData = {
            data: {
              picture: pictureUrl,
            },
          };
          res.status(200).json(responseData);
        } catch (error) {
          if (req.fileError) {
            res.status(400).json({ error: req.fileError });
          } else {
            errorHandler.handleServerError(res, error, "internalServer");
          }
        }
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  searchUser: async (req, res) => {
    try {
      const user_id = extractUserIdFromToken(req);
      const keyword = req.query.keyword;
      const otherUsers = await User.getUserByKeyword(keyword);

      if (keyword.trim() == "") {
        errorHandler.handleClientError(res, "lostParams", 400);
      }

      const responseData = {
        data: { users: [] },
      };

      for (const entry of otherUsers) {
        const isFriend = await checkFriendship(user_id, entry.id);
        const friendship = !isFriend
          ? null
          : { id: isFriend.id, status: getStatus(isFriend, user_id) };

        const user = {
          id: entry.id,
          name: entry.name,
          picture: entry.picture,
          friendship: friendship,
        };
        responseData.data.users.push(user);
      }
      res.status(200).json(responseData);
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
};
