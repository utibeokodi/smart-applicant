const { getCsrfToken } = require('../../src/controllers/csrfTokenController');

describe('getCsrfToken', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
    };

    // Mock the csrfToken method
    req.csrfToken = jest.fn().mockReturnValue('mocked-csrf-token');
  });

  it('should return a CSRF token in the response', () => {
    getCsrfToken(req, res);

    expect(res.json).toHaveBeenCalledWith({ csrfToken: 'mocked-csrf-token' });
  });
});
