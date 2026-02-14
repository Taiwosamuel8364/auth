import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { PhotoController } from './photo/photo.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    PhotoModule,
  ],
  controllers: [AppController, AuthController, PhotoController],
  providers: [AppService],
})
export class AppModule {}
