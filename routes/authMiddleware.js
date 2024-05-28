const jwtUtils = require('./jwtUtils');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Authentication failed' });

    // Verify the token using the verifyToken function from jwtUtils
    const user = jwtUtils.verifyToken(token);
    if (!user) return res.status(403).json({ error: 'Invalid token' });

    // If the token is valid, set the user object in the request
    req.user = user;
    next();
}

module.exports = { authenticateToken };
