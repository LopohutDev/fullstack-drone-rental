import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsDateString()
  @IsNotEmpty()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  locationId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  price?: number;
}
