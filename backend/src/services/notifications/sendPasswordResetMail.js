const jwt = require('jsonwebtoken');
const { Mailer } = require('./base.js');

async function sendPasswordResetMail(user, req) {
  const { userId, firstName, email } = user;

  // create a password reset token that expires after 1 hour
  const resetToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
  );

  const host = req.get('x-forwarded-host') || req.get('host');

  const text = `Hello ${firstName}, \n
    Please reset your password by clicking the following link: \n
    ${req.protocol}://${host}/reset-password?token=${resetToken}\n
    If your didn't forget your password, please ignore this email.\n
    Regards,\n
    InterviewPrep Team`;

  const html = `
    <p>Hello ${firstName},</p>
    <p>Please reset your password by clicking the following link:</p>
    <a href=" ${req.protocol}://${host}/reset-password?token=${resetToken}">Reset Password</a>
    <p>If your didn't forget your password, please ignore this email.</p>
    <p>Regards,</p>
    <p>InterviewPrep Team.</p>`;

  const subject = 'InterviewPrep Password Reset Request';

  const mailer = new Mailer(email, process.env.INTVW_PREP_FROM_EMAIL, subject, text, html);
  await mailer.sendMail();
}

module.exports = { sendPasswordResetMail };
