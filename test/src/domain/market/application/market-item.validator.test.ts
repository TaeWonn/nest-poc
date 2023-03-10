import { MarketItemValidator } from '../../../../../src/domain/market/application/market-item.validator';
import { MarketItemSaveRequest } from '../../../../../src/domain/market/dto/market-item-save.request';
import { BadRequestException } from '../../../../../src/exceptions/bad-request.exception';
import { MemoryStoredFile } from 'nestjs-form-data';
import { MarketItemOrderRequest } from '../../../../../src/domain/market/dto/market-item-order.request';
import { MarketItem } from '../../../../../src/domain/market/entity/market-item.entity';
import { MarketItemStatus } from '../../../../../src/domain/market/entity/market-item.type';
import { MarketItemOption } from '../../../../../src/domain/market/entity/market-item-option.entity';

describe('marketItemValidator', () => {
  const validator = new MarketItemValidator();

  describe('market-item-save', () => {
    it('files empty throw exception', () => {
      const dto = new MarketItemSaveRequest();
      dto.files = [];

      const when = () => {
        validator.saveValidate(dto, []);
      };
      expect(when).toThrow(BadRequestException);
    });

    it('options empty throw Exception ', () => {
      const dto = new MarketItemSaveRequest();
      dto.files = [new MemoryStoredFile()];
      const options = [];

      const when = () => {
        validator.saveValidate(dto, options);
      };
      expect(when).toThrow(BadRequestException);
    });

    it('success validate ', () => {
      const dto = new MarketItemSaveRequest();
      dto.files = [new MemoryStoredFile()];
      const options = ['{"name":null, "order":0 ,"additionalPrice":0}'];

      const when = () => {
        validator.saveValidate(dto, options);
      };
      expect(when).toThrow(BadRequestException);
    });

    const dto = new MarketItemSaveRequest();
    dto.files = [new MemoryStoredFile()];
    const options = ['{"name":"testName", "order":0 ,"additionalPrice":0}'];

    const convertOptions = validator.saveValidate(dto, options);

    expect(convertOptions).toHaveLength(1);
    expect(convertOptions[0].name).toEqual('testName');
  });

  describe('order validate', () => {
    it('item not found throw Exception', () => {
      const dto = new MarketItemOrderRequest();
      const when = () => {
        validator.orderValidate(dto, null, null);
      };

      expect(when).toThrow(BadRequestException);
    });

    it('item status not Available throw Exception', () => {
      const dto = new MarketItemOrderRequest();
      const item = new MarketItem();
      item.status = MarketItemStatus.HIDDEN;
      const options = [new MarketItemOption()];

      const when = () => {
        validator.orderValidate(dto, item, options);
      };

      expect(when).toThrow(BadRequestException);
    });

    it('filtered options is empty throw Exception', () => {
      const dto = new MarketItemOrderRequest();
      dto.marketItemOptionsIds = [1, 2];
      const item = new MarketItem();
      item.status = MarketItemStatus.AVAILABLE;
      const options = [new MarketItemOption()];

      const when = () => {
        validator.orderValidate(dto, item, options);
      };

      expect(when).toThrow(BadRequestException);
    });
  });
});
