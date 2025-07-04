import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.shecma';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { QueryParamsDto } from './dto/quary-params.dto';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectModel('product') private readonly productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    const count = await this.productModel.countDocuments();
    // await this.productModel.deleteMany({ price: 220 });
    // await this.productModel.deleteMany();
    await this.productModel.updateMany(
      { isguarantee: { '$exists': false } },
      {
        $set: {
          isguarantee: true,
        },
      },
    );


    if (count === 0) {
      const dataToInsert: any = [];
      for (let i = 0; i < 200; i++) {
        dataToInsert.push({
          name: faker.commerce.product(),
          price: faker.number.int({ min: 10, max: 300 }),
          desc: faker.commerce.productDescription(),
          quantity: faker.number.int({ min: 1, max: 20 }),
          imgURL: faker.image.url(),
          category: faker.commerce.department(),
        });
      }
      await this.productModel.insertMany(dataToInsert);
      console.log(dataToInsert.slice(0, 5));
    }
  }
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // async findAll() {
  //   const products = await this.productModel.find({price:{$eq : 170}});
  //  return products
  // }

  async findAll({
    name,
    priceFrom,
    priceTo,
    isStock,
    page,
    take,
  }: QueryParamsDto) {
    const filter: any = {};
    //{price: {$gte: 20, $lte: 50}}
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    if (isStock) {
      filter.quantity = { $ne: 10 };
    }
    if (priceFrom) {
      filter.price = { ...filter.price, $gte: priceFrom };
    }
    if (priceTo) {
      filter.price = { ...filter.price, $lte: priceTo };
    }
    console.log(filter, 'filter');
    const products = await this.productModel.aggregate([
      {
        $match: { price: { $gte: 30 } },
      },
      { $limit: 50 },
      { $group: { _id: '$category', totalPrice: { $max: '$price' } } },
    ]);
    // .find()
    // .limit(30);
    // .find({
    //   role: { $in: ['admin', 'editor', 'user'] },
    // });
    // .find(filter)
    // .skip((page - 1) * take)
    // .limit(take)

    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
