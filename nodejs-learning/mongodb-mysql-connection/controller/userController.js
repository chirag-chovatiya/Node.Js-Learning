const mysqlConnection = require('../config/mySql');
const User = require('../models/userModel');
const connectToDb = require('../config/mongodb');

const getMySQLStudents =  (req, res) => {
  mysqlConnection.query('SELECT * FROM student', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from MySQL' });
    } else {
      res.json(results);
    }
  });
};

const getMongoDBUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

connectToDb;
module.exports = {
  getMySQLStudents,
  getMongoDBUsers,
};
