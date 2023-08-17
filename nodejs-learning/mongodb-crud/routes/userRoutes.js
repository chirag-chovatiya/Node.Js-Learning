// routes/index.js
const express = require("express");
const router = express.Router();
const studentController = require("../controller/userController");

router.get("/", studentController.getAllUser);
router.get("/:userId", studentController.getUserById);
router.post("/create", studentController.createUser);
router.put("/:userId", studentController.updateUserById);
router.delete("/:userId", studentController.deleteUserById);

module.exports = router;
