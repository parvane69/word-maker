import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeedsService } from './seeds.service';

@Controller('seeds')
@ApiTags('Seeds')
export class SeedsController {
  constructor(private seedsService: SeedsService) {}
  @Get('/run-seed')
  async runSeeds(): Promise<void> {
    //query reset identity => SELECT setval(pg_get_serial_sequence('products', 'id'), coalesce(MAX(id), 1)) from categories;
    await this.seedsService.saveProducts();
  }
}
