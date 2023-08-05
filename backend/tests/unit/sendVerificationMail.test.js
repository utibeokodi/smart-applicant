const jwt = require('jsonwebtoken');
const { Mailer } = require('../../src/services/notifications/base');
const { sendVerificationMail } = require('../../src/services/notifications/sendVerificationMail');

jest.mock('jsonwebtoken');
jest.mock('../../src/services/notifications/base');
jest.mock('@sendgrid/mail');

describe('sendVerificationMail', () => {
  const mockUser = {
    userId: '123456789',
    firstName: 'John',
    email: 'test@example.com',
  };

  const mockRequest = {
    headers: {
      'x-forwarded-host': 'mock-forwarded-host',
      host: 'mock-host',
    },
    protocol: 'https',
    get: jest.fn(function (header) {
      return this.headers[header.toLowerCase()];
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Mailer.mockClear();
    mockRequest.get.mockClear();
  });

  it('should send a verification email with correct host using x-forwarded-host', async () => {
    const mockToken = 'mockToken';
    jwt.sign.mockReturnValue(mockToken);

    const mailerInstance = { sendMail: jest.fn() };
    Mailer.mockReturnValue(mailerInstance);

    await sendVerificationMail(mockUser, mockRequest);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    expect(mailerInstance.sendMail).toHaveBeenCalledTimes(1);
    expect(mailerInstance.sendMail).toHaveBeenCalledWith();

    expect(Mailer).toHaveBeenCalledWith(
      mockUser.email,
      process.env.INTVW_PREP_FROM_EMAIL,
      'InterviewPrep Account Activation',
      expect.any(String),
      expect.any(String),
    );

    const [_, __, ___, text, html] = Mailer.mock.calls[0];

    expect(mockRequest.get).toHaveBeenCalledWith('x-forwarded-host');
    expect(mockRequest.get).toHaveBeenCalledTimes(1);
    expect(text).toContain('https://mock-forwarded-host/api/verify-email/mockToken');
    expect(html).toContain('https://mock-forwarded-host/api/verify-email/mockToken');
  });

  it('should send a verification email with correct host using host if x-forwarded-host is not available', async () => {
    const mockToken = 'mockToken';
    jwt.sign.mockReturnValue(mockToken);

    const mailerInstance = { sendMail: jest.fn() };
    Mailer.mockReturnValue(mailerInstance);

    Reflect.deleteProperty(mockRequest.headers, 'x-forwarded-host');

    await sendVerificationMail(mockUser, mockRequest);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: mockUser.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    expect(mailerInstance.sendMail).toHaveBeenCalledTimes(1);
    expect(mailerInstance.sendMail).toHaveBeenCalledWith();

    expect(Mailer).toHaveBeenCalledWith(
      mockUser.email,
      process.env.INTVW_PREP_FROM_EMAIL,
      'InterviewPrep Account Activation',
      expect.any(String),
      expect.any(String),
    );

    const [_, __, ___, text, html] = Mailer.mock.calls[0];

    expect(mockRequest.get).toHaveBeenCalledWith('x-forwarded-host');
    expect(mockRequest.get).toHaveBeenCalledWith('host');
    expect(mockRequest.get).toHaveBeenCalledTimes(2);
    expect(text).toContain('https://mock-host/api/verify-email/mockToken');
    expect(html).toContain('https://mock-host/api/verify-email/mockToken');
  });
});
