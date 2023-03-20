const express = require("express");
const cors = require("cors");
//const axios = require("axios");

const app = express();
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const eventServer = 5000;
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

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/events", (req, res) => {
	const { type, data } = req.body;

	if (type === "PostCreated") {
		const { id, title } = data;

		posts[id] = { id, title, comments: [] };
	} else if (type === "CommentCreated") {
		const { id, content, postId } = data;

		const post = posts[postId];
		post.comments.push({ id, content });
	}
	console.log(posts);
	res.send("Success!");
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
