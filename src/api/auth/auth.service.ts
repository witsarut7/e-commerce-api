import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login-dto';
import { instanceToPlain } from 'class-transformer';
import { CommonGroups } from 'src/database/enum/common-groups.enum';
import { UserGroups } from 'src/database/enum/user-groups.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(body: LoginDto) {
    try {
      const { username, password } = body;

      const user = await this.userService.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new BadRequestException('data not found.');
      }

      const checkpass = await this.userService.compareHashPassword(
        password,
        user.password,
      );

      if (!checkpass) {
        throw new BadRequestException('password incorrecct.');
      }

      return instanceToPlain(user, {
        groups: [CommonGroups.COMMON_VIEW, UserGroups.USER_LOGIN],
      });
    } catch (error) {
      throw error;
    }
  }

  async login(body: LoginDto) {
    try {
      const user = await this.validateUser(body);
      const payload = {
        data: {
          id: user.id,
          username: user.username,
          name: user.firstName + ' ' + user.lastName,
        },
      };

      const accessToken = this.jwtService.sign(payload);
      return {
        payload: payload,
        accessToken: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
