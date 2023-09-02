const express = require("express");
const router = express.Router();
const studentController = require("../controller/userController");
const loginController = require("../controller/register-login-Controller");
const carDetail = require("../controller/carController");
const { checkUserAuth } = require("../middleware/authMiddleware");

// router.use("/logged",checkUserAuth)

router.post(
  "/create",
  loginController.userValidator,
  loginController.registerUser
);
router.post(
  "/login",
  loginController.loginUserValidator,
  loginController.loginUser
);
router.get("/logged", checkUserAuth, loginController.loggedUser);

router.post("/carDetails", checkUserAuth, carDetail.carSpecification);

router.get("/", studentController.getAllUser);
router.get("/:userId", studentController.getUserById);
router.put("/:userId", studentController.updateUserById);
router.delete("/:userId", studentController.deleteUserById);

module.exports = router;
