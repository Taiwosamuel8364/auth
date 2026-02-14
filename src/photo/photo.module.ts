import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { DatabaseModule } from 'src/database/database.module';
import { PhotoController } from './photo.controller';

@Module({
  providers: [PhotoService],
  imports: [DatabaseModule],
  exports: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
