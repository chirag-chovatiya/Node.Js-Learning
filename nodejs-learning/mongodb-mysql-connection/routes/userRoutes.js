// routes/index.js
const express = require('express');
const router = express.Router();
const studentController = require('../controller/userController');

router.get('/mysql', studentController.getMySQLStudents);
router.get('/mongodb', studentController.getMongoDBUsers);

module.exports = router;
