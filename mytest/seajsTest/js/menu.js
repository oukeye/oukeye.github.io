var $=jQuery=require('jquery');
require('../js/superSlide/2.1.1/superSlide.js');
// no-need-to-wrap.js
// 执行前不会进行包装
seajs.use('../js/common.js?nowrap', function(ab) {
	console.log(ab);
});
module.exports=function(div){
	 jQuery(div).slide({ type:"menu",  titCell:".m", targetCell:".sub", effect:"slideDown", delayTime:300, triggerTime:100,returnDefault:true  });
};