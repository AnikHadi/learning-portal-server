const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const videosSchema = require("../schemas/videosSchema");
const Video = new mongoose.model("Video", videosSchema);

// Get all the users     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await Video.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get videos was find successfully!",
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
    await Video.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Video was find successfully!",
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
  const newVideo = new Video(req.body);
  await newVideo
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Video was added successfully!",
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
    await Video.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Video was Updated successfully!",
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
    await Video.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Video deleted successfully.",
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
