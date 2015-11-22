myApp.factory('windowInfo', function() {
        var windowInfo = {};
        var _h = $(window).height();
        var _w = $(window).width();
        console.log(' window.screen.height  is ' + _h);
        windowInfo.height = _h;
        windowInfo.width = _w;
        return {
            getWindowInfo: function() {
                return windowInfo;
            },
            setWindowInfo: function(_height, _width) {
                windowInfo.height = _height;
                windowInfo.width = _width;
            }
        }

    });
