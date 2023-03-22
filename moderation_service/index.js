const express = require("express");
const axios = require("axios");

const app = express();

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const postsServer = "http://localhost:3000";
const queryServer = "http://localhost:3001";
const moderationServer = "http://localhost:3002";
const commentServer = "http://localhost:8000";
const eventServer = "http://event-bus-srv:5000/events";
const posts = {};

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios
      .post(eventServer, {
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  res.send({ message: "DONE" });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
