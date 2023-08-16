// controllers/studentController.js
const mysqlConnection = require('../config/mySql');
const User = require('../models/userModel');
const connectToDb = require('../config/mongodb');


// MYSQL CONNECTION 
const getMySQLStudents = (req, res) => {
  mysqlConnection.query('SELECT * FROM student', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching data from MySQL' });
    }
    res.json(results);
  });
};

const createMySQLStudent = (req, res) => {
  const { FirstName, LastName, Class, Marks } = req.body;
  const query = 'INSERT INTO student (FirstName, LastName, Class, Marks) VALUES (?, ?, ?, ?)';
  const values = [FirstName, LastName, Class, Marks];
  
  mysqlConnection.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: 'Error inserting data into MySQL' });
    res.status(201).json({ message: 'Student data inserted successfully' });
  });
};

// MONGODB CONNECTION 
const getMongoDBUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMongoDBUser = async (req, res) => {
  try {
    const {name,email,age}= req.body;
    const newUser = new User({name,email, age});
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const editUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

connectToDb;
module.exports = {
  getMySQLStudents,
  getMongoDBUsers,
  createMongoDBUser,
  createMySQLStudent,
  editUser,
};
