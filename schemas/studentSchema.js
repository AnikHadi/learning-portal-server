const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"],
  },
  email: {
    type: String,
    required: [1, "Please check your data entry, no email specified!"],
  },
  password: {
    type: String,
    required: [true, "Please check your data entry, no password specified!"],
  },
  role: {
    type: String,
    required: [true, "Please check your data entry, no role specified!"],
  },
  ID: {
    type: Number,
    required: [true, "Please check your data entry, no ID specified!"],
  },
});

module.exports = studentSchema;
