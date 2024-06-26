// models/userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
