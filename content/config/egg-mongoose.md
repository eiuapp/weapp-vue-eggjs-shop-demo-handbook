

## egg-mongoose auth登录验证

https://github.com/eggjs/egg/issues/1990#issuecomment-358939142

```
config.mongoose = {
    url: 'mongodb://localhost/wechat',
    options: {
      auth: { authSource: "admin" },
      user: 'admin',
      pass: '123456'
    }
  };
```