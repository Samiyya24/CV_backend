import { Module } from '@nestjs/common';
import { Otp } from './entities/otp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [],
})
export class OtpModule {}
