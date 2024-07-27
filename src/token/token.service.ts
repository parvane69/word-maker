import { Injectable, Inject } from '@nestjs/common';
import {
  InjectRedis,
  DEFAULT_REDIS_NAMESPACE,
  RedisService,
} from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class TokenService {
  private client: Redis;

  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly redisService: RedisService,
  ) {
    this.client = this.redisService.getClient();
  }
  async addToBlacklist(token: string) {
    await this.redis.set(token, 'blacklisted');
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.client.get(token);
    return result === 'blacklisted';
  }
}
