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

const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const db = getDb();
    const userExists = await db.collection('users').findOne({ username });

    // check if user exists
    if (userExists) {
        return res.status(400).json({ message: 'User already exists. Please pick a different username.' });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = {
        username,
        password: hashedPassword,
        createdAt: new Date() // timestamp
    };

    // save user to db
    try {
        const result = await db.collection('users').insertOne(newUser);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving to the database:', error);
        res.status(500).json({ message: 'Error saving to the database', error });
    }
}

module.exports = {
    login, register
}

