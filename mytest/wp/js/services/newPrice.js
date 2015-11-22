myApp.factory('price', function($resource, $interval, $timeout) {

    // var SjData = $resource('../data/sj.json', {});

    // SjData.query({},function(){},function(){});
    var _priceData = {
        "XAG1": {
            "contractCode": "XAG1",
            "newPrice": 2900,
            "openPrice": "2927",
            "highestPrice": "2957",
            "lowestPrice": "2890",
            "closingPrice": "2931",
            "startTime": "1448049601000",
            "statue": 1
        },
        "CU": {
            "contractCode": "CU",
            "newPrice": "35315",
            "openPrice": "35821",
            "highestPrice": "36196",
            "lowestPrice": "35308",
            "closingPrice": "35713",
            "startTime": "1448045998000",
            "statue": 1
        },
        "OIL": {
            "contractCode": "OIL",
            "newPrice": "372.37",
            "openPrice": "374.45",
            "highestPrice": "381.02",
            "lowestPrice": "370.65",
            "closingPrice": "374.30",
            "startTime": "1448049603000",
            "statue": 1
        }
    };

    var _priceData2 = {
        "XAG1": {
            "contractCode": "XAG1",
            "newPrice": 2900,
            "openPrice": "2927",
            "highestPrice": "2957",
            "lowestPrice": "2890",
            "closingPrice": "2931",
            "startTime": "1448049601000",
            "statue": 1
        },
        "CU": {
            "contractCode": "CU",
            "newPrice": "35315",
            "openPrice": "35821",
            "highestPrice": "36196",
            "lowestPrice": "35308",
            "closingPrice": "35713",
            "startTime": "1448045998000",
            "statue": 1
        },
        "OIL": {
            "contractCode": "OIL",
            "newPrice": "372.37",
            "openPrice": "374.45",
            "highestPrice": "381.02",
            "lowestPrice": "370.65",
            "closingPrice": "374.30",
            "startTime": "1448049603000",
            "statue": 1
        }
    };

    var _numlength = function(num) {
        if (typeof(num) != "undefined") {
            var _list = num.toString().split(".");
            if (typeof(_list[1]) != "undefined") {
                return _list[1].length;
            }

        } else {
            return 0;
        }

    };
    var _newRandomNum = function(max, min, num) {
        var randKey = parseFloat(Math.random() * (max - min + 1) + min).toFixed(_numlength(num));
        return randKey;
    };
    var showBorderTimer = {};
    var timer = $interval(function() {
        var _p = parseFloat(_newRandomNum(-3, 1, _priceData.XAG1.newPrice));
        if (_p > 0) {
            _priceData.XAG1.showBorder = 'show-border';
            $timeout.cancel(showBorderTimer);
            showBorderTimer = $timeout(function() {
                _priceData.XAG1.showBorder = '';
            }, 1000);
            if (_priceData.XAG1.changeType != 'up') {
                _priceData.XAG1.changeType = 'up';
            }

        } else if(_p<0) {
            _priceData.XAG1.showBorder = 'show-border';
            $timeout.cancel(showBorderTimer);
            showBorderTimer = $timeout(function() {
                _priceData.XAG1.showBorder = '';
            }, 1000);
            if (_priceData.XAG1.changeType != 'down') {
                _priceData.XAG1.changeType = 'down';

            }
        }

        _priceData.XAG1.newPrice += _p;
    }, 3000); // 150 ms, 10 times
    return {
        getPriceData: function() {

            return _priceData;
        },
        getKline: function() {
            return _kline;
        }

    }

});
