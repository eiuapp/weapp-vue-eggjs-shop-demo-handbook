---
date: 2019-01-08T21:07:13+01:00
title: "sequelize"
weight: 1
keywords:
- sequelize
description : "sequelize"
---

关于 config/config.default.js 中的 sequelize 中的 define 配置说明

## 去除 createdAt， updatedAt

如何，去除掉  INSERT INTO `pms_product_category` (`id`,`parent_id`,`createdTime`,`lastModifiedTime`) VALUES (?,?,?,?)   中的 ,`createdTime`,`lastModifiedTime`  

因为，我实际上新建立的表，没有 ,`createdTime`,`lastModifiedTime` 字段


![](https://raw.githubusercontent.com/eiuapp/img/master/img/QQ%E5%9B%BE%E7%89%8720190816154509.jpg)

```
        createdAt: 'created_time',
        updatedAt: 'last_modified_time',
```

变成 


```
        // createdAt: false,
        // updatedAt: false,
```

## 数据库中的字段名使用下划线

```
        underscored: true,
```

## createdAt, updatedAt 与 getterMethods 配合

```
        createdAt: 'created_time',
        updatedAt: 'last_modified_time',
        getterMethods: {
          createdTime() {
            const createdTime = this.getDataValue('created_time');
            // console.log(createdTime)
            if (createdTime) {
              return fecha.format(createdTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
          lastModifiedTime() {
            const lastModifiedTime = this.getDataValue('last_modified_time');
            // console.log(lastModifiedTime)
            if (lastModifiedTime) {
              return fecha.format(lastModifiedTime, 'YYYY-MM-DD HH:mm:ss');
            }
          },
        },
```

如上，就是配置的是数据库中表中的 created_time 与 last_modified_time 字段

## 