import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  status?: OrderStatus;

  @IsNumber()
  @IsOptional()
  total?: number;
}
