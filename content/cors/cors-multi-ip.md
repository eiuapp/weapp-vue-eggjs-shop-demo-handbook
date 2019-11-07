---
date: 2019-11-08T21:07:13+01:00
title: "egg-cors配置多ip跨域"
weight: 32
keywords:
- 学习笔记
- cors
description : "cors"
---

egg-cors配置跨域

https://github.com/eggjs/egg/issues/3160#issuecomment-436177013

如果你要用 origin: '*' 又想带 withCredentials，配置改成这样

```
config.cors = {
  credentials: true,
  origin: ctx => ctx.get('origin'),
}
```

如果只想让 domainWhiteList 的可以跨域，那就不用配置 origin

## (没成功)尝试 egg-origin 

- https://juejin.im/post/5c0a055951882516207d1f48
- https://github.com/temool/egg-origin
