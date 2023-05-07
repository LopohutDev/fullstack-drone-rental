import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageService } from './image.service';

@Global()
@Module({
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
