const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
	const commentId = randomBytes(5).toString("hex");
	const {
		body: { content },
		params: { id: postId },
	} = req;

	const comments = commentsByPostId[postId] || []; // if undefined gives empty array
	//console.log(comments);
	comments.push({ id: commentId, content });
	//console.log(comments);
	commentsByPostId[postId] = comments;
	console.log(commentsByPostId);
	res.status(201).send(comments);
});

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
