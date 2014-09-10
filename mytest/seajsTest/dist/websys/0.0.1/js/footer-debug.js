define("websys/0.0.1/js/footer-debug", ["jquery/1.10.1/jquery-debug"], function(require, exports, module) {
  var $ = require("jquery/1.10.1/jquery-debug");
  var fullYear = new Date().getFullYear();
  module.exports = function(contains, startYear, info) {
    $(contains).html("Copyright ©" + startYear + "-" + fullYear + " " + info);
  };
});