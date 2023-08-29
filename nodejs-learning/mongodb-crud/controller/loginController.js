const User = require("../models/userModel");
const { comparePassword } = require("../models/userPassword");
const httpStatus = require("http-status");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await User.getUserByEmail(email);
      if (user != null) {
        const passwordMatch = await comparePassword(password, user.password);
        if (user.email === email && passwordMatch) {
          const token = User.generateToken(user);
          res
            .status(httpStatus.OK)
            .json({
              statusCode: `${httpStatus.OK}`,
              message: "Login successful!",
              token: token,
              user: user,
            });
        } else {
          res
            .status(httpStatus.BAD_REQUEST)
            .json({
              statusCode: `${httpStatus.BAD_REQUEST}`,
              message: "Incorrect details",
            });
        }
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({
            statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
            message: "User Not Registerd",
          });
      }
    } else {
      res
        .status(httpStatus.NOT_FOUND)
        .json({
          statusCode: `${httpStatus.NOT_FOUND}`,
          message: "All fields are required",
        });
    }
  } catch (error) {
    console.log(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        statusCode: `${httpStatus.INTERNAL_SERVER_ERROR}`,
        error: "Login failed.",
      });
  }
};

module.exports = {
  loginUser,
};
