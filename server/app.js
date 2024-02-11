const express = require('express');
const app = express();
const cors = require('cors'); // Cross-Origin Resource Sharing
const axios = require('axios');
require('dotenv').config();
const port = 3001;

// Enable CORS for all requests bc we're requesting from a different origin
app.use(cors());

app.use(express.json());

// Mock authenticated - this would be a db
const users = {
    'maria': { name: 'maria' } // User: maria
};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Login
app.post('/login', (req, res) => {
    const { username } = req.body;
    const user = users[username];
    if (user) {
        res.json({
            loggedIn: true,
            name: user.name
        });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

// Search - TripAdvisor API
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
