
## template

当对新表作处理时，请使用这里的template，达到快速形成router的目的


## 开发

下面以 fangyuan 项目为例

### 老模式

#### 开发模板 

以 cms/cms_company, pms/pms_prohibitive_condition 为准开发

#### 测试模板 

以 test/controller/ums/ums_user.test.js 为模板

### 新模式

#### 开发模板 重用 extend/helper 

以 pms/pms_sars 为准开发
以 pms/pms_grant_restricted_stock_unit 为准开发

#### 测试模板 重用 extend/helper/unittest

以 test/controller/pms/pms_option.test.js 为模板

- testFilePath 
- url
- snPrefix
- ruleFields

### 数据库字段增减

影响以下几个地方：

1. schema 
2. model 的 updateField
3. service 的 tableFields
4. controller 中的 rule 校验
    1. saveNew：
      rule 
      snPrefix
    2. saveModify：
      rule
5. test
   
### 新增一个表

#### router

#### controller

1. SecondController
    constructor.ctxService

1. saveNew：
  rule 
  snPrefix

2. saveModify：
  rule
#### service

tableFields

SecondService

#### model

```
  const ModelSchema = require('../../schema/pms_option.js')(app);
  const Model = model.define('pms_option', ModelSchema);

  updateField
```

#### schema


## 快速更新数据库的table name

#### router

```
  router.get('/option/stage/list', pms.pmsStageOption.getListAndCountAll);
```
#### controller

filename

```
    this.ctxService = this.ctx.service.pms.pmsGrantOption;
```
#### service

filename

```
    this.ctxModel = this.app.model.Pms.PmsGrantOption;
```

#### model

filename

```
  const ModelSchema = require('../../schema/pms_grant_option.js')(app);
  const Model = model.define('pms_grant_option', ModelSchema);
```

#### schema

filename

#### shell

```
git mv controller/pms/pms_option_grant.js controller/pms/pms_grant_option.js
git mv service/pms/pms_option_grant.js service/pms/pms_grant_option.js
git mv model/pms/pms_option_grant.js service/pms/pms_grant_option.js
```

```
cd controller/pms/
git mv pms_option.js pms_stage_option.js
git mv pms_restricted_stock.js pms_stage_restricted_stock.js
git mv pms_restricted_stock_unit.js pms_stage_restricted_stock_unit.js
git mv pms_sars.js pms_stage_sars.js
```

```
./rename.sh service/pms pms_option.js pms_stage_option.js
./rename.sh service/pms pms_restricted_stock.js pms_stage_restricted_stock.js
./rename.sh service/pms pms_restricted_stock_unit.js pms_stage_restricted_stock_unit.js
./rename.sh service/pms pms_sars.js pms_stage_sars.js                        
./rename.sh model/pms pms_option.js pms_stage_option.js        
./rename.sh model/pms pms_restricted_stock.js pms_stage_restricted_stock.js
./rename.sh model/pms pms_restricted_stock_unit.js pms_stage_restricted_stock_unit.js
./rename.sh model/pms pms_sars.js pms_stage_sars.js
```