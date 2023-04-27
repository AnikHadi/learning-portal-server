const mongoose = require("mongoose");

const quizzesSchema = mongoose.Schema({
  question: {
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
  options: [
    {
      id: {
        type: Number,
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
    {
      id: {
        type: Number,
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
    {
      id: {
        type: Number,
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
    {
      id: {
        type: Number,
        required: true,
      },
      option: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = quizzesSchema;
