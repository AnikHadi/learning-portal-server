const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userHandler = require("./routeHandler/userHandler");
const videosHandler = require("./routeHandler/videosHandler");
const assignmentsHandler = require("./routeHandler/assignmentsHandler");
const quizzesHandler = require("./routeHandler/quizzesHandler");
const assignmentMarkHandler = require("./routeHandler/assignmentMarkHandler");
const port = process.env.PORT || 9001;

// express app initialization
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// application routes
app.get("/", (req, res) => {
  res.send("Learning Portal Server is running!");
});

app.use("/users", userHandler);
app.use("/videos", videosHandler);
app.use("/assignments", assignmentsHandler);
app.use("/quizzes", quizzesHandler);
app.use("/assignmentMark", assignmentMarkHandler);

// default error handler
function errorHandler(err, req, res) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(port, () => {
  console.log("Learning Portal Server is running on port: ", port);
});
