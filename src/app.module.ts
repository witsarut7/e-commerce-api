import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ApiModule } from './api/api.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
})
export class AppModule {}
