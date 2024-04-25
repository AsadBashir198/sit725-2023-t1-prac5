// controllers/userController.js

const User = require('../models/userModel');

exports.createUser = async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    try {
        const newUser = new User({
            firstName,
            lastName,
            password,
            email
        });
        await newUser.save();
        console.log("User saved:", newUser);
        res.redirect('/success');
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred while processing your request");
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('success', { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("An error occurred while processing your request");
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.redirect('/success');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("An error occurred while processing your request");
    }
};

exports.editUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.render('edit', { user });
    } catch (error) {
        console.error("Error fetching user for editing:", error);
        res.status(500).send("An error occurred while processing your request");
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, password, email } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { firstName, lastName, password, email });
        res.redirect('/success');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("An error occurred while processing your request");
    }
};
