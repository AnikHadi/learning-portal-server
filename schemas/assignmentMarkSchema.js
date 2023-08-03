const mongoose = require("mongoose");

const assignmentMarkSchema = mongoose.Schema({
  student_id: {
    type: Number,
    required: true,
  },
  student_name: {
    type: String,
    required: true,
  },
  assignment_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  totalMark: {
    type: Number,
    required: true,
  },
  mark: {
    type: Number,
    required: true,
  },
  repo_link: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = assignmentMarkSchema;
