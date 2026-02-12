import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { photoProviders } from './photo.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [...photoProviders, PhotoService],
  imports: [DatabaseModule],
  exports: [PhotoService],
})
export class PhotoModule {}
