const { getDb } = require('../config/db');

const getJournals = async (req, res) => {
    try {
        const db = getDb();

        // get user id - extracted from the token
        const userId = req.user._id;

        // fetch all journals from the database that belong to the user
        const userJournals = await db.collection('journals').find({ userId }).toArray();
        res.json(userJournals);
    } catch (error) {
        console.error('Error fetching journals:', error);
        res.status(500).json({ message: 'Error fetching journals', error });
    }
}

const addNewJournalEntry = async (req, res) => {
    if(!req.body.title || !req.body.text) {
        return res.status(400).json({ message: 'Title AND Text is required' });
    }

    // get user id - extracted from the token
    const userId = req.user._id;

    const journalEntry = {
        userId, // add the user id to the journal entry - associate the journal entry with the user
        date: new Date().toLocaleDateString(),
        title: req.body.title,
        text: req.body.text,
        createdAt: new Date() // timestamp
    };

    // save the journal entry to the database
    try {
        const db = getDb();
        const result = await db.collection('journals').insertOne(journalEntry);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error saving to the database:', error);
        res.status(500).json({message: 'Error saving to the database', error});
    }
}

module.exports = {
    getJournals,
    addNewJournalEntry,
}