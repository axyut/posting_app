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

const postsServer = "http://localhost:3000/events";
const queryServer = "http://localhost:3001/events";
const moderationServer = "http://localhost:3002/events";
const commentServer = "http://localhost:8000/events";

app.post("/events", (req, res) => {
	const event = req.body;

	events.push(event);

	axios.post(commentServer, event).catch((err) => {
		console.log(err.message);
	});
	axios.post(postsServer, event).catch((err) => {
		console.log(err.message);
	});
	axios.post(queryServer, event).catch((err) => {
		console.log(err.message);
	});
	axios.post(moderationServer, event).catch((err) => {
		console.log(err.message);
	});

	res.status(200).json({ message: "OK" });
});

// retirieve all events ever occored
app.get("/events", (req, res) => {
	console.log(events);
	res.send(events);
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
