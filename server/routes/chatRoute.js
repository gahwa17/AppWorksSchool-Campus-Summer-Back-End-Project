const express = require("express");
const router = express.Router();

const userController = require("../../server/controllers/userController");
const chatController = require("../../server/controllers/chatController");

router.post(
  "/:user_id",
  userController.UserAuthorization,
  chatController.sendMessage
);

router.get(
  "/:user_id/messages",
  userController.UserAuthorization,
  chatController.getMessages
);

module.exports = router;
