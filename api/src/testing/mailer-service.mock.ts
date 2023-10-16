import { MailerService } from '@nestjs-modules/mailer';

export const mailerServideMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn(),
  },
};
