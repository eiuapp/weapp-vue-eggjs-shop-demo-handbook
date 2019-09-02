

## 放在Authorization头Bearer中

- https://blog.csdn.net/tiger0709/article/details/78095216
- https://www.jianshu.com/p/576dbf44b2ae

## 放在 cookies 中

见 https://github.com/ruiyong-lee/weapp-vue-eggjs-shop-demo 的 `app-server/app/extend/context.js` 中的 函数


## 注销、释放 token

https://blog.csdn.net/qq_31897023/article/details/89441874

```
"Actually, JWT serves a different purpose than a session and it is not possible to forcefully delete or invalidate an existing token."
这篇文章写得比较简单易懂：https://medium.com/devgorilla...
有以下几个方法可以做到失效 JWT token：
将 token 存入 DB（如 Redis）中，失效则删除；但增加了一个每次校验时候都要先从 DB 中查询 token 是否存在的步骤，而且违背了 JWT 的无状态原则（这不就和 session 一样了么？）。
维护一个 token 黑名单，失效则加入黑名单中。
在 JWT 中增加一个版本号字段，失效则改变该版本号。
在服务端设置加密的 key 时，为每个用户生成唯一的 key，失效则改变该 key。
```

## token过期，如何处理？

