import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { slugifyString } from 'src/helpers/helperFunctions';
import { ImageService } from 'src/image/image.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async getItems(query: { skip?: number; take?: number; search: string }) {
    const { skip, take, search } = query;
    const count = await this.prisma.item.count({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
          {
            location: {
              name: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          },
          {
            location: {
              city: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          },
        ],
      },
    });
    const publicItems = await this.prisma.item.findMany({
      where: {
        isActive: true,
        OR: [
          {
            name: {
              contains: search || '',
              mode: 'insensitive',
            },
          },
          {
            location: {
              name: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          },
          {
            location: {
              city: {
                contains: search || '',
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      select: {
        id: true,
        slug: true,
        name: true,
        dateTime: true,
        imageId: true,
        image: true,
        description: true,
        locationId: true,
        price: true,
        location: {
          select: {
            name: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            country: true,
          },
        },
        isActive: true,
      },
      skip,
      take,
    });

    return {
      data: publicItems,
      skip,
      take,
      count,
    };
  }

  async getPublicItemById(itemId: string) {
    let event: any | undefined;
    event = await this.prisma.item.findFirst({
      where: {
        slug: itemId,
      },
      include: {
        image: true,
      },
    });
    if (!event) {
      event = await this.prisma.item.findFirst({
        where: {
          id: itemId,
        },
        include: {
          image: true,
          location: true,
        },
      });
    }
    if (!event) {
      throw new NotFoundException('Event Not found.');
    }
    return event;
  }

  async getItemById(itemId: string) {
    const event = await this.prisma.item.findFirst({
      where: {
        id: itemId,
      },
      include: {
        image: true,
        location: true,
      },
    });
    return event;
  }

  async createItem(userId: string, dto: CreateItemDto) {
    const { ...data } = dto;

    const event = await this.prisma.item.create({
      data: {
        slug: slugifyString(dto.name),
        ...data,
      },
    });

    return this.getItemById(event.id);
  }

  async updateItemById(eventId: string, dto: UpdateItemDto) {
    const event = await this.prisma.item.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) throw new ForbiddenException('Access to resources denied');

    return await this.prisma.item.update({
      where: {
        id: eventId,
      },
      data: {
        ...dto,
      },
    });
  }

  async uploadItemPhoto(itemId: string, file: Express.Multer.File) {
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId,
      },
    });
    if (!item) throw new ForbiddenException('Access to resources denied');

    const image = this.imageService.createImage({
      type: 'item',
      fileName: file.filename,
      storage: 'localStorage',
      mimeType: file.mimetype,
    });

    console.log(await image);

    return await this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...item,
        imageId: (await image).id,
      },
      include: {
        image: true,
      },
    });
  }

  async deleteItemById(itemId: string) {
    const event = await this.prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!event) throw new ForbiddenException('Access to resources denied');

    await this.prisma.item.delete({
      where: {
        id: itemId,
      },
    });
  }
}
