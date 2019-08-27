---
date: 2019-01-08T21:07:13+01:00
title: "cors"
weight: 31
keywords:
- 学习笔记
- cors
description : "cors"
---

cors

## 跨域

- 当浏览器直接输入 请求`http://192.168.168.137:7001/product/list?pageNum=1&pageSize=20` 能够成功返回结果。
- 而在 vue 工程中，会提示：

```
Referer:  http://localhost:3000/
```

时，说明是出现了跨域问题。


- https://segmentfault.com/q/1010000016285309
- https://github.com/eggjs/egg/issues/725#issuecomment-524342451

### 解决

#### package.json

```bash
npm i --save egg-cors 
```

#### config/config.default.json 

```
    cors: {
      origin:'http://localhost:3000',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    }
```