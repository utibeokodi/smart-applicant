const csrf = require('csurf');
const { csrfProtection } = require('../../src/middleware/csrfProtection');

jest.mock('csurf');

describe('csrfProtection', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the next middleware if no error occurs and validate the CSRF token', () => {
    const csrfToken = 'mocked-csrf-token';
    req.headers = {
      'x-csrf-token': csrfToken,
    };

    const csrfMiddlewareMock = jest.fn((req, res, next) => {
      const token = req.headers['x-csrf-token'];
      expect(token).toBe(csrfToken);

      next();
    });

    csrf.mockReturnValueOnce(csrfMiddlewareMock);

    csrfProtection(req, res, next);

    expect(csrf).toHaveBeenCalled();
    expect(csrf).toHaveBeenCalledWith({
      cookie: true,
      ignoreMethods: ['GET'],
      value: expect.any(Function),
    });
    console.log(csrf.mock.calls[0][0].cookie);
    expect(csrfMiddlewareMock).toHaveBeenCalledWith(req, res, expect.any(Function));
    expect(next).toHaveBeenCalled();
    expect(csrf.mock.calls[0][0].value(req)).toBe('mocked-csrf-token');
  });

  it('should handle EBADCSRFTOKEN error', () => {
    const csrfMiddlewareMock = jest.fn((req, res, next) => {
      const err = new Error('EBADCSRFTOKEN');
      err.code = 'EBADCSRFTOKEN';
      next(err);
    });

    csrf.mockReturnValueOnce(csrfMiddlewareMock);

    csrfProtection(req, res, next);

    expect(csrf).toHaveBeenCalled();
    expect(csrfMiddlewareMock).toHaveBeenCalledWith(req, res, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid or missing CSRF token, Refresh page and try again' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle other errors', () => {
    const csrfMiddlewareMock = jest.fn((req, res, next) => {
      const err = new Error('Some error');
      next(err);
    });

    csrf.mockReturnValueOnce(csrfMiddlewareMock);

    csrfProtection(req, res, next);

    expect(csrf).toHaveBeenCalled();
    expect(csrfMiddlewareMock).toHaveBeenCalledWith(req, res, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'An Error Occured: Error: Some error' });
    expect(next).not.toHaveBeenCalled();
  });
});
