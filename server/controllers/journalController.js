const { getDb } = require('../config/db');
const {ObjectId} = require("mongodb");

const getJournals = async (req, res) => {
    try {
        const db = getDb();

        const userId = req.user._id;

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

    if(req.body.locationId === undefined || req.body.locationName === undefined) {
        return res.status(400).json({ message: 'Location ID and Name not found' });
    }

    const userId = req.user._id;

    console.log("ADDING NEW JOURNAL ENTRY: ", req.body)

    const journalEntry = {
        userId,
        locationId: req.body.locationId,
        date: new Date().toLocaleDateString(),
        location: req.body.locationName,
        title: req.body.title,
        text: req.body.text,
        isPublic: req.body.isPublic, 
        coverPhoto: req.body.coverPhoto, 
        createdAt: new Date() 
    };

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
    const journalId = req.params.id;
    const userId = req.user._id;

    console.log('DELETE: Journal ID:', journalId);
    console.log('DELETE: User ID:', userId);

    if (!journalId) {
        return res.status(400).json({message: 'Journal ID is required'});
    }


    try {
        const db = getDb();
        const result = await db.collection('journals').deleteOne({_id: new ObjectId(journalId), userId: userId});
        console.log('Deleted journal entry:', result);
        console.log('Journal ID:', journalId);

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
    const journalId = req.params.id;
    const userId = req.user._id;

    if (!journalId) {
        return res.status(400).json({ message: 'Journal ID is required' });
    }

    try {
        const db = getDb();
        const journal = await db.collection('journals').findOne({_id: new ObjectId(journalId), userId: userId});

        if (!journal) {
            return res.status(404).json({ message: 'Journal entry not found or does not belong to the user' });
        }
        res.status(200).json(journal);
    } catch (error) {
        console.error('Error fetching journal entry:', error);
        res.status(500).json({ message: 'Error fetching journal entry', error });
    }
};

const editJournalEntry = async (req, res) => {
    if (!req.body.title || !req.body.text) {
        return res.status(400).json({ message: 'Title AND Text is required' });
    }

    const journalEntry = {
        title: req.body.title,
        text: req.body.text,
        isPublic: req.body.isPublic,
        coverPhoto: req.body.coverPhoto,
        lastUpdated: new Date() // timestamp
    };

    try {
        const db = getDb();

        const result = await db.collection('journals').findOne({ _id: new ObjectId(req.params.id), userId: req.user._id });

        if (!result) {
            return res.status(404).json({ message: 'Unable to find this journal entry for your account.' });
        }

        await db.collection('journals').updateOne({ _id: new ObjectId(req.params.id) }, { $set: journalEntry });
        res.status(200).json(result);
    } catch (error) {
        console.log('Error updating the database:', error);
        res.status(500).json({ message: 'Error updating the database', error });
    }
}

const getJournalEntriesByLocation = async (req, res) => {
    const locationId = req.params.id;
    try {
        const db = getDb();
        const journalEntries = await db.collection('journals').find({ locationId, isPublic: true }).toArray();
        res.json(journalEntries);
    } catch (error) {
        console.error('Error fetching journal entries:', error);
        res.status(500).json({message: 'Error fetching journal entries', error});
    }
}

module.exports = {
    getJournals,
    addNewJournalEntry,
    deleteJournalEntry,
    getJournalEntryById,
    editJournalEntry,
    getJournalEntriesByLocation,
}
