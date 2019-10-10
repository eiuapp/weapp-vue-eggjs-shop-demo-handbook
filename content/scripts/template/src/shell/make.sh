#!/bin/bash

WORK_PATH=$(dirname $(readlink -f $0))
TEMPLATE_PATH="../template/"
TARGET_PATH="$1"
echo "${WORK_PATH}"
echo "${TEMPLATE_PATH}"
echo "${TARGET_PATH}"

MS="$2"
TABLE="$3"

# controller
cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd controller
controllerFilePath="${TARGET_PATH}/app/controller/${MS}/${TABLE}.js"
cp temp.bak.js ${controllerFilePath}
echo "cp temp.bak.js ${controllerFilePath}"
echo "
  change the target file: 
    1. line 15: 
        this.ctxService = this.ctx.service.pms.pmsGrantRestrictedStockUnit;
      to
        this.ctxService = this.ctx.service.${MS}.${TABLE}
    2. fix the rule by hand
  "

service=`node ${WORK_PATH}/tuoFengToLine.js oms_order_item`
echo "the service is: ${service}"

echo "start change the file service name "
sed -i "s/pms.pmsGrantRestrictedStockUnit/${MS}.${service}/" ${controllerFilePath} 
echo "end change the file service name, but you must fix the rule by hand."

# service
cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd service
serviceFilePath="${TARGET_PATH}/app/service/${MS}/${TABLE}.js"
cp temp.bak.js ${serviceFilePath}
echo "cp temp.bak.js ${serviceFilePath}"
echo "
  change the target file: 
    1. line 35: 
        this.ctxModel = this.app.model.Pms.PmsGrantRestrictedStockUnit;
      to
        this.ctxModel = this.app.model.${MS}.${TABLE};
    2. fix the tableFields by hand
  "
model=`node ${WORK_PATH}/tuoFengToLine.js oms_order_item`
echo "the service is: ${service}"

echo "start change the file model name "
sed -i "s/Pms.PmsGrantRestrictedStockUnit/${MS^}.${service^}/" ${serviceFilePath} 
echo "end change the file model name, but you must fix the tableFields by hand."


# model
cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd model
modelFilePath="${TARGET_PATH}/app/model/${MS}/${TABLE}.js"
cp temp.bak.js ${modelFilePath}
echo "cp temp.bak.js ${modelFilePath}"
echo "
  change the target file: 
    1. line 6,7: 
        const ModelSchema = require('../../schema/pms_grant_restricted_stock_unit.js')(app);
        const Model = model.define('pms_grant_restricted_stock_unit', ModelSchema);
      to
        const ModelSchema = require('../../schema/${TABLE}.js')(app);
        const Model = model.define('${TABLE}', ModelSchema);
    2. fix the updateField by hand
  "
model=`node ${WORK_PATH}/tuoFengToLine.js oms_order_item`
echo "the model is: ${model}"

echo "start change the file model name "
sed -i "s/pms_grant_restricted_stock_unit/${TABLE,,}/g" ${modelFilePath} 
echo "end change the file model name, but you must fix the updateField by hand."

# schema
# cd ${WORK_PATH}

cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd schema

echo "start schema shell script"
cd ../../../../schema
./schema.sh ./test.txt
echo "end schema shell script"

schemaFilePath="${TARGET_PATH}/app/schema/${TABLE}.js"
cp ${WORK_PATH}/../../../schema/test.js ${TARGET_PATH}/app/schema/${TABLE}.js

