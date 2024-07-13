function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin) {
    // User is an admin, proceed to the next middleware/route handler
    next();
  } else {
    // User is not an admin, return a 403 Forbidden response
    res.status(403).json({ error: 'Unauthorized access: Admin privileges required' });
  }
}

module.exports = isAdmin;
