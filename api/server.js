const express = require("express");
const {
  logger,
  validatePost,
  validateUser,
  validateUserId,
} = require("./middleware/middleware");

const server = express();

const usersRouter = require("./users/users-router.js");

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
server.use("/api/users/", usersRouter);
server.use(logger);
server.use(validatePost);
server.use(validateUser);
server.use(validateUserId);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
