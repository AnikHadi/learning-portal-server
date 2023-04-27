const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

// Get all the users     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await User.find(filter)
    .select({
      //   _id: 0,
      password: 0,
      role: 0,
      __v: 0,
    })
    .limit(2)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get user was find successfully!",
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
  const id = { _id: req.params.id };
  try {
    await User.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "User was find successfully!",
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
  const newUser = new User(req.body);
  await newUser
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "User was created successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// PUT  the users
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await User.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "User was Updated successfully!",
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
    await User.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "User deleted successfully.",
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
