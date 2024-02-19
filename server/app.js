const cors = require('cors'); // Cross-Origin Resource Sharing
const axios = require('axios');
const express = require('express');
const app = express();
const { connectDB, getDb } = require('./config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const port = 3001;
require('dotenv').config();

// Connect to the database when the server starts
connectDB()

// Middleware:
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional: For URL-encoded bodies - for Postman testing

// auth middleware - checks if the user is authenticated using a jwt token
const authenticateToken = (req, res, next) => {
    // check if the request has an authorization header and if it starts with 'Bearer '
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            // verify the token using the secret key
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified; // Add user info to request
            next(); // Proceed to the next middleware or route handler, in this case the route handler bc no other middleware
        } catch (error) {
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};


// TODO: display frontend? or just remove this route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// @desc: Login
// @route: POST /login
// @access: Public
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const db = getDb();
        const user = await db.collection('users').findOne({ username });

        // Check if user exists and password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Create and assign a token to the user that is valid for 1 hour
            const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            // Send the token and user info back to the client in the header and body
            res.header('auth-token', token).json({ token, user: { username: user.username }, loggedIn: true });
        } else {
            res.status(400).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ message: 'Error creating token', error });
    }
});

// @desc: Register
// @route: POST /register
// @access: Public
app.post('/register', async (req, res) => {
    const { username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const db = getDb();
    const userExists = await db.collection('users').findOne({username});
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
        res.status(500).json({message: 'Error saving to the database', error});
    }
});

// @desc: Search for locations using the TripAdvisor API
// @route: GET /search
// @access: Private
// authenticateToken = middleware that checks if the user is authenticated before proceeding to the route handler (this makes the route private)
app.get('/search', authenticateToken, async (req, res) => {
    const { searchQuery } = req.query;
    const url = `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${searchQuery}&language=en`;

    try {
        const response = await axios.get(url);
        res.json(response.data); // send the data back to the client - the response from the TripAdvisor API
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.response });
    }
});


// @desc: Get user journals
// @route: GET /journals
// @access: Private
app.get('/journals', authenticateToken, async (req, res) => {
    try {
        const db = getDb();
        // get user id
        const userId = req.user._id;
        // this was testing, leaving it here for reference
        // fetch all journals from the database .find({}) finds all documents in the collection and .toArray() converts the cursor (a cursor is a pointer to the result set of a query) to an array
        //const journals = await db.collection('journals').find({}).toArray();

        // fetch all journals from the database that belong to the user
        const journals = await db.collection('journals').find({ userId }).toArray();
        res.json(journals);
    } catch (error) {
        console.error('Error fetching journals:', error);
        res.status(500).json({ message: 'Error fetching journals', error });
    }
});

// @desc: Add a new journal
// @route: POST /journals
// @access: Private
app.post('/journals', async (req, res) => {
    if(!req.body.title || !req.body.text) {
        return res.status(400).json({ message: 'Title AND Text is required' });
    }

    const journalEntry = {
        title: req.body.title,
        text: req.body.text,
        createdAt: new Date() // timestamp
    };

    // Save the journal entry to the database
    try {
        const db = getDb();
        const result = await db.collection('journals').insertOne(journalEntry);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving to the database:', error);
        res.status(500).json({message: 'Error saving to the database', error});
    }
});


// @desc: Update a journal
// @route: PUT /journals/:id
// @access: Private
app.put('/journals/:id', async (req, res) => {
    if (!req.body.title || !req.body.text) {
        return res.status(400).json({ message: 'Title AND Text is required' });
    }

    const journalEntry = {
        title: req.body.title,
        text: req.body.text,
        lastUpdated: new Date() // timestamp
    };

    // Update the journal entry in the database
    try {
        const db = getDb();
        const result = await db.collection('journals').updateOne({ _id: req.params.id }, { $set: journalEntry });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error updating the database:', error);
        res.status(500).json({ message: 'Error updating the database', error });
    }
});

// @desc: Delete a journal
// @route: DELETE /journals/:id
// @access: Private
app.delete('/journals/:id', (req, res) => {
    res.send('Delete a journal');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});