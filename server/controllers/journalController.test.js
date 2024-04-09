const {
    getJournals,
    addNewJournalEntry,
    deleteJournalEntry,
} = require('./journalController');

// Mock the database object
const mockDb = {
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ /* Sample journal data */ }]),
    deleteOne: jest.fn().mockResolvedValue({ /* Mocked deleteOne result */ }), // Mock deleteOne function

};
const { ObjectId } = require('mongodb');
// Mock the getDb function
jest.mock('../config/db', () => ({
    getDb: jest.fn(() => mockDb),
}));

describe('Journal Controller', () => {
    describe('getJournals', () => {
        test('should fetch journals belonging to a user', async () => {
            // Mock request and response objects
            const req = { user: { _id: 'user_id' } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Mock status function

            // Call the controller function
            await getJournals(req, res);

            // Assertions
            expect(res.json).toHaveBeenCalledWith([{ /* Sample journal data */ }]);
            expect(res.status).not.toHaveBeenCalled(); // Since it's a successful response, status shouldn't be called
            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.find).toHaveBeenCalledWith({ userId: 'user_id' });
            expect(mockDb.toArray).toHaveBeenCalled(); // Check if toArray function is called
        });

        // Add more tests for error handling scenarios if needed
    });

    describe('addNewJournalEntry', () => {
        test('should add a new journal entry', async () => {
            // Mock request and response objects
            const req = {
                user: { _id: 'user_id' },
                body: { title: 'Test Title', text: 'Test Text' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            // Mock database operation
            const insertOneResult = { /* Mocked insertOne result */ };
            mockDb.insertOne = jest.fn().mockResolvedValue(insertOneResult); // Reassigning insertOne to a mocked function

            // Call the controller function
            await addNewJournalEntry(req, res);

            // Assertions
            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.insertOne).toHaveBeenCalledWith(expect.objectContaining({
                userId: 'user_id',
                title: 'Test Title',
                text: 'Test Text',
            }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(insertOneResult); // Verify the response data
        });
    });




    describe('deleteJournalEntry', () => {
        test('should delete a journal entry', async () => {
            // Mock request and response objects
            const req = { user: { _id: 'user_id' }, params: { id: '607ee2a73822807b5c6debe9' } }; // Sample valid ObjectId
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Call the controller function
            await deleteJournalEntry(req, res);
    
            // Assertions
            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.deleteOne).toHaveBeenCalledWith({
                _id: new ObjectId(req.params.id), // Pass the req.params.id directly to the ObjectId constructor
                userId: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled(); // You can add more specific assertions if needed
        });
    });
    

});
