// Imports
const express = require("express");
// const pino = require("express-pino-logger");
const app = express();
// Configure Application
const port = process.env.PORT || "4200";
app.set("port", port);
// Middleware
app.use(express.json());
// app.use(pino);
// Routes
app.get("/", (req, res) => {
    // req.log.info("User connected to API");
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
module.exports = app;
//# sourceMappingURL=app.js.map