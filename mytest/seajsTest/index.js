var $ = require('jquery');
var menu = require('./js/menu');
var footer = require('./js/footer');
module.exports = function() {
    menu(".nav");
    footer("#footer .copyRight", "2011", " oukeye.github.io");
    jQuery(".slideTxtBox").slide({});
    jQuery(".focusBox").slide({
        titCell: ".num li",
        mainCell: ".pic",
        effect: "fold",
        autoPlay: true,
        trigger: "click",
        startFun: function(i) {
            jQuery(".focusBox .txt li").eq(i).animate({
                "bottom": 0
            }).siblings().animate({
                "bottom": -36
            });
        }
    });
    jQuery(".banner").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "fold",
        autoPlay: true,
        autoPage: true,
        trigger: "click"
    });
    jQuery("#sideMenu").slide({
        titCell: ".hd",
        targetCell: ".bd",
        effect: "slideDown",
        trigger: "click"
    });
    jQuery("#txtMarqueeTop").slide({
        mainCell: "ul",
        autoPlay: true,
        effect: "topMarquee",
        interTime: 50,
        vis: 7
    });
    jQuery(".adSlide").slide({
        titCell: ".hd ul",
        mainCell: ".bd ul",
        autoPlay: true,
        effect: "top",
        autoPage: true
    });
    jQuery(".picScroll").slide({
        mainCell: "ul",
        autoPlay: true,
        effect: "left",
        vis: 5,
        scroll: 2,
        autoPage: true,
        pnLoop: false
    });
    jQuery("#sideMenu").slide({
        titCell: ".hd",
        targetCell: ".bd",
        effect: "slideDown",
        trigger: "click"
    });
    jQuery(".friendLink").slide({
        mainCell: "ul",
        autoPlay: true,
        effect: "leftMarquee",
        interTime: 50,
        vis: 6
    });
    jQuery("#topBar").slide({
        mainCell: "ul",
        autoPlay: true,
        effect: "topLoop"
    });
}
