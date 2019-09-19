
## 存放位置
### 放在Authorization头Bearer中

- https://blog.csdn.net/tiger0709/article/details/78095216
- https://www.jianshu.com/p/576dbf44b2ae

### 放在 cookies 中

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

### token过期，如何处理？


## egg-jwt 怎么设置过期时间

https://github.com/auth0/node-jsonwebtoken#usage

## 续签

https://www.cnblogs.com/PinkPink/p/9962650.html

场景：需要用户长期登录的应用，比如用你开发需要用户保持登录的应用，在使用token的时候保证用户体验不需要频繁登录操作，又要保证用户在一段时间之后登录过期重新登录，主要是一个用户体验和用户信息安全的问题。这个时候又要求token不能过长，只能通过续签来保持登录状态
又或者说用户登录的时候你需要获取用户在社交网站的信息，就需要获取社交网站授权的token，这也需要续签，不过这是向社交网站续签。这里后面说。

何时续签：

1.每次请求刷新 每次请求直接覆盖签发新的token
2.记录时间定时刷新 设置一个定时器，记录签发时间，然后到过期的时候签发新的
3.临期时刷新 访问的时候对比时间，如果即将过期就立即刷新。
4.过期后续签，这样设置过期时间的意义就在于如果token被盗取后黑客登录也需要续签，这样用户再次登录客户端就会发现用户登录异常。而且每次获取的token都是新的，旧的只能获取一次续签的机会，也就说如果用户续签以后之前的token就不能再续签了。
5.jwt-autorefresh(JWT自动刷新)（有限制条件，在客户端定时刷新）


## Token设计

https://blog.csdn.net/m0_37809141/article/details/86572697

### 四、解决方案
#### 说明
```
  正常Token：Token未过期，且未达到建议更换时间。
  濒死Token：Token未过期，已达到建议更换时间。
  正常过期Token：Token已过期，但存在于缓存中。
  非正常过期Token：Token已过期，不存在于缓存中。
```
#### 过期时间

  Token过期时间越短越安全，如设置Token过期时间15分钟，建议更换时间设置为Token前5分钟，则Token生命周期如下：

```
时间	Token类型	说明
0-10分钟	正常Token	正常访问
10-15分钟	濒死Token	正常访问，返回新Token，建议使用新Token
>15分钟	过期Token	需校验是否正常过期。正常过期则能访问，并返回新Token；
非过期Token拒绝访问
```

#### 生成一个正常Token

1. 在缓存中，通过用户标识查询老Token。
2. 如存在，将老Token（Token，用户标识）本条缓存设置过期时间，作为新老Token交替的过渡期。
3. 将新Token以（Token，用户标识）、（用户标识，Token）一对的形式存入缓存，不设置过期时间。

#### 获取一个正常Token

在缓存中，通过用户标识查询用户当前Token，校验该Token是否为正常Token，如正常则返回；不正常则生成一个正常Token。

## 如何将新的token发给前端比较好？

https://segmentfault.com/a/1190000013151506


    这个问题答案简单，在response 的header中设置authorization。
    关键点：后端一般使用的域名是二级域名比如我的是api.xx.com,会和前端产生一个跨域的影响，请记得一定要设置
    `$response->headers->set('Access-Control-Expose-Headers', 'Authorization');`
    设置跨域的时候还要设置一个Cache-Control,这个东西出现的问题真的是莫名其妙，坑了我很久..
    `$response->headers->set('Cache-Control', 'no-store'); // 无的话会导致前端从缓存获取头token`



## refresh token

https://github.com/noderaider/jwt-autorefresh