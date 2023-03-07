import { Injectable } from '@nestjs/common';
import { MarketItemService } from '../service/market-item.service';
import { MarketItemCategoryService } from '../service/market-item-category.service';
import { MarketItemConverter } from './market-item.converter';
import { MarketItemCategoryDto } from '../dto/market-item-category.dto';
import { MarketItem } from '../entity/market-item.entity';
import { MarketItemSearchRequest } from '../dto/market-item-search.request';
import { MarketItemSaveRequest } from '../dto/market-item-save.request';
import { AwsFileUploadService } from '../../../aws/aws-file-upload.service';
import { MarketItemValidator } from './market-item.validator';
import { DataSource } from 'typeorm';
import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { MarketItemOneDto } from '../dto/market-item-one.dto';
import { MarketItemStatus } from '../entity/market-item.type';
import { MarketItemOptionService } from '../service/market-item-option.service';

@Injectable()
export class MarketItemApplication {
  constructor(
    private readonly service: MarketItemService,
    private readonly categoryService: MarketItemCategoryService,
    private readonly optionService: MarketItemOptionService,
    private readonly converter: MarketItemConverter,
    private readonly validator: MarketItemValidator,
    private readonly awsFileUploadService: AwsFileUploadService,
    private readonly dataSource: DataSource,
  ) {}

  async getCategories(): Promise<MarketItemCategoryDto[]> {
    const categories = await this.categoryService.findCategories();
    return this.converter.convertCategories(categories);
  }

  async getItems(dto: MarketItemSearchRequest): Promise<MarketItem[]> {
    return await this.service.getAvailableItems(
      dto.categoryId,
      dto.page,
      dto.size,
    );
  }

  async getItem(id: number): Promise<MarketItemOneDto> {
    const item = await this.service.findByIdOrThrow(id);
    if (item.status === MarketItemStatus.HIDDEN) {
      throw new BadRequestException('closed item');
    }

    return new MarketItemOneDto(item, await item.options);
  }

  async addItem(dto: MarketItemSaveRequest) {
    this.validator.saveValidate(dto);
    const keys = await this.awsFileUploadService.uploadMultiple(
      'files/market',
      dto.files,
    );
    const newItem = dto.toItem(keys);
    const options = dto.options.map((option) => option.toOption());
    await this.dataSource.transaction(async () => {
      await this.service.insert(newItem);
      await this.optionService.insertAll(options);
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
