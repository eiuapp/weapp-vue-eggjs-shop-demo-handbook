// https://blog.csdn.net/yajie_china/article/details/79407851
// node.js使用readline按行读取文件内容

const fs = require('fs');
const readline = require('readline');

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName, callback) {
  const fRead = fs.createReadStream(fReadName);
  const objReadline = readline.createInterface({
    input: fRead,
  });
  const arr = new Array();
  objReadline.on('line', function(line) {
    arr.push(line);
    // console.log('line:'+ line);
  });
  objReadline.on('close', function() {
    // console.log(arr);
    callback(arr);
  });
}

const arguments = process.argv.splice(2);
// console.log('所传递的参数是：', arguments);

// ////////////////////////
// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

// readFileToArr("./test-tab-2-comma.txt", (data) => {
readFileToArr(arguments[0], data => {
  // console.log("data ", data)
  const ret = {};
  for (line of data) {
    // console.log(line)
    const arr = line.trim().split(',');
    if (arr[3] === 'True') {
      ret[arr[0]] = { type: typeFormat(arr[1], arr[2]), allowNull: false };
    } else {
      ret[arr[0]] = { type: typeFormat(arr[1], arr[2]) };
    }
    // console.log(ret[arr[0]])

    // ret[line] = {}

  }
  console.log(ret);
});

function typeFormat(str, value) {
  // console.log("str, value", str, value);
  // https://itbilu.com/nodejs/npm/N1XuSG-QW.html#api-DATE
  let ret = str;
  switch (str) {
    case 'bigint':
      ret = `BIGINT(${value})`;
      break;
    case 'varchar':
      ret = `STRING(${value})`;
      break;
    case 'int':
      ret = `INTEGER(${value})`;
      break;
    case 'text':
      ret = 'TEXT(\'tiny\')';
      break;
    case 'datetime':
      ret = 'DATE';
      break;
    case 'date':
      ret = 'DATEONLY';
      break;
    case 'decimal':
      ret = `DECIMAL(${value})`;
      break;
    case 'char':
      ret = `CHAR(${value})`;
      break;
    case 'enum':
      ret = 'ENUM()';
      break;
  }
  return ret;
}

function allowNull(str) {
  let ret = true;
  if (str === 'True') {
    ret = false;
  }

  return ret;
}

function allowNull_A(str) {
  let ret = str;
  if (str === 'False') {
    ret = 'false';
  }
  if (str === 'True') {
    ret = 'true';
  }
  return ret;
}

function allowNull_B(str) {
  let ret = 'true';
  if (str === 'False') {
    ret = 'true';
  }
  if (str === 'True') {
    ret = 'false';
  }
  return ret;
}

function allowNull_C(str) {
  let ret = 'true';
  if (str === 'True') {
    ret = 'false';
  }
  return ret;
}

