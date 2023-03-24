const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
app.use(cors());
const axios = require("axios");

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const commentsByPostId = {};
const eventServer = "http://event-bus-srv:5000/events";

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(5).toString("hex");
  const {
    body: { content },
    params: { id: postId },
  } = req;

  const comments = commentsByPostId[postId] || []; // if undefined gives empty array
  console.log(content, postId, comments);
  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;
  console.log(commentsByPostId);

  await axios
    .post(eventServer, {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    })
    .catch((err) => {
      console.log(err.message);
      res.send(err);
    });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;

    await axios
      .post(eventServer, {
        type: "CommentUpdated",
        data: { postId, id, status, content },
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  console.log("recieved", req.body.type);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
