#!/bin/bash

# FILENAME="./test.txt"
FILENAME=$1

BASENAME="${FILENAME%.*}";
EXTENSION="${FILENAME##*.}";

echo "${BASENAME}"
echo "${EXTENSION}"

fileCsv="${BASENAME}-csv.${EXTENSION}"
sed 's/\t/,/g' ${FILENAME} > ${fileCsv}

fileJson="${fileCsv%.*}-json.${EXTENSION}"
node ./schema.js ${fileCsv} > ${fileJson}

# 对 fileJson 去除 \' 号, 去除 single quotation mark
fileJsonNoQuotation="${fileCsv%.*}-json-no-quotation.${EXTENSION}"
sed -e "s/'//g" ${fileJson} > ${fileJsonNoQuotation}

# 添加头部和尾部
schemaHead="./schema-head.txt"
schemaTail="./schema-tail.txt"
schemaJs="${BASENAME}.js"

cat ${schemaHead} > ${schemaJs}
# sed '1d' ${fileJson} >> "${schemaJs}"
sed '1d' ${fileJsonNoQuotation} >> "${schemaJs}"
cat ${schemaTail} >> ${schemaJs}

# cat "${schemaJs}"