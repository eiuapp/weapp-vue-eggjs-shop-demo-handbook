---
date: 2019-01-08T21:07:13+01:00
title: "报错parsingHeadersStart"
weight: 61
keywords:
- install
- error
description : "报错parsingHeadersStart"
---


## 问题

```
TypeError: Cannot set property 'parsingHeadersStart' of undefined (uncaughtException throw 1 times on pid:4768)
    at IncomingMessage.resetHeadersTimeoutOnReqEnd (_http_server.js:744:32)
    at IncomingMessage.emit (events.js:189:13)
    at endReadableNT (_stream_readable.js:1125:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
TypeError: Cannot set property 'parsingHeadersStart' of undefined (uncaughtException throw 1 times on pid:4768)
    at IncomingMessage.resetHeadersTimeoutOnReqEnd (_http_server.js:744:32)
    at IncomingMessage.emit (events.js:189:13)
    at endReadableNT (_stream_readable.js:1125:12)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

[egg-socket 启动报错 Cannot set property 'parsingHeadersStart' of undefined](https://github.com/eggjs/egg/issues/3576)

## 解决

[升级至v12.4.0](https://github.com/eggjs/egg/issues/3576#issuecomment-506915022) 或者 [降级至v8.15.0](https://github.com/nodejs/node/issues/26366#issuecomment-469524966)

具体讨论，可见[这里](https://github.com/nodejs/node/issues/26366)