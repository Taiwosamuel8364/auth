import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.userRepository.count();

    if (count > 0) {
      console.log('Database already seeded');
      return;
    }

    const users = [
      { email: 'admin@example.com', password: 'password123' },
      { email: 'user@example.com', password: 'password123' },
    ];

    await this.userRepository.save(users);
    console.log('Database seeded successfully');
  }
}
