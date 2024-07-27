import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
  ],
})
export class TokenModule {}
