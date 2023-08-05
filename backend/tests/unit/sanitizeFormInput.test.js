const httpMocks = require('node-mocks-http');
const { sanitizeFormInput } = require('../../src/middleware/sanitizeFormInput');

describe('sanitizeFormInput', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('all fields are required', () => {
    req.body = {
      firstName: '',
      lastName: '',
      email: '',
      password1: '',
      password2: '',
    };

    sanitizeFormInput(['firstName', 'lastName', 'email', 'password1', 'password2'])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });

  test('passwords must match', () => {
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password1: 'testpassword1',
      password2: 'testpassword2',
    };

    sanitizeFormInput(['firstName', 'lastName', 'email', 'password1', 'password2'])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Passwords must match.' });
  });

  test('invalid email format', () => {
    req.body = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalidEmail',
      password1: 'testpassword',
      password2: 'testpassword',
    };

    sanitizeFormInput(['firstName', 'lastName', 'email', 'password1', 'password2'])(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email format.' });
  });

  test('successful sanitization and validation', () => {
    req.body = {
      firstName: ' John ',
      lastName: ' Doe ',
      email: ' JOHN.DOe@test.COM ',
      password1: 'testpassword',
      password2: 'testpassword',
    };

    sanitizeFormInput(['firstName', 'lastName', 'email', 'password1', 'password2'])(req, res, next);

    // Check if next was called indicating successful validation and sanitization
    expect(next).toBeCalled();

    // Check if input was correctly sanitized
    expect(req.body).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      password1: 'testpassword',
      password2: 'testpassword',
    });
  });
});
