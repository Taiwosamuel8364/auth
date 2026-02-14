import { Controller, Get, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PhotoResponseDto } from './dto/photo-response.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getPhoto(): Promise<PhotoResponseDto[]> {
    return this.photoService.findAll();
  }
}
