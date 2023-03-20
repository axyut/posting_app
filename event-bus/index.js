const express = require("express");
//const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const cors = require("cors");
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const postsServer = "http://localhost:3000/events";
const queryServer = "http://localhost:3001/events";
const moderationServer = "http://localhost:3002/events";
const commentServer = "http://localhost:8000/events";

app.post("/events", (req, res) => {
	const event = req.body;
	console.log(event);
	axios.post(commentServer, event);
	axios.post(postsServer, event);
	axios.post(queryServer, event);
	axios.post(moderationServer, event);

	res.status(200).json({ message: "OK" });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`EVENT BUS  ==>  Running at http://localhost:${PORT}`);
});
