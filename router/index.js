const express = require("express");
const path = require("path");
const redis = require("redis");

const router = express.Router();

router.get("/leaders", (req, res) => {
  res.send("here are the leaders!!!!");
});

module.exports = router;
