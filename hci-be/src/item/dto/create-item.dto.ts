import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  locationId: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;

  @IsNumber()
  @IsOptional()
  price?: number;
}
