import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { SmsModule } from '../sms/sms.module';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/entities/otp.entity';
import { Logger } from 'winston';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Otp]),
    JwtModule.register({}),
    MailModule,
    SmsModule,
    OtpModule
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService, Logger],
})
export class AdminModule {}
