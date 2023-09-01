const { Car } = require("../models/carSchema");

const httpStatus = require("http-status");
const Joi = require("joi");

const carSpecification = async (req, res) => {
  try {
    const {
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
    } = req.body;
    console.log(req.body);

    const savedUser = await Car.carCreate(
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
    );
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      message: "Car create Success",
      savedUser: savedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Unable to Create",
    });
  }
};

module.exports = { carSpecification };
