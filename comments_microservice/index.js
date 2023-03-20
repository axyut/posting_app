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
const eventServer = 5000;

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
	//console.log(comments);
	comments.push({ id: commentId, content });

	commentsByPostId[postId] = comments;
	console.log(commentsByPostId);

	await axios.post(`http://localhost:${eventServer}/events`, {
		type: "CommentCreated",
		data: {
			id: commentId,
			content,
			postId,
		},
	});

	res.status(201).send(comments);
});

app.post("/events", (req, res) => {
	console.log("recieved", req.body.type);
});

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
