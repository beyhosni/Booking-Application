const User = require('../models/User');

module.exports = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ msg: 'Accès interdit, vous devez être administrateur' });
    }
};
