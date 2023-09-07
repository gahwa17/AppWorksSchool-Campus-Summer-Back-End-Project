const express = require("express");
const router = express.Router();

const userController = require("../../server/controllers/userController");
const groupController = require("../../server/controllers/groupController");

router.post("/", userController.UserAuthorization, groupController.createGroup);

router.delete(
  "/:group_id",
  userController.UserAuthorization,
  groupController.deleteGroup
);

router.post(
  "/:group_id/join",
  userController.UserAuthorization,
  groupController.applyGroup
);

router.get(
  "/:group_id/member/pending",
  userController.UserAuthorization,
  groupController.checkGroupPending
);

router.post(
  "/:group_id/member/:user_id/agree",
  userController.UserAuthorization,
  groupController.agreeGroupRequest
);

router.post(
  "/:group_id/post",
  userController.UserAuthorization,
  groupController.createGroupPost
);

router.get(
  "/:group_id/posts",
  userController.UserAuthorization,
  groupController.getGroupPosts
);

module.exports = router;
