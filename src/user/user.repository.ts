import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getInactiveUsers(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.isActive = :active', { active: false })
      .getMany();
  }

  async findOne(data): Promise<User> {
    return this.userRepository.findOne(data);
  }

  async update(id: number, data) {
    return this.userRepository.update(id, data);
  }

  async updateByEmail(email: string, data: Partial<User>) {
    return this.userRepository.update({ email }, data);
  }

  async findAllByIsActive(isActive: boolean) {
    return this.userRepository.find({
      where: {
        isActive,
      },
    });
  }

  async findAll() {
    return this.userRepository.findAndCount();
  }
}
