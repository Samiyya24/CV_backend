import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AdminMailService } from '../mail/AdminMail.service';
import { SmsService } from '../sms/sms.service';
import * as otpGenerator from 'otp-generator';
import { Otp } from '../otp/entities/otp.entity';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { encode } from '../helpers/crypto';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { Logger } from 'winston';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Otp) private readonly otpRepo: Repository<Otp>,

    private readonly jwtService: JwtService,
    private readonly logger: Logger,
    private readonly mailService: AdminMailService,
    private readonly smsService: SmsService,
  ) {}

  // =========== GET TOKEN ===============================
  async getTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
    };

    const [accsessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accsessToken,
      refreshToken: refreshToken,
    };
  }

  // =========== SIGN UP ===============================

  async signUp(createAdminDto: CreateAdminDto, res: Response) {
    // this.logger.debug('signup', AdminService.name);
    // this.logger.verbose('signup', AdminService.name);
    // this.logger.warn('signup', AdminService.name);
    // this.logger.log('signup', AdminService.name);

    const admin = await this.adminRepo.findOneBy({
      email: createAdminDto.email,
    });
    if (admin) {
      throw new BadRequestException('Bunday foydalanuvchi mavjud');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Parollar mos emas');
    }
    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.save({
      ...createAdminDto,
      hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const activation_link = v4();
    const is_active = await newAdmin.is_active;

    const updatedAdmin = await this.adminRepo.save({
      id: newAdmin.id,
      hashed_refresh_token,
      activation_link,
      hashed_password,
      is_active,
    });

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const updateAdmin = updatedAdmin;

    const data = await this.adminRepo.findOneBy({ id: updateAdmin.id });

    console.log(data);

    try {
      await this.mailService.sendMail(data);
    } catch (error) {
      this.logger.error('Access Denied');
      throw new BadRequestException('Xatni yuborishda xatolik');
    }
    const response = {
      message: 'Admin registered',
      admin: updateAdmin,
      tokens,
    };
    return response;
  }

  // =========== ACTIVATE ===============================

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updatedAdmin = await this.adminRepo.update(
      { activation_link: link },
      { is_active: true },
    );

    if (!updatedAdmin.affected) {
      throw new BadRequestException(
        'Admin already activated or link is invalid',
      );
    }

    const response = {
      message: 'Admin activated successfully',
      admin: { is_active: true },
    };

    return response;
  }

  // =========== 'SIGNIN' ===============================
  async signIn(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;

    const admin = await this.adminRepo.findOne({ where: { email } });
    console.log(admin, 'admin');

    if (!admin) {
      throw new BadRequestException('Admin not found');
    }
    if (!admin.is_active) {
      throw new BadRequestException('Admin  is not activate');
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new BadRequestException('Password do not match');
    }

    const tokens = await this.getTokens(admin);
    console.log(tokens, 'token');

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const is_active = await admin.is_active;
    const hashed_password = await bcrypt.hash(loginAdminDto.password, 7);
    console.log(hashed_password, 'hashed_password');

    const activation_link = v4();

    const updatedAdmin = await this.adminRepo.save({
      id: admin.id,
      hashed_refresh_token,
      is_active,
      hashed_password,
      activation_link,
    });
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin logged in',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  // =========== LOGOUT ===============================

  async logout(refreshToken: string, res: Response) {
    console.log(refreshToken, 'token');

    const adminDate = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    console.log(adminDate, 'adminDate');

    if (!adminDate) {
      throw new ForbiddenException('Admin not verified');
    }
    const updatedAdmin = await this.adminRepo.update(
      { id: adminDate.id },
      { hashed_password: null },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      admin_refresh_token: updatedAdmin[0].hashed_refresh_token,
    };
    return response;
  }

  // =========== REFRESHTOKEN ===============================

  async refreshToken(adminId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (adminId !== decodedToken['id']) {
      throw new BadRequestException('Ruxsat etilmagan');
    }
    const admin = await this.adminRepo.findOne({ where: { id: adminId } });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('admin not found');
    }
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const updatedAdmin = await this.adminRepo.update(
      { id: admin.id },
      { hashed_refresh_token },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshed ',
      admin: updatedAdmin,
      tokens,
    };
    return response;
  }

  // ==================== NEW OTP ===============================
  async newOtp(phoneAdminDto: PhoneAdminDto) {
    const phone_number = phoneAdminDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const resp = await this.smsService.sendSms(phone_number, otp);
    if (resp.status !== 200) {
      throw new ServiceUnavailableException('OTP yuborishda xatolik');
    }

    const message =
      'Code has been send to ****' +
      phone_number.slice(phone_number.length - 4);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.delete({ check: phone_number });

    const newOtp = await this.otpRepo.save({
      otp_id: v4(),
      otp,
      expiration_time,
      check: phone_number,
    });

    const details = {
      timestamp: now,
      check: phone_number,
      otp_id: newOtp.otp_id,
    };

    const encoded = await encode(JSON.stringify(details));

    return { status: 'Success', deatils: encoded, message };
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.adminRepo.update({ id }, updateAdminDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new BadRequestException('Bunday id lik admin mavjud emas');
    }
    await this.adminRepo.delete({ id });
    return `ID: ${id} bo'lgan admin o'chirildi `;
  }
}
