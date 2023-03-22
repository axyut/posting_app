const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
const axios = require("axios");

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors());

const posts = {};
const eventServer = "http://event-bus-srv:5000/events";

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  console.log(title);
  posts[id] = {
    id,
    title,
  };

  await axios
    .post(eventServer, {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err.message);
    });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("recieved", req.body.type);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running at http://posts-clusterip-srv:${PORT}`);
  console.log("Version 50");
});
