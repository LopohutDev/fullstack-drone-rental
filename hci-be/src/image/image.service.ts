import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async createImage(dto: CreateImageDto) {
    return await this.prisma.image.create({
      data: dto,
    });
  }

  async deleteImage(imageId: string) {
    return await this.prisma.image.delete({
      where: {
        id: imageId,
      },
    });
  }
}
