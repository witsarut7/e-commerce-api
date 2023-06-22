import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCreate } from './dto/user-create.dto';
import { UserUpdate } from './dto/user-update.dto';
import { CommonFilter } from 'src/shared/common-filter';
import { IJwtUserDecorator } from 'src/shared/jwt.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async compareHashPassword(
    password: string,
    hashPassword: string,
  ): Promise<Boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async getHashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async created(body: UserCreate): Promise<User> {
    try {
      const { password, ...userDto } = body;

      if (body.username) {
        const findDuplicateUsername = await this.userRepository.findOne({
          where: { username: body.username },
        });

        if (findDuplicateUsername) {
          throw new BadRequestException('duplicate username in the system.');
        }
      }

      const hashPassword = await this.getHashPassword(password);

      const user = await this.userRepository
        .create({
          ...userDto,
          password: hashPassword,
        })
        .save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return await this.userRepository.findOne(options);
  }

  async updated(id: number, body: UserUpdate) {
    try {
      const user = await this.findOne({ where: { id: id } });

      if (!user) {
        throw new BadRequestException('data not found.');
      }

      const _user = await this.userRepository
        .merge(user, {
          ...body,
        })
        .save();
      return _user;
    } catch (error) {
      throw error;
    }
  }

  async findAllAndCounted(user: IJwtUserDecorator): Promise<User> {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.orders', 'orders')
        .leftJoinAndSelect('orders.product', 'product')
        .andWhere('user.id = :id', { id: user.data.id });

      queryBuilder.orderBy('user.updatedAt', 'DESC');
      return await queryBuilder.getOne();
    } catch (error) {
      throw error;
    }
  }
}
