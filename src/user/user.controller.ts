import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserCompletionInputDto, UserOutputDto } from './users.dto';
import { MapInterceptor } from '../base/utils/mapper/mapper.interceptor';
import { TokenService } from '../token/token.service';
import { HttpResponseDto } from '../base/dto/general.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  @Get('profile')
  @UseInterceptors(MapInterceptor(UserOutputDto))
  async getProfile(@Request() req) {
    const userInfo = await this.usersService.getUser(req.user.id);
    return userInfo;
  }

  @Post('/logout')
  async logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    await this.tokenService.addToBlacklist(token);
    return { message: 'Logged out successfully' };
  }

  @Post('/complete-info')
  @UseInterceptors(MapInterceptor(HttpResponseDto))
  async completeInfo(
    @Body() userCompletionInputDto: UserCompletionInputDto,
    @Request() req,
  ): Promise<HttpResponseDto> {
    const result = await this.usersService.completeInfo(
      userCompletionInputDto,
      req.user.id,
    );

    return result;
  }
}
