---
date: 2019-01-08T21:07:13+01:00
title: "schema中忘记定义使用到的字段"
weight: 42
keywords:
- sequelize
description : "schema中忘记定义使用到的字段"
---

schema中忘记定义使用到的字段

## 关于 model 中方法指定的 字段，而未在 schema 中定义时的报错

示例：

在 `model/product_category.js` 中指定：

```
  ProductCategory.saveModify = async productCategory => {
    const { id, parent_id, name, level, product_count, product_unit, nav_status, show_status, sort, icon, keywords, description } = productCategory;
    const result = await ProductCategory.update({ name, parent_id, level, product_count, product_unit, nav_status, show_status, sort, icon, keywords, description }, { where: { id } });
    return id;
  };
```

但是，在 `schema/product_category.js` 中未写入：

```
    sort: {
      type: INTEGER(1),
      allowNull: true,
    },
```

则报错如下：

```
2019-08-29 12:53:27,810 WARN 13862 [-/192.168.168.165/-/26ms POST /productCategory/update/65] nodejs.Error: 保存失败，请刷新后重试！
    at checkUpdate (/home/ubuntu/code-server/chat/chat-admin-server/app/extend/application.js:92:21)
    at Function.ProductCategory.saveModify (/home/ubuntu/code-server/chat/chat-admin-server/app/model/product_category.js:33:5)
status: 422
pid: 13862
hostname: utuntu
```

前端返回：

```
{
  "code": 500,
  "message": "保存失败，请刷新后重试！"
}
```
