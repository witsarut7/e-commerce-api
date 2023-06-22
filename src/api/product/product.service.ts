import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductCreate } from './dto/product-create.dto';
import { ProductUpdate } from './dto/product-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/database/entities/product.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ProductFilter } from './dto/product-filter.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async created(body: ProductCreate): Promise<Product> {
    try {
      const product = await this.productRepository.create(body).save();

      return product;
    } catch (error) {
      throw error;
    }
  }

  async findAllAndCounted(filter: ProductFilter): Promise<[Product[], number]> {
    try {
      const { pagination, getOffset, limit, productName } = filter;

      const queryBuilder = this.productRepository.createQueryBuilder('product');

      if (productName) {
        queryBuilder.andWhere('product.productName ilike :productName', {
          productName: `%${productName}%`,
        });
      }

      if (pagination) {
        queryBuilder.skip(getOffset(filter)).take(limit);
      }

      queryBuilder.orderBy('product.updatedAt', 'DESC');
      return await queryBuilder.getManyAndCount();
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindOneOptions<Product>): Promise<Product> {
    return await this.productRepository.findOne(options);
  }

  async updated(id: number, body: ProductUpdate) {
    try {
      const product = await this.findOne({ where: { id: id } });

      if (!product) {
        throw new BadRequestException('data not found.');
      }

      const _product = await this.productRepository
        .merge(product, {
          ...body,
        })
        .save();
      return _product;
    } catch (error) {
      throw error;
    }
  }
}
