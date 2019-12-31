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

readFileToArr('./field.txt', data => {
  console.log('data ', data);
  // let ret = {}
  // for (line of data) {
  //   console.log(line)
  //   let arr = line.trim().split(',')

  //   ret[arr[0]] = { 'type' : typeFormat(arr[1], arr[2]), 'allowNull': allowNull(arr[3]) }
  //   // console.log(ret[arr[0]])

  //   // ret[line] = {}

  // }
  // console.log(ret)
});

function typeFormat(str, value) {
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
    case 'decimal':
      ret = `DECIMAL(${value})`;
      break;

  }
  return ret;
}

function allowNull(str) {
  let ret = str;
  if (str === 'False') {
    ret = 'false';
  }
  if (str === 'True') {
    ret = 'true';
  }
  return ret;
}
