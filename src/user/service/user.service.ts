import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../model/user.entity';
import { User } from '../model/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User) {
    return await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (!users)
      throw new HttpException('not users found', HttpStatus.NOT_FOUND);
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new HttpException(
        'User with this Id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async findOneByemail(email: string) {
    return await this.userRepository.findOne({
      where: [{ email }],
    });
  }

  async update(id: string, user: User) {
    const registeredUser = await this.findOne(id);
    if (!registeredUser)
      throw new HttpException(
        'User with this Id does not exist',
        HttpStatus.NOT_FOUND,
      );
    return await this.userRepository.update(id, user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
