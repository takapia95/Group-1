const cors = require('cors'); // Cross-Origin Resource Sharing
const axios = require('axios');
const express = require('express');
const authenticateToken = require('./middleware/authMiddleware');
const app = express();
const { connectDB } = require('./config/db');
const { login, register } = require('./controllers/authController');
const { search } = require('./controllers/searchController');
const {getJournals, addNewJournalEntry} = require("./controllers/journalController");
const port = 3001;
require('dotenv').config();

// Connect to the database when the server starts
connectDB()

// Middleware:
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional: For URL-encoded bodies - for Postman testing

// TODO: display frontend? or just remove this route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// @desc: Login
// @route: POST /login
// @access: Public
app.post('/login', login);


// @desc: Register
// @route: POST /register
// @access: Public
app.post('/register', register);


// @desc: Search for locations using the TripAdvisor API
// @route: GET /search
// @access: Private
// authenticateToken = middleware that checks if the user is authenticated before proceeding to the route handler (this makes the route private)
app.get('/search', authenticateToken, search);


// @desc: Get user journals
// @route: GET /journals
// @access: Private
app.get('/journals', authenticateToken, getJournals);

// @desc: Add a new journal
// @route: POST /journals
// @access: Private
app.post('/journals', authenticateToken, addNewJournalEntry);


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