'use strict';

module.exports = app => {
  const { STRING, BIGINT, INTEGER, DECIMAL, DATE, DATEONLY, ENUM, CHAR } = app.Sequelize;

  return {
    id: { type: BIGINT(20), allowNull: false,
      primaryKey: true,
      autoIncrement: true },
    sn: { type: STRING(20),
        unique: true },
  stage_sn: { type: STRING(20), allowNull: false },
  employee_sn: { type: STRING(20), allowNull: false },
  plan_grant_date: { type: DATE },
  plan_grant_price: { type: DECIMAL(10) },
  plan_grant_number: { type: INTEGER(11) },
  plan_own_date: { type: DATE },
  plan_end_date: { type: DATE },
  plan_user_id: { type: INTEGER(11) },
  exercicse_status: { type: ENUM('nonexistent','pending','resolved','rejected','canceled'), allowNull: false },
  plan_status: { type: ENUM('done', 'doing', 'todo'), allowNull: false },
  stage_status: { type: ENUM('done', 'doing', 'todo'), allowNull: false },
  name: { type: STRING(100) },
  description: { type: STRING(200) },
  delete_status: { type: INTEGER(1), allowNull: false },
  enable_status: { type: INTEGER(1), allowNull: false },
  status: { type: INTEGER(1), allowNull: false },
  last_modifier_id: { type: STRING(38) },
  last_modifier_name: { type: STRING(76) },
  last_modified_time: { type: DATE },
  creator_id: { type: STRING(38), allowNull: false },
  creator_name: { type: STRING(76) },
  created_time: { type: DATE } }

};