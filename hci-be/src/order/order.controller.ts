import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { OrderService } from './order.service';
import { OrderQueryParsePipe } from './pipes/order-query-parse.pipe';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getOrders(
    @Query(OrderQueryParsePipe)
    query: {
      skip?: number;
      take?: number;
    },
  ) {
    return this.orderService.getOrders(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id') orderId: string) {
    return this.orderService.getOrder(orderId);
  }

  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(dto);
  }

  @Patch(':id')
  updateOrderById(@Param('id') orderId: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.updateOrderById(orderId, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteOrderById(@Param('id') orderId: string) {
    return this.orderService.deleteOrderById(orderId);
  }
}
