---
date: 2019-01-08T21:07:13+01:00
title: "controller-not-exists"
weight: 31
keywords:
- controller
description : "当在router中设置错误时，会报controller-not-exists"
---

## controller not exists

会报错如下：

```
/home/ubuntu/code-server/chat/chat-admin-server/node_modules/_egg@2.23.0@egg/lib/application.js:70
      throw e;
      ^

Error: controller not exists
    at resolveController (/home/ubuntu/code-server/chat/chat-admin-server/node_modules/_@eggjs_router@2.0.0@@eggjs/router/lib/egg_router.js:298:26)
    at spliteAndResolveRouterParams (/home/ubuntu/code-server/chat/chat-admin-server/node_modules/_@eggjs_router@2.0.0@@eggjs/router/lib/egg_router.js:277:20)
    at EggRouter.(anonymous function).args [as get] (/home/ubuntu/code-server/chat/chat-admin-server/node_modules/_@eggjs_router@2.0.0@@eggjs/router/lib/egg_router.js:72:25)
    at module.exports.app (/home/ubuntu/code-server/chat/chat-admin-server/app/router.js:159:10)
```

router.js 文件中

```
router.get('/register/registerStep1', user.umsMember.saveModify);
```

### 解决

这个有几个可能：

1. controller 没有引用 user

2. user.umsMember.saveModify 在 controller/user/ums_member.js 中没有 saveModify 函数


## Unexpected token

```
/home/ubuntu/code-server/chat/chat-admin-server/app/router.js:159
  router.get('/register/registerStep1', default.pass.registerStep1);
                                        ^^^^^^^

SyntaxError: Unexpected token default
```

说明在 controller 中没有引入 `default`

```
  const { oms, user, default } = controller;
```