const { promisify } = require('util');
const { mock } = require('jest-aws-sdk-mock');
const bcrypt = require('bcryptjs');
const { UserService } = require('../../src/services/database/userService');
const { User } = require('../../src/models/User');

jest.mock('bcryptjs');

/*
    mocks promisify to take a function, representing the
    original function passed to promisify and return a
    function and then the function returns `hashPassword`
    when called
*/
jest.mock('util', () => ({
  promisify: jest.fn((fn) => jest.fn().mockResolvedValue('hashedPassword')),
}));

jest.mock('../../src/models/User.js');

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: () => '1234',
}));

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const mockUser = { save: jest.fn() };
      User.mockImplementation(() => mockUser);

      const user = await UserService.createUser('firstName', 'lastName', 'email@example.com', 'password');

      expect(User).toHaveBeenCalledWith('1234', 'firstName', 'lastName', 'email@example.com', 'hashedPassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(user).toEqual(mockUser);
    });

    it('should throw an error when user creation fails', async () => {
      const mockError = new Error('Error');
      User.mockImplementation(() => {
        throw mockError;
      });

      await expect(UserService.createUser('firstName', 'lastName', 'email@example.com', 'password')).rejects.toThrow(mockError);
    });
  });

  describe('getUserById', () => {
    it('should call User.findById(userId) and return a user by ID', async () => {
      const mockUser = {
        userId: '1234',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'hashedPassword',
      };

      User.findById.mockResolvedValue(mockUser);

      const user = await UserService.getUserById('1234');

      expect(User.findById).toHaveBeenCalledWith('1234');
      expect(user).toEqual(mockUser);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user by email', async () => {
      const mockUser = {
        userId: '1234',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      User.findByEmail.mockResolvedValue(mockUser);

      const user = await UserService.getUserByEmail('test@example.com');

      expect(User.findByEmail).toHaveBeenCalledWith('test@example.com');
      expect(user).toEqual(mockUser);
    });
  });

  describe('verifyUser', () => {
    it('should verify a user', async () => {
      const mockUser = { updateUserDetails: jest.fn() };

      await UserService.verifyUser(mockUser);

      expect(mockUser.updateUserDetails).toHaveBeenCalled();
    });
  });

  describe('updatePassword', () => {
    it('should hash the new password and update the user details', async () => {
      const password = 'newPassword';
      const hashedPassword = 'hashedPassword';
      const mockUser = {
        userId: '1234',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'hashedPassword',
        updateUserDetails: jest.fn(),
      };

      await UserService.updatePassword(password, mockUser);
      expect(mockUser.updateUserDetails).toHaveBeenCalledWith({ password: hashedPassword });
    });
  });

  describe('validatePassword', () => {
    it('should return true if the plain password matches the hashed password', async () => {
      const plainPassword = 'password123';
      const hashedPassword = 'hashedPassword';
      bcrypt.hash.mockResolvedValue(hashedPassword);

      bcrypt.compare.mockResolvedValue(true);

      const result = await UserService.validatePassword(plainPassword, hashedPassword);
      expect(bcrypt.compare).toHaveBeenCalledWith(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it('should return false if the plain password does not match the hashed password', async () => {
      const plainPassword = 'password123';
      const hashedPassword = 'hashedPassword';

      bcrypt.hash.mockResolvedValue(hashedPassword);

      bcrypt.compare.mockResolvedValue(false);

      const result = await UserService.validatePassword(plainPassword, hashedPassword);
      expect(result).toBe(false);
    });
  });
});
