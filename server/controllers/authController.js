const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getDb } = require('../config/db');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const db = getDb();
    const user = await db.collection('users').findOne({ username });

    if (!user || !await bcrypt.compare(password, user.password)) {

        return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    res.json({ token, username: user.username, message: 'Login successful' });
};

module.exports = {
    login,
}

