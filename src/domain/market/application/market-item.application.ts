import { Injectable } from '@nestjs/common';
import { MarketItemService } from '../service/market-item.service';
import { MarketItemCategoryService } from '../service/market-item-category.service';
import { MarketItemConverter } from './market-item.converter';
import { MarketItemCategoryDto } from '../dto/market-item-category.dto';
import { MarketItemSearchRequest } from '../dto/market-item-search.request';
import { MarketItemSaveRequest } from '../dto/market-item-save.request';
import { AwsFileUploadService } from '../../../aws/aws-file-upload.service';
import { MarketItemValidator } from './market-item.validator';
import { DataSource } from 'typeorm';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { MarketItemOneDto } from '../dto/market-item-one.dto';
import { MarketItemStatus } from '../entity/market-item.type';
import { MarketItemListDto } from '../dto/market-item-list.dto';

@Injectable()
export class MarketItemApplication {
  constructor(
    private readonly service: MarketItemService,
    private readonly categoryService: MarketItemCategoryService,
    private readonly converter: MarketItemConverter,
    private readonly validator: MarketItemValidator,
    private readonly awsFileUploadService: AwsFileUploadService,
    private readonly dataSource: DataSource,
  ) {}

  async getCategories(): Promise<MarketItemCategoryDto[]> {
    const categories = await this.categoryService.findCategories();
    return this.converter.convertCategories(categories);
  }

  async getItems(dto: MarketItemSearchRequest): Promise<MarketItemListDto[]> {
    const items = await this.service.getAvailableItems(
      dto.categoryId,
      dto.page,
      dto.size,
    );
    return this.converter.getItems(items);
  }

  async getItem(id: number): Promise<MarketItemOneDto> {
    const item = await this.service.findByIdOrThrow(id);
    if (item.status === MarketItemStatus.HIDDEN) {
      throw new BadRequestException('closed item');
    }

    return this.converter.getItem(item);
  }

  async addItem(dto: MarketItemSaveRequest, options: string[]) {
    const convertOptions = this.validator.saveValidate(dto, options);
    const keys = await this.awsFileUploadService.uploadMultiple(
      'files/market',
      dto.files,
    );
    const newItem = dto.toItem(keys);
    const entityOptions = convertOptions.map((option) => option.toOption());
    newItem.options = Promise.resolve(entityOptions);
    await this.dataSource.transaction(async () => {
      await this.service.insert(newItem);
    });
  }

  async modifyStatus(id: number, status: MarketItemStatus) {
    await this.dataSource.transaction(async () => {
      const item = await this.service.findByIdOrThrow(id);
      item.status = status;
      await this.service.save(item);
    });
  }
}
