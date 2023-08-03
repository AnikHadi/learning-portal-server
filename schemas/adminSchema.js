const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  ID: {
    type: Number,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = adminSchema;
