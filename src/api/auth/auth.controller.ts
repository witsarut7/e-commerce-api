import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { UserCreate } from '../user/dto/user-create.dto';
import { UserService } from '../user/user.service';
import { instanceToPlain } from 'class-transformer';
import { CommonGroups } from 'src/database/enum/common-groups.enum';
import { UserGroups } from 'src/database/enum/user-groups.enum';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() body: UserCreate) {
    try {
      const user = await this.userService.created(body);
      const data = instanceToPlain(user, {
        groups: [CommonGroups.COMMON_VIEW, UserGroups.USER_LIST],
      });

      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      return await this.authService.login(body);
    } catch (error) {
      throw error;
    }
  }
}
