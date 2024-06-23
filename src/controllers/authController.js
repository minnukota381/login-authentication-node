const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Render login page
exports.getLogin = (req, res) => {
    res.render('login');
};

// Render register page
exports.getRegister = (req, res) => {
    res.render('register');
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

    // Create a new user
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
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).send('Error saving user');
    }
};

// Handle login
exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            res.render('dashboard', { username: user.username });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send('Error logging in');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
        res.redirect('/');
    });
};

// Render forgot password form
exports.getForgotPassword = (req, res) => {
    res.render('forgot-password');
};

// Handle forgot password form submission
exports.postForgotPassword = async (req, res) => {
    const { username, email } = req.body;

    try {
        const user = await User.findOne({ username, email });

        if (!user) {
            return res.status(400).send('Invalid username or email');
        }

        // Redirect to reset password page with username
        res.render('reset-password', { username });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// Render reset password form
exports.getResetPassword = (req, res) => {
    const { username } = req.query; // Assuming username is passed as a query parameter
    res.render('reset-password', { username });
};

// Handle reset password form submission
exports.postResetPassword = async (req, res) => {
    const { username, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send('Invalid username');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.send('Password updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};