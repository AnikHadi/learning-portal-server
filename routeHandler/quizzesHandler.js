const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const quizzesSchema = require("../schemas/quizzesSchema");
const Quiz = new mongoose.model("Quiz", quizzesSchema);

// Get all the Quizzes
router.get("/", async (req, res) => {
  const filter = {};
  await Quiz.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          data: result,
          message: "Get Quizzes was find successfully!",
        });
      } else {
        res.status(200).json({
          data: result,
          message: "There was no quiz found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Quiz by videoId
router.get("/videoId", async (req, res) => {
  const filter = { video_id: req.query.videoId };
  await Quiz.find(filter)
    .select({
      __v: 0,
    })
    .limit(10)
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          data: result,
          message: "Get Quizzes was find successfully!",
        });
      } else {
        res.status(200).json({
          data: result,
          message: "There was no quiz found!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// Get the Quiz by id
router.get("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Quiz.find(id)
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json({
            data: result,
            message: "Get Quiz was find successfully!",
          });
        } else {
          res.status(200).json({
            data: result,
            message: "There was no quiz found!",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
          message: "There was a server side error!",
        });
      });
  } catch (error) {}
});

// POST the Quiz
router.post("/", async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz
    .save()
    .then((result) => {
      console.log(result);
      if (result._id) {
        res.status(200).json({
          data: result,
          message: "Quiz was added successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
        message: "There was a server side error!",
      });
    });
});

// PUT  the Quiz
router.put("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  const data = req.body;
  const updateData = { $set: data };
  const option = { new: true, upsert: true, setDefaultsOnInsert: true };
  try {
    await Quiz.updateOne(id, updateData, option)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          data: result,
          message: "Quiz was Updated successfully!",
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

// DELETE the Quiz
router.delete("/:id", async (req, res) => {
  const id = { _id: req.params.id };
  try {
    await Quiz.deleteOne(id)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Quiz deleted successfully.",
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
