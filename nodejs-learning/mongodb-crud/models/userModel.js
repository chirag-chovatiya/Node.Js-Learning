const User = require("./userSchema");

// GET ALL USER
const getAllUser = async function () {
  const find = User.find({});
  return find;
};

// CREATE NEW USER
const createUser = async function (name, email, age, password) {
  const newUser = new User({ name, email, age, password });
  return newUser.save();
};

// GET USER BY ID
const getUserById = async function (userId) {
  const findById = User.findById(userId);
  return findById;
};

// UPDATE USER BY ID
const updateUserById = async function (userId, newData) {
  const updateId = await User.findByIdAndUpdate(userId, newData, { new: true });
  return updateId;
};

//   DELETE USER BY ID
const deleteUserById = async function (userId) {
  const deleteUser = await User.findByIdAndDelete(userId);
  return deleteUser;
};

const getUserByEmail = async function (email) {
  const findUser = User.findOne({ email });
  return findUser;
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
};
