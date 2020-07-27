const express = require("express");
const path = require("path");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const router = express.Router();

router.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.post("/leader", (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    client.get("leaders", (err, reply) => {
      let leaders = JSON.parse(reply);
      const record = { name: req.body.name, score: req.body.score };
      if (!Array.isArray(leaders)) {
        client.set("leaders", JSON.stringify([record]));
        res.send([record]);
        return;
      }
      leaders.push(record);
      leaders = leaders.sort((a, b) => b.score - a.score).slice(0, 9);
      client.set("leaders", JSON.stringify(leaders));
      res.send(leaders);
    });
  } catch (err) {
    console.log("err!", err);
    res.status(500).send(err);
  }
});

router.get("/leaders", (req, res) => {
  client.get("leaders", (err, reply) => {
    if (err) {
      res.send("Sorry, something went wrong: " + err);
      return;
    }
    if (!reply) {
      res.send([]);
      return;
    }
    res.send(reply);
  });
});

client.on("error", function (error) {
  console.error(error);
});

module.exports = router;
