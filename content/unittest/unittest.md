---
date: 2019-01-08T21:07:13+01:00
title: "unittest"
weight: 31
keywords:
- unittest
description : "unittest"
---

unittest

## 只单元测试某个文件

package.json 中的 scripts 有：

```
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "EGG_SERVER_ENV=unittest egg-bin test",
```

那么，当你只想对 `./test/controller/user/common.test.js` 进行 unittest 时，运行如下：

```
npm run test-local ./test/controller/user/common.test.js
```

## 如何对 jwt 设置 token 后的情形，进行 Unittest

### jwt token 存储在 header.Authorization 时

现在对 修改密码接口`/user/savePasswordModify`进行测试.

步骤：

- 先作一个模拟登录，获取用户的token
- 接口`/user/savePasswordModify`发起POST请求，其中请求header中带上authorization

因为 eggjs 中的单元测试，是会用 egg-mock , 其中用到的是 app.httpRequest()

参考

- https://github.com/visionmedia/supertest/issues/398
- https://github.com/eggjs/egg-mock/blob/master/index.d.ts

知道了，应该在`.post`后面加上`.set`实现在请求头部加入 `authorization` 参数, 如下：

```
    app.httpRequest()
        .post('/user/savePasswordModify')
        .set('authorization', token) // 关键点。发post请求时，在header中带上 authorization
```

示例：

```js
    it('should status 200 and get the request body', async () => {
      app.mockCsrf();
      // 先作一个模拟登录，获取用户的token
      let res = await app.httpRequest()
        .post('/user/login')
        .type('application/json')
        .send({
          "username": "admin",
          "password": "admin",
          "loginType": "admin"
        })
        .expect(200)
      let token = res.header.authorization;
      // token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoi566h55CG5ZGYIiwiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY3NTA3Mzc3LCJleHAiOjE1Njc1MDc5Nzd9.BMtwavYJi1ThLNN1zs5vwBY2--gqbH_xvw5MHccKUks"
      let result = await app.httpRequest()
        .post('/user/savePasswordModify')
        .set('authorization', token) // 关键点。发post请求时，在header中带上 authorization
        .type('application/json')
        .send({
          "oldPassword": "admin",
          "newPassword": "123456",
          "id": "1",
          "userType": "admin",
          "user_type": "admin",
          "username": "admin"
        })
        .expect(200)
      assert(JSON.parse(result.res.text).code === 0)
    });
```
## 单元测试时,使用`ctx`对象

有时,我们需要在 单元测试 中使用`ctx`中的对象,比如,使用`ctx.helper`中的函数.

### 解决

参考 https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/core/unittest.md#ctx

这时, 要把 `const ctx = app.mockContext();` 放在 `it` 中(放到了外面的位置,都报错了,why?)

### 示例

```javascript
describe(testFilePath, () => {
  afterEach(mock.restore);
  describe('test get use GET ' + url + '/1', () => {
    {
      it('should have role(user_role_id) return', async () => {
        // 1. ctx.helper.fetchFirstTwoRowData 函数, 取出表中前2条 delete_status = 0 的记录，找出 id
        const ctx = app.mockContext();
        const {id} = await ctx.helper.fetchFirstTwoRowData(app, url);
```
