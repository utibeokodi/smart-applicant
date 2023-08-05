const express = require('express');
const {
  createUser, verifyEmail, forgotPassword,
  resetPassword, loginUser, getUserDetails,
  updateUserDetails,
} = require('../controllers/userController.js');
const { sanitizeFormInput } = require('../middleware/sanitizeFormInput.js');
const { getCsrfToken } = require('../controllers/csrfTokenController');
const { csrfProtection } = require('../middleware/csrfProtection');
const { authenticate } = require('../middleware/authenticate.js');
const { authorize } = require('../middleware/authorize.js');

const userRoutes = express.Router();

const registrationInput = ['firstName', 'lastName', 'email', 'password1', 'password2'];
const loginInput = ['email', 'password'];
const resetPasswordInput = ['password'];
const forgotPasswordInput = ['email'];
const updateUserDetailsInput = ['firstName', 'lastName', 'email'];

userRoutes.post('/register', sanitizeFormInput(registrationInput), createUser);
userRoutes.post('/login', sanitizeFormInput(loginInput), authenticate, loginUser);
userRoutes.post('/forgot-password', sanitizeFormInput(forgotPasswordInput), forgotPassword);
userRoutes.post('/reset-password', sanitizeFormInput(resetPasswordInput), resetPassword);
userRoutes.get('/verify-email/:token', verifyEmail);
userRoutes.get('/csrf-token', authorize, csrfProtection, getCsrfToken);
userRoutes.get('/user/:userId', authorize, getUserDetails);
userRoutes.patch(
  '/user',
  csrfProtection,
  sanitizeFormInput(updateUserDetailsInput),
  authorize,
  updateUserDetails,
);

module.exports = { userRoutes };
