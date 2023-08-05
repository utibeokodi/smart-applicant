const jwt = require('jsonwebtoken');
const { UserService } = require('../services/database/userService');

const authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await UserService.validatePassword(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = { authenticate };
