const cors = require('cors'); 
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const {authenticateToken, validateObjectId} = require('./middleware/authMiddleware');
const { connectDB } = require('./config/db');
const { login, register } = require('./controllers/authController');
const { search, getLocationPhoto } = require('./controllers/searchController');
const {getJournals, addNewJournalEntry, deleteJournalEntry, getJournalEntryById, editJournalEntry, getJournalEntriesByLocation} = require("./controllers/journalController");
require('dotenv').config();

connectDB()

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.post('/login', login);

app.post('/register', register);

app.get('/search', authenticateToken, search);

app.get('/journals', authenticateToken, getJournals);

app.post('/journals', authenticateToken, addNewJournalEntry);

app.get('/journals/:id', authenticateToken, validateObjectId, getJournalEntryById);

app.put('/journals/:id', authenticateToken, validateObjectId, editJournalEntry);

app.delete('/journals/:id', authenticateToken, validateObjectId, deleteJournalEntry)

app.get('/journals/location/:id', authenticateToken, getJournalEntriesByLocation);

app.get('/locations/:id/photos', authenticateToken, getLocationPhoto);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
