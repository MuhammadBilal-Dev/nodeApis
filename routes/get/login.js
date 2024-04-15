const bcrypt = require('bcryptjs');
const { User } = require('../../models');

async function login(req, res) {
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
};

module.exports = login;
