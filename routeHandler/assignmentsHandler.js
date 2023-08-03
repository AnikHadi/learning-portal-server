const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const assignmentsSchema = require("../schemas/assignmentsSchema");
const Assignment = new mongoose.model("Assignment", assignmentsSchema);

// Get all the users     .exec(err, data) এই method এর মধ্য err পাব callback এ
router.get("/", async (req, res) => {
  const filter = {};
  await Assignment.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get Assignments was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Assignment by videoId
router.get("/videoId", async (req, res) => {
  const filter = { video_id: req.query.videoId };
  await Assignment.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get Assignments was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Assignment by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Assignment.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Assignments was find successfully!",
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

// POST the Assignment
router.post("/", async (req, res) => {
  const newAssignment = new Assignment(req.body);
  await newAssignment
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Assignments was added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// PUT  the Assignment
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Assignment.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "Assignment was Updated successfully!",
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
    await Assignment.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Assignment deleted successfully.",
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
