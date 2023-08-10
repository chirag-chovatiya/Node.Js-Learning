const express = require("express");
const router = express.Router();
const connection = require("../config/MySql_db");

router.get("/", function (req, res) {
  connection.query("SELECT * FROM student", function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
    return;
  });
});

module.exports = router;
