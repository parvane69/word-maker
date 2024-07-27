import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  UserLoginInputDto,
  UserLoginOutputDto,
  UserRegistrationInputDto,
  UserRegistrationOutputDto,
} from './auth.dto';
import { MapInterceptor } from '../base/utils/mapper/mapper.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseInterceptors(MapInterceptor(UserLoginOutputDto))
  async login(
    @Body() userLoginInputDto: UserLoginInputDto,
  ): Promise<UserLoginOutputDto> {
    const userInfo = await this.authService.signIn(
      userLoginInputDto.phone,
      userLoginInputDto.confirmation_code,
    );
    return userInfo;
  }

  @Post('/register')
  @UseInterceptors(MapInterceptor(UserRegistrationOutputDto))
  async register(
    @Body() userRegistrationInputDto: UserRegistrationInputDto,
  ): Promise<UserRegistrationOutputDto> {
    return await this.authService.register(userRegistrationInputDto);
  }

  @Post('/resend-confirmation-code')
  async resendConfirmationCode(
    @Body() userRegistrationInputDto: UserRegistrationInputDto,
  ): Promise<UserRegistrationOutputDto> {
    return await this.authService.register(userRegistrationInputDto);
  }
}
