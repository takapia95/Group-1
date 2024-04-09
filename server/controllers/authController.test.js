// authController.test.js
const { login, register } = require('./authController');

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mocked_token')
}));

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    genSalt: jest.fn(),
    hash: jest.fn()
}));

// Mock MongoClient instance

const mockDbInstance = {
    collection: jest.fn(() => ({
        findOne: jest.fn(),
        insertOne: jest.fn()
    }))
};

jest.mock('../config/db', () => ({
    getDb: jest.fn(() => mockDbInstance)
}));

describe('Auth Controller', () => {
    describe('register', () => {
        test('should return error if username or password is missing', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
        });

        test('should return error if user can not register', async () => {
            const req = { body: { username: 'newuser', password: 'password123' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            // Register new user
            mockDbInstance.collection().findOne.mockResolvedValueOnce({ username: 'newuser' });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
        });

        // Add more tests for different scenarios as needed
    });

    describe('login', () => {
        test('should return error if username or password is missing', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Username and password are required' });
        });

        test('should return error if user does not exist or password is incorrect', async () => {
            const req = { body: { username: 'newuser', password: 'wrongpassword' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid username or password' });
        });

        // Add more tests for different scenarios as needed
    });
});