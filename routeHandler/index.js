const express = require("express");

const emojis = require("./emojis");
const studentHandler = require("./studentHandler");
const teacherHandler = require("./teacherHandler");
const videosHandler = require("./videosHandler");
const publicRouter = require("./publicRouter");
const assignmentsHandler = require("./assignmentsHandler");
const quizzesHandler = require("./quizzesHandler");
const assignmentMarkHandler = require("./assignmentMarkHandler");
const quizzesMarkHandler = require("./quizzesMarkHandler");
const userHandler = require("./userHandler");
const adminHandler = require("./adminCreateHandler");

const router = express.Router();

router.use("/emojis", emojis);
router.use("/login", userHandler);
router.use("/student", studentHandler);
router.use("/teacher", teacherHandler);
router.use("/admin", adminHandler);
router.use("/videos", videosHandler);
router.use("/", publicRouter);
router.use("/assignments", assignmentsHandler);
router.use("/quizzes", quizzesHandler);
router.use("/quizzesMark", quizzesMarkHandler);
router.use("/assignmentMark", assignmentMarkHandler);

module.exports = router;
