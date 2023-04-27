const mongoose = require("mongoose");

const videosSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = videosSchema;
