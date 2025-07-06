import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryParamsDto {
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    isStock?: string

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    priceFrom?: number

    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    priceTo?: number



    @IsOptional()
    @Transform(({value}) => Math.max(Number(value), 1))
    @IsNumber()
    page: number = 1

    @IsOptional()
    @Transform(({value}) => Math.min(value, 30))
    @IsNumber()
    take: number = 30
}