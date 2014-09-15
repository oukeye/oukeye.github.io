require.config({　　　　
    baseUrl: "js",
    paths: {　　　　　　
        "jquery": "jquery.min",
        "jquery-ui": "jquery-ui.min",
        "jquery-fullPage": "jquery.fullPage.min"　　　　
    },
    shim: {　　　　　　
        'jquery': {　　　　　　　　
            exports: 'jQuery'　　　　　　
        },
        'jquery-ui': {　　　　　　　　
            deps: ['jquery'],
            exports: 'jquery-ui'　　　　　　
        },
        'jquery-fullPage': {　　　　　　　　
            deps: ['jquery', 'jquery-ui'],
            exports: 'jQuery.fn.fullpage'　　　　　　
        }　　　　
    },
    map: {
      '*': {
        css: 'css.min'
      }
    }
});
require([
	'image!./style/images/s1_bg.jpg',
	'image!./style/images/s2_bg.jpg',
	'image!./style/images/s3_bg.jpg',
	'css!../style/style.css',
	'css!../style/jquery.fullPage.css',
	'jquery',
	'jquery-ui',
	'jquery-fullPage'
	], function(moduleA, moduleB, moduleC) {
　        jQuery.fn.fullpage({
            slidesColor: ['#0075D1', '#196a73', '#050505'],
            anchors: ['page1', 'page2', 'page3'],
            css3: true,
            menu: '#menu',
            afterRender: function() {
                $('.screen-main .item').each(function() {
                    var $rel = $(this).attr('rel');
                    var $arr = $rel.split(',');
                    $(this).animate({
                        left: $arr[2] + 'px',
                        top: $arr[3] + 'px'
                    }, 500);
                });
                $('.screen-main .animate').each(function() {
                    var $rel = $(this).attr('rel');
                    var $arr = $rel.split(',');
                    $(this).addClass('animate-sp show');
                });
            },
            afterLoad: function(anchorLink, index) {
                if (index == 1) {
                    $('.screen-main .item').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).animate({
                            left: $arr[2] + 'px',
                            top: $arr[3] + 'px'
                        }, 1000);
                    });
                    $('.screen-main .animate').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).addClass('animate-sp show');
                    });
                }
                if (index == 2) {
                    $('.inner').eq(index - 2).find('.item').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).animate({
                            left: $arr[2] + 'px',
                            top: $arr[3] + 'px'
                        }, 1000);
                    });
                    $('.inner').find(".meteorites").each(function() {
                        $(this).addClass('dh');
                    });
                    /*星星定位*/
                    $(".m-meteorShower").find(".star").each(function() {
                        var w = fRandomBy(10, $("body").width());
                        var h = fRandomBy(10, $("body").height());
                        $(this).css({
                            "left": w + 'px',
                            "top": h + 'px'
                        });
                    });
                }


                if (index == 3) {
                    $('.famous-inner').fadeIn(1000);
                }
            },
            onLeave: function(index, direction) {
                if (index == 1) {
                    $('.screen-main .item').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).animate({
                            left: $arr[0] + 'px',
                            top: $arr[1] + 'px'
                        }, 500);
                    });
                    $('.screen-main .animate').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).removeClass('animate-sp show');
                    });
                }
                if (index == 2) {
                    $('.inner').eq(index - 2).find('.item').each(function() {
                        var $rel = $(this).attr('rel');
                        var $arr = $rel.split(',');
                        $(this).animate({
                            left: $arr[0] + 'px',
                            top: $arr[1] + 'px'
                        }, 500);
                    });
                }

                if (index == 3) {
                    $('.famous-inner').fadeOut(1000);
                }
            }
            });
        /*在一定范围里生成随机数*/
        function fRandomBy(under, over) {
            switch (arguments.length) {
                case 1:
                    return parseInt(Math.random() * under + 1);
                case 2:
                    return parseInt(Math.random() * (over - under + 1) + under);
                default:
                    return 0;
            }
        }
    
});
