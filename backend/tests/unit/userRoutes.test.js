const request = require('supertest');
const express = require('express');

jest.mock('../../src/controllers/userController', () => ({
  createUser: jest.fn((req, res) => {
    const user = req.body;

    return res.status(201).json({ message: `User ${user.email} created successfully. Please check your email to verify your account.` });
  }),
  verifyEmail: jest.fn((req, res) => res.status(200).json({ message: 'Email verified successfully.' })),

  forgotPassword: jest.fn((req, res) => {
    res.status(200).json({ message: 'A User with the email exists, We have sent a password reset link to the email provided.' });
  }),

  resetPassword: jest.fn((req, res) => {
    res.status(200).json({ message: 'Password has been changed Successfully.' });
  }),

  loginUser: jest.fn((req, res) => {
    const EXPIRES_IN = '1d';
    const token = 'mock_token';
    const user = {
      userId: '1234',
      email: 'email@example.com',
    };
    res.status(200).json({
      user: {
        id: user.userId,
        email: user.email,
      },
      token,
      expires_in: EXPIRES_IN,
    });
  }),

  getUserDetails: jest.fn((req, res) => {
    const firstName = 'jon';
    const lastName = 'doe';
    const email = 'example@email.com';
    res.status(200).json({ firstName, lastName, email });
  }),

  updateUserDetails: jest.fn((req, res) => {
    res.status(200).json({ message: 'User Data Updated Successfully' });
  }),
}));

jest.mock('../../src/controllers/csrfTokenController', () => ({
  getCsrfToken: jest.fn((req, res) => res.status(200).json({ csrfToken: 'dummy_csrf_token' })),
}));

let sanitizeFormMiddleware = jest.fn((req, res, next) => next());

jest.doMock('../../src/middleware/sanitizeFormInput', () => {
  return {
    sanitizeFormInput: jest.fn(() => sanitizeFormMiddleware),
  };
});

jest.mock('../../src/middleware/authenticate', () => ({
  authenticate: jest.fn((req, res, next) => next()),
}));

jest.mock('../../src/middleware/authorize', () => ({
  authorize: jest.fn((req, res, next) => next()),
}));

jest.mock('../../src/middleware/csrfProtection', () => ({
  csrfProtection: jest.fn((req, res, next) => next()),
}));

const { sanitizeFormInput } = require('../../src/middleware/sanitizeFormInput.js');
const { authenticate } = require('../../src/middleware/authenticate.js');
const { authorize } = require('../../src/middleware/authorize.js');
const {
  createUser, verifyEmail,
  forgotPassword, resetPassword,
  loginUser, getUserDetails, 
  updateUserDetails
} = require('../../src/controllers/userController.js');
const { getCsrfToken } = require('../../src/controllers/csrfTokenController.js');
const { csrfProtection } = require('../../src/middleware/csrfProtection.js');
const { userRoutes } = require('../../src/routes/userRoutes.js');

const app = express();
app.use(express.json());
app.use('/', userRoutes);

describe('User routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  describe('POST /register', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@doe.com',
          password1: '12345678',
          password2: '12345678',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message');
      expect(createUser).toHaveBeenCalled();
      expect(sanitizeFormMiddleware).toHaveBeenCalled();
    });
  });

  describe('GET /verify-email/:token', () => {
    it('should verify an email', async () => {
      const dummyToken = 'your_test_jwt';
      const res = await request(app)
        .get(`/verify-email/${dummyToken}`);

      expect(res.statusCode).toEqual(200);
      expect(verifyEmail).toHaveBeenCalled();
    });
  });

  describe('GET /csrf-token', () => {

    it('should get CSRF token', async () => {
      const res = await request(app)
        .get('/csrf-token');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('csrfToken');
      expect(getCsrfToken).toHaveBeenCalled();
      expect(csrfProtection).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalled();
    });
  });

  describe('POST /forgot-password', () => {

    it('should call forgotPassword and sanitizeFormMiddleware', async () => {
      const res = await request(app)
        .post('/forgot-password')
        .send({
          email: 'john@doe.com',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(sanitizeFormMiddleware).toHaveBeenCalled();
      expect(forgotPassword).toHaveBeenCalled();
    });
  });

  describe('POST /reset-password', () => {
    it('should call resetPassword when /reset-password', async () => {
      const res = await request(app)
        .post('/reset-password')
        .send({
          password: 'test_password',
          token: 'test_token',
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
      expect(resetPassword).toHaveBeenCalled();
      expect(sanitizeFormMiddleware).toHaveBeenCalled();
    });
  });

  describe('POST /login', () => {
    it('should call the necessary middlewares and the loginUser controller', async () => {
      const reqBody = {
        email: 'test@example.com',
        password: 'testPassword',
      };

      const res = await request(app)
        .post('/login')
        .send(reqBody);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('expires_in');
      expect(sanitizeFormMiddleware).toHaveBeenCalled();
      expect(authenticate).toHaveBeenCalled();
      expect(loginUser).toHaveBeenCalled();
    });
  });

  describe('GET /user/:userId', () => {
    it('should call the necessary middleware and the getUserDetails controller', async () => {

      const res = await request(app).get('/user/1234');
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('firstName');
      expect(res.body).toHaveProperty('lastName');
      expect(res.body).toHaveProperty('email');
      expect(authorize).toHaveBeenCalled();
      expect(getUserDetails).toHaveBeenCalled();
    });
  });
  
  describe('PATCH /user', () => {
    it('should call the necessary middlewares and the updateUserDetails controller', async () => {
  
      const reqBody = {
        userId: '123',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
      };
  
      const res = await request(app).patch('/user').send(reqBody);
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(csrfProtection).toHaveBeenCalled();
      expect(sanitizeFormMiddleware).toHaveBeenCalled();
      expect(authorize).toHaveBeenCalled();
      expect(updateUserDetails).toHaveBeenCalled();
    });
  });
});
