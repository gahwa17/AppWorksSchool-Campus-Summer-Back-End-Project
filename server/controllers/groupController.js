const errorHandler = require("../../util/error_handler");

const { getUserById } = require("../models/userModel");
const { base64, extractUserIdFromToken } = require("../../util/common");

const Group = require("../models/groupModel");

module.exports = {
  createGroup: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const groupName = req.body.name;
      const trimmedGroupName = groupName.trim();
      // console.log('trimmedGroupName:', trimmedGroupName);

      if (!trimmedGroupName) {
        return errorHandler.handleClientError(res, "missingGroupName", 400);
      }

      try {
        const result = await Group.createGroup(groupName, userId);
        const groupID = result.insertId;

        await Group.addUserToGroup(groupID, userId);

        const responseData = {
          data: {
            group: {
              id: groupID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  deleteGroup: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);

      if (!groupID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      try {
        const groupExist = await Group.getGroupByID(groupID);
        // console.log('groupExist: ', groupExist);

        if (!groupExist) {
          return errorHandler.handleClientError(res, "groupNotExist", 400);
        }
        if (groupExist.owner_id != userId) {
          return errorHandler.handleClientError(res, "notGroupOwner", 400);
        }

        await Group.deleteGroup(groupID);

        const responseData = {
          data: {
            group: {
              id: groupID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  applyGroup: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);

      if (!groupID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      try {
        const groupExist = await Group.getGroupByID(groupID);
        if (!groupExist) {
          return errorHandler.handleClientError(res, "groupNotExist", 400);
        }

        const isApplied = await Group.checkUserInGroup(groupID, userID);
        if (isApplied) {
          return errorHandler.handleClientError(
            res,
            "userAlreadyJoinedGroup",
            400
          );
        }

        await Group.applyGroup(groupID, userID);

        const responseData = {
          data: {
            group: {
              id: groupID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        console.error(error);
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  checkGroupPending: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);

      if (!groupID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      try {
        const groupExist = await Group.getGroupByID(groupID);
        if (!groupExist) {
          return errorHandler.handleClientError(res, "groupNotExist", 400);
        }

        if (groupExist.owner_id !== userID) {
          return errorHandler.handleClientError(res, "notGroupOwner", 400);
        }

        const result = await Group.checkGroupPending(groupID);
        // console.log(result);

        const users = result.map((user) => ({
          id: user.id,
          name: user.name,
          picture: user.picture,
          status: user.status,
        }));

        const responseData = {
          data: {
            users: users,
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  agreeGroupRequest: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);
      const applyerID = parseInt(req.params.user_id);

      if (!groupID || !applyerID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      try {
        const groupExist = await Group.getGroupByID(groupID);
        if (!groupExist) {
          return errorHandler.handleClientError(res, "groupNotExist", 400);
        }
        if (groupExist.owner_id !== userID) {
          return errorHandler.handleClientError(res, "notGroupOwner", 400);
        }

        const applyer = await Group.getUserInGroup(groupID, applyerID);
        // console.log('applyer: ', applyer);
        if (!applyer) {
          return errorHandler.handleClientError(
            res,
            "userNotPendingInGroup",
            400
          );
        }
        if (applyer.status != "pending") {
          return errorHandler.handleClientError(
            res,
            "userAlreadyJoinedGroup",
            400
          );
        }

        await Group.agreeGroupRequest(groupID, applyerID);

        const responseData = {
          data: {
            user: {
              id: applyerID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  createGroupPost: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);
      const context = req.body.context;
      const trimmedContext = context.trim();

      if (!groupID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      if (!trimmedContext) {
        return errorHandler.handleClientError(res, "missingContext", 400);
      }
      try {
        const isMember = await Group.checkUserInGroup(groupID, userID);
        // console.log(isMember);
        if (!isMember) {
          return errorHandler.handleClientError(res, "userNotJoinedGroup", 400);
        }
        const result = await Group.createGroupPost(context, userID, groupID);
        // console.log('result: ', result);
        const postID = result.insertId;

        const responseData = {
          data: {
            group: {
              id: groupID,
            },
            user: {
              id: userID,
            },
            post: {
              id: postID,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  getGroupPosts: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const groupID = parseInt(req.params.group_id);

      if (!groupID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }
      try {
        const groupExist = await Group.getGroupByID(groupID);
        if (!groupExist) {
          return errorHandler.handleClientError(res, "groupNotExist", 400);
        }

        const isMember = await Group.getUserInGroup(groupID, userID);
        // console.log('isMember:', isMember);
        if (!isMember || isMember.status != "joined") {
          return errorHandler.handleClientError(res, "userNotJoinedGroup", 400);
        }

        const results = await Group.getGroupPosts(groupID, userID);
        // console.log(results);

        const posts = results.map((post) => ({
          id: post.id,
          user_id: post.author_id,
          created_at: post.created_at,
          context: post.context,
          is_liked: post.is_liked === 1,
          like_count: post.like_count,
          comment_count: post.comment_count,
          picture: post.author_picture,
          name: post.author_name,
        }));

        const responseData = {
          data: {
            posts: posts,
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
};
