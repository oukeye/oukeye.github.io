// common.js 是一个 CommonJS 模块，无须手写 define 块
var a = 1;
var b = 2;

module.exports = function () {
  return a + b;
};