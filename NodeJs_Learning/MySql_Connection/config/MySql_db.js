const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "78789898",
  database: "json",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected with the MySQL database...");
});

module.exports = connection;
