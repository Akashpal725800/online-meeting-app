const Meeting = require("../models/Meeting");
const { v4: uuidv4 } = require("uuid");

// Create Meeting
exports.createMeeting = async (req, res) => {
  try {
    const { title, hostName } = req.body;

    const meeting = await Meeting.create({
      meetingId: uuidv4(),
      title,
      hostName
    });
    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Meetings
exports.getMeetings = async (req, res) => {
  const meetings = await Meeting.find();
  res.json(meetings);
};

// Get Single Meeting
exports.getMeetingById = async (req, res) => {
  const meeting = await Meeting.findOne({ meetingId: req.params.id });

  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  res.json(meeting);
};

// Join Meeting
exports.joinMeeting = async (req, res) => {
  const { name } = req.body;

  const meeting = await Meeting.findOne({ meetingId: req.params.id });
  if (!meeting) {
    return res.status(404).json({ message: "Meeting not found" });
  }

  meeting.participants.push({
    name,
    joinedAt: new Date()
  });

  await meeting.save();

  res.json({
    success: true,
    message: "Joined meeting successfully",
    meeting
  });
};
