const jwtUtils = require('../../routes/jwtUtils');
const User = require('../../models/User');

async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Authentication failed' });

    try {
        // Verify the token using the verifyToken function from jwtUtils
        const user = await jwtUtils.verifyToken(token);
        if (!user) return res.status(403).json({ error: 'Invalid token' });

        // If the token is valid, set the user object in the request
        req.user = user;
        
        // Continue to check if the user is an admin
        const userData = await User.findById(user._id);
        if (!userData.isAdmin) {
            return res.status(403).json({ error: 'Unauthorized access: Admin privileges required' });
        }

        next();
    } catch (error) {
        console.error('Error authenticating token:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { authenticateToken };
