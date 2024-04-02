const jwt = require('jsonwebtoken');

// auth middleware - checks if the user is authenticated using a jwt token
const authenticateToken = (req, res, next) => {
    console.log(req.headers.authorization); // debug

    // check if the request has an authorization header and if it starts with 'Bearer '
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            // verify the token using the secret key
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified; // Add user info to request
            next(); // Proceed to the next middleware or route handler, in this case the route handler bc no other middleware
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Session has expired. Please log in again.' });
            }
            console.error('JWT verification error:', error);
            res.status(403).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Access denied' });
    }
};

module.exports = authenticateToken;