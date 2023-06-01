module.exports = (req, res, next) => {
    // Assuming user's role is saved in session or JWT, which you can access via req.user
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'You are not authorized to perform this action.' });
    }
};