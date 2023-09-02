const User = require("../models/userModel");
const httpStatus = require("http-status");
const Joi = require("joi");

const carSpecification = async (req, res) => {
  try {
    const userId = req.userId;
    const carData = req.body;

    const savedCar = await User.createCar(userId, carData);
    console.log("firstffffffffffffffffffffff", savedCar);
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: "Data create successfully",
      savedUser: savedCar,
    });
  } catch (error) {
    console.error(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Unable to create data",
    });
  }
};

module.exports = { carSpecification };
