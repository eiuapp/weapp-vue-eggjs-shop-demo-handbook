'use strict';

const { app, mock, assert } = require('egg-mock/bootstrap');

const unittestObj = require('../../../app/extend/helper/unittest.js');
const myTokenDataObj = unittestObj.myTokenDataObj;
const myTokenDataKey = unittestObj.myTokenDataKey;
const genRandomString = unittestObj.genRandomString;

const getFirstWorker = unittestObj.getFirstWorker;
const listWorker = unittestObj.listWorker;
const createFirstWorker = unittestObj.createFirstWorker;
const createSecondWorker = unittestObj.createSecondWorker;
const createThirdWorker = unittestObj.createThirdWorker;
const createFourthWorker = unittestObj.createFourthWorker;
const deleteFirstWorker = unittestObj.deleteFirstWorker;
const deleteSecondWorker = unittestObj.deleteSecondWorker;
const updateFirstWorker = unittestObj.updateFirstWorker;

const testFilePath = 'test/controller/pms/pms_stage_option.test.js'; // 测试文件路径
let requestBodyObj = {};
let requestBodyBackObj = {};
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

describe(testFilePath, () => {

  afterEach(mock.restore);

  describe('test saveNew use POST ' + url + '/create', () => {
    {
      requestBodyObj = {
        ...myTokenDataObj,
        ...ruleFields,
        name: genRandomString(10),
        sn: snPrefix + '_' + genRandomString(10),
        creator_id: '1',
      };
      it('createFirstWorker, saveNew, should status 200 and get the body', createFirstWorker(url, requestBodyObj));
    }
    {
      const name = genRandomString(10);
      requestBodyObj = {
        ...myTokenDataObj,
        ...ruleFields,
        name,
        sn: snPrefix + '_' + genRandomString(10),
        delete_status: 1,
        enable_status: 0,
      };
      it('createSecondWorker, saveNew a delete_status = 1 plan, should status 200 and get the body', createSecondWorker(url, requestBodyObj));
    }
    {
      const name = genRandomString(10);
      requestBodyObj = {
        ...myTokenDataObj,
        ...ruleFields,
        name,
        sn: snPrefix + '_' + genRandomString(10),
        enable_status: 0,
      };
      it('createThirdWorker, saveNew a enable_status = 0 plan, should status 200 and get the body', createThirdWorker(url, requestBodyObj));
    }
    {
      requestBodyObj = {
        ...ruleFields,
        description: '12345678912',
      };
      it('createFourthWorker, should status 500 and get the body', createFourthWorker(url, requestBodyObj));
    }
  });

  describe('test get use GET ' + url + '/1', () => {
    {
      it('getFirstWorker, GET /1, should status 200 and get the body', getFirstWorker(url));
    }
  });

  describe('test getListAndCountAll use GET ' + url + '/list', () => {
    {
      const listUrl = url + '/list';
      const listRequestObj = {
        pageNum: '1',
        pageSize: '30',
      };
      it('listWorker, GET list, should status 200 and get the body', listWorker(listUrl, listRequestObj));
    }
  });

  describe('test updateDeleteStatus use POST ' + url + '/delete/:id', () => {
    {
      requestBodyObj = {
        ...myTokenDataObj,
      };
      requestBodyBackObj = {
        ...myTokenDataObj,
        delete_status: 0,
      };
      it('deleteFirstWorker, should status 200 and get the body', deleteFirstWorker(url, requestBodyObj, requestBodyBackObj));
    }
    {
      requestBodyObj = {
        ...myTokenDataObj,
      };
      requestBodyBackObj = {
        ...myTokenDataObj,
        delete_status: 0,
      };
      it('deleteSecondWorker, should status 200 and get the body', deleteSecondWorker(url, requestBodyObj, requestBodyBackObj));
    }
  });

  describe('test saveModify use POST ' + url + '/update/:id', () => {
    {
      requestBodyObj = {
        ...myTokenDataObj,
        description: 'test.go',
      };
      requestBodyBackObj = {
        ...myTokenDataObj,
        description: 'test.back',
      };
      it('updateFirstWorker, should status 200 and get the body', updateFirstWorker(url, requestBodyObj, requestBodyBackObj));
    }
  });

});
