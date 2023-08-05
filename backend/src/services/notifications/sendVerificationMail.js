const jwt = require('jsonwebtoken');
const { Mailer } = require('./base.js');

async function sendVerificationMail(user, req) {
  const { userId, firstName, email } = user;
  const verificationToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );

  const host = req.get('x-forwarded-host') || req.get('host');

  const text = `Hello ${firstName}, \n
    Please verify your email by clicking the following link: \n
    ${req.protocol}://${host}/api/verify-email/${verificationToken}\n
    Regards,\n
    Smart Applicant Team`;

  const html = `
    <p>Hello ${firstName},</p>
    <p>Please verify your email by clicking the following link:</p>
    <a href="${req.protocol}://${host}/api/verify-email/${verificationToken}">Verify Email</a>
    <p>Regards,</p>
    <p>Smart Applicant Team.</p>`;

  const subject = 'Smart Applicant Account Activation';

  const mailer = new Mailer(email, process.env.SMART_APPLICANT_FROM_EMAIL, subject, text, html);
  await mailer.sendMail();
}

module.exports = { sendVerificationMail };
