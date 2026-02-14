import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { databaseProviders } from './database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  providers: [SeederService, ...databaseProviders],
  exports: [SeederService, ...databaseProviders],
})
export class DatabaseModule {}
