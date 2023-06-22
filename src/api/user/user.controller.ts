import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { instanceToPlain } from 'class-transformer';
import { CommonGroups } from 'src/database/enum/common-groups.enum';
import { UserGroups } from 'src/database/enum/user-groups.enum';
import { UserUpdate } from './dto/user-update.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IJwtUserDecorator, JwtDecorator } from 'src/shared/jwt.decorator';
import { OrderGroups } from 'src/database/enum/order-groups.enum';
import { CommonFilter } from 'src/shared/common-filter';
import { ProductGroups } from 'src/database/enum/product-groups.enum';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-order-history')
  async findAll(@JwtDecorator() user: IJwtUserDecorator) {
    try {
      const users = await this.userService.findAllAndCounted(user);

      const data = instanceToPlain(users, {
        groups: [
          CommonGroups.COMMON_VIEW,
          OrderGroups.ORDER_VIEW,
          UserGroups.USER_VIEW,
          ProductGroups.PRODUCT_VIEW,
        ],
      });

      return {
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('get-profile')
  async findOne(@JwtDecorator() userId: IJwtUserDecorator) {
    try {
      const user = await this.userService.findOne({
        where: { id: userId?.data?.id },
      });

      if (!user) {
        throw new BadRequestException('data not found.');
      }

      const data = instanceToPlain(user, {
        groups: [CommonGroups.COMMON_VIEW, UserGroups.USER_VIEW],
      });
      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-profile')
  async update(
    @JwtDecorator() userId: IJwtUserDecorator,
    @Body() body: UserUpdate,
  ) {
    try {
      const user = await this.userService.updated(userId.data.id, body);
      const data = instanceToPlain(user, {
        groups: [CommonGroups.COMMON_VIEW, UserGroups.USER_LIST],
      });
      return {
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne({
        where: { id: id },
      });

      if (!user) {
        throw new BadRequestException('data not found.');
      }

      await user.softRemove();
      return {
        data: {},
        message: 'สำเร็จ',
      };
    } catch (error) {
      throw error;
    }
  }
}
