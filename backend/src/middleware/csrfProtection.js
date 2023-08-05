const csrf = require('csurf');

const csrfProtection = (req, res, next) => {
  const csrfMiddleware = csrf({
    cookie: true,
    ignoreMethods: ['GET'],
    value: (req) => req.headers['x-csrf-token'],
  });

  csrfMiddleware(req, res, (err) => {
    if (err) {
      if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ message: 'Invalid or missing CSRF token, Refresh page and try again' });
      }
      return res.status(500).json({ message: `An Error Occured: ${err}` });
    }
    next();
  });
};

module.exports = { csrfProtection };
