
- controller 不能重用，不写复杂业务逻辑。
- service 可重用，主写业务逻辑。
- model 可重用，主写数据库逻辑。

## service

尽可能把业务逻辑写入 service，所以:

- 共性的，写入 `app/extend/service.js`

## model

model与数据库打交道，所以:

- 共性的，写入 `app/extend/model.js`


## 参考

- `app/service/pms/pms_trade_option.js` 下的 `brokerGetListAndCountAll`