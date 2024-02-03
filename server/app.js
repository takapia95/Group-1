const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors'); // Cross-Origin Resource Sharing
const port = 3001;

// Enable CORS for all requests bc we're using a different port for the client
app.use(cors());

app.use(express.json());

// Mock authenticated
const users = {
    'maria': { name: 'maria' } // User: Maria
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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
