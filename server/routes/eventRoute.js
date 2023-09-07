const express = require("express");
const router = express.Router();
const userController = require("../../server/controllers/userController");
const eventController = require("../../server/controllers/eventController");

router.get("/", userController.UserAuthorization, eventController.getEvent);
router.post(
  "/:event_id/read",
  userController.UserAuthorization,
  eventController.readEvent
);

module.exports = router;
