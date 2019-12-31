'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

const unittestObj = require('../../../app/extend/helper/unittest.js');
const myTokenDataObj = unittestObj.myTokenDataObj;
const myTokenDataKey = unittestObj.myTokenDataKey;
const genRandomString = unittestObj.genRandomString;

const getFirstWorker = unittestObj.getFirstWorker;
const listWorker = unittestObj.listWorker;
// const createFirstWorker = unittestObj.createFirstWorker;
// const createSecondWorker = unittestObj.createSecondWorker;
const createThirdWorker = unittestObj.createThirdWorker;
const createFourthWorker = unittestObj.createFourthWorker;
const deleteFirstWorker = unittestObj.deleteFirstWorker410;
const deleteSecondWorker = unittestObj.deleteSecondWorker410;
const updateFirstWorker = unittestObj.updateFirstWorker;

let requestBodyObj = {};
let requestBodyBackObj = {};

const testFilePath = 'test/controller/pms/pms_stage_option.test.js'; // 测试文件路径
const tableName = 'pms_stage_option';
const url = '/option/stage'; // 请求url前面部分
const snPrefix = 'option_stage'; // sn前缀
const ruleFields = { // 程序必传参数
  plan_id: 1,
  plan_sn: 'option_1',
  plan_status: 'todo',
  stage_status: 'todo',
  // delete_status: 1,
  // enable_status: 0,
};

const { fetchFirstTwoRowData } = require('../../../app/extend/helper/utils.js');
const describeBasic = require('../../../app/extend/helper/describe.js').describeBasic;

const mockOkFirstWorker = (url, requestBodyObj) => {
  return async () => {
    console.log('mock ok')
  }
};

const createFirstWorker = (url, requestBodyObj) => {
  return async () => {
    app.logger.debug('createFirstWorker requestBodyObj', requestBodyObj);
    const result = await app.httpRequest()
      .post(`${url}/create`)
      .type('application/json')
      .send(requestBodyObj)
      .expect(200);
    assert(result.status === 200);
    assert(JSON.parse(result.res.text).code === 0);
    // assert(JSON.parse(result.res.text).data);
    app.logger.debug('8888888888888888888888888888888888888888888888888', JSON.parse(result.res.text).data);
    // 再次创建，会因为 username 重复而创建不成功
    const resultSecond = await app.httpRequest()
      .post(`${url}/create`)
      .type('application/json')
      .send(requestBodyObj)
      .expect(200);
    assert(resultSecond.status === 200);
    assert(JSON.parse(resultSecond.res.text).code === 200);
    assert(JSON.parse(resultSecond.res.text).message.length > 0);
    app.logger.debug('99999999999999999999999999999999999999999999999', resultSecond.res.text);
    // 把 刚刚创建的用户 删除掉
    // 怎么删除比较合理呢？
    // 4. 把记录，delete_status 还原为 0。 
    const ids = JSON.parse(result.res.text).data;
    app.logger.info(`app.config.sequelize.dialect: ${app.config.sequelize.dialect}`);
    let backSql = '';
    if (app.config.sequelize.dialect === 'postgres') {
      backSql = `delete from ${tableName} where id in (${ids});`; // .split(',')
    }
    app.logger.info(`backSql: ${backSql}`);
    await app.model.query(backSql).then( (results, error) => {
      if (error) {
        assert(error === 0);
      } else {
        app.logger.info(`results: ${JSON.stringify(results)}`);
        assert(results[1].rowCount === 1); // 确实有删除掉1行记录
      }
    });
  };
};

const createSecondWorker = (url, requestBodyObj) => {
  return async () => {
    const result = await app.httpRequest()
      .post(`${url}/create`)
      .type('application/json')
      .send(requestBodyObj)
      .expect(200);
    assert(result.status === 200);
    assert(JSON.parse(result.res.text).code === 0);
    // 确认一下，是否保存的是 status = 0
    const userId = JSON.parse(result.res.text).data;
    const resultGet = await app.httpRequest()
      .get(`${url}/${userId}`)
      .expect(200); // 期望返回 status 200
    // 也可以这样验证
    app.logger.debug(`resultGet.res.text: ${resultGet.res.text}`);
    assert(resultGet.status === 200);
    // assert(JSON.parse(resultGet.res.text).code === 0);
    // assert(JSON.parse(resultGet.res.text).data.delete_status === 1);
    // assert(JSON.parse(resultGet.res.text).data.enable_status === 0);
    assert(JSON.parse(resultGet.res.text).code === 410);
    assert(JSON.parse(resultGet.res.text).message.length > 1);
    // 把 刚刚创建的用户 删除掉
    // 怎么删除比较合理呢？
    // 4. 把记录，delete_status 还原为 0。 
    const ids = JSON.parse(result.res.text).data;
    app.logger.info(`app.config.sequelize.dialect: ${app.config.sequelize.dialect}`);
    let backSql = '';
    if (app.config.sequelize.dialect === 'postgres') {
      backSql = `delete from ${tableName} where id in (${ids});`; // .split(',')
    }
    app.logger.info(`backSql: ${backSql}`);
    await app.model.query(backSql).then( (results, error) => {
      if (error) {
        assert(error === 0);
      } else {
        app.logger.info(`results: ${JSON.stringify(results)}`);
        assert(results[1].rowCount === 1); // 确实有删除掉1行记录
      }
    });
  };
};
describe(testFilePath, () => {
  describeBasic(url, tableName, snPrefix, ruleFields, myTokenDataObj, myTokenDataKey, genRandomString, getFirstWorker, listWorker, createFirstWorker, createSecondWorker, createThirdWorker,
    createFourthWorker, deleteFirstWorker, deleteSecondWorker, updateFirstWorker, testFilePath ,requestBodyObj = {}, requestBodyBackObj = {});
});

