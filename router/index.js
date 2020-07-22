const express = require("express");
const path = require("path");
const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);
const router = express.Router();

router.post("/leader", (req, res) => {
  const newLeader = req.body.leader;
  const score = req.body.score;
  client.set("leaders", { sieun: 200 });
  client.get("leaders", (err, reply) => {
    res.send(reply);
  });
});

router.get("/leaders", (req, res) => {
  client.get("leaders", (err, reply) => {
    if (err) {
      res.send("Sorry, something went wrong: " + err);
      return;
    }
    res.send({ leaders: reply });
  });
});

client.on("error", function (error) {
  console.error(error);
});

module.exports = router;
