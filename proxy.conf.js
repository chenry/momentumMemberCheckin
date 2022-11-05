const process = require("process");

const SERVER_PORT = process.env.BACKEND_PORT || 8080;
const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: `http://localhost:${SERVER_PORT}`,
  },
];
module.exports = PROXY_CONFIG;
