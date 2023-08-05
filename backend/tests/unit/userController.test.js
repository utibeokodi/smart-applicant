const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const { UserService } = require('../../src/services/database/userService');
const { sendVerificationMail } = require('../../src/services/notifications/sendVerificationMail');
const { sendPasswordResetMail } = require('../../src/services/notifications/sendPasswordResetMail');
const {
  createUser, verifyEmail, 
  forgotPassword, resetPassword, 
  loginUser, getUserDetails, 
  updateUserDetails
} = require('../../src/controllers/userController');

jest.mock('../../src/services/database/userService', () => ({
  UserService: {
    createUser: jest.fn(),
    getUserById: jest.fn(),
    verifyUser: jest.fn(),
    getUserByEmail: jest.fn(),
    updatePassword: jest.fn(),
  },
}));

jest.mock('../../src/services/notifications/sendVerificationMail', () => ({
  sendVerificationMail: jest.fn(),
}));

jest.mock('../../src/services/notifications/sendPasswordResetMail', () => ({
  sendPasswordResetMail: jest.fn(),
}));

jest.mock('jsonwebtoken');

const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password1: 'password',
  password2: 'password',
};

describe('User Controller - createUser()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createUser() should create a new user', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: newUser,
    });

    const res = httpMocks.createResponse();

    UserService.createUser.mockResolvedValue(newUser);

    await createUser(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(UserService.createUser).toHaveBeenCalledWith(newUser.firstName, newUser.lastName, newUser.email, newUser.password1);
    expect(sendVerificationMail).toHaveBeenCalled();
  });

  test('createUser() should handle errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/register',
      body: newUser,
    });

    const res = httpMocks.createResponse();

    // Make UserService.createUser() throw an error.
    UserService.createUser.mockImplementation(() => {
      throw new Error('Test error');
    });

    await createUser(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Test error' });
    expect(sendVerificationMail).not.toHaveBeenCalled();
  });

  describe('User Controller - verifyEmail()', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    // Test when the user is found
    test('verifyEmail() should verify a user and redirect to succes page', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/verify',
        params: { token: 'dummyToken' },
      });
      const res = httpMocks.createResponse();

      const dummyUser = { userId: '123' };

      jwt.verify.mockReturnValue({ userId: dummyUser.userId });
      UserService.getUserById.mockResolvedValue(dummyUser);

      await verifyEmail(req, res);

      expect(UserService.getUserById).toHaveBeenCalledWith(dummyUser.userId);
      expect(UserService.verifyUser).toHaveBeenCalledWith(dummyUser);
      expect(res._getRedirectUrl()).toBe('/verify-success');
    });

    // Test when the user is not found
    test('verifyEmail() should throw an error when user is not found', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/verify',
        params: { token: 'dummyToken' },
      });
      const res = httpMocks.createResponse();

      const dummyUser = { userId: '123' };

      jwt.verify.mockReturnValue({ userId: dummyUser.userId });
      UserService.getUserById.mockResolvedValue(null); // Return null to simulate user not found

      await verifyEmail(req, res);

      expect(UserService.getUserById).toHaveBeenCalledWith(dummyUser.userId);
      expect(res._getRedirectUrl()).toBe('/verify-failure?error=User not found.');
      expect(UserService.verifyUser).not.toHaveBeenCalled();
    });

    test('verifyEmail() should handle errors', async () => {
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/verify',
        params: { token: 'dummyToken' },
      });
      const res = httpMocks.createResponse();

      const errorMessage = 'Test error';

      jwt.verify.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      await verifyEmail(req, res);

      expect(res._getRedirectUrl()).toBe(`/verify-failure?error=${errorMessage}`);
    });
  });
});

describe('User Controller - forgotPassword()', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('forgotPassword() should send a password reset mail if user exists', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/forgot-password',
      body: { email: 'john@example.com' },
    });
    const res = httpMocks.createResponse();

    const dummyUser = { userId: '123' };

    UserService.getUserByEmail.mockResolvedValue(dummyUser);

    await forgotPassword(req, res);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(sendPasswordResetMail).toHaveBeenCalledWith(dummyUser, req);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: 'A User with the email exists, We have sent a password reset link to the email provided.' });
  });

  test('forgotPassword() should return 404 if user is not found', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/forgot-password',
      body: { email: 'john@example.com' },
    });
    const res = httpMocks.createResponse();

    UserService.getUserByEmail.mockResolvedValue(null);

    await forgotPassword(req, res);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(sendPasswordResetMail).not.toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ message: 'A User with the specified Email was not found.' });
  });

  test('forgotPassword() should handle errors', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/forgot-password',
      body: { email: 'john@example.com' },
    });
    const res = httpMocks.createResponse();

    const errorMessage = 'Test error';

    UserService.getUserByEmail.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    await forgotPassword(req, res);

    expect(UserService.getUserByEmail).toHaveBeenCalledWith('john@example.com');
    expect(sendPasswordResetMail).not.toHaveBeenCalled();
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: errorMessage });
  });
});

describe('userController - resetPassword()', () => {
  const password = 'newPassword';
  const token = 'testToken';
  const userId = 'testUserId';
  const user = { id: userId };

  let req; let
    res;

  beforeEach(() => {
    req = httpMocks.createRequest({
      body: {
        password,
        token,
      },
    });
    res = httpMocks.createResponse();

    jwt.verify.mockReturnValue({ userId });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 200 and change password if user exists', async () => {
    UserService.getUserById.mockResolvedValue(user);
    await resetPassword(req, res);

    expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    expect(UserService.getUserById).toHaveBeenCalledWith(userId);
    expect(UserService.updatePassword).toHaveBeenCalledWith(password, user);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Password has been changed Successfully.' });
  });

  test('should return 404 if user does not exist', async () => {
    UserService.getUserById.mockResolvedValue(null);
    await resetPassword(req, res);

    expect(res.statusCode).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Cannot find User.' });
  });

  test('should return 500 and error message if jwt verification fails', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid Token');
    });

    await resetPassword(req, res);

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Invalid Token' });
  });

  test('should return 500 and error message if an error occurs', async () => {
    UserService.getUserById.mockImplementation(() => {
      throw new Error('Test error');
    });

    await resetPassword(req, res);

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Test error' });
  });
});

describe('loginUser', () => {
  it('should return user data and token', async () => {
    const mockUser = { userId: '123', email: 'user@test.com' };
    const mockToken = 'jwt.token.here';

    const mockReq = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      user: mockUser,
      token: mockToken,
    });

    const mockRes = httpMocks.createResponse();

    await loginUser(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(200);
    expect(actualResponseBody).toEqual({
      user: {
        id: mockUser.userId,
        email: mockUser.email,
      },
      token: mockToken,
      expires_in: '1d',
    });
  });
});

describe('getUserDetails', () => {
  it('should return user details', async () => {
    const mockUserId = '123';
    const mockFirstName = 'John';
    const mockLastName = 'Doe';
    const mockEmail = 'user@test.com';

    const mockReq = httpMocks.createRequest({
      method: 'GET',
      url: `/user/${mockUserId}`,
      params: {
        userId: mockUserId,
      },
    });

    const mockRes = httpMocks.createResponse();

    const mockUser = { firstName: mockFirstName, lastName: mockLastName, email: mockEmail };

    UserService.getUserById.mockResolvedValue(mockUser);

    await getUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(200);
    expect(actualResponseBody).toEqual({
      firstName: mockFirstName,
      lastName: mockLastName,
      email: mockEmail,
    });
  });

  it('should return 404 error when user is not found', async () => {
    const mockReq = httpMocks.createRequest({
      method: 'GET',
      url: '/user/123',
      params: {
        userId: '123',
      },
    });

    const mockRes = httpMocks.createResponse();

    UserService.getUserById.mockResolvedValue(null);

    await getUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(404);
    expect(actualResponseBody).toEqual({
      error: 'User not found'
    });
  });

  it('should return 500 error when server error occurs', async () => {
    const mockReq = httpMocks.createRequest({
      method: 'GET',
      url: '/user/123',
      params: {
        userId: '123',
      },
    });

    const mockRes = httpMocks.createResponse();

    UserService.getUserById.mockRejectedValue(new Error('Server error'));

    await getUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(500);
    expect(actualResponseBody).toEqual({
      error: 'Server error'
    });
  });
});

describe('updateUserDetails', () => {
  it('should update user data and return success message', async () => {
    const mockUserId = '123';
    const mockFirstName = 'John';
    const mockLastName = 'Doe';
    const mockEmail = 'user@test.com';

    const mockReq = httpMocks.createRequest({
      method: 'PATCH',
      url: '/user',
      body: {
        userId: mockUserId,
        firstName: mockFirstName,
        lastName: mockLastName,
        email: mockEmail,
      },
    });

    const mockRes = httpMocks.createResponse();

    const mockUser = {
      updateUserDetails: jest.fn(),
    };

    UserService.getUserById.mockResolvedValue(mockUser);

    await updateUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(200);
    expect(actualResponseBody).toEqual({
      message: 'User Data Updated Successfully'
    });
  });

  it('should return 400 error when no fields to update are provided', async () => {
    const mockReq = httpMocks.createRequest({
      method: 'PATCH',
      url: '/user',
      body: {
        userId: '123',
      },
    });

    const mockRes = httpMocks.createResponse();

    await updateUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(400);
    expect(actualResponseBody).toEqual({
      error: 'No fields to update'
    });
  });

  it('should return 404 error when user is not found', async () => {
    const mockReq = httpMocks.createRequest({
      method: 'PATCH',
      url: '/user',
      body: {
        userId: '123',
        firstName: 'John',
      },
    });

    const mockRes = httpMocks.createResponse();

    UserService.getUserById.mockResolvedValue(null);

    await updateUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(404);
    expect(actualResponseBody).toEqual({
      error: 'User not found'
    });
  });

  it('should return 500 error when server error occurs', async () => {
    const mockReq = httpMocks.createRequest({
      method: 'PATCH',
      url: '/user',
      body: {
        userId: '123',
        firstName: 'John',
      },
    });

    const mockRes = httpMocks.createResponse();

    UserService.getUserById.mockRejectedValue(new Error('Server error'));

    await updateUserDetails(mockReq, mockRes);

    const actualResponseBody = JSON.parse(mockRes._getData());

    expect(mockRes.statusCode).toBe(500);
    expect(actualResponseBody).toEqual({
      error: 'Server error'
    });
  });
});
