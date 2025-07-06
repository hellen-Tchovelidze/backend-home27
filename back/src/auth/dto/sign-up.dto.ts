import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator"


export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    fullName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string
}