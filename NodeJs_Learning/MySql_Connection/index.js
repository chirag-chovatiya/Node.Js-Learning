const express = require("express");
const app = express();
const studentController = require("./routes/studentController");

app.use(express.json());
app.use("/student", studentController);

app.listen(3000, () => {
  console.log("The server is active on port 3000");
});
