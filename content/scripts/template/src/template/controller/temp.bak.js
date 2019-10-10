'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - user merchant
 * @class
 * @author tianluo
 */


class SecondController extends Controller {
  constructor(...args) {
    super(...args);
    this.ctxService = this.ctx.service.pms.pmsGrantRestrictedStockUnit;
  }
}

class ThirdController extends SecondController {
  /**
   * 查询-分页列表
   */
  async getListAndCountAll() {
    await this.ctx.helper.controller.getListAndCountAll(this);
  }

  /**
   * 查询-单条信息
   */
  async get() {
    await this.ctx.helper.controller.get(this);
  }

  /**
   * 新增
   */
  async saveNew() {
    const rule = {
      name: 'string',
      creator_id: 'int',
      employee_sn: 'string',
      stage_sn: 'string',
      stage_status: 'string',
      sn: 'string',
      plan_id: 'int?',
      description: 'string?',
      status: 'string?',
    };
    const snPrefix = 'unit_grant';
    // 如果没有传入 plan_status ，则使用默认值。default: 'todo'
    this.ctx.request.body = this.ctx.helper.addAttributeToRequestBody(this.ctx.request.body, 'plan_status', 'todo');
    // 如果没有传入 stage_status ，则使用默认值。default: 'todo'
    this.ctx.request.body = this.ctx.helper.addAttributeToRequestBody(this.ctx.request.body, 'stage_status', 'todo');
    // 如果没有传入 exercicse_status ，则使用默认值。default: 'todo'
    this.ctx.request.body = this.ctx.helper.addAttributeToRequestBody(this.ctx.request.body, 'exercicse_status', 'nonexistent');
    await this.ctx.helper.controller.saveNew(this, rule, snPrefix);
  }
  /**
   * 修改
   */
  async saveModify() {
    const rule = {
      name: 'string?',
      creator_id: 'int?',
      employee_sn: 'string?',
      stage_sn: 'string?',
      sn: 'string?',
      plan_id: 'int?',
      stage_status: 'string?',
      description: 'string?',
      status: 'string?',
    };
    await this.ctx.helper.controller.saveModify(this, rule);
  }

  /**
   * 修改-删除状态
   */
  async updateDeleteStatus() {
    await this.ctx.helper.controller.updateDeleteStatus(this);
  }

}

module.exports = ThirdController;
