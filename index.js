const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const registerHandler = require('./routes/post/register');
const loginHandler = require('./routes/get/login');

const { User } = require('./models');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', async (req, res) => {
    res.redirect('https://muhammad-bilal-portfolio.vercel.app/');
});

app.post('/register', registerHandler);
app.post('/login', loginHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
