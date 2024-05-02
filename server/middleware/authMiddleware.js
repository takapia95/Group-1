const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log(req.headers.authorization); 

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified; 
            next(); 
        } catch (error) {
            console.error('JWT verification error:', error);
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Access denied' });
    }
};

function validateObjectId(req, res, next) {
    const { id } = req.params;
    if (!id || id.length !== 24) {
        return res.status(404).json({ message: 'Invalid ID format' });
    }
    next();
}

module.exports = { authenticateToken, validateObjectId };
