const express = require("express");
const router = express.Router();
const upload = require("../../multer/upload");
const userController = require("../../server/controllers/userController");

router.get("/", userController.sayhi);
router.get(
  "/:id/profile",
  userController.UserAuthorization,
  userController.getUserProfile
);
router.get(
  "/search",
  userController.UserAuthorization,
  userController.searchUser
);

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.put(
  "/profile",
  userController.UserAuthorization,
  userController.updateUserProfile
);
// File upload
router.put(
  "/picture",
  userController.UserAuthorization,
  upload.single("picture"),
  userController.updateUserPicture
);

// export to use in server.js
module.exports = router;
