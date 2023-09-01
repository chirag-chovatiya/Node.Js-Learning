const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  modelName: { type: String, required: true },
  bodyType: {
    type: String,
    enum: [
      "SUV",
      "Crossover",
      "Wagon",
      "FamilyMBP",
      "Sport Coupe",
      "Compact",
      "Sedan",
      "Limousine",
      "Convertible",
      "Crossover",
    ],
    required: true,
  },
  engine: { type: String },
  engineType: { type: String },
  engineCylinders: { type: String },
  manufacturingYear: { type: Number, required: true },
  seatingCapacity: { type: String },
  mileage: { type: String },
  fuelType: {
    type: String,
    enum: ["Petrol", "CNG", "Diesel", "Electric"],
    required: true,
  },
  fuelTankCapacity: { type: Number },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
  },
  kilometer: { type: Number },
  drivetrain: { type: String },
  safety: { type: String },
  exShowroomPrice: { type: Number },
  insurance: { type: Number },
  onRoadPrice: { type: Number },
});

const Car = mongoose.model("carSpecifications", carSchema);
module.exports = Car;
