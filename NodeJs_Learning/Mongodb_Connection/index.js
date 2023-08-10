// src/app.js
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const connectToDatabase = require("./config/database");

connectToDatabase();
app.use(express.json());
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("The server is active on port 3000");
});

