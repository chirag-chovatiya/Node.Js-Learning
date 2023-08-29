const express = require("express");
const router = express.Router();
const studentController = require("../controller/userController");
const loginController = require("../controller/loginController");

router.post("/create", studentController.createUser);
router.post("/login", loginController.loginUser);

router.get("/", studentController.getAllUser);
router.get("/:userId", studentController.getUserById);
router.put("/:userId", studentController.updateUserById);
router.delete("/:userId", studentController.deleteUserById);

module.exports = router;
