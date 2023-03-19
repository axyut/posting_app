const express = require("express");
const { randomBytes } = require("crypto");
const app = express();
const cors = require("cors");

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", (req, res) => {
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;
	console.log(title);
	posts[id] = {
		id,
		title,
	};

	res.status(201).send(posts[id]);
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
