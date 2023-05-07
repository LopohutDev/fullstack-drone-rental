import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { GetUser, Public } from 'src/auth/decorator';
import { multerOptions } from 'src/config/multer.config';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemService } from './item.service';
import { ItemNameValidationPipe } from './pipes/item-name-validation.pipe';
import { ItemQueryParsePipe } from './pipes/item-query-parse.pipe';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Public()
  @Get()
  getItems(
    @Query(ItemQueryParsePipe)
    query: {
      skip?: number;
      take?: number;
      search: string;
    },
  ) {
    return this.itemService.getItems(query);
  }

  @Public()
  @Get(':id')
  getItemById(@Param('id') eventId: string) {
    return this.itemService.getItemById(eventId);
  }

  @Post()
  createItem(
    @GetUser('organizationId') organizationId,
    @Body(ItemNameValidationPipe) dto: CreateItemDto,
  ) {
    return this.itemService.createItem(organizationId, dto);
  }

  @Patch(':id')
  updateItemById(@Param('id') eventId: string, @Body() dto: UpdateItemDto) {
    return this.itemService.updateItemById(eventId, dto);
  }

  @Patch(':id/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadItemPhoto(
    @Param('id') itemId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(itemId);
    return this.itemService.uploadItemPhoto(itemId, file);
  }

  @Delete(':id')
  deleteItemById(@Param('id') eventId: string) {
    return this.itemService.deleteItemById(eventId);
  }
}
