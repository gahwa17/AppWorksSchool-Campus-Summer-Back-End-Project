const express = require("express");
const router = express.Router();

const userController = require("../../server/controllers/userController");
const postController = require("../../server/controllers/postController");

router.post("/", userController.UserAuthorization, postController.createPost);
router.put("/:id", userController.UserAuthorization, postController.updatePost);

router.get(
  "/search",
  userController.UserAuthorization,
  postController.searchPosts
);
router.get(
  "/:id",
  userController.UserAuthorization,
  postController.getPostDetail
);

router.post(
  "/:id/like",
  userController.UserAuthorization,
  postController.addLike
);
router.delete(
  "/:id/like",
  userController.UserAuthorization,
  postController.deleteLike
);

router.post(
  "/:id/comment",
  userController.UserAuthorization,
  postController.createComment
);

router.post(
  "/:amount/dataGenerater",
  userController.UserAuthorization,
  postController.generateFakePosts
);

module.exports = router;
