import {
  Body,
  Controller,
  Post,
  UseGuards,
  UnauthorizedException,
  Ip,
  Request,
  Get,
} from '@nestjs/common';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { UserService } from './user.service';
import { transformError, transformResponse } from 'src/common/helpers';
import { VerifyEmailDto } from './dto/VerifyEmailDto';
import { SendOtpDto } from './dto/SendOtpDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/verify-email')
  async verifyEmail(@Body() bodyData: VerifyEmailDto) {
    try {
      const user = await this.userService.findByEmail(bodyData.email);
      if (!user) {
        throw new UnauthorizedException('Username or password is incorrect');
      }
      return transformResponse({
        data: user,
      });
    } catch (error) {
      return transformError(error);
    }
  }

  @Post('/send-otp')
  async sendOtp(@Body() bodyData: SendOtpDto, @Ip() ip) {
    try {
      const userExist = await this.userService.findByEmail(bodyData.email);
      if (!userExist) {
        throw new Error('Email is not exist system');
      }
      if (!/^\d{6}$/.test(bodyData.otp) || bodyData.otp === userExist.otp) {
        if (userExist.count === 15) {
          throw new Error('You have entered OTP more times than allowed');
        } else {
          await this.userService.updateByEmail(
            {
              otp: userExist.otp,
              email: userExist.email,
            },
            ip,
            userExist.count + 1,
          );
          throw new Error('Invalid OTP format. Please enter 6 digits OTP.');
        }
      }
      const user = await this.userService.updateByEmail(
        bodyData,
        ip,
        userExist.count,
      );
      return transformResponse({
        data: user,
      });
    } catch (error) {
      return transformError(error);
    }
  }

  @Get('list-block')
  @UseGuards(AuthenticationGuard)
  async listBlock() {
    try {
      const listBlockUser = await this.userService.findAllByIsActive(false);
      return transformResponse({
        data: listBlockUser,
      });
    } catch (error) {
      return transformError(error);
    }
  }

  @Post('/findAllUser')
  @UseGuards(AuthenticationGuard)
  async findAll() {
    try {
      const data = await this.userService.findAllUser();
      return transformResponse({
        data,
      });
    } catch (error) {
      return transformError(error);
    }
  }

  @Post('change-active')
  @UseGuards(AuthenticationGuard)
  async changeActive(@Body() bodyData: any, @Request() request) {
    try {
      const userId = request.user.id;
      const listBlockUser = await this.userService.update(userId, bodyData);
      return transformResponse({
        data: listBlockUser,
      });
    } catch (error) {
      return transformError(error);
    }
  }
}
