const User = require("../models/userModel");
const { hashPassword } = require("../models/userPassword");
const httpStatus = require("http-status");
const Joi = require("joi");

const getAllUser = async (req, res) => {
  try {
    const users = await User.getAllUser();
    if (!users || users.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: `${httpStatus.NOT_FOUND}`,
        error: "Not found any user",
      });
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
      error: "Internal Server Error",
    });
  }
};

// CREATE NEW USER
const userValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    password_confirmation: Joi.valid(Joi.ref("password")).required(),
    tc: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      statusCode: httpStatus.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  next();
};
const createUser = async (req, res) => {
  try {
    const { name, email, password, password_confirmation, tc } = req.body;
    const userExists = await User.getUserByEmail(email);
    if (userExists) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        message: "Email already exists",
      });
    }
    if (password !== password_confirmation) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Password and Confirm Password must match",
      });
    }
    const hashedPassword = await hashPassword(password);
    const savedUser = await User.createUser(name, email, hashedPassword, tc);
    const saved_user = await User.getUserByEmail(email);
    const token = User.generateToken(saved_user);

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: "User create Success",
      token: token,
      savedUser: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Unable to Register",
    });
  }
};

// GET USER BYID
const getUserById = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.userId);
    res.status(httpStatus.OK).json({
      statusCode: `${httpStatus.OK}`,
      message: "User Get By Id Success",
      user,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
      error: "Internal Server Error",
    });
  }
};

// UPDATE USER BYID
const updateUserById = async (req, res) => {
  try {
    const { password } = req.body;
    if (password) {
      const hashedPassword = await hashPassword(password);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.updateUserById(req.params.userId, req.body);
    res.status(httpStatus.OK).json({
      statusCode: `${httpStatus.OK}`,
      message: "User Updated Successfull",
      updatedUser,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
      error: "Internal Server Error",
    });
  }
};

// DELETE USER BYID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.deleteUserById(req.params.userId);
    if (user) {
      res.status(httpStatus.OK).json({
        statusCode: `${httpStatus.OK}`,
        error: "Delete User Successfull",
      });
    } else {
      res.status(httpStatus.NOT_FOUND).json({
        statusCode: `${httpStatus.NOT_FOUND}`,
        error: "Not found any user",
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  userValidator,
};
