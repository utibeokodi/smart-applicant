const validator = require('validator');

const sanitizeFormInput = (fields) => (req, res, next) => {
  const missingFields = fields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (fields.includes('password1') && fields.includes('password2') && req.body.password1 !== req.body.password2) {
    return res.status(400).json({ message: 'Passwords must match.' });
  }

  fields.forEach((field) => {
    if (field.toLowerCase().includes('password')) {
      return;
    }

    req.body[field] = validator.escape(validator.trim(req.body[field]));

    if (field === 'email') {
      req.body[field] = req.body[field].toLowerCase();
      if (!validator.isEmail(req.body[field])) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
    }
  });

  next();
};

module.exports = { sanitizeFormInput };
