const User = require("../models/userModel");
const { comparePassword } = require("../models/userPassword");
const httpStatus = require("http-status");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({
          statusCode: `${httpStatus.NOT_FOUND}`,
          error: "User not found.",
        });
    }
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({
          statusCode: `${httpStatus.UNAUTHORIZED}`,
          error: "Invalid password.",
        });
    }
    res
      .status(httpStatus.OK)
      .json({
        statusCode: `${httpStatus.OK}`,
        message: "Login successful!",
        user,
      });
  } catch (error) {
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
