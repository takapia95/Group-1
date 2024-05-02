const {
    getJournals,
    addNewJournalEntry,
    deleteJournalEntry,
} = require('./journalController');

const mockDb = {
    collection: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ /* Sample journal data */ }]),
    deleteOne: jest.fn().mockResolvedValue({ /* Mocked deleteOne result */ }), 

};
const { ObjectId } = require('mongodb');
jest.mock('../config/db', () => ({
    getDb: jest.fn(() => mockDb),
}));

describe('Journal Controller', () => {
    describe('getJournals', () => {
        test('should fetch journals belonging to a user', async () => {
            const req = { user: { _id: 'user_id' } };
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; 

            await getJournals(req, res);

            expect(res.json).toHaveBeenCalledWith([{ /* Sample journal data */ }]);
            expect(res.status).not.toHaveBeenCalled(); 
            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.find).toHaveBeenCalledWith({ userId: 'user_id' });
            expect(mockDb.toArray).toHaveBeenCalled(); 
        });
    });

    describe('addNewJournalEntry', () => {
        test('should add a new journal entry', async () => {
            const req = {
                user: { _id: 'user_id' },
                body: {
                    title: 'Test Title',
                    text: 'Test Text',
                    isPublic: true,
                    coverPhoto: 'travelPhoto1.jpg',
                    locationId: 'location_id',
                    locationName: 'Location Name',
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const insertOneResult = { /* Mocked insertOne result */ };
            mockDb.insertOne = jest.fn().mockResolvedValue(insertOneResult); 

            await addNewJournalEntry(req, res);

            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.insertOne).toHaveBeenCalledWith(expect.objectContaining({
                userId: 'user_id',
                title: 'Test Title',
                text: 'Test Text',
                isPublic: true,
                coverPhoto: 'travelPhoto1.jpg',
                locationId: 'location_id',
                location: 'Location Name',
            }));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(insertOneResult); 
        });
    });


    describe('deleteJournalEntry', () => {
        test('should delete a journal entry', async () => {
            const req = { user: { _id: 'user_id' }, params: { id: '607ee2a73822807b5c6debe9' } }; 
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await deleteJournalEntry(req, res);
    
            expect(mockDb.collection).toHaveBeenCalledWith('journals');
            expect(mockDb.deleteOne).toHaveBeenCalledWith({
                _id: new ObjectId(req.params.id), 
                userId: 'user_id',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled(); 
        });
    });
});
