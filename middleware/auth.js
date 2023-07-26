// middleware/auth.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token missing.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
