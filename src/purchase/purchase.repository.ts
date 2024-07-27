import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { purchases } from '../base/database/entities/purchase.entity';
import { PurchaseSaveInputDto } from './purchase.dto';

@Injectable()
export class PurchasesRepository {
  constructor(
    @InjectRepository(purchases)
    private readonly repository: Repository<purchases>,
  ) {}
  async save(purchase: PurchaseSaveInputDto): Promise<purchases> {
    const result = await this.repository.save(purchase);
    return result;
  }
}
