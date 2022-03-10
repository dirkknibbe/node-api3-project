const Users = require("../users/users-model.js");

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[${timestamp}] ${method} to ${url}}]`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC

  let id = req.params.id;
  const bad_id_message = { message: "user not found" };

  if (id == null) {
    res.status(400).json(bad_id_message);
    return;
  }

  let user;

  try {
    id = Number(id);
    user = await Users.getById(req.params.id);
    if (user == null) {
      res.status(404).json(bad_id_message);
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "problem finding user" });
    return;
  }

  req.user = user;

  next();
}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  let name = req.body.name;
  const err_message = { message: "missing required name field" };

  if (!name) {
    res.status(400).json(err_message);
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC

  const post = req.body.text;
  const err_message = { message: "missing required text field" };

  if (!post) {
    res.status(400).json(err_message);
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost };
