const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const teacherSchema = require("../schemas/teacherSchema");
const Teacher = new mongoose.model("Teacher", teacherSchema);

// Get all the Teacher     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await Teacher.find(filter)
    .select({
      //   _id: 0,
      password: 0,
      role: 0,
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get teacher was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Teacher by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Teacher.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Teacher was find successfully!",
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

// POST the Teacher
router.post("/", async (req, res) => {
  const filter = { ID: req.body.ID };
  const hashPassword = await bcrypt.hash(req.body.password, 15);
  const newUser = new Teacher({ ...req.body, password: hashPassword });

  try {
    await Teacher.find(filter).then((result) => {
      if (Object.keys(result).length === 1) {
        res.status(200).json({
          data: result,
          message: "This Teacher ID already exists!",
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
              message: "Teacher was created successfully!",
              accessToken: token,
              user: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
              message: "There was a server side error! uuuu",
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

// PUT  the Teacher
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Teacher.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Teacher was Updated successfully!",
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

// DELETE the Teacher
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Teacher.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Teacher deleted successfully.",
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
