
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNumber()
    age: number;
    @IsString()
    @IsNotEmpty()
  @Length(6, 20)
    password: string;
}
