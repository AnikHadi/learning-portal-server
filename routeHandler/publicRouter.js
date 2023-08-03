const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res.send("Learning Portal Server is about route running!");
});

router.get("/contact", (req, res) => {
  res.send("Learning Portal Server is contact route running!");
});

module.exports = router;
