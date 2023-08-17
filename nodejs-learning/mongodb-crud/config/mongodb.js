const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_SERVER}/${process.env.MONGO_DATABASE}`
  )
  .then(() => {
    console.log("Connected to Mongodb database");
  })
  .catch((err) => {
    console.error("Database connection failed");
  });

  