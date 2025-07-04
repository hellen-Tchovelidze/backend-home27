import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { mongo } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Schema()
class Address {
  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  HomeNumber: number;
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
    lowercase: true,
    required: true,
    unique: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    select: false,
  })
  password: string;
  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ enum: Role, default: Role.USER })
  role: Role.USER;

  @Prop({ type: Boolean, default: false })
  isAdult: boolean;
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

export const UserSchema = SchemaFactory.createForClass(User);
