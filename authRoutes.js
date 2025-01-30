const express = require('express');
const authController = require('Amazon-Price-Tracker/controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
