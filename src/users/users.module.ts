import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [DatabaseModule],
})
export class UsersModule {}
