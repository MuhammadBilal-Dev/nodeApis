const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow CORS for all routes

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ADMIN_MuhammadBilal:ADMIN_MuhammadBilal@cluster0.bmjapvo.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = mongoose.model('User', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String
}, {
    collection: 'Users'
}));

app.get('/', async (req, res) => {
    res.redirect('https://muhammad-bilal-portfolio.vercel.app/');
});

app.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({
            email: req.body.email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to register user',
            error: error.message
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch user login data',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
