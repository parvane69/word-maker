import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { bazar } from '../../database/entities/bazar.entity';
import { BazarLoginInputDto } from './bazar.dto';

@Injectable()
export class BazarRepository {
  constructor(
    @InjectRepository(bazar)
    private readonly repository: Repository<bazar>,
  ) {}
  async save(dto: BazarLoginInputDto): Promise<bazar> {
    const result = await this.repository.save(dto);
    return result;
  }
  async updateRefreshToken(bazarId: number, access_token: string) {
    const result = await this.repository.update(bazarId, { access_token });
    return result;
  }
  async getLast(): Promise<bazar> {
    try {
      const result = await this.repository.find({
        order: {
          id: 'DESC',
        },
        take: 1,
      });

      return result[0];
    } catch (error) {
      console.log('error', error);
    }
  }
}
