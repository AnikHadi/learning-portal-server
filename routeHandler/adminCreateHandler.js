const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = require("../schemas/adminSchema");
const StudentCreate = new mongoose.model("Student-create", adminSchema);
const TeacherCreate = new mongoose.model("Teacher-create", adminSchema);

// admin student create
router.post("/student-create", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new StudentCreate({ ...req.body, password: hashPassword });
  try {
    const filter = { ID: req.body.ID };
    const user = await StudentCreate.find(filter).select({
      __v: 0,
    });

    if (user?.length > 0) {
      res.status(500).json({
        message: "This Student ID already Existed!",
      });
    } else {
      newUser
        .save()
        .then((result) => {
          res.status(200).json({
            user: result,
            message: "Student was created successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
            message: "There was a server side error!",
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was a server side error!",
    });
  }
});

// admin student get
router.get("/student", async (req, res) => {
  try {
    const filter = {};
    const user = await StudentCreate.find(filter).select({
      __v: 0,
    });
    console.log(user);
    if (user?.length > 0) {
      res.status(200).json({
        user: user,
        message: "Student was find successfully!",
      });
    } else {
      res.status(500).json({
        message: "There was no student Existed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was a server side error!",
    });
  }
});

// admin registration
router.post("/teacher-create", async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new TeacherCreate({ ...req.body, password: hashPassword });
  try {
    const filter = { ID: req.body.ID };
    const user = await TeacherCreate.find(filter).select({
      __v: 0,
    });

    if (user?.length > 0) {
      res.status(500).json({
        message: "This Teacher ID already Existed!",
      });
    } else {
      newUser
        .save()
        .then((result) => {
          res.status(200).json({
            user: result,
            message: "Teacher was created successfully!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
            message: "There was a server side error!",
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was a server side error!",
    });
  }
});

// admin teacher get
router.get("/teacher", async (req, res) => {
  try {
    const filter = {};
    const user = await TeacherCreate.find(filter).select({
      __v: 0,
    });
    console.log(user);
    if (user?.length > 0) {
      res.status(200).json({
        user: user,
        message: "Teacher was find successfully!",
      });
    } else {
      res.status(500).json({
        message: "There was no TEacher Existed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "There was a server side error!",
    });
  }
});

module.exports = router;
