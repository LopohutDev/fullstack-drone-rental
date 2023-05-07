import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ItemQueryParsePipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}
  async transform({ skip, take, ...value }: any) {
    return {
      skip: skip ? parseInt(skip) : skip,
      take: take ? parseInt(take) : skip,
      ...value,
    };
  }
}
