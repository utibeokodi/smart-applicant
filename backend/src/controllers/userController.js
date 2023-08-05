const jwt = require('jsonwebtoken');
const { UserService } = require('../services/database/userService.js');
const { sendVerificationMail } = require('../services/notifications/sendVerificationMail.js');
const { sendPasswordResetMail } = require('../services/notifications/sendPasswordResetMail.js');

const createUser = async (req, res) => {
  const {
    firstName, lastName, email, password1, password2,
  } = req.body;

  try {
    const newUser = await UserService.createUser(firstName, lastName, email, password1);

    await sendVerificationMail(newUser, req);

    return res.status(201).json({
      message:
            'User created successfully. Please check your email to verify your account',
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { userId } = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const user = await UserService.getUserById(userId);

    if (user) {
      await UserService.verifyUser(user);
      res.redirect('/verify-success');
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    res.redirect(`/verify-failure?error=${error.message}`);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserService.getUserByEmail(email);
    if (user) {
      await sendPasswordResetMail(user, req);

      res.status(200).json({ message: 'A User with the email exists, We have sent a password reset link to the email provided.' });
    } else {
      res.status(404).json({ message: 'A User with the specified Email was not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { password, token } = req.body;
  try {
    var { userId } = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(500).json({ message: 'Invalid Token' });
  }

  try {
    const user = await UserService.getUserById(userId);
    if (user) {
      await UserService.updatePassword(password, user);

      res.status(200).json({ message: 'Password has been changed Successfully.' });
    } else {
      res.status(404).json({ message: 'Cannot find User.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const EXPIRES_IN = '1d';
  const { user, token } = req;
  res.status(200).json({
    user: {
      id: user.userId,
      email: user.email,
    },
    token,
    expires_in: EXPIRES_IN,
  });
};

const getUserDetails = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { firstName, lastName, email } = user;
    res.status(200).json({ firstName, lastName, email });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUserDetails = async (req, res) => {
  const {
    userId, firstName: first_name, lastName: last_name, email,
  } = req.body;

  const userData = { first_name, last_name, email };

  if (Object.keys(userData).filter((k) => userData[k] !== undefined).length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  try {
    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.updateUserDetails(userData);

    res.status(200).json({ message: 'User Data Updated Successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  loginUser,
  getUserDetails,
  updateUserDetails,
};
