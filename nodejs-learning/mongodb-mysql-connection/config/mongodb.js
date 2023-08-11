const mongoose = require("mongoose");

const { MONGO_SERVER, MONGO_DATABASE } = process.env;
mongoose
  .connect(`mongodb://${MONGO_SERVER}/${MONGO_DATABASE}`)
  .then(() => {
    console.log("Connected to Mongodb database");
  })
  .catch((err) => {
    console.error("Database connection failed");
  });
