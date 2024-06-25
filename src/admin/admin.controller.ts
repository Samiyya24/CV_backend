import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../common/decorators/cookie_getter.decorator';
import { PhoneAdminDto } from './dto/phone-admin.dto';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiHeader({
  name: 'Admin',
  description: '',
})
@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // --------------- SIGNUP ------------------------------------------
  @ApiOperation({ summary: 'SignUp' })
  @Post('signUp')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signUp(createAdminDto, res);
  }
  // --------------- SIGNIN ------------------------------------------
  @ApiOperation({ summary: 'SignIn' })
  @HttpCode(200)
  @Post('signIn')
  async signIn(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signIn(loginAdminDto, res);
  }

  // --------------LOGOUT-----------------------
  @ApiOperation({ summary: 'LogOut' })
  @ApiTags('LOGOUT')
  @HttpCode(200)
  @Post('logout')
  async logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.logout(refreshToken, res);
  }

  // ----------------------ACTIVATE------------------------------------
  @ApiOperation({ summary: 'Activate' })
  @Get('activate/:link')
  async activate(@Param('link') link: string) {
    return this.adminService.activate(link);
  }

  @HttpCode(200)
  @Post('new_otp')
  async newOtp(@Body() phoneAdminDto: PhoneAdminDto) {
    return this.adminService.newOtp(phoneAdminDto);
  }

  // @HttpCode(200)
  // @Post('verify_otp')
  // async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
  //   return this.adminService.verifyOtp(verifyOtpDto);
  // }

  @ApiOperation({ summary: 'Get all admins' })
  // @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @ApiTags('FIND ONE')
  @ApiOperation({ summary: 'Get admin by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  // @ApiTags('UPDATE')
  @ApiOperation({ summary: 'Update admin by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  // @ApiTags('DELETE')
  @ApiOperation({ summary: 'Delete admin by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
