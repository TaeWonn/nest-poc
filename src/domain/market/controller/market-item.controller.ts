import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MarketItemCategoryDto } from '../dto/market-item-category.dto';
import { MarketItemApplication } from '../application/market-item.application';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemSearchRequest } from '../dto/market-item-search.request';
import { MarketItemSaveRequest } from '../dto/market-item-save.request';
import { MarketItemStatusRequest } from '../dto/market-item-status.request';
import { MarketItemOneDto } from '../dto/market-item-one.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('api/v1/market')
export class MarketItemController {
  constructor(private readonly application: MarketItemApplication) {}

  @Get('/categories')
  async getCategories(): Promise<MarketItemCategoryDto[]> {
    return await this.application.getCategories();
  }

  @Get('/items')
  async getItems(
    @Query() param: MarketItemSearchRequest,
  ): Promise<MarketItem[]> {
    return await this.application.getItems(param);
  }

  @Get('/items/:id')
  async getItem(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MarketItemOneDto> {
    return await this.application.getItem(id);
  }

  @Post('/items')
  @FormDataRequest()
  async registerItem(@Body() dto: MarketItemSaveRequest) {
    await this.application.addItem(dto);
  }

  @Put('/items/status/:id')
  async modifyStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: MarketItemStatusRequest,
  ) {
    await this.application.modifyStatus(id, dto.status);
  }
}
