---
date: 2019-01-08T21:07:13+01:00
title: "重用 it 函数"
weight: 32
keywords:
- unittest
description : "unittest"
---


重用 it 中的函数

- list
- update
- create
- delete

这几个函数，经常在不同的小模块中重复使用。那么，我们自然，可以提出来，让代码重用啦。

下面用一个it作为示例

## 原理

it('describe info', afunction)

其中 afunction 部分，必须是一个promise函数，而不是函数的立即执行。

### 原始

```
  describe('test getListAndCountAll use GET /prohibitive/list', () => {
    it('should status 200 and get the body', async () => {
      // 再请求一次
      const result = await app.httpRequest()
        .get('/prohibitive/list')
        .send({
          pageNum: '1',
          pageSize: '30',
        })
        .expect(200); // 期望返回 status 200
      // 也可以这样验证
      assert(result.status === 200);
      const array = JSON.parse(result.res.text).data.list;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        assert(element.id > 0);
      }
    });
  });
```

### 提出

``` 
const listWorker = async () => {
  await app.ready();
  // 再请求一次
  const result = await app.httpRequest()
    .get('/prohibitive/list')
    .send({
      pageNum: '1',
      pageSize: '30',
    })
    .expect(200); // 期望返回 status 200
  // 也可以这样验证
  assert(result.status === 200);
}

  describe('test getListAndCountAll use GET /prohibitive/list', () => {
    it('should status 200 and get the body', listWorker);
  });
``` 

这种，只是单纯放在文件头部，作用不大。

### 提出2 

```
const listWorker = async (url) => {
  // 再请求一次
  // await app.ready();
  const result = await app.httpRequest()
    .get(url)
    .send({
      pageNum: '1',
      pageSize: '30',
    })
    .expect(200); // 期望返回 status 200
  // 也可以这样验证
  assert(result.status === 200);
}

  describe('test getListAndCountAll use GET /prohibitive/list', () => {
    // it('should status 200 and get the body', listWorker('/prohibitive/list') ); // 这样是 listWorker('/prohibitive/list') 立即执行，而不是一个promise函数。运行后，会报错，提示说。
    it('should status 200 and get the body', (done)=>{
      listWorker('/prohibitive/list').then(()=>{done()});
    });
  });
```

这种，把 url 作为参数，传入到一个函数中，放在文件头部，很好了。

### 闭包

``` 
function listWorker(url, ) {
  return async () => {
    // 再请求一次
    // await app.ready();
    const result = await app.httpRequest()
      .get(url)
      .send({
        pageNum: '1',
        pageSize: '30',
      })
      .expect(200); // 期望返回 status 200
    // 也可以这样验证
    assert(result.status === 200);
    // return result;
  };
}
  describe('test getListAndCountAll use GET /prohibitive/list', () => {
    it('should status 200 and get the body', listWorker('/prohibitive/list'));
  });
```

这样是我们要的。利用闭包，返回一个函数。

## faq

### it中需要的是一个promise函数
```
const listWorker = async (url) => {
  // 再请求一次
  // await app.ready();
  const result = await app.httpRequest()
    .get(url)
    .send({
      pageNum: '1',
      pageSize: '30',
    })
    .expect(200); // 期望返回 status 200
  // 也可以这样验证
  assert(result.status === 200);
}

  describe('test getListAndCountAll use GET /prohibitive/list', () => {
    it('should status 200 and get the body', listWorker('/prohibitive/list') ); // 这样是 listWorker('/prohibitive/list') 立即执行，而不是一个promise函数。
  });
```

这样是 listWorker('/prohibitive/list') 立即执行，而不是一个promise函数。

运行后，会报错，提示说 app 没有 ready。

此时，如果你强行得 放开 `// await app.ready();` 为 `await app.ready();`, 则会报另一个错误。

前后打印一下，会发现，`assert(result.status === 200);` 已经执行了，但是，就是返回不对。

报错如下：

```
> fangyuan-server@1.0.0 test-local /home/ubuntu/code-server/fangyuan/fangyuan-server
> EGG_SERVER_ENV=unittest egg-bin test "test/controller/pms/pms_prohibitive_condition.test.js"



  test/controller/pms/pms_prohibitive_condition.test.js
    test getListAndCountAll use GET /prohibitive/list
      1) should status 200 and get the body


  0 passing (752ms)
  1 failing

  1) test/controller/pms/pms_prohibitive_condition.test.js
       test getListAndCountAll use GET /prohibitive/list
         should status 200 and get the body:
     ReferenceError: test222 is not defined
      at Context.done (test/controller/pms/pms_prohibitive_condition.test.js:94:7)
      [use `--full-trace` to display the full stack trace]



{ Error: /home/ubuntu/code-server/fangyuan/fangyuan-server/node_modules/_mocha@6.2.0@mocha/bin/_mocha --timeout=60000,--exit,--require=/home/ubuntu/code-server/fangyuan/fangyuan-server/node_modules/_egg-bin@4.13.1@egg-bin/lib/mocha-clean.js,--require=/home/ubuntu/code-server/fangyuan/fangyuan-server/node_modules/_co-mocha@1.2.2@co-mocha/lib/co-mocha.js,--require=/home/ubuntu/code-server/fangyuan/fangyuan-server/node_modules/_intelli-espower-loader@1.0.1@intelli-espower-loader/intelli-espower-loader.js,test/controller/pms/pms_prohibitive_condition.test.js exit with code 1
    at ChildProcess.proc.once.code (/home/ubuntu/code-server/fangyuan/fangyuan-server/node_modules/_common-bin@2.8.2@common-bin/lib/helper.js:56:21)
    at Object.onceWrapper (events.js:277:13)
    at ChildProcess.emit (events.js:189:13)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:248:12) code: 1 }
```