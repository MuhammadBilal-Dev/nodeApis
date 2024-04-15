const bcrypt = require('bcryptjs');
const { User } = require('../../models');

async function register(req, res) {
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
};

module.exports = register;
