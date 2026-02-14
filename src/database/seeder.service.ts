import { Injectable, Inject, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Photo } from '../photo/entities/photo.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    // Seed users
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      await this.userRepository.save([
        {
          name: 'John Doe',
          username: 'johndoe',
          password: 'password123',
        },
        {
          name: 'Jane Smith',
          username: 'janesmith',
          password: 'password123',
        },
        {
          name: 'Bob Wilson',
          username: 'bobwilson',
          password: 'password123',
        },
      ]);
      console.log('Users seeded successfully!');
    }

    // Seed photos
    const photoCount = await this.photoRepository.count();
    if (photoCount === 0) {
      await this.photoRepository.save([
        {
          name: 'Mountain Landscape',
          description: 'Beautiful mountain view at sunset',
          filename: 'mountain.jpg',
          views: 0,
          isPublished: true,
        },
        {
          name: 'Ocean Sunset',
          description: 'Sunset over the ocean',
          filename: 'ocean.jpg',
          views: 0,
          isPublished: true,
        },
        {
          name: 'Forest Trail',
          description: 'Path through the forest',
          filename: 'forest.jpg',
          views: 0,
          isPublished: true,
        },
        {
          name: 'City Lights',
          description: 'Night cityscape',
          filename: 'city.jpg',
          views: 0,
          isPublished: true,
        },
        {
          name: 'Desert Dunes',
          description: 'Golden sand dunes',
          filename: 'desert.jpg',
          views: 0,
          isPublished: true,
        },
      ]);
      console.log('Photos seeded successfully!');
    }
  }
}
