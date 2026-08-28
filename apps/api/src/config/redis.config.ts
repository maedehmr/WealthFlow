import { ConfigService } from '@nestjs/config';
import { QueueOptions } from 'bullmq';

export const getRedisConfig = (configService: ConfigService): QueueOptions => ({
  connection: {
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    password: configService.get<string>('REDIS_PASSWORD') || undefined,
  },
});
