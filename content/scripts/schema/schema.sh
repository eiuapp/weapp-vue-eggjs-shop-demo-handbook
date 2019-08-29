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

schemaHead="./schema-head.txt"
schemaTail="./schema-tail.txt"
schemaJs="${BASENAME}.js"

cat ${schemaHead} > ${schemaJs}
sed '1d' ${fileJson} >> "${schemaJs}"
cat ${schemaTail} >> ${schemaJs}

# cat "${schemaJs}"