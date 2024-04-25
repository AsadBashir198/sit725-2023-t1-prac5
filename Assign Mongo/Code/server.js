// server.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const app = express();

// Require controllers
// Import userController
const userController = require('./controllers/userController');

// Route for creating a new user



// Set up view engine, static files, and body parser
// Set up view engine, static files, and body parser
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Body parser middleware


// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongodb connection successful"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.post('/post', userController.createUser);
app.get('/success', userController.getAllUsers);
app.get('/edit/:id', userController.editUser);
app.post('/update/:id', userController.updateUser);
app.get('/delete/:id', userController.deleteUser);

// Start the server
app.listen(port, () => {
    console.log("Server started");
});
