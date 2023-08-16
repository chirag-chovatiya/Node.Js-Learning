// routes/index.js
const express = require('express');
const router = express.Router();
const studentController = require('../controller/userController');

router.get('/mysql', studentController.getMySQLStudents);
router.post('/postMysql', studentController.createMySQLStudent);
router.get('/mongodb', studentController.getMongoDBUsers);
router.post('/postmongodb', studentController.createMongoDBUser);
router.put('/putmongodb/:userId', studentController.editUser);

module.exports = router;
