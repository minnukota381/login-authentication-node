/*-------------------------------------------------------------------
Author: Minnu
username : @minnukota381
Date: 2023-05-01
Title: authRoutes.js
Language: JavaScript
Description: This file contains the routes for authentication
---------------------------------------------------------------------*/

const express = require('express'); // Import Express framework
const router = express.Router(); // Create a router instance
const authController = require('../controllers/authController'); // Import authController for route handling
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const User = require('../models/User'); // Import User model for database operations

// Route to render login page
router.get('/', authController.getLogin);

// Route to render register page
router.get('/register', authController.getRegister);

// Route to handle registration form submission
router.post('/register', authController.postRegister);

// Route to handle login form submission
router.post('/login', authController.postLogin);

// Route to handle logout
router.post('/logout', authController.logout);

// Route to show forgot password form
router.get('/forgot-password', authController.getForgotPassword);

// Route to handle submission of forgot password form
router.post('/forgot-password', authController.postForgotPassword);

// Route to show reset password form
router.get('/reset-password', authController.getResetPassword);

// Route to handle submission of reset password form
router.post('/reset-password', authController.postResetPassword);

module.exports = router; // Export router for use in other parts of the application
