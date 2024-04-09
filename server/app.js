const cors = require('cors'); // Cross-Origin Resource Sharing
const express = require('express');
const app = express();
const port = 3001;
const {authenticateToken, validateObjectId} = require('./middleware/authMiddleware');
const { connectDB } = require('./config/db');
const { login, register } = require('./controllers/authController');
const { search } = require('./controllers/searchController');
const {getJournals, addNewJournalEntry, deleteJournalEntry, getJournalEntryById, editJournalEntry, getJournalEntriesByLocation} = require("./controllers/journalController");
require('dotenv').config();

// Connect to the database when the server starts
connectDB()

// Middleware:
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // Optional: For URL-encoded bodies - for Postman testing


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


// @desc: Get a journal by ID
// @route: GET /journals/:id
// @access: Private
app.get('/journals/:id', authenticateToken, validateObjectId, getJournalEntryById);



// @desc: Update a journal
// @route: PUT /journals/:id
// @access: Private
app.put('/journals/:id', authenticateToken, validateObjectId, editJournalEntry);


// @desc: Delete a journal
// @route: DELETE /journals/:id
// @access: Private
app.delete('/journals/:id', authenticateToken, validateObjectId, deleteJournalEntry)


// @desc: Get journal entries by location
// @route: GET /journals/location/:id
// @access: Private
app.get('/journals/location/:id', authenticateToken, getJournalEntriesByLocation);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});