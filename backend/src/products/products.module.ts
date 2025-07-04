import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import mongoose, { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.shecma';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ProductSchema, name: 'product' }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
