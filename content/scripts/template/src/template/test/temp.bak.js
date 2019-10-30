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

const describeBasic = require('../../../app/extend/helper/describe.js').describeBasic;

describe(testFilePath, () => {
  describeBasic(url, tableName, snPrefix, ruleFields, myTokenDataObj, myTokenDataKey, genRandomString, getFirstWorker, listWorker, createFirstWorker, createSecondWorker, createThirdWorker,
    createFourthWorker, deleteFirstWorker, deleteSecondWorker, updateFirstWorker, testFilePath ,requestBodyObj = {}, requestBodyBackObj = {});
});
