import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema()
class Address {
  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: Number,
  })
  homeNumber: number;

  @Prop({
    type: String,
  })
  street: number;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({
    type: Number,
    required: true,
  })
  age: number;

  @Prop({
    type: Boolean,
  })
  isAdult: boolean;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({
    type: [mongoose.Types.ObjectId],
    ref: 'post',
    default: [],
  })
  posts: mongoose.Types.ObjectId[];

  @Prop({
    type: Address,
  })
  address: Address;
}

export const userSchema = SchemaFactory.createForClass(User);
