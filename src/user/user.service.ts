import { SendOtpDto } from './dto/SendOtpDto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  getInactiveUsers(): Promise<User[]> {
    return this.repository.getInactiveUsers();
  }

  update(userId: number, data) {
    return this.repository.update(userId, data);
  }

  updateByEmail(body: SendOtpDto, ip: string, count: number) {
    const { email, otp } = body;
    return this.repository.updateByEmail(email, { otp, ip, count });
  }

  findAllByIsActive(isActive: boolean): Promise<User[]> {
    return this.repository.findAllByIsActive(isActive);
  }

  findAllUser(): Promise<any> {
    return this.repository.findAll();
  }
}
