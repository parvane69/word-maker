import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: 'redis-container',
        port: 6379,
        //url: process.env.REDIS_URL,
      },
    }),
  ],
})
export class TokenModule {}
