/*
Author: Minnu
username : @minnukota381
Description: This is a Node.js Express application setup for handling user authentication.
             It connects to MongoDB Atlas, uses EJS for views, and includes session management.
             Routes for registration, login, logout, forgot password, and reset password are defined.
*/


// Import required modules
const express = require('express'); // Express framework for Node.js web applications
const mongoose = require('mongoose'); // MongoDB object modeling tool for Node.js
const session = require('express-session'); // Session middleware for Express
const path = require('path'); // Node.js module for handling file paths
require('dotenv').config(); // Load environment variables from a .env file

const authRoutes = require('./src/routes/authRoutes'); // Import routes for authentication

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 3000; // Define port number from environment variable or default to 3000

// Middleware and configuration setup

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS, images) from the 'public' directory
app.use(express.static('public'));

// Set 'views' directory for EJS template rendering
app.set('views', path.join(__dirname, 'src', 'views'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Secret used to sign the session ID cookie
    resave: false, // Do not save session data if session is unmodified
    saveUninitialized: false, // Do not save new, uninitialized sessions
    cookie: { secure: process.env.NODE_ENV === 'production' } // Secure cookie in production environment
}));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use new server discovery and monitoring engine
}).then(() => {
    console.log('Connected to MongoDB Atlas'); // Successful connection message
}).catch(err => {
    console.error('Error connecting to MongoDB Atlas', err); // Error connecting to MongoDB message
    process.exit(1); // Exit application if MongoDB connection fails
});

// Routes setup

// Use authentication routes defined in authRoutes
app.use(authRoutes);

// Start server and listen on defined port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`); // Server start message with port number
});

