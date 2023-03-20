const express = require("express");
//const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const cors = require("cors");
app.use(cors());

// bodyparser
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

const postsServer = 3000;
const queryServer = 3001;
const commentServer = 8000;

app.post("/events", (req, res) => {
	const event = req.body;
	console.log(event);
	axios.post(`http://localhost:${commentServer}/events`, event);
	axios.post(`http://localhost:${postsServer}/events`, event);
	axios.post(`http://localhost:${queryServer}/events`, event);

	res.status(200).json({ message: "OK" });
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Running at http://localhost:${PORT}`);
});
