const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const quizzesMarkSchema = require("../schemas/quizzesMarkSchema");
const QuizzesMark = new mongoose.model("QuizzesMark", quizzesMarkSchema);

// Get all the users
router.get("/", async (req, res) => {
  const filter = {};
  await QuizzesMark.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get QuizzesMarks was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Quizzes Mark by Video id and student Id
router.get("/videoId", async (req, res) => {
  console.log(req.query.video_id);
  const filter = {
    video_id: req.query.video_id,
    student_id: req.query.student_id,
  };
  await QuizzesMark.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Get QuizzesMark was find successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Quizzes Mark by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await QuizzesMark.find(id)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "QuizzesMark was find successfully!",
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

// POST the Quizzes Mark
router.post("/", async (req, res) => {
  const newQuizzesMark = new QuizzesMark(req.body);
  await newQuizzesMark
    .save()
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "QuizzesMark was added successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// PUT  the Quizzes Mark
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await QuizzesMark.updateOne(id, updateData, option)
      .then((result) => {
        res.status(200).json({
          data: result,
          message: "QuizzesMark was Updated successfully!",
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

// DELETE the Quizzes Mark
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await QuizzesMark.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "QuizzesMark deleted successfully.",
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
