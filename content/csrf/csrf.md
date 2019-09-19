---
date: 2019-01-08T21:07:13+01:00
title: "csrf"
weight: 31
keywords:
- csrf
description : "csrf"
---

csrf

## 尝试1 

主要从 https://www.bilibili.com/video/av38372787/?p=8 学习

### middleware/auth.js 

在 `app/middleware/auth.js` 中加入 

```
    // csrf validates
    ctx.state.csrf = ctx.csrf;
```

### 让前端加入 

一步一步进行

#### 通过加参数的方式

如下，加了 `_csrf=<%=csrf%>` 
```
<form action="/add?_csrf=<%=csrf%>" method="POST">
```

```HTML
<input type="hidden" name="_csrf" value="<%=csrf%>" />
```
