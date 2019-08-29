---
date: 2019-01-08T21:07:13+01:00
title: "scripts"
weight: 41
keywords:
- 学习笔记
- scripts
description : "scripts"
---

## 单个生成 schema 中的 js 文件

需要手工复制到 schema 中的 js 文件中去

### 生成 schema 下的 return

```bash
node ./model.js
```

### 生成 service 下的 attributes

```bash
node ./field.js
```

## 批量生成 schema 中的 js 文件

### chart

```
dot -Tpng -o test.png schema.dot
```

### startup 

```bash
./schema.sh ./test.txt
```