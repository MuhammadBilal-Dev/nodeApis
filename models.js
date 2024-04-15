const mongoose = require('mongoose');

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

module.exports = {
    User
};
