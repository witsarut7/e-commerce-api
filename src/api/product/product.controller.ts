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
import { ProductService } from './product.service';
import { ProductCreate } from './dto/product-create.dto';
import { ProductUpdate } from './dto/product-update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { instanceToPlain } from 'class-transformer';
import { CommonGroups } from 'src/database/enum/common-groups.enum';
import { ProductGroups } from 'src/database/enum/product-groups.enum';
import { ProductFilter } from './dto/product-filter.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async created(@Body() body: ProductCreate) {
    try {
      const product = await this.productService.created(body);
      const data = instanceToPlain(product, {
        groups: [CommonGroups.COMMON_VIEW, ProductGroups.PRODUCT_LIST],
      });

      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(@Query() filter: ProductFilter) {
    try {
      const { limit, page, getPageCount } = filter;
      const [products, count] = await this.productService.findAllAndCounted(
        filter,
      );

      const data = instanceToPlain(products, {
        groups: [CommonGroups.COMMON_VIEW, ProductGroups.PRODUCT_LIST],
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
      const product = await this.productService.findOne({
        where: { id: id },
      });

      if (!product) {
        throw new BadRequestException('data not found.');
      }

      const data = instanceToPlain(product, {
        groups: [CommonGroups.COMMON_VIEW, ProductGroups.PRODUCT_VIEW],
      });
      return { data: data };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProductUpdate,
  ) {
    try {
      const product = await this.productService.updated(id, body);
      const data = instanceToPlain(product, {
        groups: [CommonGroups.COMMON_VIEW, ProductGroups.PRODUCT_LIST],
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
      const product = await this.productService.findOne({
        where: { id: id },
      });

      if (!product) {
        throw new BadRequestException('data not found.');
      }

      await product.softRemove();
      return {
        data: {},
        message: 'สำเร็จ',
      };
    } catch (error) {
      throw error;
    }
  }
}
