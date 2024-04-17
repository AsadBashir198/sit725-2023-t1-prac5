const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongodb connection successful"))
.catch((err) => console.error("Error connecting to MongoDB:", err));


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    email: String
});

const User = mongoose.model("User", userSchema);
app.post('/post', async (req, res) => {
    const { firstName, lastName, password, email } = req.body;
    try {
        const user = new User({
            firstName,
            lastName,
            password,
            email
        });
        await user.save();
        console.log("User saved:", user);
        // Redirect to /success route after form submission
        console.log("Redirecting to /success");
        res.redirect('/success');
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("An error occurred while processing your request");
    }
});

app.get('/success', async (req, res) => {
    try {
        
        const users = await User.find();
        console.log("Users retrieved:", users);
        res.render('success', { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("An error occurred while processing your request");
    }
});

// Start the server
app.listen(port, () => {
    console.log("Server started");
});
