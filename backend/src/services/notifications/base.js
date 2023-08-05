const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

class Mailer {
  constructor(emails, from, subject, text, html) {
    this.emails = Array.isArray(emails) ? emails : [emails]; // make sure it's an array
    this.from = from;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  async sendMail() {
    const msg = this.emails.map((email) => ({
      to: email,
      from: this.from,
      subject: this.subject,
      text: this.text,
      html: this.html,
    }));
    await sgMail.send(msg);
  }
}

module.exports = { Mailer };
