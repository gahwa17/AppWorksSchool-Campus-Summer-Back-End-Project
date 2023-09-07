const express = require("express");
const router = express.Router();
const friendController = require("../../server/controllers/friendController");
const userController = require("../../server/controllers/userController");

router.get(
  "/",
  userController.UserAuthorization,
  friendController.showAllFriends
);
router.get(
  "/pending",
  userController.UserAuthorization,
  friendController.checkFriendRequests
);

router.post(
  "/:user_id/request",
  userController.UserAuthorization,
  friendController.sendFriendRequest
);
router.post(
  "/:friendship_id/agree",
  userController.UserAuthorization,
  friendController.agreeFriendRequest
);

router.delete(
  "/:friendship_id",
  userController.UserAuthorization,
  friendController.deleteFriendship
);

// export to use in server.js
module.exports = router;
