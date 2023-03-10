import { MarketItem } from '../../../../../src/domain/market/entity/market-item.entity';
import { MarketItemOption } from '../../../../../src/domain/market/entity/market-item-option.entity';
import { MarketItemOrderProvider } from '../../../../../src/domain/market/application/market-item-order.provider';
import { BadRequestException } from '../../../../../src/exceptions/bad-request.exception';

describe('market-item-order-provider', () => {
  const provider = new MarketItemOrderProvider();

  describe('calc total price', () => {
    it('500 + 100 = 600', () => {
      const item = new MarketItem();
      item.price = 500;

      const options = [];
      const option = new MarketItemOption();
      option.additionalPrice = 100;
      options.push(option);

      const totalPrice = provider.calcTotalPrice(item, options);

      expect(totalPrice).toEqual(600);
    });

    it('5000 - 500 = 4500', () => {
      const item = new MarketItem();
      item.price = 5000;

      const options = [];
      const option = new MarketItemOption();
      option.additionalPrice = -500;
      options.push(option);

      const totalPrice = provider.calcTotalPrice(item, options);

      expect(totalPrice).toEqual(4500);
    });

    it('total price is zero throw exception', () => {
      const item = new MarketItem();
      item.price = 500;

      const options = [];
      const option = new MarketItemOption();
      option.additionalPrice = -500;
      options.push(option);

      const when = () => provider.calcTotalPrice(item, options);

      expect(when).toThrow(BadRequestException);
    });
  });
});
