const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const eventServer = "http://event-bus-srv:5000/events";
const posts = {};
// Example
// posts = {
// 	d342s: {
// 		id: "d342s",
// 		title: "post title 1",
// 		comments: [
// 			{ id: "kskj34", content: "comment 1" },
// 			{ id: "sdfw24", content: "comment 2" },
// 		],
// 	},
// 	kae32: {
// 		id: "kae32",
// 		title: "post title 2",
// 		comments: [
// 			{ id: "skje4", content: "comment 1" },
// 			{ id: "sds3d", content: "comment 2" },
// 		],
// 	},
// };

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);
  console.log(posts);
  res.send("Success!");
});

const PORT = 3001;
app.listen(PORT, async () => {
  console.log(`Running at http://localhost:${PORT}`);
  // right after server is running we are gonna make request for missing events
  try {
    const res = await axios.get(eventServer);

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
