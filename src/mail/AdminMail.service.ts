import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/entities/admin.entity';

@Injectable()
export class AdminMailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(admin: Admin) {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    const first_name = admin.first_name;
    const email = admin.email;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to private school app! Confirmation your email',
      template: './confirmation',
      context: {
        name: first_name,
        url,
      },
    });
  }

}
