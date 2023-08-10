const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/mySql");
const connectToDb = require("../config/mongodb");
const User = require("../models/userModel");

router.get("/mysql", (req, res) => {
  mysqlConnection.query("SELECT * FROM student", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get("/mongodb", async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});
connectToDb;
module.exports = router;
