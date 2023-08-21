const User = require("../models/userModel");
const hashPassword = require("../models/userPassword");

// GET ALL USER
const getAllUser = async (req, res) => {
  try {
    const users = await User.getAllUser();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// CREATE NEW USER
const createUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const savedUser = await User.createUser(name, email, age, hashedPassword);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// GET USER BYID
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// UPDATE USER BYID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.updateUserById(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user." });
  }
};

// DELETE USER BYID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.deleteUserById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User not found.");
    }
  } catch (error) {
    res.status(500).json("Failed to delete user.");
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
