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

## 服务器端header中添加Access-Control-Expose-Headers

### （背景）vue网络请求怎么获取 Response中的自定义header参数

因为后端，把 token 放在了 response.header 中的 'Authorization' 字段中, vuejs 正常无法获取，此时，

vue网络请求怎么获取 Response中的自定义header参数？

- http://tieba.baidu.com/p/5316981578?traceid= 

找到 

```
如果你想在客户端app中获取自定义的header信息，需要在服务器端header中添加Access-Control-Expose-Headers
```

### 操作

- https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- https://github.com/eggjs/egg-cors#configuration

找到 

- https://github.com/koajs/cors#corsoptions

所以，配置 `app/config/config.default.json` 中的 `cors`, 加入`exposeHeaders: 'Authorization'`

效果如下：

```
    // cors
    cors: {
      origin:'http://localhost:3000',
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      exposeHeaders: 'Authorization'
    }
```
