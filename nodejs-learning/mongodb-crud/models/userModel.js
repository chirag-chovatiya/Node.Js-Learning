const User = require("./userSchema");
const Car = require("./carSchema");
const jwt = require("jsonwebtoken");

// GET ALL USER
const getAllUser = async function () {
  const find = User.find({});
  return find;
};

// CREATE NEW USER
const createUser = async function (name, email, password, dob, phone, tc) {
  const newUser = new User({ name, email, password, dob, phone, tc });
  return newUser.save();
};
const getUserByEmail = async function (email) {
  const findUser = User.findOne({ email: email });
  return findUser;
};
const generateToken = function (user) {
  const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
const verifyToken = function (token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decodedToken.userID;
};

// CAR SPECIFICATION CREATE
const carCreate = async function (
  model,
  modelName,
  bodyType,
  engine,
  engineType,
  engineCylinders,
  manufacturingYear,
  seatingCapacity,
  mileage,
  fuelType,
  fuelTankCapacity,
  transmission,
  kilometer,
  drivetrain,
  safety,
  exShowroomPrice,
  insurance,
  onRoadPrice
) {
  const newCar = new Car({
    model,
    modelName,
    bodyType,
    engine,
    engineType,
    engineCylinders,
    manufacturingYear,
    seatingCapacity,
    mileage,
    fuelType,
    fuelTankCapacity,
    transmission,
    kilometer,
    drivetrain,
    safety,
    exShowroomPrice,
    insurance,
    onRoadPrice,
  });
  return newCar.save();
};

// GET USER BY ID
const getUserById = async function (userId) {
  const findById = User.findById(userId).select("-password");
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

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
  generateToken,
  verifyToken,
  carCreate,
};
