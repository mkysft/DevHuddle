const application = require("./app");
const http = require("http");

// Initialize Server
const server = http.createServer(application);
