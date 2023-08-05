const getCsrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

module.exports = { getCsrfToken };
