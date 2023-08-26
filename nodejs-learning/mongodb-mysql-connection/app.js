const express = require("express");
const app = express();
const routes = require("./routes/userRoutes");
const connectToDb = require("./config/mongodb");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(routes);
connectToDb;

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
