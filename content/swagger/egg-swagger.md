## egg-swagger

- [jsdoc.app](https://jsdoc.app/)
- https://github.com/Yanshijie-EL/egg-swagger-doc
- https://github.com/Yanshijie-EL/egg-example-api

当你是第一次使用 egg-swagger-doc 时,最好,直接启动一下 [egg-example-api](https://github.com/Yanshijie-EL/egg-example-api) 工程, 这样, 在对比中进行学习, 很快就入门了.

### 修改 swagger title

修改 `egg/config/config.{env}.js` 中的 swaggerdoc.apiInfo.title

```javascript
    swaggerdoc: {
      dirScanner: './app/controller',
      apiInfo: {
        title: 'fangyuan', // egg-swagger title
        description: 'swagger-ui for fangyuan',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        // apikey: {
        //   type: 'apiKey',
        //   name: 'clientkey',
        //   in: 'header',
        // },
        // oauth2: {
        //   type: 'oauth2',
        //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
        //   flow: 'password',
        //   scopes: {
        //     'write:access_token': 'write access_token',
        //     'read:access_token': 'read access_token',
        //   },
        // },
      },
```

### egg/app/contract

这里要创建

- 文件夹request.代表请求时,一些请求体
- 文件夹response.代表response的返回格式
- js文件(名称任意,但是我这里使用`model.js`). 代表model,也就是对应于数据库中的表.

####

### egg-swagger-doc jsdoc with eslint
#### 现象

当使用 eslint 时,会因为注释中的 @参数 而出现下面的 warning

```
-*- mode: compilation; default-directory: "~/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/" -*-
Compilation started at Mon Dec  2 11:18:41

/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/node_modules/.bin/eslint --fix --format=unix /mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:13:0: Invalid JSDoc tag name "router". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:14:0: Invalid JSDoc tag name "request". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:15:0: Invalid JSDoc tag name "request". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:16:0: Invalid JSDoc tag name "response". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:34:0: Invalid JSDoc tag name "router". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:35:0: Invalid JSDoc tag name "request". [Warning/jsdoc/check-tag-names]
/mnt/c/Users/a/Desktop/tianluo/fangyuan/src/fangyuan-server/app/controller/ums/ums_user.js:36:0: Invalid JSDoc tag name "response". [Warning/jsdoc/check-tag-names]

7 problems

Compilation finished at Mon Dec  2 11:18:42
```

#### [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)

首先,我们找到一下,到底用的是哪个包

- [eslint valid-jsdoc](https://eslint.org/docs/rules/valid-jsdoc)


已经是
找到 https://eslint.org/blog/2018/11/jsdoc-end-of-life
找到 https://eslint.org/blog/2018/11/jsdoc-end-of-life#suggested-replacement

- [jsdoc.app](https://eslint.org/docs/rules/valid-jsdoc)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc)

对应于

[eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) 中的 [check-tag-names](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-tag-names)

当使用上面这个列表中的 tag name 时,则,确实不会报错.

#### (正确)rules

- [Configuration](https://github.com/gajus/eslint-plugin-jsdoc#configuration)
- [Options](https://github.com/gajus/eslint-plugin-jsdoc#options)
- [definedTags](https://github.com/gajus/eslint-plugin-jsdoc#definedtags)

从 [definedTags](https://github.com/gajus/eslint-plugin-jsdoc#definedtags) 知道,我们要在 Option 中加入 definedTags .

因为 Option 是在 rules 中的,所以,要在 rules 中加一下,怎么加,参考[Configuration](https://github.com/gajus/eslint-plugin-jsdoc#configuration)

修改 `.eslintrc`文件

```
  "rules": {
    "jsdoc/check-tag-names": [1, {
      "definedTags": ["router", "request"]
    }],
    "array-bracket-spacing": 0
  }
```

然后,命令行运行: `eslint -c .eslintrc ./app/controller/ums/ums_user.js`

#### 回 egg-example-api

现在我回到

- [egg-swagger-doc 中的 .eslintrc 文件](https://github.com/Yanshijie-EL/egg-swagger-doc/blob/master/.eslintrc)
- [egg-example-api 中的 .eslintrc 文件](https://github.com/Yanshijie-EL/egg-example-api/blob/master/.eslintrc)

看了一下,有一个

```
  "rules": {
    "prefer-const": 0,
    "array-bracket-spacing": 0,
    "valid-jsdoc": "off",
    "dot-notation": "off",
    "no-unused-vars": "off",
    "space-before-function-paren":"off",
    "object-shorthand":"off"
  }
```

加入到了本地的 .eslintrc 文件,也没有效果.

[eslint valid-jsdoc](https://eslint.org/docs/rules/valid-jsdoc) 有提到

This rule was deprecated in ESLint v5.10.0.

所以说, 上面提到的 rules.valid-jsdoc 并没有生效.所以,我们不需要.

#### (跳过)settings

这里面,有提到, [settings](https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-settings)

那么,

修改 `.eslintrc`文件

```
  "rules": {
    "array-bracket-spacing": 0
  }
  "settings": {
    "jsdoc": {
        "tagNamePreference": {
            "definedTags": ["router", "request"],
        }
    }
  }
```
发现,这么设置,没有生效的

### jsdoc ignore

- [jsdoc.app](https://jsdoc.app/)
- https://github.com/Yanshijie-EL/egg-swagger-doc/issues/39
- https://github.com/Yanshijie-EL/egg-swagger-doc/issues/39#issuecomment-458916817

jsdoc 已经定义好的 tag 见 https://jsdoc.app/#block-tags

### jwt token

https://github.com/Yanshijie-EL/egg-swagger-doc/issues/38

https://github.com/Yanshijie-EL/egg-swagger-doc/issues/38#issuecomment-457170195

```
@request header string *Authorization
```

### 自定义 response model
#### 比如,我想构造一个返回类似下方:

```json
{
  "code": 0,
  "data": {
    "pageNum": "string",
    "pageSize": "string",
    "total": 0,
    "totalPage": 0,
    "list": [
      {
        "id": 0,
        "sn": "string",
        "name": "string",
        "contact": "string",
        "telephone": "string",
        "email": "string",
        "address": "string",
        "registered_address": "string"
      }
    ]
  },
  "message": "string"
}
```

当你想自定义返回时,则可以

#### 在 `egg/app/contract/responce` 中指定

在 `base.js` 中

```
module.exports = {
  commonResponse: {
    code: { type: 'integer', required: true, description: '状态码' },
    data: { type: 'object', required: true, description: '数据' },
    message: { type: 'string', required: false, description: '信息' },
  },
  listResponse: {
    // list: { type: 'array', itemType: 'trust' },
    pageNum: { type: 'string', required: true, description: '页码' },
    pageSize: { type: 'string', required: true, description: '单页数量' },
    total: { type: 'integer', required: true, description: '总数据量' },
    totalPage: { type: 'integer', required: true, description: '单页数据' },
  },
};
```
在 `trust.js` 中

```
const commonResponse = require('./base.js').commonResponse;
const listResponse = require('./base.js').listResponse;

module.exports = {
  listTrustResponse: {
    ...listResponse,
    list: { type: 'array', itemType: 'trust', required: true }
  },
  queryTrustResponse: {
    ...commonResponse,
    data: { type: 'listTrustResponse', required: true },
  },
};
```

#### 在 `egg/app/controller/trust.js`中如下注释

```javascript
  /**
   * @summary 获取信托公司-分页列表
   * @description 分页获取信托公司信息
   * @router get /v1/trust/list
   * @request header string *Authorization
   * @request query integer pageNum 页码 默认 1
   * @request query integer pageSize 单页数量 默认 20
   * @response 200 queryTrustResponse successed
   */
  async getListAndCountAll() {
    const { ctx } = this;
    const rule = {
      pageNum: 'string',
      pageSize: 'string',
    };
    ctx.validate(rule);
    const result = await ctx.service.tms.tmsTrust.getListAndCountAll(ctx.request.body);
    this.success(result);
  }
```

其中`* @response 200 queryTrustResponse successed`就会向`egg/app/contract/responce/trust.js`中取得 `queryTrustResponse` 的结构.

### 通过 `egg/app/schema/table.js` 转换成 `egg/app/contract/model.js` 中的 table

http://ergoemacs.org/emacs/elisp_find_replace_text.html

```
(defun egg-contract-model-js-append-new-talbe-substitude-type-b ()
    (interactive)
    (let ((case-fold-search nil)) ; t or nil
        (goto-char (point-min))
        (while (search-forward-regexp "BIGINT.*}" nil t)
            (replace-match "'integer', description: ''}" t))
        (goto-char (point-min))
        (while (search-forward-regexp "INTEGER.*}" nil t)
            (replace-match "'integer', description: ''}" t))
        (goto-char (point-min))
        (while (search-forward-regexp "STRING.*}" nil t)
            (replace-match "'string', description: ''}" t))
        (goto-char (point-min))
        (while (search-forward-regexp "ENUM.*}" nil t)
            (replace-match "'string', description: ''}" t))
        (goto-char (point-min))
        (while (search-forward-regexp "DATE.*}" nil t)
            (replace-match "'string', description: ''}" t))
        (goto-char (point-min))
        (while (search-forward-regexp "CHAR.*}" nil t)
            (replace-match "'string', description: ''}" t))

        ;; repeat for other string pairs
        ))
```

### type date ###

when table field type is datetime, what is egg/app/contract/model.js table type setting?

https://swagger.io/docs/specification/data-models/data-types/#string

so, set 'type: "string"' is ok.
