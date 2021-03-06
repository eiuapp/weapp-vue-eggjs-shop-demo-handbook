'use strict';

module.exports = app => {
  const { Sequelize, model, getSortInfo, checkUpdate } = app;
  const { Op } = Sequelize;
  const ModelSchema = require('../schema/pms_grant_restricted_stock_unit.js')(app);
  const scope = require('../extend/model/scope.js').scope;
  const Model = model.define('pms_grant_restricted_stock_unit', ModelSchema, scope);

  /**
   * 新增用户
   * @param {object} params - 条件
   * @return {string} - 用户uuid
   */
  Model.saveNew = async params => {
    const result = await Model.create(params);
    return result.id;
  };

  /**
   * 修改用户
   * @param {object} params - 条件
   * @return {string} - 用户uuid
   */
  Model.saveModify = async params => {
    const { id,  // eslint-disable-line no-unused-vars
      sn,  // eslint-disable-line no-unused-vars
      stage_sn,  // eslint-disable-line no-unused-vars
      employee_sn,  // eslint-disable-line no-unused-vars
      plan_grant_date,  // eslint-disable-line no-unused-vars
      plan_grant_price,  // eslint-disable-line no-unused-vars
      plan_grant_number,  // eslint-disable-line no-unused-vars
      plan_own_date,  // eslint-disable-line no-unused-vars
      plan_end_date,  // eslint-disable-line no-unused-vars
      plan_user_id, // eslint-disable-line no-unused-vars
      exercicse_status, // eslint-disable-line no-unused-vars
      stage_status, // eslint-disable-line no-unused-vars
      plan_status, // eslint-disable-line no-unused-vars
      name, // eslint-disable-line no-unused-vars
      description, // eslint-disable-line no-unused-vars
      delete_status, // eslint-disable-line no-unused-vars
      enable_status, // eslint-disable-line no-unused-vars
      status, // eslint-disable-line no-unused-vars
      last_modifier_id, // eslint-disable-line no-unused-vars
      last_modifier_name, // eslint-disable-line no-unused-vars
      last_modified_time,  // eslint-disable-line no-unused-vars     
    } = params;
    const updateField = Object.assign({},params);
    delete updateField['id'];
    const result = await Model.update(updateField, { where: { id } });

    checkUpdate(result);

    return id;
  };

  /**
   * 查询用户分页列表
   * @param {object} { attributes, pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Model.query = async ({ attributes, pagination = {}, filter = {}, sort = [] }) => {
    const { page, pageSize: limit } = pagination;
    const { keywordsLike, status } = filter;
    const order = getSortInfo(sort);
    const condition = {
      offset: (page - 1) * limit,
      limit,
      order,
      attributes,
      where: {},
    };

    if (status) {
      condition.where.enable_status = status;
    }

    if (keywordsLike) {
      condition.where[Op.or] = [
        { username: { [Op.like]: `%%${keywordsLike}%%` } },
        { name: { [Op.like]: `%%${keywordsLike}%%` } },
        { linkMan: { [Op.like]: `%%${keywordsLike}%%` } },
        { linkPhone: { [Op.like]: `%%${keywordsLike}%%` } },
        { servicePhone: { [Op.like]: `%%${keywordsLike}%%` } },
      ];
    }

    const { count, rows } = await Model.findAndCountAll(condition);

    return { page, count, rows };
  };

  /**
   * 根据uuid获取用户
   * @param {object} { pagination, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Model.get = async ({ id, attributes }) => {
    return await Model.findOne({
      attributes,
      where: { id },
    });
  };

  /**
   * 查询类别列表
   * @param {object} { orgUuid, attributes, filter } - 条件
   * @return {object|null} - 查找结果
   */
  Model.getListAndCountAll = async ({ filter, pageNum, pageSize, attributes }) => {
    const limit = parseInt(pageSize);
    let whereFilter = {};
    if (filter !== undefined) {
      // const objFilter = JSON.parse(filter);
      const objFilter = filter;
      whereFilter = { ...whereFilter, ...objFilter };
    }
    const condition = {
      offset: (pageNum - 1) * limit,
      limit,
      // order,
      attributes,
      where: whereFilter,
    };
    const { count, rows } = await Model.findAndCountAll(condition);
    const list = rows;
    const total = count;
    const totalPage = Math.ceil(count / pageSize);
    return { pageNum, pageSize, total, totalPage, list };
  };

  return Model;
};

