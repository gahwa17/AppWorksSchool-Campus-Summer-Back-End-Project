const errorHandler = require("../../util/error_handler");
const { extractUserIdFromToken } = require("../../util/common");
const Redis = require("../../util/redis");

const { getUserById } = require("../models/userModel");
const { createFriendshipEvent } = require("../models/eventModel");

const Friend = require("../models/friendModel");

module.exports = {
  showAllFriends: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const result = await Friend.searchAllFriends(userId);

      const responseData = {
        data: {
          users: [],
        },
      };
      for (const friendship of result) {
        const { sender_id, receiver_id } = friendship;

        const otherUserId = userId == sender_id ? receiver_id : sender_id;
        const otherUser = await getUserById(otherUserId);

        const otherUserData = {
          id: otherUser.id,
          name: otherUser.name,
          picture: otherUser.picture,
          friendship: {
            id: friendship.id,
            status: friendship.status,
          },
        };

        responseData.data.users.push(otherUserData);
      }
      res.status(200).json(responseData);
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  sendFriendRequest: async (req, res) => {
    try {
      const senderId = extractUserIdFromToken(req);

      // Get the receiver user id from the request parameters
      const receiverId = Number(req.params.user_id);
      if (!receiverId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }
      // Check if the target user id is valid and exists in the system
      const userExists = await getUserById(receiverId);
      const friendshipExists = await Friend.checkFriendship(
        senderId,
        receiverId
      );

      if (!userExists) {
        errorHandler.handleClientError(res, "userNotFound", 400);
      } else if (senderId == receiverId) {
        errorHandler.handleClientError(res, "sendRequestToSelf", 400);
      }

      // Check if the friendship request already exists
      else if (friendshipExists) {
        errorHandler.handleClientError(res, "friendshipRequestSent", 400);
      } else {
        // Create a friendship in database
        const friendship = await Friend.createFriendship(senderId, receiverId);
        // Create a event notifications to receiver
        const message = "邀請你成為好友";
        await createFriendshipEvent(senderId, receiverId, message);

        const cacheKey1 = `profile:friendship#${senderId}#${receiverId}`;
        const cacheKey2 = `profile:friendship#${receiverId}#${senderId}`;
        await Redis.delCache(cacheKey1);
        await Redis.delCache(cacheKey2);

        const responseData = {
          data: {
            friendship: {
              id: friendship.insertId,
            },
          },
        };
        res.status(200).json(responseData);
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  checkFriendRequests: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);

      const FriendRequestList = await Friend.getPendingFriendRequests(userId);
      if (FriendRequestList.length == 0) {
        res.status(200).json({ message: "Currently no friend request..." });
      } else {
        const responseData = {
          data: {
            users: [],
          },
        };

        for (const request of FriendRequestList) {
          // Get the user information for the friend request
          const friendUser = await getUserById(request.sender_id);

          // Create a friend information object with friendship details
          const friend = {
            id: friendUser.id,
            name: friendUser.name,
            picture: friendUser.picture,
            friendship: {
              id: request.id,
              status: "pending",
            },
          };
          responseData.data.users.push(friend);
        }
        res.status(200).json(responseData);
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  agreeFriendRequest: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const friendshipId = req.params.friendship_id;
      if (!friendshipId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      const friendship = await Friend.getFriendship(friendshipId);

      if (
        !friendship ||
        friendship.receiver_id != userId ||
        friendship.status != "requested"
      ) {
        errorHandler.handleClientError(res, "friendshipRequestNotFound", 400);
      } else {
        // Update the friendship status to 'friend'
        await Friend.updateFriendshipStatus(friendshipId, "friend");

        // Create a event notifications to receiver
        const senderID = userId;
        const receiverId = friendship.sender_id;
        const message = "已接受好友邀請";
        await createFriendshipEvent(senderID, receiverId, message);

        const cacheKey = `profile:friendship#${friendship.sender_id}#${friendship.receiver_id}`;
        await Redis.delCache(cacheKey);

        await Redis.incrFriendCount(senderID, receiverId);

        const responseData = {
          data: {
            friendship: {
              id: friendshipId,
            },
          },
        };
        res.status(200).json(responseData);
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  deleteFriendship: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const friendshipId = req.params.friendship_id;
      if (!friendshipId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      // Check if the friendship exists and involves the user
      const friendship = await Friend.checkFriendshipExistsById(
        friendshipId,
        userId
      );
      if (!friendship) {
        errorHandler.handleClientError(res, "friendshipNotFound", 400);
      } else {
        await Friend.deleteFriendshipById(friendshipId);

        if (friendship.status == "friend") {
          await Redis.decrFriendCount(
            friendship.sender_id,
            friendship.receiver_id
          );
        }
        const cacheKey = `profile:friendship#${friendship.sender_id}#${friendship.receiver_id}`;
        await Redis.delCache(cacheKey);

        const responseData = {
          data: {
            friendship: {
              id: friendshipId,
            },
          },
        };
        res.status(200).json(responseData);
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
};
