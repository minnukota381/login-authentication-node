const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/forgot-password', (req, res) => {
    res.render('forgot-password');
});

router.post('/forgot-password', async (req, res) => {
    const { fullName, username } = req.body;
    const user = await User.findOne({ fullName, username });

    if (user) {
        res.render('reset-password', { userId: user._id });
    } else {
        res.render('forgot-password', { error: 'User not found. Please check your details.' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { userId, password } = req.body;
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    res.redirect('/login');
});

module.exports = router;
