import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OrderType } from '@prisma/client';
import { Type } from 'class-transformer';

class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  itemId: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsEnum(OrderType)
  @IsOptional()
  type: OrderType;
}

export class UserCreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  orders: OrderDto[];
}
