const jwt = require('jsonwebtoken');
const httpMocks = require('node-mocks-http');
const { authorize } = require('../../src/middleware/authorize');

jest.mock('jsonwebtoken');

describe('Authorize Middleware', () => {
  let req; let res; let
    next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with 401 if no authorization header is provided', async () => {
    await authorize(req, res, next);
    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ message: 'No token provided' });
  });

  it('should respond with 403 if the token is invalid', async () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    req.headers.authorization = 'Bearer someInvalidToken';

    await authorize(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Invalid or expired token' });
  });

  it('should call next if the token is valid', async () => {
    jwt.verify.mockImplementationOnce(() => ({ userId: '1234' }));

    req.headers.authorization = 'Bearer someValidToken';

    await authorize(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user.userId).toBe('1234');
  });

  it('should respond with 403 if an error occurs during token verification', async () => {
    jwt.verify.mockImplementationOnce(() => {
      throw new Error('Unexpected error');
    });

    req.headers.authorization = 'Bearer someToken';

    await authorize(req, res, next);
    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Invalid or expired token' });
  });

  it('should respond with 500 if an error occurs outside jwt verification', async () => {
    req.headers.authorization = jest.fn().mockImplementation(() => {
      throw new Error('Error accessing headers');
    });

    const res = httpMocks.createResponse();
    const next = jest.fn();

    await authorize(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: 'Internal server error' });
  });
});
