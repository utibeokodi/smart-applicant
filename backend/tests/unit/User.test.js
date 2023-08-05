const { User, docClient } = require('../../src/models/User');

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User(
      'test-user-id',
      'John',
      'Doe',
      'john.doe@test.com',
      'hashed-password',
      false,
    );

    docClient.put = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    });

    docClient.query = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Items: [] }),
    });

    docClient.get = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Items: [] }),
    });

    docClient.update = jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Items: [] }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('User constructor', () => {
    it('should construct a new User with the provided values', () => {
      const userId = 'test-user-id';
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@test.com';
      const hashedPassword = 'hashed-password';
      const isVerified = false;
      const createdAt = new Date().toISOString();

      user = new User(userId, firstName, lastName, email, hashedPassword, isVerified, createdAt);

      expect(user.userId).toBe(userId);
      expect(user.firstName).toBe(firstName);
      expect(user.lastName).toBe(lastName);
      expect(user.email).toBe(email);
      expect(user.hashedPassword).toBe(hashedPassword);
      expect(user.isVerified).toBe(isVerified);
      expect(user.createdAt).toBe(createdAt);
    });

    it('should construct a new User with default values for isVerified and createdAt when not provided', () => {
      const userId = 'test-user-id';
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'john.doe@test.com';
      const hashedPassword = 'hashed-password';

      user = new User(userId, firstName, lastName, email, hashedPassword);

      expect(user.userId).toBe(userId);
      expect(user.firstName).toBe(firstName);
      expect(user.lastName).toBe(lastName);
      expect(user.email).toBe(email);
      expect(user.hashedPassword).toBe(hashedPassword);
      expect(user.isVerified).toBe(false);
      expect(user.createdAt).toBeDefined();
    });
  });

  describe('User.save', () => {
    test('save new user', async () => {
      const result = await user.save();

      expect(result).toEqual(user);
      expect(docClient.query).toBeCalled();
      expect(docClient.put).toBeCalled();
    });

    test('do not save if user with the same email exists', async () => {
      const findByEmailMock = jest.spyOn(User, 'findByEmail');
      findByEmailMock.mockResolvedValue(user);
      docClient.query.mockResolvedValue({ Items: [user] });

      await expect(user.save()).rejects.toThrow('User with the given email already exists');
      expect(findByEmailMock).toBeCalled();
      expect(docClient.put).not.toBeCalled();
    });

    test('throw error if docClient.put fails', async () => {
      const findByEmailMock = jest.spyOn(User, 'findByEmail');
      findByEmailMock.mockResolvedValue(null);

      docClient.put.mockImplementation(() => ({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
      }));

      await expect(user.save()).rejects.toThrow('DynamoDB error');
      expect(findByEmailMock).toBeCalled();
      expect(docClient.put).toBeCalled();
    });
  });

  describe('User.findByEmail', () => {
    test('returns a user when the user exists', async () => {
      const testEmail = 'john.doe@test.com';
      const testUserData = {
        user_id: 'test-user-id',
        first_name: 'John',
        last_name: 'Doe',
        email: testEmail,
        password: 'hashed-password',
        isVerified: false,
        createdAt: new Date().toISOString(),
      };

      docClient.query.mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({ Items: [testUserData] }),
      }));

      const result = await User.findByEmail(testEmail);

      expect(result).toEqual(expect.any(User));
      expect(result.userId).toEqual(testUserData.user_id);
      expect(docClient.query).toBeCalled();
    });

    test('returns null when no user is found', async () => {
      const testEmail = 'nonexistent@test.com';

      docClient.query.mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: [] }),
      });

      const result = await User.findByEmail(testEmail);

      expect(result).toBeNull();
      expect(docClient.query).toBeCalled();
    });

    test('throws an error when docClient.query fails', async () => {
      const testEmail = 'error@test.com';
      docClient.query.mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
      });

      await expect(User.findByEmail(testEmail)).rejects.toThrow('DynamoDB error');
      expect(docClient.query).toBeCalled();
    });
  });

  describe('User.findById', () => {
    let testUserId;
    let testUserData;

    beforeEach(() => {
      testUserId = 'test-user-id';
      testUserData = {
        user_id: testUserId,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@test.com',
        password: 'hashed-password',
        isVerified: false,
        createdAt: new Date().toISOString(),
      };
    });

    test('returns a user when the user exists', async () => {
      docClient.get.mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({ Item: testUserData }),
      }));

      const result = await User.findById(testUserId);

      expect(result).toEqual(expect.any(User));
      expect(result.userId).toEqual(testUserData.user_id);
      expect(docClient.get).toBeCalled();
    });

    test('returns null when no user is found', async () => {
      docClient.get.mockImplementation(() => ({
        promise: jest.fn().mockResolvedValue({}),
      }));

      const result = await User.findById(testUserId);

      expect(result).toBeNull();
      expect(docClient.get).toBeCalled();
    });

    test('throws an error when docClient.get fails', async () => {
      docClient.get.mockImplementation(() => ({
        promise: jest.fn().mockRejectedValue(new Error('DynamoDB error')),
      }));

      await expect(User.findById(testUserId)).rejects.toThrow('DynamoDB error');
      expect(docClient.get).toBeCalled();
    });
  });

  describe('updateUserDetails', () => {
    test('should update user details', async () => {
      const newDetails = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@test.com',
        password: 'new-password',
        isVerified: true,
      };

      await user.updateUserDetails(newDetails);

      expect(docClient.update).toHaveBeenCalled();
      const updateParams = docClient.update.mock.calls[0][0];
      expect(updateParams.TableName).toEqual(process.env.INTERVIEW_PREP_USER_TABLE);
      expect(updateParams.Key.user_id).toEqual(user.userId);
      expect(updateParams.UpdateExpression).toEqual('set firstName = :firstName, lastName = :lastName, email = :email, password = :password, isVerified = :isVerified');
      expect(updateParams.ExpressionAttributeValues).toEqual({
        ':firstName': newDetails.firstName,
        ':lastName': newDetails.lastName,
        ':email': newDetails.email,
        ':password': newDetails.password,
        ':isVerified': newDetails.isVerified,
      });
    });

    test('should throw an error if the update fails', async () => {
      const errorMessage = 'Update failed';
      docClient.update.mockReturnValue({
        promise: jest.fn().mockRejectedValue(new Error(errorMessage)),
      });

      const newDetails = {
        firstName: 'John',
      };

      await expect(user.updateUserDetails(newDetails)).rejects.toThrow(errorMessage);
    });
  });

  it('should be able to call updateUserDetails with no arguments and not perform an update', async () => {
    const spy = jest.spyOn(user, 'updateUserDetails');
    await user.updateUserDetails();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith();
    expect(docClient.update).not.toHaveBeenCalled();

    spy.mockRestore();
  });
});
