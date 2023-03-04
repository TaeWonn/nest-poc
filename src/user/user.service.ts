import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async getUser(id: number): Promise<User> {
    return this.repository.findOneBy({ id });
  }

  async findNickname(nickname: string): Promise<User[]> {
    return this.repository.findBy({ nickname });
  }

  async save(user: User) {
    await this.repository.insert(user);
  }
}
