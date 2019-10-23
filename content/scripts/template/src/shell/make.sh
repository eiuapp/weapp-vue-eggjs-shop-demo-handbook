#!/bin/bash
# example
# ./make.sh /home/ubuntu/code-server/chat/chat-admin-server oms oms_order_item
# ./make.sh /home/ubuntu/code-server/chat/chat-admin-server oms oms_order_item
# ./make.sh /home/ubuntu/code-server/chat/chat-admin-server oms oms_order_item
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_option
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_restricted_stock
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_option
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_restricted_stock
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_restricted_stock_unit
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server pms pms_trade_sars
# ./make.sh /home/ubuntu/code-server/fangyuan/fangyuan-server bms bms_broker_company

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

service=`node ${WORK_PATH}/tuoFengToLine.js ${TABLE}`
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

echo "start change the file"
sed -i "s/pms_grant_restricted_stock_unit/${TABLE,,}/g" ${modelFilePath} 
echo "end change the file"
echo "you must by hand:
    1. fix the updateField.
  "

# schema
cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd schema
schemaDirPath="${WORK_PATH}/../../../schema"

echo "start schema shell script"
cd ${schemaDirPath}
./schema.sh ./test.txt
echo "end schema shell script"

schemaFilePath="${TARGET_PATH}/app/schema/${TABLE}.js"
cp ${schemaDirPath}/test.js ${TARGET_PATH}/app/schema/${TABLE}.js

echo "start change the file"
sed -i "s/pms_grant_restricted_stock_unit/${TABLE,,}/g" ${modelFilePath} 
echo "end change the file"

echo "you must by hand:
    1. fix the updateField.
    2. if have enum item, you must fill enum if necessary.
  "

# test
cd ${WORK_PATH}
cd ${TEMPLATE_PATH}
cd test
testFilePath="${TARGET_PATH}/test/controller/${MS}/${TABLE}.test.js"
cp temp.bak.js ${testFilePath}

echo "start change the file"
sed -i "s/pms\/pms_stage_option.test.js/${MS}\/${TABLE}.test.js/g" ${testFilePath} 
echo "end change the file"
echo "you must by hand:
    1. fill router.
    2. fill snPrefix and rule field if necessary.
  "

# print manual info 
echo "------------------------------------------------------"
cd ${schemaDirPath}
for line in `cat ./field.txt`; do
  echo "${line},"
done
echo "------------------------------------------------------"
./field.sh 