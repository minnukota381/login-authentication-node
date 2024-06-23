const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/', authController.getLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.post('/logout', authController.logout);

// Route to show forgot password form
router.get('/forgot-password', authController.getForgotPassword);

// Route to handle submission of forgot password form
router.post('/forgot-password', authController.postForgotPassword);

// Route to show reset password form
router.get('/reset-password', authController.getResetPassword);

// Route to handle submission of reset password form
router.post('/reset-password', authController.postResetPassword);

module.exports = router;
