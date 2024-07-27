import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { users } from '../base/database/entities/users.entity';
import { UserRegistrationInputDto } from '../auth/auth.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(users)
    private readonly repository: Repository<users>,
  ) {}

  async login(phone: string): Promise<users> {
    return this.repository.findOne({ where: { phone } });
  }

  async findOneById(id: number): Promise<users> {
    return this.repository.findOne({ where: { id } });
  }

  async checkExist(phone: string): Promise<users> {
    return this.repository.findOne({
      where: { phone },
    });
  }
  async save(dto: UserRegistrationInputDto): Promise<users> {
    const result = await this.repository.save(dto);
    return result;
  }
  async updateConfirmaitionCode(userId: number, confirmation_code: string) {
    const result = await this.repository.update(userId, { confirmation_code });
    return result;
  }
}
