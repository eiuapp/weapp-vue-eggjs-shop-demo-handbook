---
date: 2019-01-08T21:07:13+01:00
title: "sequelize findOne"
weight: 41
keywords:
- sequelize
description : "sequelize"
---

# findOne 使用了别名后，返回时找不到别名

```javascript
const {name} = await app.model.Company.findOne({
  where: {
    id: company_id
  },
  attributes: [ 'name' ]
})
const company_name = name;
console.log(`****************************** company_name: ${JSON.stringify(company_name)}}`)
```
上面的是可以的。但是，下面的使用别名的方式，会报 `undefined`.

```javascript
const {company_name} = await app.model.Company.findOne({
  where: {
    id: company_id
  },
  attributes: [['name', 'company_name']]
})
console.log(`****************************** company_name: ${JSON.stringify(company_name)}}`)
```

