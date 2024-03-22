const { getDb } = require('../config/db');
const {ObjectId} = require("mongodb");

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
        locationId: req.body.locationId,
        date: new Date().toLocaleDateString(),
        location: req.body.locationName,
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

const deleteJournalEntry = async (req, res) => {
    // get the journal id from the request
    const journalId = req.params.id;
    // get user id - extracted from the token
    const userId = req.user._id;

    console.log('Journal ID:', journalId);
    console.log('User ID:', userId);


    // if the journal id is not provided
    if (!journalId) {
        return res.status(400).json({message: 'Journal ID is required'});
    }


    try {
        const db = getDb();
        const result = await db.collection('journals').deleteOne({_id: new ObjectId(journalId), userId: userId});
        console.log('Deleted journal entry:', result);
        console.log('Journal ID:', journalId);

        // if the nothing is deleted or the journal entry does not belong to the user
        if (result.deletedCount === 0) {
            return res.status(404).json({message: 'Journal entry not found or does not belong to the user'});
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting from the database:', error);
        res.status(500).json({message: 'Error deleting from the database', error});
    }
}

const getJournalEntryById = async (req, res) => {
    // get the journal id from the request
    const journalId = req.params.id;
    // get user id - extracted from the token
    const userId = req.user._id;

    // if the journal id is not provided
    if (!journalId) {
        return res.status(400).json({ message: 'Journal ID is required' });
    }

    try {
        const db = getDb();
        const journal = await db.collection('journals').findOne({_id: new ObjectId(journalId), userId: userId});

        // if the journal entry does not exist or does not belong to the user
        if (!journal) {
            return res.status(404).json({ message: 'Journal entry not found or does not belong to the user' });
        }
        res.status(200).json(journal);
    } catch (error) {
        console.error('Error fetching journal entry:', error);
        res.status(500).json({ message: 'Error fetching journal entry', error });
    }
};

module.exports = {
    getJournals,
    addNewJournalEntry,
    deleteJournalEntry,
    getJournalEntryById,
}