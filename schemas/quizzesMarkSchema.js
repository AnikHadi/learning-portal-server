const mongoose = require("mongoose");

const quizzesMarkSchema = mongoose.Schema({
  student_id: {
    type: Number,
    required: true,
  },
  student_name: {
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
  totalQuiz: {
    type: Number,
    default: true,
  },
  totalCorrect: {
    type: Number,
    required: true,
  },
  totalWrong: {
    type: Number,
    required: true,
  },
  totalMark: {
    type: Number,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
});

module.exports = quizzesMarkSchema;
