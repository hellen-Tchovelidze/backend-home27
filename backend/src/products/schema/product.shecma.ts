import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import e from 'express';

enum Role {
  "ADMIN" = "admin",
  "EDITOR" = "editor",
  "USER" ="user"
}
@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  desc: string;

  @Prop({
    type: String,
    required: true,
  })
  category: string;

  @Prop({
    type: Boolean,
   
  })
  isguarantee: boolean;

  @Prop({
    enum: Role,
    required: true,
    default: Role.USER
  })
  role: Role;
  @Prop({
    type: Number,
    required: true,
    index:true
  })
  price: number;
  @Prop({
    type: String,
    required: true,
  })
  imgURL: string;
    @Prop({
        type: Number,
        required: true,
    })
    quantity: number;
}


export const ProductSchema = SchemaFactory.createForClass(Product);