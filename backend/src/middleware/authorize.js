const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {};
      req.user.userId = userId;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { authorize };
