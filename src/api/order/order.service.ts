import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderCreate } from './dto/order-create.dto';
import { OrderUpdate } from './dto/order-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IJwtUserDecorator } from 'src/shared/jwt.decorator';
import { OrderFilter } from './dto/order-filter.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}

  async created(body: OrderCreate, user: IJwtUserDecorator): Promise<Order> {
    try {
      const { productId, quantity, orderStatus } = body;
      const findProduct = await this.productService.findOne({
        where: { id: productId },
      });

      let totalPriceOfQuantity = quantity * Number(findProduct.price);

      const order = await this.orderRepository
        .create({
          totalPrice: totalPriceOfQuantity,
          quantity: quantity,
          orderStatus: orderStatus,
          product: findProduct,
          createdById: user?.data?.id,
        })
        .save();

      return order;
    } catch (error) {
      throw error;
    }
  }

  async findAllAndCounted(
    filter: OrderFilter,
    user: IJwtUserDecorator,
  ): Promise<[Order[], number]> {
    try {
      const {
        pagination,
        getOffset,
        limit,
        startDate,
        endDate,
        productId,
        orderStatus,
      } = filter;

      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.product', 'product')
        .leftJoinAndSelect('order.createdBy', 'createdBy');

      if (productId) {
        queryBuilder.andWhere('product.id = :id', {
          id: productId,
        });
      }

      if (user) {
        queryBuilder.andWhere('createdBy.id = :id', {
          id: user.data.id,
        });
      }

      if (orderStatus) {
        queryBuilder.andWhere('order.orderStatus = :orderStatus', {
          orderStatus: orderStatus,
        });
      }

      if (startDate && endDate) {
        queryBuilder.andWhere(
          'order.createdAt BETWEEN :startDate AND :endDate',
          { startDate, endDate },
        );
      }

      if (pagination) {
        queryBuilder.skip(getOffset(filter)).take(limit);
      }

      queryBuilder.orderBy('order.updatedAt', 'DESC');
      return await queryBuilder.getManyAndCount();
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindOneOptions<Order>): Promise<Order> {
    return await this.orderRepository.findOne(options);
  }

  async updated(id: number, body: OrderUpdate) {
    try {
      const order = await this.findOne({ where: { id: id } });
      const { productId, quantity, orderStatus } = body;

      if (!order) {
        throw new BadRequestException('data not found.');
      }

      const findProduct = await this.productService.findOne({
        where: { id: productId },
      });

      let totalPriceOfQuantity = quantity * Number(findProduct.price);

      const _order = await this.orderRepository
        .merge(order, {
          totalPrice: totalPriceOfQuantity,
          quantity: quantity,
          orderStatus: orderStatus,
          product: findProduct,
        })
        .save();
      return _order;
    } catch (error) {
      throw error;
    }
  }
}
