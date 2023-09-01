const express = require("express");
const router = express.Router();
const studentController = require("../controller/userController");
const loginController = require("../controller/register-login-Controller");
const { checkUserAuth } = require("../middleware/authMiddleware");

router.use("/logged", checkUserAuth);

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
router.get("/logged", loginController.loggedUser);

router.get("/", studentController.getAllUser);
router.get("/:userId", studentController.getUserById);
router.put("/:userId", studentController.updateUserById);
router.delete("/:userId", studentController.deleteUserById);

module.exports = router;
