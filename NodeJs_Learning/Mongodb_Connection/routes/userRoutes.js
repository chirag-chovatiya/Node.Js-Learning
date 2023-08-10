const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/users", async (request, response) => {
  const users = await User.find({});
  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;

