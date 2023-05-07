import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  Patch,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { GetUser, Public } from './decorator';
import {
  ResendVerifcationDto,
  SigninDto,
  SignupDto,
  VerifcationDto,
} from './dto';
import {
  ForgotPasswordDto,
  ForgotPasswordInitDto,
} from './dto/forgot-password.dto';
import { RtGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninDto, @Headers() headers: any) {
    return this.authService.signin(dto, headers);
  }

  @Public()
  @Patch('resend-verification')
  @HttpCode(HttpStatus.OK)
  resendVerification(@Body() dto: ResendVerifcationDto) {
    return this.authService.resendVerification(dto);
  }

  @Public()
  @Patch('verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: VerifcationDto) {
    return this.authService.verify(dto);
  }

  @Public()
  @Patch('forgot-init')
  @HttpCode(HttpStatus.OK)
  forgotPasswordInit(@Body() dto: ForgotPasswordInitDto) {
    return this.authService.forgotPasswordInit(dto);
  }

  @Public()
  @Patch('forgot')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetUser('id') userId: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
