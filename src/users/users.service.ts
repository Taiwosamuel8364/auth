import { ConflictException, Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username: user.username },
    });

    if (existingUser) {
      throw new ConflictException();
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
