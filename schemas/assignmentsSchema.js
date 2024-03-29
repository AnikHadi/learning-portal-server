const mongoose = require("mongoose");
const video = require("./videosSchema");

const assignmentsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video_id: {
    type: Number,
    required: true,
  },
  video_title: {
    type: String,
    required: true,
  },
  totalMark: {
    type: Number,
    required: true,
  },
  // connectedVideo: video,
});

module.exports = assignmentsSchema;
