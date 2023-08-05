const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken');
const { UserService } = require('../../src/services/database/userService');
const { authenticate } = require('../../src/middleware/authenticate');

jest.mock('jsonwebtoken');
jest.mock('../../src/services/database/userService');

describe('authenticate middleware', () => {
  let req; let res; let
    next;
  const user = {
    userId: '123',
    email: 'user@test.com',
    hashedPassword: 'hashedpassword',
  };
  const password = 'password';
  const token = 'mock_jwt_token';

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email: user.email,
        password,
      },
    });
    res = httpMocks.createResponse();
    next = jest.fn();
    UserService.getUserByEmail = jest.fn();
    UserService.validatePassword = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate the user and call next', async () => {
    UserService.getUserByEmail.mockResolvedValue(user);
    UserService.validatePassword.mockResolvedValue(true);
    jwt.sign.mockReturnValue(token);

    await authenticate(req, res, next);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith(user.email);
    expect(UserService.validatePassword).toHaveBeenCalledWith(password, user.hashedPassword);
    expect(jwt.sign).toHaveBeenCalledWith({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1d' });

    expect(req.user).toEqual(user);
    expect(req.token).toEqual(token);
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 when user is not found', async () => {
    UserService.getUserByEmail.mockResolvedValue(null);

    await authenticate(req, res, next);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith(user.email);
    expect(res.statusCode).toEqual(404);
    expect(JSON.parse(res._getData())).toEqual({ message: 'User not found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when password is incorrect', async () => {
    UserService.getUserByEmail.mockResolvedValue(user);
    UserService.validatePassword.mockResolvedValue(false);

    await authenticate(req, res, next);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith(user.email);
    expect(UserService.validatePassword).toHaveBeenCalledWith(password, user.hashedPassword);

    expect(res.statusCode).toEqual(401);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Incorrect password' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 if there is an error', async () => {
    const req = httpMocks.createRequest({
      body: { email: 'user@mail.com', password: 'password123' },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    UserService.getUserByEmail = jest.fn(() => {
      throw new Error('Test error');
    });

    await authenticate(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ message: 'Internal server error' });
    expect(UserService.getUserByEmail).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
