const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../models/userPassword");
const httpStatus = require("http-status");
const Joi = require("joi");


// REGISTER NEW USER
const userValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(10).required(),
    dob:Joi.string().required(),
    phone:Joi.number().min(10).required(),
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
  next(error);
};
const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob, phone, password_confirmation, tc } = req.body;
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
    const savedUser = await User.createUser(name, email, hashedPassword, dob, phone, tc);
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

// LOGIN USER

const loginUserValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: "Incorrect Email",
      });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (passwordMatch) {
      const token = User.generateToken(user);
      res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        message: "Login successful!",
        token: token,
      });
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      error: "Login failed.",
    });
  }
};

const loggedUser = async (req, res) => {
  res.send({ "user": req.user })
}
;

module.exports = {
  userValidator,
  registerUser,
  loginUser,
  loginUserValidator,
  loggedUser,
};
