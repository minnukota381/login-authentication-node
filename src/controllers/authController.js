/*-----------------------------------------------------------------------------------------------------------
Author: Minnu
username : @minnukota381
Date: 2023-05-01
Title: authController.js
Language: JavaScript
Description: This file contains controller functions for user authentication and password management.
             It handles rendering login, register, forgot password, and reset password pages,
             as well as processing registration, login, password reset requests, and logout functionality.
------------------------------------------------------------------------------------------------------------*/

const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const User = require('../models/User'); // Import User model for interacting with MongoDB

// Render login page
exports.getLogin = (req, res) => {
    res.render('login'); // Render login form view
};

// Render register page
exports.getRegister = (req, res) => {
    res.render('register'); // Render registration form view
};

// Handle registration
exports.postRegister = async (req, res) => {
    const { firstName, lastName, username, password, confirmPassword, gender, email } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user instance
    const newUser = new User({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        gender,
        email
    });

    // Save the user to the database
    try {
        await newUser.save(); // Save the new user
        res.redirect('/'); // Redirect to homepage after successful registration
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving user'); // Handle errors during user saving
    }
};

// Handle login
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        // Check if user exists and password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            res.render('dashboard', { username: user.username }); // Render dashboard upon successful login
        } else {
            res.redirect('/'); // Redirect to homepage if login fails
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in'); // Handle errors during login process
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
        res.redirect('/'); // Redirect to homepage after destroying session
    });
};

// Render forgot password form
exports.getForgotPassword = (req, res) => {
    res.render('forgot-password'); // Render forgot password form view
};

// Handle forgot password form submission
exports.postForgotPassword = async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findOne({ username, email });

        // Check if user exists
        if (!user) {
            return res.status(400).send('Invalid username or email'); // Invalid username or email
        }

        // Redirect to reset password page with username
        res.render('reset-password', { username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error'); // Handle server errors
    }
};

// Render reset password form
exports.getResetPassword = (req, res) => {
    const { username } = req.query; // Get username from query parameter
    res.render('reset-password', { username }); // Render reset password form view
};

// Handle reset password form submission
exports.postResetPassword = async (req, res) => {
    const { username, newPassword, confirmNewPassword } = req.body;

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(400).send('Invalid username'); // Invalid username
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword; // Update user's password
        await user.save(); // Save user changes

        res.redirect('/'); // Redirect to login page after successful password reset
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error'); // Handle server errors
    }
};
