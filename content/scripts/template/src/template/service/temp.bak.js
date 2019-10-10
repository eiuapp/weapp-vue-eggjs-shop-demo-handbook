'use strict';

const md5 = require('md5');
const Service = require('egg').Service;

const tableFields = ['id',
'sn',
'stage_sn',
'employee_sn',
'plan_grant_date',
'plan_grant_price',
'plan_grant_number',
'plan_own_date',
'plan_end_date',
'plan_user_id',
'exercicse_status',
'stage_status',
'plan_status',
'name',
'description',
'delete_status',
'enable_status',
  // 'status',
  // 'last_modifier_id',
  // 'last_modifier_name',
  // 'last_modified_time',
  // 'creator_id',
  // 'creator_name',
  // 'created_time'
];

class SecondService extends Service {
  constructor(...args) {
    super(...args);
    this.ctxModel = this.app.model.Pms.PmsGrantRestrictedStockUnit;
  }
}

/**
 * Service -
 * @class
 * @author tianluo
 */
class ThirdService extends SecondService {
  /**
   * 新增
   * @param {object} params - 条件
   * @return {string|null} - id
   */
  async saveNew(params = {}) {
    return await this.ctx.helper.myservice.saveNew(this, params);
  }

  /**
   * 修改
   * @param {object} params - 条件
   * @return {string|null} - id
   */
  async saveModify(params = {}) {
    return await this.ctx.helper.myservice.saveModify(this, params);
  }

  /**
   * 修改 delete_status
   * @param {object} params - 条件
   * @return {string|null} - id
   */
  async updateDeleteStatus(params = {}) {
    return await this.ctx.helper.myservice.updateDeleteStatus(this, params);
  }

  /**
   * 获取分页列表
   * @param {object} params - 条件
   * @return {object|null} - 查找结果
   */
  async query(params = {}) {
    const { app } = this;
    return await this.ctxModel.query({
      ...params,
      attributes: tableFields,
    });
  }

  /**
   * 根据id获取
   * @param {object} id - uuid
   * @param {object} user_type - 类型
   * @return {object|null} - 查找结果
   */
  async get(id) {
    return await this.ctx.helper.myservice.get(this, id, tableFields);
  }

  /**
   * 根据 userType 获取 账号列表
   * @param {object} params 条件
   * @return {object|null} 查找结果
   */
  async getListAndCountAll(params = {}) {
    return await this.ctx.helper.myservice.getListAndCountAll(this, tableFields, params);
  }

}

module.exports = ThirdService;
