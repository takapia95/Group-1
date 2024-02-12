const cors = require('cors'); // Cross-Origin Resource Sharing
const axios = require('axios');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const port = 3001;
require('dotenv').config();

// Connect to the database
connectDB()


// Middleware:
// Enable CORS for all requests bc we're requesting from a different origin
app.use(cors());
// Enable parsing of JSON data
app.use(express.json());

// Mock authenticated - this would be a db
const users = {
    'maria': { name: 'maria' } // User: maria
};

// TODO: display frontend? or just remove this route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// @desc: Login
// @route: POST /login
// @access: Public
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = users[username];
    if (!user) {
        res.status(401).json({ message: 'User not found' });
    }
    if (user) {
        res.json({
            loggedIn: true,
            name: user.name
        });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});


// @desc: Search for locations using the TripAdvisor API
// @route: GET /search
// @access: Private
app.get('/search', async (req, res) => {
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
app.get('/journals', (req, res) => {
    res.send('Get user journals');
})

// @desc: Add a new journal
// @route: POST /journals
// @access: Private
app.post('/journals', (req, res) => {
    res.send('Add a new journal');
})

// @desc: Update a journal
// @route: PUT /journals/:id
// @access: Private
app.put('/journals/:id', (req, res) => {
    res.send('Update a journal');
})

// @desc: Delete a journal
// @route: DELETE /journals/:id
// @access: Private
app.delete('/journals/:id', (req, res) => {
    res.send('Delete a journal');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});