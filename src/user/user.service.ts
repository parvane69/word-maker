import { Injectable, UnauthorizedException } from '@nestjs/common';
import 'dotenv/config';
import { UsersRepository } from './user.repository';
import { UserOutputDto } from './users.dto';

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
}
