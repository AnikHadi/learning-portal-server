const express = require("express");
// const morgan = require("morgan");
// const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const port = process.env.PORT || 9001;

// const middlewares = require("./middlewares");
const api = require("./routeHandler");

const app = express();

// app.use(morgan("dev"));
// app.use(helmet());
app.use(cors());
app.use(express.json());

// database connection with mongoose
const database = async () => {
  try {
    const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.17kyq.mongodb.net/learning_portal?retryWrites=true&w=majority`;
    // const uri = "mongodb://127.0.0.1:27017/learning_portal";
    const mongo = await mongoose.connect(uri);
    if (mongo) {
      console.log("_________MongoDB successfully connected_________");
    }
  } catch (error) {
    console.log("Error : ", error);
  }
};

database();

// check Login with JWT token

app.get("/", (req, res) => {
  res.json({
    message: "Learning Portal Server is running!🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/", api);

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

const errorHandler = (err, req, res, next) => {
  if (err.headersSent) {
    return next(err);
  } else {
    res.status(500).json({ error: err });
  }
};

app.use(errorHandler);

app.use((err, req, res, next) => {
  if (err.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("There was an error");
  }
});

app.listen(port, () => {
  /* eslint-disable no-console */
  console.log("Learning Portal Server is running on port: ", port);
  /* eslint-enable no-console */
});
