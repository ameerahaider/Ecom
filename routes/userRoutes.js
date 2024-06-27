const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.createUser);

router.post('/login', userController.loginUser);

router.delete('/deleteUsers', userController.deleteUser);


module.exports = router;
