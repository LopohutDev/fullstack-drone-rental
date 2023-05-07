import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './auth/guard/at.guard';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { ImageModule } from './image/image.module';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './uploadedImages',
    }),
    PrismaModule,
    OrderModule,
    AuthModule,
    ItemModule,
    ImageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
