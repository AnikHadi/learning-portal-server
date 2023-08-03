const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const studentSchema = require("../schemas/studentSchema");
const Student = new mongoose.model("Student", studentSchema);

// Get all the users     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await Student.find(filter)
    .select({
      //   _id: 0,
      password: 0,
      role: 0,
      __v: 0,
    })
    // .limit(2)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get student was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the users by id
router.get("/:id", async (req, res) => {
  let id;
  if (req.params.id.length === 11) {
    id = { ID: req.params.id };
  } else {
    id = { _id: req.params.id };
  }

  try {
    await Student.find(id)
      .select({
        //   _id: 0,
        role: 0,
        __v: 0,
      })
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Student was find successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// POST the users
router.post("/", async (req, res) => {
  const filter = { ID: req.body.ID };
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new Student({ ...req.body, password: hashPassword });
  try {
    Student.find(filter).then((result) => {
      if (Object.keys(result).length === 1) {
        res.status(200).json({
          data: result,
          message: "This Student ID already exists!",
        });
      } else {
        newUser
          .save()
          .then((result) => {
            const token = jwt.sign(
              {
                username: result.name,
                userId: result._id,
              },
              process.env.JWT_TOKEN,
              { expiresIn: "10h" }
            );

            res.status(200).json({
              message: "Student was created successfully!",
              accessToken: token,
              user: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
              message: "There was a server side error!",
            });
          });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,

      message: "There was a server side error!",
    });
  }
});

// Get the users by email
router.post("/email", async (req, res) => {
  let query = { email: req.body.email };
  try {
    await Student.find(query)
      .select({
        //   _id: 0,
        role: 0,
        __v: 0,
      })
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Student was find successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// PUT  the users
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Student.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Student was Updated successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// DELETE the users
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Student.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Student deleted successfully.",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
          message: "There was a server side error!",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: `error: ${error}`,
      message: "There was a server side error!",
    });
  }
});

module.exports = router;
