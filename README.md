### NestJs  

```text
기존의 작성된 코드 중 최소한의 것 들만 모아서 typeorm + nestJs 바꿔 보는 플젝.
결제는 사용할 수 있는 코드가 없어서 toss 결제 붙여두었습니다.
```

### 실행

```text
실행시 `npm run start:local`로 실행해야 가능.
다른 profile은 미구현.

- 필요할 경우 .env.local 파일에 db정보로 띄우거나 바꾸시면됩니다!
```

### Module

- user
- market
- payment
- auth

### Project

- user & auth 
```text
사용자와 인증은 정말 최소한에 것만 만들어 두었습니다.
```

- market
```text
- market-item: 상품
- market-item-option: 상품 선택할 수 있는 옵션
- market-item-order: 주문
- market-item-order-option: 주문 할 때 선택한 옵션
```

- payment

```text
payment는 결제만 만들어 두었고, 시간이 부족해서 취소나 실패시 전략에 대해서는 적용 안했습니다!
```