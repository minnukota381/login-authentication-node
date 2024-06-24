/*-----------------------------------------------------------------------------------------------------
Author: Minnu
username : @minnukota381
Date: 2023-05-01
Title: User.js
Language: JavaScript
Description: Defines the Mongoose schema for the User collection in MongoDB Atlas.
             This schema includes fields for user details such as first name, last name,
             username, password (hashed), gender, and email. The username and email fields
             are unique to ensure each user has a distinct identifier.

             This schema is exported as the 'User' model for use in other parts of the application.
------------------------------------------------------------------------------------------------------*/

const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling

// Define the user schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true }, // First name of the user (required field)
    lastName: { type: String, required: true }, // Last name of the user (required field)
    username: { type: String, required: true, unique: true }, // Username for login (unique and required field)
    password: { type: String, required: true }, // Hashed password (required field)
    gender: { type: String, required: true }, // Gender of the user (required field)
    email: { type: String, required: true, unique: true } // Email address of the user (unique and required field)
});

// Export the User model based on the user schema
module.exports = mongoose.model('User', userSchema);
