const express = require("express");
const router = express.Router();
const studentController = require("../controller/userController");
const loginController = require("../controller/loginController");

router.get("/", studentController.getAllUser);
router.get("/:userId", studentController.getUserById);
router.post("/create", studentController.createUser);
router.put("/:userId", studentController.updateUserById);
router.delete("/:userId", studentController.deleteUserById);
router.post("/login", loginController.loginUser);

module.exports = router;
