const errorHandler = require("../../util/error_handler");

const { getUserById } = require("../models/userModel");
const { base64, extractUserIdFromToken } = require("../../util/common");

const Chat = require("../models/chatModel");

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const senderID = extractUserIdFromToken(req);
      const receiverID = parseInt(req.params.user_id);
      const message = req.body.message;
      const trimmedmessage = message.trim();

      if (!receiverID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }
      if (!trimmedmessage) {
        return errorHandler.handleClientError(res, "inputFeild", 400);
      }

      try {
        const userExists = await getUserById(receiverID);
        if (!userExists) {
          return errorHandler.handleClientError(res, "userNotFound", 400);
        }

        const result = await Chat.sendMessage(senderID, receiverID, message);
        const messageID = result.insertId;

        const responseData = {
          data: {
            message: {
              id: messageID,
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
  getMessages: async (req, res) => {
    try {
      const userID = extractUserIdFromToken(req);
      const otherID = parseInt(req.params.user_id);
      let cursor = req.query.cursor;

      if (!otherID) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      }

      try {
        const userExists = await getUserById(otherID);
        if (!userExists) {
          return errorHandler.handleClientError(res, "userNotFound", 400);
        }

        if (cursor) {
          const decodedCursor = base64.decode(cursor).split("-")[0];
          cursor = Number(decodedCursor);
        }

        const { messages, next_cursor } = await Chat.getMessages(
          userID,
          otherID,
          cursor
        );

        const responseData = {
          data: {
            messages,
            next_cursor,
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
};
