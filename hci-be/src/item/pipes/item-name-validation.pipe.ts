import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ItemNameValidationPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}
  async transform(value: any) {
    const event = await this.prisma.item.findUnique({
      where: {
        name: value.name,
      },
    });
    if (event) {
      throw new BadRequestException({
        message: ['Name is already taken.'],
      });
    }
    return value;
  }
}
