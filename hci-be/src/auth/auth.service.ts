import { AuthDeleteUserDto } from './dto/delete-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ForgotPasswordDto,
  ForgotPasswordInitDto,
} from './dto/forgot-password.dto';
import { VerifcationDto } from './dto/verification.dto';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from './../prisma/prisma.service';
import { SigninDto, SignupDto, ResendVerifcationDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import * as moment from 'moment';
import { randomUUID } from 'crypto';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    try {
      const hash = await argon.hash(dto.password);

      //   const role = await this.prisma.role.findFirst({
      //     where: {
      //       name: 'USER',
      //     },
      //   });

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          emailOtp: this.generateCode().code,
          emailOtpExpiration: this.generateCode().expiration,
          hash,
        },
      });

      //   await this.prisma.userRole.create({
      //     data: {
      //       userId: user.id,
      //       roleId: role.id,
      //     },
      //   });

      delete user.emailOtpExpiration;
      delete user.emailOtp;
      delete user.hash;
      delete user.hashedRt;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async forgotPasswordInit(dto: ForgotPasswordInitDto) {
    let user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    this.checkExpiration(user.emailOtpExpiration);
    const newCode = this.generateCode();
    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailOtp: newCode.code,
        emailOtpExpiration: newCode.expiration,
      },
    });

    return { message: 'Forgot password OTP has been sent to your email.' };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');
    if (user.emailOtp !== dto.otp) {
      throw new ForbiddenException('Invalid Otp');
    }

    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hash: await argon.hash(dto.password),
        emailOtpExpiration: moment().format(),
      },
    });
    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return {
      ...tokens,
      message: 'Password has successfully updated.',
    };
  }

  async verify(dto: VerifcationDto) {
    const user = await this.validateUser({
      email: dto.email,
      password: dto.password,
    });
    if (user.emailOtp !== dto.otp) {
      throw new ForbiddenException('Invalid Otp');
    }
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
        emailOtpExpiration: moment().format(),
      },
    });
    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return {
      ...tokens,
      message: 'User has successfully verify',
    };
  }

  async resendVerification(dto: ResendVerifcationDto) {
    let user = await this.validateUser(dto);
    this.checkExpiration(user.emailOtpExpiration);
    const newCode = this.generateCode();
    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailOtp: newCode.code,
        emailOtpExpiration: newCode.expiration,
      },
    });
    return true;
  }

  checkExpiration(emailOtpExpiration: Date) {
    const oldOtpExpiration = moment(emailOtpExpiration);
    const currentDateTime = moment();
    const diff = oldOtpExpiration.diff(currentDateTime);

    if (diff > 0) {
      throw new UnprocessableEntityException(
        `You can request again later ${diff / 60000} minute(s)`,
      );
    }
  }

  async signin(dto: SigninDto, headers: any) {
    const user = await this.validateUser(dto);
    if (user.isActive === false) {
      throw new HttpException(
        {
          message: 'Account is not active',
          isActive: false,
          otpExpiration: user.emailOtpExpiration,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    // const isAdmin = user.userRoles.find((role) => role.role.name === 'ADMIN');

    // if (headers.access_as === 'ADMIN' && isAdmin === undefined) {
    //   throw new HttpException(
    //     {
    //       message: 'Account is not an Admin',
    //       isActive: false,
    //       otpExpiration: user.emailOtpExpiration,
    //     },
    //     HttpStatus.FORBIDDEN,
    //   );
    // }
    delete user.emailOtpExpiration;
    delete user.emailOtp;
    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  generateCode() {
    const min = 100000;
    const max = 900000;
    const random = Math.random() * min;

    const minutesToAdd = 2;
    const futureDate = moment().add(minutesToAdd, 'minutes').format();

    return {
      code: (Math.floor(random) + max).toString(),
      expiration: futureDate,
    };
  }

  async validateUser(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwdMatched = await argon.verify(user.hash, dto.password);
    if (!pwdMatched) throw new ForbiddenException('Credentials incorrect');
    return user;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, user: User): Promise<Tokens> {
    const payload = {
      sub: userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        expiresIn: '30m',
        secret: this.config.get('JWT_SECRET'),
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        expiresIn: '7d',
        secret: this.config.get('JWT_RT_SECRET'),
      }),
    };
  }

  async authDeleteUser(dto: AuthDeleteUserDto) {
    const { otp, ...rest } = dto;
    const user = await this.validateUser(rest);
    console.log('user.emailOtp', user.emailOtp);
    console.log('otp', otp);
    if (user.emailOtp !== otp) {
      throw new ForbiddenException('Invalid Otp');
    }
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: randomUUID(),
        firstName: 'Deleted',
        lastName: 'Deleted',
        mobileNumber: 'Deleted',
      },
    });
    return {
      message: 'Your account has been successfully deleted.',
    };
  }

  async initDelete(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('User not found');
    const newCode = this.generateCode();
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailOtp: newCode.code,
        emailOtpExpiration: newCode.expiration,
      },
    });
  }

  async changePassword(dto: ChangePasswordDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    await this.validateUser({
      email: user.email,
      password: dto.password,
    });

    const hash = await argon.hash(dto.newPassword);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hash,
      },
    });
    return { message: 'Password has been successfully changed.' };
  }

  //   async googleLogin(req) {
  //     const { user: googleUser } = req;
  //     if (!googleUser) {
  //       throw new NotFoundException('User not found.');
  //     }

  //     let user = await this.prisma.user.findUnique({
  //       where: {
  //         googleId: googleUser.id,
  //       },
  //     });

  //     user = await this.prisma.user.findUnique({
  //       where: {
  //         email: googleUser.email,
  //       },
  //     });

  //     const role = await this.prisma.role.findFirst({
  //       where: {
  //         name: 'USER',
  //       },
  //     });

  //     if (!user) {
  //       user = await this.prisma.user.create({
  //         data: {
  //           email: googleUser.email,
  //           firstName: googleUser.firstName,
  //           lastName: googleUser.lastName,
  //           hash: randomUUID(),
  //           googleId: googleUser.id,
  //           isActive: true,
  //         },
  //       });

  //       await this.prisma.userRole.create({
  //         data: {
  //           userId: user.id,
  //           roleId: role.id,
  //         },
  //       });
  //     }

  //     await this.prisma.user.update({
  //       where: { email: user.email },
  //       data: {
  //         googleId: googleUser.id,
  //         isActive: true,
  //       },
  //     });

  //     if (!user) {
  //       user = await this.prisma.user.create({
  //         data: {
  //           email: googleUser.email,
  //           firstName: googleUser.firstName,
  //           lastName: googleUser.lastName,
  //           hash: randomUUID(),
  //           googleId: googleUser.id,
  //           isActive: true,
  //         },
  //       });
  //     }

  //     return await this.expressLogin(user);
  //   }

  //   async facebookLogin(req) {
  //     const { user: facebookUser } = req;
  //     if (!facebookUser) {
  //       throw new NotFoundException('User not found.');
  //     }

  //     let user = await this.prisma.user.findUnique({
  //       where: {
  //         facebookId: facebookUser.id,
  //       },
  //     });

  //     user = await this.prisma.user.findUnique({
  //       where: {
  //         email: facebookUser.email,
  //       },
  //     });

  //     const role = await this.prisma.role.findFirst({
  //       where: {
  //         name: 'USER',
  //       },
  //     });

  //     if (!user) {
  //       user = await this.prisma.user.create({
  //         data: {
  //           email: facebookUser.email,
  //           firstName: facebookUser.firstName,
  //           lastName: facebookUser.lastName,
  //           hash: randomUUID(),
  //           googleId: facebookUser.id,
  //           isActive: true,
  //         },
  //       });

  //       await this.prisma.userRole.create({
  //         data: {
  //           userId: user.id,
  //           roleId: role.id,
  //         },
  //       });
  //     }

  //     await this.prisma.user.update({
  //       where: { email: user.email },
  //       data: {
  //         facebookId: facebookUser.id,
  //         isActive: true,
  //       },
  //     });

  //     if (!user) {
  //       user = await this.prisma.user.create({
  //         data: {
  //           email: facebookUser.email,
  //           firstName: facebookUser.firstName,
  //           lastName: facebookUser.lastName,
  //           hash: randomUUID(),
  //           googleId: facebookUser.id,
  //           isActive: true,
  //         },
  //       });
  //     }

  //     return await this.expressLogin(user);
  //   }

  async expressLogin(user) {
    if (user.isActive === false) {
      throw new HttpException(
        {
          message: 'Account is not active',
          isActive: false,
          otpExpiration: user.emailOtpExpiration,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    delete user.emailOtpExpiration;
    delete user.emailOtp;
    const tokens = await this.getTokens(user.id, user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }
}
