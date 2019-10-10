'use strict';

module.exports = app => {
  const { Sequelize, model, getSortInfo, checkUpdate } = app;
  const { Op } = Sequelize;
  const ModelSchema = require('../../schema/pms_grant_restricted_stock_unit.js')(app);
  const Model = model.define('pms_grant_restricted_stock_unit', ModelSchema);

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
    const { id,
      sn,
      stage_sn,
      employee_sn,
      plan_grant_date,
      plan_grant_price,
      plan_grant_number,
      plan_own_date,
      plan_end_date,
      plan_user_id,
      exercicse_status,
      stage_status,
      plan_status,
      name,
      description,
      delete_status,
      enable_status,
      status,
      last_modifier_id,
      last_modifier_name,
      last_modified_time,      
    } = params;
    const updateField = {
      sn,
      stage_sn,
      employee_sn,
      plan_grant_date,
      plan_grant_price,
      plan_grant_number,
      plan_own_date,
      plan_end_date,
      plan_user_id,
      exercicse_status,
      stage_status,
      plan_status,
      name,
      description,
      delete_status,
      enable_status,
      status,
      last_modifier_id,
      last_modifier_name,
      last_modified_time,  
    };
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

