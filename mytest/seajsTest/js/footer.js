var $=require('jquery');
var fullYear = new Date().getFullYear();
module.exports=function(contains,startYear,info){
	$(contains).html("Copyright ©"+startYear+"-"+fullYear+" "+info);
};