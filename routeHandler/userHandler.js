const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const teacherSchema = require("../schemas/teacherSchema");
const Teacher = new mongoose.model("Teacher", teacherSchema);
const studentSchema = require("../schemas/studentSchema");
const Student = new mongoose.model("Student", studentSchema);

const adminSchema = mongoose.Schema({
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
});

const Admin = new mongoose.model("Admin", adminSchema);

// login user
router.post("/", async (req, res) => {
  let User;
  if (req.body.role === "teacher") {
    User = Teacher;
  } else if (req.body.role === "student") {
    User = Student;
  } else if (req.body.role === "admin") {
    User = Admin;
  }

  //   const filter = { ID: req.body.ID };

  let filter;
  if (req.body.role === "student" || req.body.role === "teacher") {
    filter = { ID: req.body.ID };
  } else {
    filter = { email: req.body.email };
  }

  try {
    // const hashPassword = await bcrypt.hash(req.body.password, 15);
    const user = await User.find(filter).select({
      __v: 0,
    });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        // Generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          process.env.JWT_TOKEN,
          { expiresIn: "10h" }
        );

        res.status(200).json({
          message: "Login Successful",
          accessToken: token,
          user: user,
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was server side error!",
    });
  }
});

// admin registration
router.post("/admin/reg", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new Admin({ ...req.body, password: hashPassword });
  try {
    newUser
      .save()
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Admin was created successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error,

      message: "There was a server side error!",
    });
  }
});

module.exports = router;
