import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto, UserCreateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrders(query: { skip?: number; take?: number; search?: string }) {
    const { skip, take, search } = query;

    const count = await this.prisma.order.count({
      where: {
        OR: [
          {
            user: {
              email: {
                contains: search,
              },
            },
          },
          {
            id: {
              contains: search,
            },
          },
        ],
      },
    });
    let orders;
    if (skip !== undefined && take !== undefined) {
      orders = await this.prisma.order.findMany({
        where: {
          OR: [
            {
              user: {
                email: {
                  contains: search,
                },
              },
            },
            {
              id: {
                contains: search,
              },
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: {
            select: {
              email: true,
              id: true,
            },
          },
        },
        skip,
        take,
      });
      orders = orders.map((order) => {
        return {
          total: order.orderEventTickets.reduce((prev, curr) => {
            return prev + curr.total;
          }, 0),
          ...order,
        };
      });
    } else {
      orders = await this.prisma.order.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      orders = orders.map((order) => {
        return {
          total: order.orderEventTickets.reduce((prev, curr) => {
            return prev + curr.total;
          }, 0),
          ...order,
        };
      });
    }

    return {
      data: orders,
      count,
      skip,
      take,
    };
  }

  async getOrder(orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            lastName: true,
            firstName: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async createOrder(dto: CreateOrderDto) {
    return await this.createUserOrder({ orders: [dto] }, dto.userId, dto.type);
  }

  async createUserOrder(
    dto: UserCreateOrderDto,
    userId: string,
    type: OrderType,
  ) {
    for (const itemOrder of dto.orders) {
      const item = await this.prisma.item.findUnique({
        where: {
          id: itemOrder.itemId,
        },
      });
      if (!item) throw new NotFoundException('Item not found.');

      const order = await this.prisma.order.create({
        data: {
          userId,
          status: 'COMPLETED',
          type,
          quantity: itemOrder.quantity,
        },
      });

      const finalOrder = await this.prisma.order.findFirst({
        where: {
          id: order.id,
        },
        select: {
          id: true,
          quantity: true,
        },
      });

      await this.prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          total: item.price * finalOrder.quantity,
        },
      });

      return finalOrder;
    }
  }

  async updateOrderById(orderId: string, dto: UpdateOrderDto) {
    const order = await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: dto,
    });

    return order;
  }

  async deleteOrderById(orderId: string) {
    await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
  }
}
