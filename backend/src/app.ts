// Imports
const express = require("express");
const logger = require("./middleware/logger");
const database = require("./config/database");
const app = express();

// Configure Application
const port = process.env.PORT || "4200";
app.set("port", port);

// Middleware
app.use(express.json());
app.use(logger("dev"));

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/", (req, res) => {
	console.log(req.body);
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`@@@@ Listening at http://localhost:${port}`);
});

module.exports = app;
