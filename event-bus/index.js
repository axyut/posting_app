const express = require("express");
//const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const cors = require("cors");
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// For missing events
const events = [];

const postsServer = "http://posts-clusterip-srv:3000/events";
const queryServer = "http://query-srv:3001/events";
const moderationServer = "http://moderation-srv:3002/events";
const commentServer = "http://comment-srv:8000/events";

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);

  try {
    axios.post(postsServer, event);

    axios.post(commentServer, event);
    axios.post(queryServer, event);
    axios.post(moderationServer, event);

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
  }
});

// retirieve all events ever occored
app.get("/events", (req, res) => {
  console.log(events);
  res.send(events);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Running at http://event-bus-srv:${PORT}`);
});
