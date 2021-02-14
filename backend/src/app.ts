// Imports
import "reflect-metadata";
const express = require("express");
const logger = require("./middleware/LoggerMiddleware");
const database = require("./config/database");
const routes = require("./routes");
const app = express();

// Configure Application
const port = process.env.PORT || "4200";
app.set("port", port);

// Middleware
app.use(express.json());
app.use(logger("dev"));
database();

// Routes
app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Dev Huddle API v1.0");
});

app.listen(port, () => {
    console.log(`@@@@ Listening at http://localhost:${port}`);
});

module.exports = app;
