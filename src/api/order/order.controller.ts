import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreate } from './dto/order-create.dto';
import { OrderUpdate } from './dto/order-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IJwtUserDecorator, JwtDecorator } from 'src/shared/jwt.decorator';
import { instanceToPlain } from 'class-transformer';
import { CommonGroups } from 'src/database/enum/common-groups.enum';
import { OrderGroups } from 'src/database/enum/order-groups.enum';
import { OrderFilter } from './dto/order-filter.dto';
import { ProductGroups } from 'src/database/enum/product-groups.enum';
import { UserGroups } from 'src/database/enum/user-groups.enum';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async created(
    @Body() body: OrderCreate,
    @JwtDecorator() user: IJwtUserDecorator,
  ) {
    try {
      const order = await this.orderService.created(body, user);
      const data = instanceToPlain(order, {
        groups: [CommonGroups.COMMON_VIEW, OrderGroups.ORDER_LIST],
      });

      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(
    @Query() filter: OrderFilter,
    @JwtDecorator() user: IJwtUserDecorator,
  ) {
    try {
      const { limit, page, getPageCount } = filter;
      const [orders, count] = await this.orderService.findAllAndCounted(
        filter,
        user,
      );

      const data = instanceToPlain(orders, {
        groups: [
          CommonGroups.COMMON_VIEW,
          OrderGroups.ORDER_LIST,
          ProductGroups.PRODUCT_LIST,
          UserGroups.USER_LIST,
        ],
      });

      return {
        data: data,
        count: count,
        page: page,
        limit: limit,
        pageCount: getPageCount(limit, count),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const order = await this.orderService.findOne({
        where: { id: id },
        relations: ['product', 'createdBy'],
      });

      if (!order) {
        throw new BadRequestException('data not found.');
      }

      const data = instanceToPlain(order, {
        groups: [
          CommonGroups.COMMON_VIEW,
          OrderGroups.ORDER_VIEW,
          ProductGroups.PRODUCT_VIEW,
          UserGroups.USER_VIEW,
        ],
      });
      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: OrderUpdate,
  ) {
    try {
      const order = await this.orderService.updated(id, body);
      const data = instanceToPlain(order, {
        groups: [CommonGroups.COMMON_VIEW, OrderGroups.ORDER_LIST],
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
      const order = await this.orderService.findOne({
        where: { id: id },
      });

      if (!order) {
        throw new BadRequestException('data not found.');
      }

      await order.softRemove();
      return {
        data: {},
        message: 'สำเร็จ',
      };
    } catch (error) {
      throw error;
    }
  }
}
