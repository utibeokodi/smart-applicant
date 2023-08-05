const sgMail = require('@sendgrid/mail');
const { Mailer } = require('../../src/services/notifications/base');

jest.mock('@sendgrid/mail');

describe('Mailer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize emails as an array when provided as a string', () => {
      const mailer = new Mailer('test@example.com', 'from@example.com', 'Test Subject', 'Test Text', '<p>Test HTML</p>');

      expect(mailer.emails).toEqual(['test@example.com']);
    });

    it('should keep emails as an array when provided as an array', () => {
      const emails = ['test1@example.com', 'test2@example.com'];
      const mailer = new Mailer(emails, 'from@example.com', 'Test Subject', 'Test Text', '<p>Test HTML</p>');

      expect(mailer.emails).toEqual(emails);
    });
  });

  describe('sendMail', () => {
    it('should send mail using sendgrid', async () => {
      // Mock the sgMail.send method
      sgMail.send.mockResolvedValue();

      const mailer = new Mailer('test@example.com', 'from@example.com', 'Test Subject', 'Test Text', '<p>Test HTML</p>');

      await mailer.sendMail();

      expect(sgMail.send).toHaveBeenCalledWith([
        {
          to: 'test@example.com',
          from: 'from@example.com',
          subject: 'Test Subject',
          text: 'Test Text',
          html: '<p>Test HTML</p>',
        },
      ]);
    });
  });
});
