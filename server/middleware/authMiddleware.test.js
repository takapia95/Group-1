const jwt = require('jsonwebtoken');
const middleware = require('./authMiddleware'); // Import your middleware functions

// Mocking environment variable
process.env.TOKEN_SECRET = 'testsecret';

describe('authenticateToken middleware', () => {
    it('should return 401 if no token provided', () => {
        const req = { headers: { authorization: '' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        middleware.authenticateToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Access denied' });
    });

    it('should return 403 if token is invalid', () => {
        const req = { headers: { authorization: 'Bearer invalidtoken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        middleware.authenticateToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    });

    it('should call next() if token is valid', () => {
        const token = jwt.sign({ user: 'testUser' }, process.env.TOKEN_SECRET);
        const req = { headers: { authorization: `Bearer ${token}` } };
        const res = {};
        const next = jest.fn();

        middleware.authenticateToken(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(req.user.user).toBe('testUser');
    });
});

describe('validateObjectId middleware', () => {
    it('should return 404 if id is invalid', () => {
        const req = { params: { id: 'invalidId' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();

        middleware.validateObjectId(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid ID format' });
    });

    it('should call next() if id is valid', () => {
        const req = { params: { id: '123456789012345678901234' } };
        const res = {};
        const next = jest.fn();

        middleware.validateObjectId(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});
