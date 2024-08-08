import { Injectable, UnauthorizedException } from '@nestjs/common';
import 'dotenv/config';
import { UsersRepository } from './user.repository';
import { UserCompletionInputDto, UserOutputDto } from './users.dto';
import { HttpResponseDto } from '../base/dto/general.dto';
import { convertToHttpResponseDto } from '../base/utils/convert-info';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUser(userId: number): Promise<UserOutputDto> {
    try {
      const user = await this.usersRepository.findOneById(userId);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
  async completeInfo(
    userCompletionInputDto: UserCompletionInputDto,
    userId: number,
  ): Promise<HttpResponseDto> {
    return convertToHttpResponseDto(
      await this.usersRepository.updateInfo(userId, userCompletionInputDto),
    );
  }
}
