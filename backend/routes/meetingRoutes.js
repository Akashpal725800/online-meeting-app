const express = require("express");
const router = express.Router();

const {
  createMeeting,
  getMeetings,
  getMeetingById,
  joinMeeting
} = require("../controllers/meetingController");
router.post("/create", createMeeting);
router.get("/", getMeetings);
router.get("/:id", getMeetingById);
router.post("/join/:id", joinMeeting);

module.exports = router;
