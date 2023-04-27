const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const assignmentMarkSchema = require("../schemas/assignmentMarkSchema");
const AssignmentMark = new mongoose.model(
  "AssignmentMark",
  assignmentMarkSchema
);

// Get all the users
router.get("/", async (req, res) => {
  const filter = {};
  await AssignmentMark.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get AssignmentMarks was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Assignment Mark by Assignment id and student Id
router.get("/assignmentId", async (req, res) => {
  console.log(req.query.assignment_id);
  const filter = {
    assignment_id: req.query.assignment_id,
    student_id: req.query.student_id,
  };
  await AssignmentMark.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get AssignmentMark was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Assignment Mark by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await AssignmentMark.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "AssignmentMark was find successfully!",
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

// POST the Assignment Mark
router.post("/", async (req, res) => {
  const newAssignmentMark = new AssignmentMark(req.body);
  await newAssignmentMark
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "AssignmentMark was added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// PUT  the Assignment Mark
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await AssignmentMark.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "AssignmentMark was Updated successfully!",
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

// DELETE the Assignment Mark
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await AssignmentMark.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "AssignmentMark deleted successfully.",
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
