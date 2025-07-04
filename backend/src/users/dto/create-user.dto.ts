import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';



class Address {
  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  city: string;


  @IsOptional()
  @IsNumber()
  homeNumber: number;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNumber()
  age: number;

  address: Address;
}
