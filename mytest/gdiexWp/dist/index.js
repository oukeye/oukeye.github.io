/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

	__webpack_require__(6);

	angular.element().ready(function() {
		angular.bootstrap(document, ['starter']);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ionic.bundle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = window.jQuery;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = window.echarts;

/***/ },
/* 5 */
/***/ function(module, exports) {

	(function () {'use strict';
	/**
	 * generate directive link function
	 *
	 * @param {Service} $http, http service to make ajax requests from angular
	 * @param {String} type, chart type
	 */
	function getLinkFunction($http, theme, util, type) {
	    return function (scope, element, attrs) {
	        scope.config = scope.config || {};
	        var ndWrapper = element.find('div')[0], ndParent = element.parent()[0], parentWidth = ndParent.clientWidth, parentHeight = ndParent.clientHeight, width, height, chart;
	        var chartEvent = {};
	        function getSizes(config) {
	            width = config.width || parseInt(attrs.width) || parentWidth || 320;
	            height = config.height || parseInt(attrs.height) || parentHeight || 240;
	            ndWrapper.style.width = width + 'px';
	            ndWrapper.style.height = height + 'px';
	        }
	        function getOptions(data, config, type) {
	            // merge default config
	            config = angular.extend({
	                showXAxis: true,
	                showYAxis: true,
	                showLegend: true
	            }, config);
	            var xAxis = angular.extend({
	                    orient: 'top',
	                    axisLine: { show: false }
	                }, angular.isObject(config.xAxis) ? config.xAxis : {});
	            var yAxis = angular.extend({
	                    type: 'value',
	                    orient: 'right',
	                    scale: false,
	                    axisLine: { show: false },
	                    axisLabel: {
	                        formatter: function (v) {
	                            return util.formatKMBT(v);
	                        }
	                    }
	                }, angular.isObject(config.yAxis) ? config.yAxis : {});
	            // basic config
	            var options = {
	                    title: util.getTitle(data, config, type),
	                    tooltip: util.getTooltip(data, config, type),
	                    legend: util.getLegend(data, config, type),
	                    toolbox: angular.extend({ show: false }, angular.isObject(config.toolbox) ? config.toolbox : {}),
	                    xAxis: [ angular.extend(xAxis, util.getAxisTicks(data, config, type)) ],
	                    yAxis: [ yAxis ],
	                    series: util.getSeries(data, config, type)
	                };
	            if (!config.showXAxis) {
	                angular.forEach(options.xAxis, function (axis) {
	                    axis.axisLine = { show: false };
	                    axis.axisLabel = { show: false };
	                    axis.axisTick = { show: false };
	                });
	            }
	            if (!config.showYAxis) {
	                angular.forEach(options.yAxis, function (axis) {
	                    axis.axisLine = { show: false };
	                    axis.axisLabel = { show: false };
	                    axis.axisTick = { show: false };
	                });
	            }
	            if (!config.showLegend || type === 'gauge' || type === 'map') {
	                delete options.legend;
	            }
	            if (!util.isAxisChart(type)) {
	                delete options.xAxis;
	                delete options.yAxis;
	            }
	            if (config.dataZoom) {
	                options.dataZoom = angular.extend({
	                    show: true,
	                    realtime: true
	                }, config.dataZoom);
	            }
	            if (config.dataRange) {
	                options.dataRange = angular.extend({}, config.dataRange);
	            }
	            if (config.polar) {
	                options.polar = config.polar;
	            }
	            if (config.grid) {
	                options.grid = config.grid;
	            }
	            return options;
	        }
	        var isAjaxInProgress = false;
	        var textStyle = {
	                color: 'red',
	                fontSize: 36,
	                fontWeight: 900,
	                fontFamily: 'Microsoft Yahei, Arial'
	            };
	        function setOptions() {
	            if (!scope.data || !scope.config) {
	                return;
	            }
	            var options;
	            getSizes(scope.config);
	            if (!chart) {
	                chart = echarts.init(ndWrapper, theme.get(scope.config.theme || 'macarons'));
	            }
	            if (scope.config.event) {
	                if (!Array.isArray(scope.config.event)) {
	                    scope.config.event = [scope.config.event];
	                }
	                if (Array.isArray(scope.config.event)) {
	                    scope.config.event.forEach(function (ele) {
	                        if (!chartEvent[ele.type]) {
	                            chartEvent[ele.type] = true;
	                            chart.on(ele.type, function (param) {
	                                ele.fn(param);
	                            });
	                        }
	                    });
	                }
	            }
	            // string type for data param is assumed to ajax datarequests
	            if (angular.isString(scope.data)) {
	                if (isAjaxInProgress) {
	                    return;
	                }
	                isAjaxInProgress = true;
	                // show loading
	                chart.showLoading({
	                    text: scope.config.loading || '\u594B\u529B\u52A0\u8F7D\u4E2D...',
	                    textStyle: textStyle
	                });
	                // fire data request
	                $http.get(scope.data).success(function (response) {
	                    isAjaxInProgress = false;
	                    chart.hideLoading();
	                    if (response.data) {
	                        options = getOptions(response.data, scope.config, type);
	                        if (scope.config.forceClear) {
	                            chart.clear();
	                        }
	                        if (options.series.length) {
	                            chart.setOption(options);
	                            chart.resize();
	                        } else {
	                            chart.showLoading({
	                                text: scope.config.errorMsg || '\u6CA1\u6709\u6570\u636E',
	                                textStyle: textStyle
	                            });
	                        }
	                    } else {
	                        chart.showLoading({
	                            text: scope.config.emptyMsg || '\u6570\u636E\u52A0\u8F7D\u5931\u8D25',
	                            textStyle: textStyle
	                        });
	                    }
	                }).error(function (response) {
	                    isAjaxInProgress = false;
	                    chart.showLoading({
	                        text: scope.config.emptyMsg || '\u6570\u636E\u52A0\u8F7D\u5931\u8D25',
	                        textStyle: textStyle
	                    });
	                });    // if data is avaliable, render immediately
	            } else {
	                options = getOptions(scope.data, scope.config, type);
	                if (scope.config.forceClear) {
	                    chart.clear();
	                }
	                if (options.series.length) {
	                    chart.setOption(options);
	                    chart.resize();
	                } else {
	                    chart.showLoading({
	                        text: scope.config.errorMsg || '\u6CA1\u6709\u6570\u636E',
	                        textStyle: textStyle
	                    });
	                }
	            }
	        }
	        // update when charts config changes
	        scope.$watch(function () {
	            return scope.config;
	        }, function (value) {
	            if (value) {
	                setOptions();
	            }
	        }, true);
	        scope.$watch(function () {
	            return scope.data;
	        }, function (value) {
	            if (value) {
	                setOptions();
	            }
	        }, true);
	    };
	}
	/**
	 * add directives
	 */
	var app = angular.module('angular-echarts', ['angular-echarts.theme', 'angular-echarts.util']);
	var types = ['line', 'bar', 'area', 'pie', 'donut', 'gauge', 'map', 'radar'];
	for (var i = 0, n = types.length; i < n; i++) {
	    (function (type) {
	        app.directive(type + 'Chart', ['$http', 'theme', 'util', function ($http, theme, util) {
	                    return {
	                        restrict: 'EA',
	                        template: '<div></div>',
	                        scope: {
	                            config: '=config',
	                            data: '=data'
	                        },
	                        link: getLinkFunction($http, theme, util, type)
	                    };
	                }]);
	    }(types[i]));
	}
	'use strict';
	/**
	 * util services
	 */
	angular.module('angular-echarts.util', []).factory('util', function () {
	    function isPieChart(type) {
	        return ['pie', 'donut'].indexOf(type) > -1;
	    }
	    function isMapChart(type) {
	        return ['map'].indexOf(type) > -1;
	    }
	    function isAxisChart(type) {
	        return ['line', 'bar', 'area'].indexOf(type) > -1;
	    }
	    /**
	     * get x axis ticks from the 1st serie
	     */
	    function getAxisTicks(data, config, type) {
	        var ticks = [];
	        if (data[0]) {
	            angular.forEach(data[0].datapoints, function (datapoint) {
	                ticks.push(datapoint.x);
	            });
	        }
	        return {
	            type: 'category',
	            boundaryGap: type === 'bar',
	            data: ticks
	        };
	    }
	    /**
	     * get series config
	     *
	     * @param {Array} data serie data
	     * @param {Object} config options
	     * @param {String} chart type
	     */
	    function getSeries(data, config, type) {
	        var series = [];
	        angular.forEach(data, function (serie) {
	            // datapoints for line, area, bar chart
	            var datapoints = [];
	            angular.forEach(serie.datapoints, function (datapoint) {
	                datapoints.push(datapoint.y);
	            });
	            var conf = {
	                    type: type || 'line',
	                    name: serie.name,
	                    data: datapoints
	                };
	            // area chart is actually line chart with special itemStyle
	            if (type === 'area') {
	                conf.type = 'line';
	                conf.itemStyle = { normal: { areaStyle: { type: 'default' } } };
	            }
	            // gauge chart need many special config
	            if (type === 'gauge') {
	                conf = angular.extend(conf, {
	                    splitNumber: 10,
	                    // 分割段数，默认为5
	                    axisLine: {
	                        // 坐标轴线
	                        lineStyle: {
	                            // 属性lineStyle控制线条样式
	                            color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
	                            width: 8
	                        }
	                    },
	                    axisTick: {
	                        // 坐标轴小标记
	                        splitNumber: 10,
	                        // 每份split细分多少段
	                        length: 12,
	                        // 属性length控制线长
	                        lineStyle: {
	                            // 属性lineStyle控制线条样式
	                            color: 'auto'
	                        }
	                    },
	                    axisLabel: {
	                        // 坐标轴文本标签，详见axis.axisLabel
	                        textStyle: {
	                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                            color: 'auto'
	                        }
	                    },
	                    splitLine: {
	                        // 分隔线
	                        show: true,
	                        // 默认显示，属性show控制显示与否
	                        length: 30,
	                        // 属性length控制线长
	                        lineStyle: {
	                            // 属性lineStyle（详见lineStyle）控制线条样式
	                            color: 'auto'
	                        }
	                    },
	                    pointer: { width: 5 },
	                    title: {
	                        show: true,
	                        offsetCenter: [0, '-40%'],
	                        // x, y，单位px
	                        textStyle: {
	                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                            fontWeight: 'bolder'
	                        }
	                    },
	                    detail: {
	                        formatter: '{value}%',
	                        textStyle: {
	                            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                            color: 'auto',
	                            fontWeight: 'bolder'
	                        }
	                    }
	                }, config.gauge || {});
	            }
	            // datapoints for pie chart and gauges are different
	            if (!isAxisChart(type)) {
	                conf.data = [];
	                angular.forEach(serie.datapoints, function (datapoint) {
	                    conf.data.push({
	                        value: datapoint.y,
	                        name: datapoint.x
	                    });
	                });
	            }
	            if (isPieChart(type)) {
	                // donut charts are actually pie charts
	                conf.type = 'pie';
	                // pie chart need special radius, center config
	                conf.center = config.center || ['40%', '50%'];
	                conf.radius = config.radius || '60%';
	                // donut chart require special itemStyle
	                if (type === 'donut') {
	                    conf.radius = config.radius || ['50%', '70%'];
	                    conf = angular.extend(conf, {
	                        itemStyle: {
	                            normal: {
	                                label: { show: false },
	                                labelLine: { show: false }
	                            },
	                            emphasis: {
	                                label: {
	                                    show: true,
	                                    position: 'center',
	                                    textStyle: {
	                                        fontSize: '50',
	                                        fontWeight: 'bold'
	                                    }
	                                }
	                            }
	                        }
	                    }, config.donut || {});
	                } else if (type === 'pie') {
	                    conf = angular.extend(conf, {
	                        itemStyle: {
	                            normal: {
	                                label: {
	                                    position: 'inner',
	                                    formatter: function (item) {
	                                        return (+item.percent).toFixed() + '%';
	                                    }
	                                },
	                                labelLine: { show: false }
	                            },
	                            emphasis: {
	                                label: {
	                                    show: true,
	                                    formatter: '{b}\n{d}%'
	                                }
	                            }
	                        }
	                    }, config.pie || {});
	                }
	            }
	            if (isMapChart(type)) {
	                conf.type = 'map';
	                conf = angular.extend(conf, {}, config.map || {});
	            }
	            // if stack set to true
	            if (config.stack) {
	                conf.stack = 'total';
	            }
	            if (type === 'radar') {
	                conf.data = serie.data;
	            }
	            series.push(conf);
	        });
	        return series;
	    }
	    /**
	     * get legends from data series
	     */
	    function getLegend(data, config, type) {
	        var legend = { data: [] };
	        if (isPieChart(type)) {
	            if (data[0]) {
	                angular.forEach(data[0].datapoints, function (datapoint) {
	                    legend.data.push(datapoint.x);
	                });
	            }
	            legend.orient = 'verticle';
	            legend.x = 'right';
	            legend.y = 'center';
	        } else {
	            angular.forEach(data, function (serie) {
	                legend.data.push(serie.name);
	            });
	            legend.orient = 'horizontal';
	        }
	        return angular.extend(legend, config.legend || {});
	    }
	    /**
	     * get tooltip config
	     */
	    function getTooltip(data, config, type) {
	        var tooltip = {};
	        switch (type) {
	        case 'line':
	        case 'area':
	            tooltip.trigger = 'axis';
	            break;
	        case 'pie':
	        case 'donut':
	        case 'bar':
	        case 'map':
	        case 'gauge':
	            tooltip.trigger = 'item';
	            break;
	        }
	        if (type === 'pie') {
	            tooltip.formatter = '{a} <br/>{b}: {c} ({d}%)';
	        }
	        if (type === 'map') {
	            tooltip.formatter = '{b}';
	        }
	        return angular.extend(tooltip, angular.isObject(config.tooltip) ? config.tooltip : {});
	    }
	    function getTitle(data, config, type) {
	        if (angular.isObject(config.title)) {
	            return config.title;
	        }
	        return isPieChart(type) ? null : {
	            text: config.title,
	            subtext: config.subtitle || '',
	            x: 50
	        };
	    }
	    function formatKMBT(y, formatter) {
	        if (!formatter) {
	            formatter = function (v) {
	                return Math.round(v * 100) / 100;
	            };
	        }
	        y = Math.abs(y);
	        if (y >= 1000000000000) {
	            return formatter(y / 1000000000000) + 'T';
	        } else if (y >= 1000000000) {
	            return formatter(y / 1000000000) + 'B';
	        } else if (y >= 1000000) {
	            return formatter(y / 1000000) + 'M';
	        } else if (y >= 1000) {
	            return formatter(y / 1000) + 'K';
	        } else if (y < 1 && y > 0) {
	            return formatter(y);
	        } else if (y === 0) {
	            return '';
	        } else {
	            return formatter(y);
	        }
	    }
	    return {
	        isPieChart: isPieChart,
	        isAxisChart: isAxisChart,
	        getAxisTicks: getAxisTicks,
	        getSeries: getSeries,
	        getLegend: getLegend,
	        getTooltip: getTooltip,
	        getTitle: getTitle,
	        formatKMBT: formatKMBT
	    };
	});
	'use strict';
	/**
	 * theme services
	 * posible themes: infographic macarons shine dark blue green red gray default
	 */
	angular.module('angular-echarts.theme', []).factory('theme', ['infographic', 'macarons', 'shine', 'dark', 'blue', 'green', 'red', function (infographic, macarons, shine, dark, blue, green, red, grey) {
	    var themes = {
	        infographic: infographic,
	        macarons: macarons,
	        shine: shine,
	        dark: dark,
	        blue: blue,
	        green: green,
	        red: red,
	        grey: grey,
	    };

	    return {
	        get: function (name) {
	            return themes[name] ? themes[name] : {};
	        },
	    };

	}]);
	'use strict';
	/**
	 * blue theme
	 */
	angular.module('angular-echarts.theme').factory('blue', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#1790cf','#1bb2d8','#99d2dd','#88b0bb',
	                    '#1c7099','#038cc4','#75abd0','#afd6dd'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#1790cf'
	            }
	        },
	        // 值域
	        dataRange: { color: ['#1178ad','#72bbd0'] },
	        // 工具箱
	        toolbox: { color: ['#1790cf','#1790cf','#1790cf','#1790cf'] },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(0,0,0,0.5)',
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#1790cf',
	                    type: 'dashed'
	                },
	                crossStyle: { color: '#1790cf' },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.3)'
	                }
	            }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#eee',
	            // 数据背景颜色
	            fillerColor: 'rgba(144,197,237,0.2)',
	            // 填充颜色
	            handleColor: '#1790cf'    // 手柄颜色
	        },
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#1790cf'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#1790cf'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        timeline: {
	            lineStyle: { color: '#1790cf' },
	            controlStyle: {
	                normal: { color: '#1790cf' },
	                emphasis: { color: '#1790cf' }
	            }
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#1bb2d8',
	                    // 阳线填充颜色
	                    color0: '#99d2dd',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#1c7099',
	                        // 阳线边框颜色
	                        color0: '#88b0bb'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#99d2dd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#1790cf' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#1bb2d8'],[0.8, '#1790cf'],[1, '#1c7099']],
	                    width: 8
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 10,
	                // 每份split细分多少段
	                length: 12,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 18,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                length: '90%',
	                color: 'auto'
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#333'
	                }
	            },
	            detail: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * dark theme
	 */
	angular.module('angular-echarts.theme').factory('dark', function () {
	    return {
	        // 全图默认背景
	        backgroundColor: '#1b1b1b',
	        // 默认色板
	        color: [
	                    '#FE8463','#9BCA63','#FAD860','#60C0DD','#0084C6',
	                    '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
	                    '#B5C334'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#fff'    // 主标题文字颜色
	            }
	        },
	        // 图例
	        legend: {
	            itemGap: 8,
	            textStyle: {
	                color: '#ccc'    // 图例文字颜色
	            }
	        },
	        // 值域
	        dataRange: {
	            itemWidth: 15,
	            color: ['#FFF808','#21BCF9'],
	            textStyle: {
	                color: '#ccc'    // 值域文字颜色
	            }
	        },
	        toolbox: {
	            color: ['#fff', '#fff', '#fff', '#fff'],
	            effectiveColor: '#FE8463',
	            disableColor: '#666',
	            itemGap: 8
	        },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(250,250,250,0.8)',
	            // 提示背景颜色，默认为透明度为0.7的黑色
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#aaa'
	                },
	                crossStyle: { color: '#aaa' },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.2)'
	                }
	            },
	            textStyle: { color: '#333' }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#555',
	            // 数据背景颜色
	            fillerColor: 'rgba(200,200,200,0.2)',
	            // 填充颜色
	            handleColor: '#eee'    // 手柄颜色
	        },
	        // 网格
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                show: false
	            },
	            axisTick: {
	                // 坐标轴小标记
	                show: false
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#ccc'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                show: false
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                show: false
	            },
	            axisTick: {
	                // 坐标轴小标记
	                show: false
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#ccc'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#aaa'],
	                    type: 'dashed'
	                }
	            },
	            splitArea: {
	                // 分隔区域
	                show: false
	            }
	        },
	        polar: {
	            name: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#ccc'
	                }
	            },
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#ddd'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
	            },
	            splitLine: { lineStyle: { color: '#ddd' } }
	        },
	        timeline: {
	            label: { textStyle: { color: '#ccc' } },
	            lineStyle: { color: '#aaa' },
	            controlStyle: {
	                normal: { color: '#fff' },
	                emphasis: { color: '#FE8463' }
	            },
	            symbolSize: 3
	        },
	        // 折线图默认参数
	        line: { smooth: true },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#FE8463',
	                    // 阳线填充颜色
	                    color0: '#9BCA63',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#FE8463',
	                        // 阳线边框颜色
	                        color0: '#9BCA63'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        // 雷达图默认参数
	        radar: {
	            symbol: 'emptyCircle',
	            // 图形类型
	            symbolSize: 3    //symbol: null,         // 拐点图形类型
	                 //symbolRotate: null,  // 图形旋转控制
	        },
	        pie: {
	            itemStyle: {
	                normal: {
	                    borderWidth: 1,
	                    borderColor: 'rgba(255, 255, 255, 0.5)'
	                },
	                emphasis: {
	                    borderWidth: 1,
	                    borderColor: 'rgba(255, 255, 255, 1)'
	                }
	            }
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    borderColor: 'rgba(255, 255, 255, 0.5)',
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#ccc' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#FE8463' },
	                    label: { textStyle: { color: 'ccc' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#fff' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(228, 228, 228, 0.2)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(228, 228, 228, 0.2)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(228, 228, 228, 0.9)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(228, 228, 228, 0.9)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#9BCA63'],[0.8, '#60C0DD'],[1, '#D7504B']],
	                    width: 3,
	                    shadowColor: '#fff',
	                    //默认透明
	                    shadowBlur: 10
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                length: 15,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto',
	                    shadowColor: '#fff',
	                    //默认透明
	                    shadowBlur: 10
	                }
	            },
	            axisLabel: {
	                // 坐标轴小标记
	                textStyle: {
	                    // 属性lineStyle控制线条样式
	                    fontWeight: 'bolder',
	                    color: '#fff',
	                    shadowColor: '#fff',
	                    //默认透明
	                    shadowBlur: 10
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 25,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    width: 3,
	                    color: '#fff',
	                    shadowColor: '#fff',
	                    //默认透明
	                    shadowBlur: 10
	                }
	            },
	            pointer: {
	                // 分隔线
	                shadowColor: '#fff',
	                //默认透明
	                shadowBlur: 5
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder',
	                    fontSize: 20,
	                    fontStyle: 'italic',
	                    color: '#fff',
	                    shadowColor: '#fff',
	                    //默认透明
	                    shadowBlur: 10
	                }
	            },
	            detail: {
	                shadowColor: '#fff',
	                //默认透明
	                shadowBlur: 5,
	                offsetCenter: [0, '50%'],
	                // x, y，单位px
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder',
	                    color: '#fff'
	                }
	            }
	        },
	        funnel: {
	            itemStyle: {
	                normal: {
	                    borderColor: 'rgba(255, 255, 255, 0.5)',
	                    borderWidth: 1
	                },
	                emphasis: {
	                    borderColor: 'rgba(255, 255, 255, 1)',
	                    borderWidth: 1
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * green theme
	 */
	angular.module('angular-echarts.theme').factory('green', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#408829','#68a54a','#a9cba2','#86b379',
	                    '#397b29','#8abb6f','#759c6a','#bfd3b7'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#408829'
	            }
	        },
	        // 值域
	        dataRange: { color: ['#1f610a','#97b58d'] },
	        // 工具箱
	        toolbox: { color: ['#408829','#408829','#408829','#408829'] },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(0,0,0,0.5)',
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#408829',
	                    type: 'dashed'
	                },
	                crossStyle: { color: '#408829' },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.3)'
	                }
	            }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#eee',
	            // 数据背景颜色
	            fillerColor: 'rgba(64,136,41,0.2)',
	            // 填充颜色
	            handleColor: '#408829'    // 手柄颜色
	        },
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#408829'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#408829'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        timeline: {
	            lineStyle: { color: '#408829' },
	            controlStyle: {
	                normal: { color: '#408829' },
	                emphasis: { color: '#408829' }
	            }
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#68a54a',
	                    // 阳线填充颜色
	                    color0: '#a9cba2',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#408829',
	                        // 阳线边框颜色
	                        color0: '#86b379'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#99d2dd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#408829' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#86b379'],[0.8, '#68a54a'],[1, '#408829']],
	                    width: 8
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 10,
	                // 每份split细分多少段
	                length: 12,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 18,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                length: '90%',
	                color: 'auto'
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#333'
	                }
	            },
	            detail: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * infographic theme
	 */
	angular.module('angular-echarts.theme').factory('infographic', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                    '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                    '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#27727B'    // 主标题文字颜色
	            }
	        },
	        // 图例
	        legend: { itemGap: 8 },
	        // 值域
	        dataRange: {
	            x: 'right',
	            y: 'center',
	            itemWidth: 5,
	            itemHeight: 25,
	            color: ['#C1232B','#FCCE10']
	        },
	        toolbox: {
	            color: [
	                            '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
	                            '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
	                        ],
	            effectiveColor: '#ff4500',
	            itemGap: 8
	        },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(50,50,50,0.5)',
	            // 提示背景颜色，默认为透明度为0.7的黑色
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#27727B',
	                    type: 'dashed'
	                },
	                crossStyle: { color: '#27727B' },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.3)'
	                }
	            }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: 'rgba(181,195,52,0.3)',
	            // 数据背景颜色
	            fillerColor: 'rgba(181,195,52,0.2)',
	            // 填充颜色
	            handleColor: '#27727B'
	        },
	        // 网格
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#27727B'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                show: false
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                show: false
	            },
	            splitArea: { show: false },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#ccc'],
	                    type: 'dashed'
	                }
	            }
	        },
	        polar: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#ddd'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
	            },
	            splitLine: { lineStyle: { color: '#ddd' } }
	        },
	        timeline: {
	            lineStyle: { color: '#27727B' },
	            controlStyle: {
	                normal: { color: '#27727B' },
	                emphasis: { color: '#27727B' }
	            },
	            symbol: 'emptyCircle',
	            symbolSize: 3
	        },
	        // 柱形图默认参数
	        bar: {
	            itemStyle: {
	                normal: { borderRadius: 0 },
	                emphasis: { borderRadius: 0 }
	            }
	        },
	        // 折线图默认参数
	        line: {
	            itemStyle: {
	                normal: {
	                    borderWidth: 2,
	                    borderColor: '#fff',
	                    lineStyle: { width: 3 }
	                },
	                emphasis: { borderWidth: 0 }
	            },
	            symbol: 'circle',
	            // 拐点图形类型
	            symbolSize: 3.5    // 拐点图形大小
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#C1232B',
	                    // 阳线填充颜色
	                    color0: '#B5C334',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#C1232B',
	                        // 阳线边框颜色
	                        color0: '#B5C334'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        // 散点图默认参数
	        scatter: {
	            itemdStyle: {
	                normal: {
	                    borderWidth: 1,
	                    borderColor: 'rgba(200,200,200,0.5)'
	                },
	                emphasis: { borderWidth: 0 }
	            },
	            symbol: 'star4',
	            // 图形类型
	            symbolSize: 4    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
	        },
	        // 雷达图默认参数
	        radar: {
	            symbol: 'emptyCircle',
	            // 图形类型
	            symbolSize: 3    //symbol: null,         // 拐点图形类型
	                 //symbolRotate: null,  // 图形旋转控制
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#C1232B' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#fe994e' },
	                    label: { textStyle: { color: 'rgb(100,0,0)' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#27727B' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            center: ['50%','80%'],
	            radius: '100%',
	            startAngle: 180,
	            endAngle: 0,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#B5C334'],[0.8, '#27727B'],[1, '#C1232B']],
	                    width: '40%'
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 2,
	                // 每份split细分多少段
	                length: 5,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#fff'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#fff',
	                    fontWeight: 'bolder'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: '5%',
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: '#fff'
	                }
	            },
	            pointer: {
	                width: '40%',
	                length: '80%',
	                color: '#fff'
	            },
	            title: {
	                offsetCenter: [0, -20],
	                // x, y，单位px
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto',
	                    fontSize: 20
	                }
	            },
	            detail: {
	                offsetCenter: [0, 0],
	                // x, y，单位px
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto',
	                    fontSize: 40
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * macarons theme
	 */
	angular.module('angular-echarts.theme').factory('macarons', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
	                    '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
	                    '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
	                    '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#008acd'    // 主标题文字颜色
	            }
	        },
	        // 图例
	        legend: { itemGap: 8 },
	        // 值域
	        dataRange: {
	            itemWidth: 15,
	            //color:['#1e90ff','#afeeee']
	            color: ['#2ec7c9','#b6a2de']
	        },
	        toolbox: {
	            color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
	            effectiveColor: '#ff4500',
	            itemGap: 8
	        },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(50,50,50,0.5)',
	            // 提示背景颜色，默认为透明度为0.7的黑色
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#008acd',
	                    type: 'dashed',
	                    width: 1
	                },
	                crossStyle: {
	                    color: '#008acd',
	                    width: 1
	                },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.2)'
	                }
	            }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#efefff',
	            // 数据背景颜色
	            fillerColor: 'rgba(182,162,222,0.2)',
	            // 填充颜色
	            handleColor: '#008acd'    // 手柄颜色
	        },
	        // 网格
	        grid: { borderColor: '#eee' },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#008acd',
	                    width: 1
	                }
	            },
	            axisLabel: {
	                // label
	                skipFirst: true,
	                margin: 3,
	                textStyle: { color: '#999999' }
	            },
	            axisTick: {
	                // 坐标轴线
	                show: false,
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#008acd',
	                    width: 1
	                }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#008acd',
	                    width: 1
	                }
	            },
	            axisLabel: {
	                // label
	                skipFirst: true,
	                margin: 3,
	                textStyle: { color: '#999999' }
	            },
	            axisTick: {
	                // 坐标轴线
	                show: false,
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#008acd',
	                    width: 1
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        polar: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#ddd'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)'] }
	            },
	            splitLine: { lineStyle: { color: '#ddd' } }
	        },
	        timeline: {
	            lineStyle: { color: '#008acd' },
	            controlStyle: {
	                normal: { color: '#008acd' },
	                emphasis: { color: '#008acd' }
	            },
	            symbol: 'emptyCircle',
	            symbolSize: 3
	        },
	        // 柱形图默认参数
	        bar: {
	            itemStyle: {
	                normal: { borderRadius: 5 },
	                emphasis: { borderRadius: 5 }
	            }
	        },
	        // 折线图默认参数
	        line: {
	            smooth: false,
	            symbol: 'circle',
	            // 拐点图形类型
	            symbolSize: 3    // 拐点图形大小
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#d87a80',
	                    // 阳线填充颜色
	                    color0: '#2ec7c9',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#d87a80',
	                        // 阳线边框颜色
	                        color0: '#2ec7c9'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        // 散点图默认参数
	        scatter: {
	            symbol: 'circle',
	            // 图形类型
	            symbolSize: 4    // 图形大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
	        },
	        // 雷达图默认参数
	        radar: {
	            symbol: 'emptyCircle',
	            // 图形类型
	            symbolSize: 3    //symbol: null,         // 拐点图形类型
	                 //symbolRotate: null,  // 图形旋转控制
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#d87a80' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#fe994e' },
	                    label: { textStyle: { color: 'rgb(100,0,0)' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#1e90ff' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
	                    width: 10
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 10,
	                // 每份split细分多少段
	                length: 15,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 22,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                width: 5,
	                color: 'auto'
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#333'
	                }
	            },
	            detail: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * red theme
	 */
	angular.module('angular-echarts.theme').factory('red', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#d8361b','#f16b4c','#f7b4a9','#d26666',
	                    '#99311c','#c42703','#d07e75'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: {
	                fontWeight: 'normal',
	                color: '#d8361b'
	            }
	        },
	        // 值域
	        dataRange: { color: ['#bd0707','#ffd2d2'] },
	        // 工具箱
	        toolbox: { color: ['#d8361b','#d8361b','#d8361b','#d8361b'] },
	        // 提示框
	        tooltip: {
	            backgroundColor: 'rgba(0,0,0,0.5)',
	            axisPointer: {
	                // 坐标轴指示器，坐标轴触发有效
	                type: 'line',
	                // 默认为直线，可选为：'line' | 'shadow'
	                lineStyle: {
	                    // 直线指示器样式设置
	                    color: '#d8361b',
	                    type: 'dashed'
	                },
	                crossStyle: { color: '#d8361b' },
	                shadowStyle: {
	                    // 阴影指示器样式设置
	                    color: 'rgba(200,200,200,0.3)'
	                }
	            }
	        },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#eee',
	            // 数据背景颜色
	            fillerColor: 'rgba(216,54,27,0.2)',
	            // 填充颜色
	            handleColor: '#d8361b'    // 手柄颜色
	        },
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#d8361b'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: '#d8361b'
	                }
	            },
	            splitArea: {
	                show: true,
	                areaStyle: { color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)'] }
	            },
	            splitLine: {
	                // 分隔线
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: ['#eee']
	                }
	            }
	        },
	        timeline: {
	            lineStyle: { color: '#d8361b' },
	            controlStyle: {
	                normal: { color: '#d8361b' },
	                emphasis: { color: '#d8361b' }
	            }
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#f16b4c',
	                    // 阳线填充颜色
	                    color0: '#f7b4a9',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#d8361b',
	                        // 阳线边框颜色
	                        color0: '#d26666'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#99d2dd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#d8361b' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#f16b4c'],[0.8, '#d8361b'],[1, '#99311c']],
	                    width: 8
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 10,
	                // 每份split细分多少段
	                length: 12,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 18,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                length: '90%',
	                color: 'auto'
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#333'
	                }
	            },
	            detail: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});
	'use strict';
	/**
	 * shine theme
	 */
	angular.module('angular-echarts.theme').factory('shine', function () {
	    return {
	        // 默认色板
	        color: [
	                    '#c12e34','#e6b600','#0098d9','#2b821d',
	                    '#005eaa','#339ca8','#cda819','#32a487'
	                ],
	        // 图表标题
	        title: {
	            itemGap: 8,
	            textStyle: { fontWeight: 'normal' }
	        },
	        // 图例
	        legend: { itemGap: 8 },
	        // 值域
	        dataRange: {
	            itemWidth: 15,
	            // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
	            color: ['#1790cf','#a2d4e6']
	        },
	        // 工具箱
	        toolbox: {
	            color: ['#06467c','#00613c','#872d2f','#c47630'],
	            itemGap: 8
	        },
	        // 提示框
	        tooltip: { backgroundColor: 'rgba(0,0,0,0.6)' },
	        // 区域缩放控制器
	        dataZoom: {
	            dataBackgroundColor: '#dedede',
	            // 数据背景颜色
	            fillerColor: 'rgba(154,217,247,0.2)',
	            // 填充颜色
	            handleColor: '#005eaa'    // 手柄颜色
	        },
	        grid: { borderWidth: 0 },
	        // 类目轴
	        categoryAxis: {
	            axisLine: {
	                // 坐标轴线
	                show: false
	            },
	            axisTick: {
	                // 坐标轴小标记
	                show: false
	            }
	        },
	        // 数值型坐标轴默认参数
	        valueAxis: {
	            axisLine: {
	                // 坐标轴线
	                show: false
	            },
	            axisTick: {
	                // 坐标轴小标记
	                show: false
	            },
	            splitArea: {
	                // 分隔区域
	                show: true,
	                // 默认不显示，属性show控制显示与否
	                areaStyle: {
	                    // 属性areaStyle（详见areaStyle）控制区域样式
	                    color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
	                }
	            }
	        },
	        timeline: {
	            lineStyle: { color: '#005eaa' },
	            controlStyle: {
	                normal: { color: '#005eaa' },
	                emphasis: { color: '#005eaa' }
	            }
	        },
	        // K线图默认参数
	        k: {
	            itemStyle: {
	                normal: {
	                    color: '#c12e34',
	                    // 阳线填充颜色
	                    color0: '#2b821d',
	                    // 阴线填充颜色
	                    lineStyle: {
	                        width: 1,
	                        color: '#c12e34',
	                        // 阳线边框颜色
	                        color0: '#2b821d'    // 阴线边框颜色
	                    }
	                }
	            }
	        },
	        map: {
	            itemStyle: {
	                normal: {
	                    areaStyle: { color: '#ddd' },
	                    label: { textStyle: { color: '#c12e34' } }
	                },
	                emphasis: {
	                    // 也是选中样式
	                    areaStyle: { color: '#e6b600' },
	                    label: { textStyle: { color: '#c12e34' } }
	                }
	            }
	        },
	        force: { itemStyle: { normal: { linkStyle: { strokeColor: '#005eaa' } } } },
	        chord: {
	            padding: 4,
	            itemStyle: {
	                normal: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                },
	                emphasis: {
	                    lineStyle: {
	                        width: 1,
	                        color: 'rgba(128, 128, 128, 0.5)'
	                    },
	                    chordStyle: {
	                        lineStyle: {
	                            width: 1,
	                            color: 'rgba(128, 128, 128, 0.5)'
	                        }
	                    }
	                }
	            }
	        },
	        gauge: {
	            startAngle: 225,
	            endAngle: -45,
	            axisLine: {
	                // 坐标轴线
	                show: true,
	                // 默认显示，属性show控制显示与否
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']],
	                    width: 5
	                }
	            },
	            axisTick: {
	                // 坐标轴小标记
	                splitNumber: 10,
	                // 每份split细分多少段
	                length: 8,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {
	                // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {
	                // 分隔线
	                length: 12,
	                // 属性length控制线长
	                lineStyle: {
	                    // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer: {
	                length: '90%',
	                width: 3,
	                color: 'auto'
	            },
	            title: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#333'
	                }
	            },
	            detail: {
	                textStyle: {
	                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            }
	        },
	        textStyle: { fontFamily: '\u5FAE\u8F6F\u96C5\u9ED1, Arial, Verdana, sans-serif' }
	    };
	});})();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var app = __webpack_require__(7);

	__webpack_require__(13);


	app.constant("TEMPLATE", {
	    "url": 'templates/' // '' //
	});
	//If you want to keep pageview tracking for its traditional meaning (whole page visits only), set virtualPageviews to false
	app.config(function ($analyticsProvider) {
	    $analyticsProvider.virtualPageviews(false);
	});
	app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

	        $ionicConfigProvider.platform.ios.tabs.style('standard');
	        $ionicConfigProvider.platform.ios.tabs.position('bottom');

	        $ionicConfigProvider.platform.android.tabs.style('standard');
	        $ionicConfigProvider.platform.android.tabs.position('standard');

	        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

	        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
	        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

	        $ionicConfigProvider.platform.ios.views.transition('ios');
	        $ionicConfigProvider.platform.android.views.transition('android');

	    })
	app.run(function ($ionicPlatform, $ionicConfig) {

	        $ionicConfig.scrolling.jsScrolling(false);
	    })

	app.config(function ($stateProvider, $urlRouterProvider, TEMPLATE) {

	        $stateProvider

	            .state('tab', {
	                url: '/tab',
	                abstract: true,

	                views: {
	                    '': {
	                        template: __webpack_require__(69),
	                        controller: 'TabCtrl'
	                    }
	                }
	            })

	            // Each tab has its own nav history stack:

	            .state('tab.home', {
	                url: '/home',
	                views: {
	                    'tab-home': {
	                        template: __webpack_require__(70),
	                        controller: 'HomeCtrl'
	                    }
	                }
	            })

	            .state('tab.position', {
	                url: '/position',
	                views: {
	                    'tab-position': {
	                        template: __webpack_require__(71),
	                        controller: 'PositionCtrl',
	                    }
	                }
	            })
	            .state('tab.position-detail', {
	                url: '/position/:positionId',
	                views: {
	                    'tab-chats': {
	                        template: __webpack_require__(59),
	                        controller: 'PositionDetailCtrl',
	                    }
	                }
	            })

	            .state('tab.account', {
	                url: '/account',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(72),
	                        controller: 'AccountCtrl',
	                    }
	                }
	            })
	            .state('tab.password', {
	                url: '/password',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(73),
	                        controller: 'PasswordCtrl',
	                    }
	                }
	            })
	            .state('tab.register', {
	                url: '/register',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(74),
	                        controller: 'RegisterCtrl',
	                    }
	                }
	            })
	            .state('tab.pcReg', {
	                url: '/pcReg',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(75),
	                        controller: 'PcRegCtrl',
	                    }
	                }
	            })
	            .state('tab.forgetCode', {
	                url: '/forgetCode',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(76),
	                        controller: 'ForgetCodeCtrl',
	                    }
	                }
	            })
	            .state('tab.verify', {
	                url: '/verify',
	                params: { code: null, tel: null },
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(77),
	                        controller: 'VerifyCtrl',
	                    }
	                }
	            })
	            .state('tab.news', {
	                url: '/news',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(78),
	                        controller: 'NewsCtrl',
	                    }
	                }
	            })
	            .state('tab.orderHistory', {
	                url: '/orderHistory',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(79),
	                        controller: 'OrderHistoryCtrl',
	                    }
	                }
	            })
	            .state('tab.tradingRules', {
	                url: '/tradingRules',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(80),
	                        controller: 'TradingRulesCtrl',
	                    }
	                }
	            })
	            .state('tab.dealhistory', {
	                url: '/dealhistory/:Id',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(81),
	                        controller: 'DealhistoryCtrl',
	                    }
	                }
	            })
	/*            .state('tab.dealhistory-detail', {
	                url: '/dealhistory:orderId',
	                views: {
	                    'tab-account': {
	                        template: require('templates/dealhistory-detail.html'),
	                        controller: 'DealhistoryDetailCtrl',
	                    }
	                }
	            })
	*/
	            .state('tab.tikets', {
	                url: '/tikets',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(82),
	                        controller: 'TiketsCtrl',
	                    }
	                }
	            })
	            .state('tab.personInfo', {
	                url: '/personInfo',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(83),
	                        controller: 'PersonInfoCtrl',
	                    }
	                }
	            })
	            .state('tab.charge', {
	                url: '/charge',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(84),
	                        controller: 'ChargeCtrl',
	                    }
	                }
	            })
	            .state('tab.withdrawal', {
	                url: '/withdrawal',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(85),
	                        controller: 'WithdrawalCtrl',
	                    }
	                }
	            })
	            .state('tab.ranklist', {
	                url: '/ranklist',
	                views: {
	                    'tab-account': {
	                        template: __webpack_require__(86),
	                        controller: 'RanklistCtrl',
	                    }
	                }
	            })
	            //ranklist

	            ;

	        // if none of the above states are matched, use this as the fallback
	        $urlRouterProvider.otherwise('/tab/home');
	    });


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	 //加载皮肤
	var  WriteJsFilter= __webpack_require__(8);
	WriteJsFilter.writeJsFilter();
	var LoadTheme = __webpack_require__(9);
	// var Offline = require('offline');
	var UtilTool = __webpack_require__(10);

	// Offline.options = {checks: {xhr: {url: '/gdiexNg/favicon.ico'}}};

	LoadTheme.load();
	UtilTool.hideAdvertisement();

	var app = angular.module('starter', ['ionic', 'ngSanitize','angulartics','angulartics.google.tagmanager']);

	module.exports = app;


/***/ },
/* 8 */
/***/ function(module, exports) {

	
	var invalidJSDomain = [];
	invalidJSDomain.push("bdimg", "ecma", "baidu", "dup", "cpro", "pos");

	function isValid(src) {
	    src = src.toLowerCase();
	    for (var i = 0; i < invalidJSDomain.length; i++) {
	        void 0;
	        if (src.indexOf(invalidJSDomain[i]) > -1) {
	            return true;
	        }
	    }
	    return false;
	}

	var writeJsFilter = function() {
	    var head = document.getElementsByTagName('head')[0];
	    var orgAppendChild = head.appendChild;
	    void 0;
	    head.appendChild = function(node) {
	        void 0;
	        if (node && node.src && isValid(node.src)) {
	            void 0;
	        } else {
	            orgAppendChild.apply(this, arguments);
	            void 0;
	        }
	        return node;
	    };
	    var orgRemoveChild = head.removeChild;
	    void 0;
	    head.removeChild = function(node) {
	        void 0;
	        if (node && node.src && isValid(node.src)) {
	            void 0;
	        } else {
	            orgRemoveChild.apply(this, arguments);
	            void 0;
	        }
	        return node;
	    }
	}

	module.exports = {writeJsFilter:writeJsFilter};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10), __webpack_require__(11), __webpack_require__(12), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(UtilTool, config, ChartOptionFactory) {
	    'use strict';
	    var load = function() {
	        //加载皮肤
	        var theme = UtilTool.getCookie('theme') || 'gdiex';
	        if (theme != 'gdiex') {
	            //js中四大命令（getElementById,getElementsByTagName,getAttribute,setAttribute
	            var body = document.getElementById('body');
	            body.setAttribute('class', 'skin_' + theme);

	            var skin_style = document.getElementById('skin_style');
	            var _href = 'css/' + theme + '.app.min.css?' + config.version;
	            skin_style.setAttribute('href', _href);

	            ChartOptionFactory.refresh_skin();
	        }
	        var cache_page = document.getElementById('cache_page');
	        cache_page.setAttribute('src', './cacheHtml/' + theme + '_cache.html?' + config.version);

	    };
	    return {
	        load: load,
	    };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	    'use strict';
	    //设置cookie
	    var setCookie = function (cname, cvalue, exdays) {
	        var d = new Date();
	        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	        var expires = "expires=" + d.toUTCString();
	        document.cookie = cname + "=" + escape(cvalue) + "; " + expires + ";path=/";
	    }
	    //获取cookie
	    var getCookie = function (cname) {
	        var name = cname + "=";
	        var ca = document.cookie.split(';');
	        for (var i = 0; i < ca.length; i++) {
	            var c = ca[i];
	            while (c.charAt(0) == ' ') c = c.substring(1);
	            var res = c.substring(name.length, c.length);
	            if (c.indexOf(name) != -1) return unescape(res);
	        }
	        return "";
	    }
	    //清除cookie  
	    var delCookie = function (name) {
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1);
	        var cval = getCookie(name);
	        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	    }
	    var isEmptyObject = function (e) {
	        if ("undefined" == typeof e) {
	            return true;
	        }
	        var t;
	        for (t in e)
	            return !1;
	        return !0
	    };
	    var hideAdvertisement = function(){
	             var count = 0;
	            var timer = setInterval(function () {
	                handleAdvertisement();
	                count += 1;
	                if (count == 120) {
	                    clearInterval(timer);
	                }
	            }, 1000);
	    }
	    var handleAdvertisement = function () {
	        var _iframe = $("iframe");
	        _iframe.hide();
	        //嵌入iframe 的广告
	        _iframe.parents().each(function (index, item) {
	            if (!(item.tagName == 'BODY' || item.tagName == 'HTML')) {
	                $(item).hide();
	            }
	        })

	        var _a = $("a");
	        //嵌入a标签的广告
	        var _host = window.location.host;
	        var hostReg = new RegExp("(.*(" + _host + ").*)|(.*(geetest.com).*)|(.*(gdiex.com).*)|(.*(qq.com).*)|(.*(95516.com).*)", "g");
	        _a.each(function (index, item) {
	            var _href = item.baseURI;
	            if (!_href.match(hostReg)) {
	                //本标签隐藏
	                $(item).hide();
	                //父级标签隐藏
	                $(item).parents().each(function (index, _item) {
	                    if (!(item.tagName == 'BODY' || _item.tagName == 'HTML')) {
	                        $(item).hide();
	                    }
	                })

	            }
	        })

	    }

	    return {
	        setCookie: setCookie,
	        getCookie: getCookie,
	        delCookie: delCookie,
	        isEmptyObject: isEmptyObject,
	        hideAdvertisement:hideAdvertisement

	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';
	    var hostUrl = "http://market43.gdiex.com";

	        return {
	            version:'?v=v20161208&r=1',
	            BASIC : 'BASIC' + ' ', //注意后面带一个空格
	            hostUrl: hostUrl,
	            pwdReg:/^((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/g,
	            telReg:/^1\d{10}$/g,
	            moneyReg:/^\d+(\.\d+)?/,
	            bankNumberReg:/\D/g,
	            priceUrl: '/api/rates',
	            kLineUrl: hostUrl +"/kliner/query.do",
	            timeLineUrl: hostUrl + "/timeline/query.do",
	            contractsUrl:"/api/contracts",
	            usersTokenUrl:"/api/users/tokenww",
	        };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4),__webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(echarts, UtilTool) {

	   // app.factory('ChartOptionFactory', function() {

	        var desert_skin = {
	            axisLabel_textStyle_color: "#b98d26",
	            candlestick_down: '#00aa11',
	            candlestick_up: '#c82f2f',
	            line_itemStyle_color: '#a56923',
	            LinearGradient_up: 'rgba(195, 131, 27,1)', //'#c38339',
	            LinearGradient_down: 'rgba(255, 246, 225,0.2)'
	        };

	        var gdiex_skin = {
	            axisLabel_textStyle_color: "#35809A",
	            candlestick_down: '#33cd5f',
	            candlestick_up: '#ef473a',
	            line_itemStyle_color: '#f0f0f0',
	            LinearGradient_up: 'rgba(34, 112, 175,1)', //'#010c30',
	            LinearGradient_down: 'rgba(2, 12, 18,0)'
	        }

	        var _xdata = [];
	        var _ydata = [];
	        var _type = 'kLine';
	        var _echart ={};

	        var axisLabel_textStyle_color = gdiex_skin.axisLabel_textStyle_color;
	        var candlestick_down = gdiex_skin.candlestick_down;
	        var candlestick_up = gdiex_skin.candlestick_up;
	        var line_itemStyle_color = gdiex_skin.line_itemStyle_color;
	        var LinearGradient_up = gdiex_skin.LinearGradient_up;
	        var LinearGradient_down = gdiex_skin.LinearGradient_down;

	        var _skin = UtilTool.getCookie('theme') || 'gdiex';

	        var line_option = {};
	        var option_k = {}

	        var option = { 'kLine': option_k, 'timeLine': line_option };

	        var refresh_skin = function() {
	            _skin = UtilTool.getCookie('theme') || 'gdiex';
	            switch (_skin) {
	                case 'gdiex':
	                    axisLabel_textStyle_color = gdiex_skin.axisLabel_textStyle_color;
	                    candlestick_down = gdiex_skin.candlestick_down;
	                    candlestick_up = gdiex_skin.candlestick_up;
	                    line_itemStyle_color = gdiex_skin.line_itemStyle_color;
	                    LinearGradient_up = gdiex_skin.LinearGradient_up;
	                    LinearGradient_down = gdiex_skin.LinearGradient_down;
	                    break;
	                case 'desert':
	                    axisLabel_textStyle_color = desert_skin.axisLabel_textStyle_color;
	                    candlestick_down = desert_skin.candlestick_down;
	                    candlestick_up = desert_skin.candlestick_up;
	                    line_itemStyle_color = desert_skin.line_itemStyle_color;
	                    LinearGradient_up = desert_skin.LinearGradient_up;
	                    LinearGradient_down = desert_skin.LinearGradient_down;
	                    break;
	            }

	            line_option = {
	                tooltip: {
	                    trigger: 'axis',
	                },

	                grid: {
	                    x: 20,
	                    y: 10,
	                    x2: 45,
	                    y2: 30,
	                },
	                xAxis: {
	                    axisLine: { // 轴线
	                        show: false,
	                    },
	                    type: 'category',
	                    boundaryGap: true,
	                    axisTick: { show: false, onGap: false },
	                    splitLine: { show: false },
	                    axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: axisLabel_textStyle_color
	                        }
	                    },
	                    data: _xdata //[] //scope.
	                },
	                yAxis: [{
	                    type: 'value',
	                    axisLine: {
	                        show: false,
	                    },
	                    position: 'right',
	                    axisTick: { show: false, onGap: false },
	                    splitLine: { show: false },
	                    scale: true,
	                    precision: 20,
	                    splitNumber: 6,
	                    scaleSize: 5,
	                    boundaryGap: [0.001, 0.001],
	                    splitArea: {
	                        show: false
	                    },
	                    axisLabel: {
	                        formatter: function(v) {
	                            return Math.floor(v);
	                        },
	                        textStyle: {
	                            color: axisLabel_textStyle_color
	                        }
	                    }
	                }, {
	                    type: 'value',
	                    axisLine: {
	                        show: false,
	                        lineStyle: {
	                            color: 'transparent',
	                            width: 0
	                        }
	                    },
	                    scale: true,
	                    axisLabel: {
	                        show: false
	                    },
	                    splitNumber: 9,
	                    boundaryGap: [0.05, 0.05],
	                    splitLine: {
	                        show: false,
	                        lineStyle: {
	                            color: 'transparent', //TODO
	                            type: 'solid',
	                            width: 1
	                        }
	                    },
	                    splitArea: {
	                        show: false
	                    }
	                }],

	                series: {
	                    name: '最新价格',
	                    type: 'line',
	                    smooth: true,
	                    symbol: 'none',
	                    sampling: 'average',
	                    itemStyle: {
	                        normal: {
	                            color: line_itemStyle_color
	                        }
	                    },
	                    lineStyle: {
	                        normal: { width: 1 }
	                    },
	                    areaStyle: {
	                        normal: {
	                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                                offset: 0,
	                                color: LinearGradient_up //'#ff0000'//'rgb(234, 206, 167)'
	                            }, {
	                                offset: 1,
	                                color: LinearGradient_down //'#0006fb'//'rgba(3, 13, 19,0)'
	                            }])
	                        }
	                    },
	                    data: _ydata //[] //scope.ydata
	                }
	            };
	            option_k = {
	                animation: true,
	                tooltip: {
	                    trigger: 'axis',
	                    textStyle: {
	                        fontSize: 13,
	                    },
	                    formatter: function(e) {
	                        var _data = e[0].value;
	                        var f = e[0].name;
	                        f += '<br/>  开盘 : ' + _data[0] + '  最高 : ' + _data[3];
	                        f += '<br/>  收盘 : ' + _data[1] + '  最低 : ' + _data[2];
	                        return f
	                    }
	                },
	                grid: {
	                    x: 20,
	                    y: 10,
	                    x2: 45,
	                    y2: 30,
	                },
	                xAxis: {
	                    axisLine: { // 轴线
	                        show: false,
	                    },
	                    type: 'category',
	                    boundaryGap: true,
	                    axisTick: { show: false, onGap: false },
	                    splitLine: { show: false },
	                    axisLabel: {
	                        show: true,
	                        textStyle: {
	                            color: axisLabel_textStyle_color
	                        }
	                    },
	                    data: _xdata // scope.xdata

	                },
	                yAxis: [{
	                    type: 'value',
	                    axisLine: {
	                        show: false,
	                    },
	                    position: 'right',
	                    axisTick: { show: false, onGap: false },
	                    splitLine: { show: false },
	                    scale: true,
	                    precision: 20,
	                    splitNumber: 6,
	                    scaleSize: 5,
	                    boundaryGap: [0.001, 0.001],
	                    splitArea: {
	                        show: false
	                    },
	                    axisLabel: {
	                        formatter: function(v) {
	                            return Math.floor(v);
	                        },
	                        textStyle: {
	                            color: axisLabel_textStyle_color
	                        }
	                    }
	                }, {
	                    type: 'value',
	                    axisLine: {
	                        show: false,
	                        lineStyle: {
	                            color: 'transparent',
	                            width: 0
	                        }
	                    },
	                    scale: true,
	                    axisLabel: {
	                        show: false
	                    },
	                    splitNumber: 9,
	                    boundaryGap: [0.05, 0.05],
	                    splitLine: {
	                        show: false,
	                        lineStyle: {
	                            color: 'transparent', //TODO
	                            type: 'solid',
	                            width: 1
	                        }
	                    },
	                    splitArea: {
	                        show: false
	                    }
	                }],

	                series: {
	                    name: 'Dow-Jones index',
	                    type: 'candlestick',
	                    data: _ydata, //scope.ydata,
	                    itemStyle: {
	                        normal: {
	                            color: candlestick_up,
	                            color0: candlestick_down, //down
	                            borderColor: candlestick_up,
	                            borderColor0: candlestick_down //down
	                        }
	                    }
	                    /*tooltip: {
	                        formatter: function(param) {
	                            var param = param[0];
	                            return [
	                                'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
	                                'Open: ' + param.data[0] + '<br/>',
	                                'Close: ' + param.data[2] + '<br/>',
	                                'Lowest: ' + param.data[3] + '<br/>',
	                                'Highest: ' + param.data[1] + '<br/>'
	                            ].join('');
	                        }
	                    }*/
	                }

	            };
	            option = { 'kLine': option_k, 'timeLine': line_option };
	            if (_xdata.length > 0 && _ydata.length > 0) {
	                setData(_type, _xdata, _ydata);
	                if(!UtilTool.isEmptyObject(_echart)){
	                    _echart.setOption(option[_type], true);
	                }
	            }
	            return option;
	        }

	        refresh_skin();
	        var setData = function(type, xdata, ydata) {
	            _xdata = xdata;
	            _ydata = ydata;
	            _type = type;

	            switch (type) {
	                case 'kLine':
	                    option.kLine.xAxis.data = xdata;
	                    option.kLine.series.data = ydata;

	                    break;
	                case 'timeLine':
	                    option.timeLine.xAxis.data = xdata;
	                    option.timeLine.series.data = ydata;

	                    break;
	            }
	        };
	        return {
	            get: function(chatId) {
	                return option;
	            },
	            setEcharat:function(echart){
	                _echart = echart;
	            },
	            setData: setData,
	            refresh_skin: refresh_skin
	        };
	  //  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(14);
	__webpack_require__(15);
	//require('angulartics-cnzz');

	__webpack_require__(16);

	__webpack_require__(17);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(23);

	__webpack_require__(24);
	__webpack_require__(12);
	__webpack_require__(21);
	__webpack_require__(27);
	__webpack_require__(29);
	__webpack_require__(33);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(28);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(41);

	__webpack_require__(42);

	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(47);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(60);
	__webpack_require__(65);
	__webpack_require__(66);



/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * @license Angulartics
	 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
	 * License: MIT
	 */
	!function(a,b){"use strict";function c(){
	// General buffering handler
	function b(a){return function(){k.waitForVendorCount&&(m[a]||(m[a]=[]),m[a].push(arguments))}}
	// As handlers are installed by plugins, they get pushed into a list and invoked in order.
	function c(b,c,d){return n[b]||(n[b]=[]),n[b].push(c),o[c]=d,function(){if(!this.settings.optOut){var c=Array.prototype.slice.apply(arguments);return this.$inject(["$q",a.bind(this,function(d){return d.all(n[b].map(function(b){var e=o[b]||{};if(e.async){var f=d.defer(),g=a.copy(c);return g.unshift(f.resolve),b.apply(this,g),f.promise}return d.when(b.apply(this,c))},this))})])}}}
	// Will run setTimeout if delay is > 0
	// Runs immediately if no delay to make sure cache/buffer is flushed before anything else.
	// Plugins should take care to register handlers by order of precedence.
	function d(a,b){b?setTimeout(a,b):a()}
	// General function to register plugin handlers. Flushes buffers immediately upon registration according to the specified delay.
	function e(b,e,f){
	// Do not add a handler if developerMode is true
	if(!j.developerMode){p[b]=c(b,e,f);var g=j[b],h=g?g.bufferFlushDelay:null,i=null!==h?h:j.bufferFlushDelay;a.forEach(m[b],function(a,b){d(function(){e.apply(this,a)},b*i)})}}function f(a){return a.replace(/^./,function(a){return a.toUpperCase()})}
	// Adds to the provider a 'register#{handlerName}' function that manages multiple plugins and buffer flushing.
	function g(a){var d="register"+f(a);q[d]=function(b,c){e(a,b,c)},p[a]=c(a,b(a))}function h(b,c,d){a.forEach(c,d);for(var e in b)i[e]=b[e]}var i=this,j={pageTracking:{autoTrackFirstPage:!0,autoTrackVirtualPages:!0,trackRelativePath:!1,trackRoutes:!0,trackStates:!0,autoBasePath:!1,basePath:"",excludedRoutes:[]},eventTracking:{},bufferFlushDelay:1e3,// Support only one configuration for buffer flush delay to simplify buffering
	trackExceptions:!1,optOut:!1,developerMode:!1},l=["pageTrack","eventTrack","exceptionTrack","transactionTrack","setAlias","setUsername","setUserProperties","setUserPropertiesOnce","setSuperProperties","setSuperPropertiesOnce","incrementProperty","userTimings","clearCookies"],m={},n={},o={},p={settings:j};
	// Opt in and opt out functions
	p.setOptOut=function(a){this.settings.optOut=a,s()},p.getOptOut=function(){return this.settings.optOut};var q={$get:["$injector",function(a){return r(a)}],api:p,settings:j,virtualPageviews:function(a){this.settings.pageTracking.autoTrackVirtualPages=a},trackStates:function(a){this.settings.pageTracking.trackStates=a},trackRoutes:function(a){this.settings.pageTracking.trackRoutes=a},excludeRoutes:function(a){this.settings.pageTracking.excludedRoutes=a},firstPageview:function(a){this.settings.pageTracking.autoTrackFirstPage=a},withBase:function(b){this.settings.pageTracking.basePath=b?a.element(document).find("base").attr("href"):""},withAutoBase:function(a){this.settings.pageTracking.autoBasePath=a},trackExceptions:function(a){this.settings.trackExceptions=a},developerMode:function(a){this.settings.developerMode=a}},r=function(b){return a.extend(p,{$inject:b.invoke})},s=function(){h(q,l,g)};
	// Initial register
	h(q,l,g)}function d(b,c,d,e){function f(a){for(var b=0;b<d.settings.pageTracking.excludedRoutes.length;b++){var c=d.settings.pageTracking.excludedRoutes[b];if(c instanceof RegExp&&c.test(a)||a.indexOf(c)>-1)return!0}return!1}function g(a,b){f(a)||d.pageTrack(a,b)}d.settings.pageTracking.autoTrackFirstPage&&e.invoke(["$location",function(a){/* Only track the 'first page' if there are no routes or states on the page */
	var b=!0;if(e.has("$route")){var f=e.get("$route");if(f)for(var h in f.routes){b=!1;break}else null===f&&(b=!1)}else if(e.has("$state")){var i=e.get("$state");for(var j in i.get()){b=!1;break}}if(b)if(d.settings.pageTracking.autoBasePath&&(d.settings.pageTracking.basePath=c.location.pathname),d.settings.pageTracking.trackRelativePath){var k=d.settings.pageTracking.basePath+a.url();g(k,a)}else g(a.absUrl(),a)}]),d.settings.pageTracking.autoTrackVirtualPages&&e.invoke(["$location",function(a){d.settings.pageTracking.autoBasePath&&(/* Add the full route to the base. */
	d.settings.pageTracking.basePath=c.location.pathname+"#");var f=!0;if(d.settings.pageTracking.trackRoutes&&e.has("$route")){var h=e.get("$route");if(h)for(var i in h.routes){f=!1;break}else null===h&&(f=!1);b.$on("$routeChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}})}d.settings.pageTracking.trackStates&&(e.has("$state")&&!e.has("$transitions")&&(f=!1,b.$on("$stateChangeSuccess",function(b,c){var e=d.settings.pageTracking.basePath+a.url();g(e,a)})),e.has("$state")&&e.has("$transitions")&&(f=!1,e.invoke(["$transitions",function(b){b.onSuccess({},function(b){var c=b.options();
	// only track for transitions that would have triggered $stateChangeSuccess
	if(c.notify){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}})}]))),f&&b.$on("$locationChangeSuccess",function(b,c){if(!c||!(c.$$route||c).redirectTo)if(d.settings.pageTracking.trackRelativePath){var e=d.settings.pageTracking.basePath+a.url();g(e,a)}else g(a.absUrl(),a)})}]),d.settings.developerMode&&a.forEach(d,function(a,b){"function"==typeof a&&(d[b]=function(){})})}function e(b){return{restrict:"A",link:function(c,d,e){var f=e.analyticsOn||"click",g={};a.forEach(e.$attr,function(a,b){i(b)&&(g[j(b)]=e[b],e.$observe(b,function(a){g[j(b)]=a}))}),a.element(d[0]).bind(f,function(f){var i=e.analyticsEvent||h(d[0]);g.eventType=f.type,e.analyticsIf&&!c.$eval(e.analyticsIf)||(
	// Allow components to pass through an expression that gets merged on to the event properties
	// eg. analytics-properites='myComponentScope.someConfigExpression.$analyticsProperties'
	e.analyticsProperties&&a.extend(g,c.$eval(e.analyticsProperties)),b.eventTrack(i,g))})}}}function f(a){a.decorator("$exceptionHandler",["$delegate","$injector",function(a,b){return function(c,d){var e=a(c,d),f=b.get("$analytics");return f.settings.trackExceptions&&f.exceptionTrack(c,d),e}}])}function g(a){return["a:","button:","button:button","button:submit","input:button","input:submit"].indexOf(a.tagName.toLowerCase()+":"+(a.type||""))>=0}function h(a){return g(a)?a.innerText||a.value:a.id||a.name||a.tagName}function i(a){return"analytics"===a.substr(0,9)&&["On","Event","If","Properties","EventType"].indexOf(a.substr(9))===-1}function j(a){var b=a.slice(9);// slice off the 'analytics' prefix
	// slice off the 'analytics' prefix
	return"undefined"!=typeof b&&null!==b&&b.length>0?b.substring(0,1).toLowerCase()+b.substring(1):b}var k=window.angulartics||(window.angulartics={});k.waitForVendorCount=0,k.waitForVendorApi=function(a,b,c,d,e){e||k.waitForVendorCount++,d||(d=c,c=void 0),!Object.prototype.hasOwnProperty.call(window,a)||void 0!==c&&void 0===window[a][c]?setTimeout(function(){k.waitForVendorApi(a,b,c,d,!0)},b):(k.waitForVendorCount--,d(window[a]))},/**
	 * @ngdoc overview
	 * @name angulartics
	 */
	a.module("angulartics",[]).provider("$analytics",c).run(["$rootScope","$window","$analytics","$injector",d]).directive("analyticsOn",["$analytics",e]).config(["$provide",f])}(angular);

/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * @license Angulartics
	 * (c) 2013 Luis Farzati http://luisfarzati.github.io/angulartics
	 * Google Tag Manager Plugin Contributed by http://github.com/danrowe49
	 * License: MIT
	 */

	(function(angular){
	'use strict';


	/**
	 * @ngdoc overview
	 * @name angulartics.google.analytics
	 * Enables analytics support for Google Tag Manager (http://google.com/tagmanager)
	 */

	angular.module('angulartics.google.tagmanager', ['angulartics'])
	.config(['$analyticsProvider', function($analyticsProvider){

	    /**
	    * Send content views to the dataLayer
	    *
	    * @param {string} path Required 'content name' (string) describes the content loaded
	    */

	    $analyticsProvider.registerPageTrack(function(path){
	        var dataLayer = window.dataLayer = window.dataLayer || [];
	        dataLayer.push({
	            'event': 'content-view',
	            'content-name': path
	        });
	    });

	    /**
	   * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
	   * @name eventTrack
	   *
	   * @param {string} action Required 'action' (string) associated with the event
	   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
	   */

	    $analyticsProvider.registerEventTrack(function(action, properties){
	        var dataLayer = window.dataLayer = window.dataLayer || [];
	        properties = properties || {};
	        dataLayer.push({
	            'event': properties.event || 'interaction',
	            'target': properties.category,
	            'action': action,
	            'target-properties': properties.label,
	            'value': properties.value,
	            'interaction-type': properties.noninteraction
	        });

	    });

	    $analyticsProvider.registerSetUsername(
	  		/**
	  		 * Send user's data to the datalayer, i.e. for user tracking in Google Analytics
	  		 * @param  {string} username   login of the username
	  		 * @param  {object} properties List of attribute of the current username
	  		 * @return {void}
	  		 */
	  		function (username, properties) {
	  			var dataLayer = window.dataLayer = window.dataLayer || [];
	  				properties = properties || {};
	    			dataLayer.push({
	    				'username': username,
	    				'user': properties
	    			});
	  	  }
	  	);
	}]);

	})(angular);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {
	    app.service('UtilService', function($rootScope, $q, $http, $timeout, $ionicLoading, $ionicPopup, $filter, $location) {

	        /* this.jsonpRequest = function(url, params) {
	             var deferred = $q.defer();
	             if (url.indexOf('?') != -1) {
	                 url = url + '&callback=JSON_CALLBACK';
	             } else {
	                 url = url + '?callback=JSON_CALLBACK';
	             }
	             $http.jsonp(url, params).
	             success(function(data, status, headers, config) {
	                 deferred.resolve({ "data": data, "status": status });
	             }).
	             error(function(data, status, headers, config) {
	                 deferred.reject({ "data": data, "status": status });
	             });
	             return deferred.promise;
	         }
	         this.request = function(option) {
	             var deferred = $q.defer();
	             $.ajax(option)
	                 .done(function(data, status, headers, config) {
	                     deferred.resolve({ "data": data, "status": status });
	                 })
	                 .fail(function(data, status, headers, config) {
	                     deferred.reject({ "data": data, "status": status });
	                 });;
	             return deferred.promise;
	         }*/
	        this.getDateRandom = function() {
	                var n = 10000,
	                    m = 99999
	                return Date.now() + parseInt(Math.random() * (n - m + 1) + m);
	            }
	            //获取URL的参数
	        this.getURLPara = function(name) {
	            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	            var r = window.location.search.substr(1).match(reg);
	            if (r != null) return unescape(r[2]);
	            return null;
	        }

	        this.isWeixin = function() {
	            var ua = navigator.userAgent.toLowerCase();
	            if (ua.match(/MicroMessenger/i) == "micromessenger") {
	                return true;
	            } else {
	                return false;
	            }
	        };
	        this.isH5 = function() {
	            var ua = navigator.userAgent.toLowerCase();
	            if (ua.match(/MicroMessenger/i) == "micromessenger") {
	                if (this.getURLPara('h5') == 1) {
	                    return true;
	                } else {
	                    return false;
	                }
	            } else {
	                this.saveStorage('autoCheck', false);
	                return true;
	            }
	        };
	        this.showLoading = function() {
	            return $ionicLoading.show({
	                template: '<div class="ion-load-d loading-icon"></div>加载中...',
	                showBackdrop: true,
	            });
	        }
	        this.hideLoading = function() {
	            return $ionicLoading.hide();
	        }
	        this.tips = function(path, msg, timeout, prev, post, noBackdrop) {
	            var _path = $location.path();
	            if (_path == path) {
	                this.alert(msg, timeout, prev, post, noBackdrop);
	            } else {
	                $ionicLoading.hide();
	            }
	        };
	        this.alert = function(msg, timeout, prev, post, noBackdrop) {
	            var _noBackdrop = angular.isDefined(noBackdrop) ? noBackdrop : true;

	            $ionicLoading.show({
	                template: '<div style="z-index:999;">' + msg + '</div>',
	                noBackdrop: _noBackdrop
	            });
	            $timeout(function() {
	                prev && prev();
	                $ionicLoading.hide();
	                post && post();
	            }, timeout || 1000);
	            return false;
	        }
	        this.lipsLink = function(path, msg, rootScope, doFn) {
	            var _path = $location.path();
	            if (_path == path) {
	                rootScope._doFn = doFn || function() {};
	                $ionicLoading.show({
	                    template: '<div style="z-index:999;"  on-tap="_doFn()">' + msg + '</div>',
	                    noBackdrop: false
	                });
	            } else {
	                $ionicLoading.hide();
	            }


	            return false;
	        }
	        this.getIP = function() {
	            var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	            var deferred = $q.defer();
	            $.ajax({
	                dataType: 'jsonp',
	                url: url,
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function() {
	                    deferred.reject(data);
	                }
	            })

	            return deferred.promise;
	            // return this.jsonpRequest(url, {});
	        };
	        /**
	         ** 加法函数，用来得到精确的加法结果
	         ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	         ** 调用：accAdd(arg1,arg2)
	         ** 返回值：arg1加上arg2的精确结果
	         **/
	        this.accAdd = function(arg1, arg2) {
	                var r1, r2, m, c;
	                try {
	                    r1 = arg1.toString().split(".")[1].length;
	                } catch (e) {
	                    r1 = 0;
	                }
	                try {
	                    r2 = arg2.toString().split(".")[1].length;
	                } catch (e) {
	                    r2 = 0;
	                }
	                c = Math.abs(r1 - r2);
	                m = Math.pow(10, Math.max(r1, r2));
	                if (c > 0) {
	                    var cm = Math.pow(10, c);
	                    if (r1 > r2) {
	                        arg1 = Number(arg1.toString().replace(".", ""));
	                        arg2 = Number(arg2.toString().replace(".", "")) * cm;
	                    } else {
	                        arg1 = Number(arg1.toString().replace(".", "")) * cm;
	                        arg2 = Number(arg2.toString().replace(".", ""));
	                    }
	                } else {
	                    arg1 = Number(arg1.toString().replace(".", ""));
	                    arg2 = Number(arg2.toString().replace(".", ""));
	                }
	                return (arg1 + arg2) / m;
	            }
	            /**
	             ** 减法函数，用来得到精确的减法结果
	             ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
	             ** 调用：accSub(arg1,arg2)
	             ** 返回值：arg1加上arg2的精确结果
	             **/
	        this.accSub = function(arg1, arg2) {
	                var r1, r2, m, n;
	                try {
	                    r1 = arg1.toString().split(".")[1].length;
	                } catch (e) {
	                    r1 = 0;
	                }
	                try {
	                    r2 = arg2.toString().split(".")[1].length;
	                } catch (e) {
	                    r2 = 0;
	                }
	                m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	                n = (r1 >= r2) ? r1 : r2;
	                return ((arg1 * m - arg2 * m) / m).toFixed(n);
	            }
	            /**
	             ** 乘法函数，用来得到精确的乘法结果
	             ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	             ** 调用：accMul(arg1,arg2)
	             ** 返回值：arg1乘以 arg2的精确结果
	             **/
	        this.accMul = function(arg1, arg2) {
	                var m = 0,
	                    s1 = arg1.toString(),
	                    s2 = arg2.toString();
	                try {
	                    m += s1.split(".")[1].length;
	                } catch (e) {}
	                try {
	                    m += s2.split(".")[1].length;
	                } catch (e) {}
	                return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	            }
	            /** 
	             ** 除法函数，用来得到精确的除法结果
	             ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	             ** 调用：accDiv(arg1,arg2)
	             ** 返回值：arg1除以arg2的精确结果
	             **/
	        this.accDiv = function(arg1, arg2) {
	                var t1 = 0,
	                    t2 = 0,
	                    r1, r2;
	                try {
	                    t1 = arg1.toString().split(".")[1].length;
	                } catch (e) {}
	                try {
	                    t2 = arg2.toString().split(".")[1].length;
	                } catch (e) {}
	                with(Math) {
	                    r1 = Number(arg1.toString().replace(".", ""));
	                    r2 = Number(arg2.toString().replace(".", ""));
	                    return (r1 / r2) * pow(10, t2 - t1);
	                }
	            }
	            //保存缓存
	        this.saveStorage = function(key, val) {
	            try {
	                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
	                var data = [];
	                data[key] = {
	                    'ttl': Date.now(),
	                    'val': val
	                };
	                window.localStorage.setItem(key, window.JSON.stringify(data[key]));
	                return data[key];
	            } catch (e) {
	                return false;
	            }
	        };
	        //读取缓存
	        this.loadStorage = function(key, ttl) {
	            try {
	                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
	                var data = [];
	                data[key] = window.JSON.parse(window.localStorage.getItem(key));;
	                return (data[key] && (data[key].ttl > Date.now() - (ttl || 60 * 60 * 24 * 365) * 1000)) ? data[key].val : false;
	            } catch (e) {
	                return false;
	            }
	        };
	        //清除缓存
	        this.clearStorage = function(clear_key, prefix) {
	            prefix = prefix || '~';
	            Object.keys(localStorage).forEach(function(key) {
	                if (typeof(clear_key) == 'undefined') {
	                    if (key.substring(0, 1) == prefix) {
	                        window.localStorage.removeItem(key);
	                    }
	                } else {
	                    if (key == prefix + clear_key) {
	                        window.localStorage.removeItem(key);
	                    }
	                }

	            });
	        };
	        /*//设置cookie
	        this.setCookie = function(cname, cvalue, exdays) {
	                var d = new Date();
	                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	                var expires = "expires=" + d.toUTCString();
	                document.cookie = cname + "=" + escape(cvalue) + "; " + expires + ";path=/";
	            }
	            //获取cookie
	        this.getCookie = function(cname) {
	                var name = cname + "=";
	                var ca = document.cookie.split(';');
	                for (var i = 0; i < ca.length; i++) {
	                    var c = ca[i];
	                    while (c.charAt(0) == ' ') c = c.substring(1);
	                    var res = c.substring(name.length, c.length);
	                    if (c.indexOf(name) != -1) return unescape(res);
	                }
	                return "";
	            }
	            //清除cookie  
	        this.delCookie = function(name) {
	                var exp = new Date();
	                exp.setTime(exp.getTime() - 1);
	                var cval = getCookie(name);
	                if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	            }*/
	        //计算盈亏
	        //isOil = 100  other =1
	        //
	        this.CalPro = function(newSP, buyRate, sum, plRate, plUnit, isUp) {
	            if (angular.isUndefined(newSP)) {
	                return 0;
	            }
	            var _sbuRate = this.accSub(newSP, buyRate);
	            var _other = _sbuRate * sum * plRate * isUp;
	            return (_other / plUnit).toFixed(3);
	        };
	        this.popupTips = function(msg, okFn, title, subTitle) {
	            var myPopup = $ionicPopup.show({
	                template: msg,
	                title: title || '提示',
	                subTitle: subTitle || '',
	                buttons: [{
	                    text: '<b>确定</b>',
	                    type: 'button-energized',
	                    onTap: function(e) {
	                        okFn && okFn(myPopup);
	                        e.preventDefault();
	                    }
	                }]
	            });
	        };

	        this.checkPwd = function(value) {
	            if (!angular.isString(value)) {
	                value = value + '';
	            }
	            if (value.match(/^((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/)) {
	                return true;
	            } else {
	                return false;
	            }
	        };
	        this.checkTel = function(value) {
	            if (!angular.isString(value)) {
	                value = value + '';
	            }
	            if (value.match(config.telReg)) {
	                return true;
	            } else {
	                return false;
	            }
	        };
	        this.checkMoney = function(value) {
	            if (!angular.isString(value)) {
	                value = value + '';
	            }
	            if (value.match(config.moneyReg)) {
	                return true;
	            } else {
	                return false;
	            }
	        };
	        this.checkBlankCardNum = function(value) {
	            if (!angular.isString(value)) {
	                value = value + '';
	            }
	            if (!config.bankNumberReg.test(value)) {
	                config.bankNumberReg.lastIndex = 0;
	                return true;
	            } else {
	                config.bankNumberReg.lastIndex = 0;
	                return false;
	            }

	        };
	        this.trim = function(str) {
	            return str.replace(/(^\s+)|(\s+$)/g, "");
	        }
	        this.removeAllSpace = function(str) {
	                str = str + '';
	                return str.replace(/\s+/g, "");
	            }
	            //buyDate 时间戳
	        this.getCloseDate = function(buyDate) {

	            var buydd = new Date();
	            buydd.setTime(buyDate);
	            var buyHours = buydd.getHours();
	            if (buyHours > 6) {
	                buydd.setDate(buydd.getDate() + 1);
	            }
	            return buydd;
	        }
	        this.getNumber = function(str) {
	            str = str + '';
	            return str.replace(/[^\d]/g, "");
	        };
	        this.getFloat = function(str) {
	            str = str + '';
	            //先把非数字的都替换掉，除了数字和.
	            str = str.replace(/[^\d.]/g, "");
	            //必须保证第一个为数字而不是.
	            str = str.replace(/^\./g, "");
	            //保证只有出现一个.而没有多个.
	            str = str.replace(/\.{2,}/g, "");
	            //保证.只出现一次，而不能出现两次以上
	            return str.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	        }
	        this.getDateRandom = function(n, m) {
	            return Date.now() + parseInt(Math.random() * (n - m + 1) + m);
	        }

	        this.encodeBase64Url = function(str) {
	            if (typeof str !== 'string') {
	                return null;
	            }
	            str = this.encodeBase64(str);
	            str = str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
	            return str;
	        };
	        this.decodeBase64Url = function(str) {
	            if (typeof str !== 'string') {
	                return null;
	            }
	            var mod = str.length % 4;
	            if (mod !== 0) {
	                str += this.repeat('=', 4 - mod);
	            }
	            str = str.replace(/-/g, '+').replace(/_/g, '/');
	            str = this.decodeBase64(str);
	            return str;
	        };
	        this.repeat = function(str, num) {
	            return new Array(num + 1).join(str);
	        };
	        this.encodeBase64 = function(str) {
	            if (typeof str !== 'string') {
	                return null;
	            }
	            str = (str + '').toString();
	            var strReturn = '';
	            if (window.btoa) {
	                strReturn = window.btoa(unescape(encodeURIComponent(str)));
	            } else {
	                strReturn = this.encodeBase64Fallback(str);
	            }
	            return strReturn;
	        };
	        this.decodeBase64 = function(str) {
	            if (typeof str !== 'string') {
	                return null;
	            }
	            str = (str + '').toString();
	            var strReturn = '';
	            if (window.atob) {
	                strReturn = decodeURIComponent(escape(window.atob(str)));
	            } else {
	                strReturn = this.decodeBase64Fallback(str);
	            }
	            return strReturn;
	        };
	        this.encodeBase64Fallback = function(data) {
	            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	                ac = 0,
	                enc = '',
	                tmp_arr = [];

	            if (!data) {
	                return data;
	            }

	            data = unescape(encodeURIComponent(data));

	            do {
	                // pack three octets into four hexets
	                o1 = data.charCodeAt(i++);
	                o2 = data.charCodeAt(i++);
	                o3 = data.charCodeAt(i++);

	                bits = o1 << 16 | o2 << 8 | o3;

	                h1 = bits >> 18 & 0x3f;
	                h2 = bits >> 12 & 0x3f;
	                h3 = bits >> 6 & 0x3f;
	                h4 = bits & 0x3f;

	                // use hexets to index into b64, and append result to encoded string
	                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	            } while (i < data.length);

	            enc = tmp_arr.join('');

	            var r = data.length % 3;

	            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	        };
	        this.decodeBase64Fallback = function(data) {
	            var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
	                ac = 0,
	                dec = '',
	                tmp_arr = [];

	            if (!data) {
	                return data;
	            }

	            data += '';

	            do {
	                // unpack four hexets into three octets using index points in b64
	                h1 = b64.indexOf(data.charAt(i++));
	                h2 = b64.indexOf(data.charAt(i++));
	                h3 = b64.indexOf(data.charAt(i++));
	                h4 = b64.indexOf(data.charAt(i++));

	                bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

	                o1 = bits >> 16 & 0xff;
	                o2 = bits >> 8 & 0xff;
	                o3 = bits & 0xff;

	                if (h3 == 64) {
	                    tmp_arr[ac++] = String.fromCharCode(o1);
	                } else if (h4 == 64) {
	                    tmp_arr[ac++] = String.fromCharCode(o1, o2);
	                } else {
	                    tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	                }
	            } while (i < data.length);

	            dec = tmp_arr.join('');

	            return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
	        };
	        /*1.用正则表达式实现html转码*/
	        this.htmlEncodeByRegExp = function(str) {
	            var s = "";
	            if (str.length == 0) return "";
	            s = str.replace(/&/g, "&amp;");
	            s = s.replace(/</g, "&lt;");
	            s = s.replace(/>/g, "&gt;");
	            // s = s.replace(/ /g, "&nbsp;");
	            s = s.replace(/\'/g, "&#39;");
	            s = s.replace(/\"/g, "&quot;");
	            return s;
	        };
	        /*2.用正则表达式实现html解码*/
	        this.htmlDecodeByRegExp = function(str) {
	            var s = "";
	            if (str.length == 0) return "";
	            s = str.replace(/&amp;/g, "&");
	            s = s.replace(/&lt;/g, "<");
	            s = s.replace(/&gt;/g, ">");
	            //  s = s.replace(/&nbsp;/g, " ");
	            s = s.replace(/&#39;/g, "\'");
	            s = s.replace(/&quot;/g, "\"");
	            return s;
	        }
	        this.isEmptyObject = function(e) {
	            if ("undefined" == typeof e) {
	                return true;
	            }
	            var t;
	            for (t in e)
	                return !1;
	            return !0
	        };
	        this.inArray = function(elem, arr, i) {
	                var len;

	                if (arr) {
	                    if (typeof(indexOf) == 'Function') {
	                        return indexOf.call(arr, elem, i);
	                    }

	                    len = arr.length;
	                    i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

	                    for (; i < len; i++) {
	                        // Skip accessing in sparse arrays
	                        if (i in arr && arr[i] === elem) {
	                            return i;
	                        }
	                    }
	                }

	                return -1;
	            }
	            //收支明细类型 名称
	        this.transactionType = function(str) {
	            var type = "";
	            switch (str) {
	                case 'SELL_STORAGE':
	                    type = '平仓';
	                    break;
	                case 'BUILD_STORAGE':
	                    type = '建仓';
	                    break;
	                case 'RECHARGE':
	                    type = '充值';
	                    break;
	                case 'COMPENSATION':
	                    type = '补偿';
	                    break;
	                case 'WITHDRAWALS':
	                    type = '提现';
	                    break;
	                case 'WITHDRAWALS_APPLY':
	                    type = '提现';
	                    break;
	                case 'WITHDRAWALS_FAIL':
	                    type = '冻结返还';
	                    break;
	                case 'WITHDRAWALS_SUCCESS':
	                    type = '提现成功';
	                    break;
	                default:
	                    type = '未知原因!';
	                    break;
	            }

	            return type;
	        }
	        $rootScope.transactionType = this.transactionType;

	        //订单state类型  
	        this.storagesStateName = function(state, isSell) {
	            var textud = '-';
	            if (isSell) {
	                if (state == 'MANUAL') {
	                    textud = '手动平仓';
	                } else if (state == 'BUINESS_SETTLEMENT') {
	                    textud = '交易日平仓';
	                } else if (state == 'AUTO_PROFIT') {
	                    textud = '止盈平仓';
	                } else if (state == 'AUTO_LOSS') {
	                    textud = '止损平仓';
	                } else if (state == 'BLAST') {
	                    textud = '爆仓';
	                } else if (state == 'ADMIN') {
	                    textud = '管理员手动平仓';
	                } else if (state == 'RESET') {
	                    textud = '重新平仓结算';
	                } else if (state == 'COMPENSATION') {
	                    textud = '补偿';
	                }
	            } else {
	                textud = '建仓';
	            }
	            return textud;
	        };
	        $rootScope.storagesStateName = this.storagesStateName;

	        this.date = function(date, format) {
	            var _format = angular.isDefined(format) ? format : 'yyyy-MM-dd HH:mm:ss';
	            return $filter('date')(date, _format);
	        }
	        $rootScope.date = this.date;

	        this.ordertype = function(type) {
	            var name = type;
	            switch (type) {
	                case 'UP':
	                    name = '买涨';
	                    break;
	                case 'DROP':
	                    name = '买跌';
	                    break;
	                default:
	            }
	            return name;
	        };
	        $rootScope.ordertype = this.ordertype;
	        //显示 收入 还是支出
	        this.moneyStr = function(num, type) {
	            if (num > 0) {
	                return '+' + num;
	            } else if (num == 0) {
	                if (type == 'SELL_STORAGE') {
	                    return '+' + num;
	                } else if (type == 'BUILD_STORAGE') {
	                    return '-' + num;
	                } else {
	                    return '+' + num;
	                }

	            } else {
	                return num;
	            }
	        };
	        $rootScope.moneyStr = this.moneyStr;

	        //显示 收入 还是支出
	        this.moneyType = function(num, type) {
	            if (num > 0) {
	                return '收入';
	            } else if (num == 0) {
	                if (type == 'SELL_STORAGE') {
	                    return '收入';
	                } else if (type == 'BUILD_STORAGE') {
	                    return '支出';
	                }

	            } else {
	                return '支出';
	            }
	        };
	        $rootScope.moneyType = this.moneyType;

	        this.percenTage = function(num) {
	            var name = "其他";
	            name = parseInt(num * 100) + '%';
	            return name;
	        };
	        $rootScope.percenTage = this.percenTage;

	        //性别  
	        this.sexName = function(sex) {
	            var name = '男'
	            switch (sex) {
	                case 1:
	                    name = '男';
	                    break;
	                default:
	                    name = '女';
	                    break;
	            }
	            return name;
	        };
	        $rootScope.sexName = this.sexName;
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(12), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, ChartOptionFactory, echarts) {
	        // K线 
	        app.directive('echarts', function($timeout, $window) {
	            return {
	                restrict: 'AE',
	                transclude: true,
	                template: __webpack_require__(18),
	                scope: {
	                    url: '=',
	                    updatechart: '&',
	                    type: '=',
	                    showTips: "=",
	                    showRetry: "=",
	                    loading: '='
	                },
	                controller: function($scope) {
	                    this.updateChartInfo = function() {
	                        void 0;
	                    }
	                },
	                link: function(scope, element, attributes) {

	                    var chartDom = $("#echarts_k");

	                    var init = function() {
	                        var window_height = $(window).height();
	                        var _s = 0.6,
	                            _footer = 0;
	                        if ($(window).width() > $(window).height()) {
	                            _s = 1;
	                            _footer = 49;
	                        }
	                        var _h = window_height * _s - 44 - 50 - 33 - _footer;
	                        chartDom.height(_h);
	                        chartDom.width($(window).width());
	                    };

	                    init();

	                    scope.eChart = echarts.init(chartDom[0]);

	                    angular.element($window).bind('resize', function() {

	                        init();
	                        scope.eChart.resize();
	                    })

	                    var _update_time = null;

	                    scope._update = function(type) {
	                        scope.preType = scope.type;

	                        scope.type = type;
	                        if (_update_time) {
	                            $timeout.cancel(_update_time);
	                        }
	                        _update_time = $timeout(function() {
	                            scope.updatechart({
	                                chart: scope.eChart,
	                                type: type,
	                                success: function(xdata, ydata) {
	                                    if (type == 1) {

	                                        ChartOptionFactory.setData('timeLine', xdata, ydata);
	                                        scope.option = ChartOptionFactory.get();
	                                        scope.eChart.setOption(scope.option.timeLine, true);
	                                    } else {
	                                        ChartOptionFactory.setData('kLine', xdata, ydata);
	                                        scope.option = ChartOptionFactory.get();
	                                        scope.eChart.setOption(scope.option.kLine, true);
	                                    }

	                                    void 0;
	                                },
	                                error: function(status) {
	                                    // scope.type = scope.preType;
	                                    if (scope.type != 1) {
	                                        scope.isShow = false;
	                                    }
	                                }
	                            });
	                        }, 300);
	                    }

	                    scope._retry = function() {
	                        scope._update(scope.type);
	                    }
	                    scope.preType = 1;
	                    scope._update(scope.type);
	                }
	            };
	        });
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"echarts_content\" id='echarts_content' style=\"width:100%;display: block;\">\r\n    <div class=\"echarts_tips\" id='echarts_tips' style=\"width:100%;\" ng-show=\"showTips\">\r\n        <div class=\"box\">\r\n            <div class=\"title\"><i class=\"icon ion-android-alert\"></i>当前不是交易时段</div>\r\n            <div class=\"subtitle\">交易时间:周一早上8:00-周六凌晨4:00</div>\r\n            <div class=\"closeTime\">夏令时4:00-6:00为休市结算时段</div>\r\n            <div class=\"closeTime\">冬令时4:00-7:00为休市结算时段</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"echarts_retry\" id='echarts_retry' style=\"width:100%;\" ng-show=\"showRetry\">\r\n        <a class=\"button button-outline button-small icon-left ion-ios-reload retry_btn\" on-tap=\"_retry()\">重新获取</a>\r\n    </div>\r\n    <div class=\"echarts_loading loading \" id='echarts_loading' style=\"width:100%;\" ng-show=\"loading\">\r\n        <div class=\"box\">\r\n            <div class=\"ion-load-d loading-icon\"></div>\r\n        </div>\r\n        \r\n    </div>\r\n    <div class=\"echarts_k\" id='echarts_k' style=\"width:100%;display: block;\"></div>\r\n</div>\r\n<div class=\"echarts_bar row\" id=\"echarts_nav\">\r\n    <div class=\"col line_btn\" on-tap=\"_update(1)\" ng-class=\"{active:type==1, default:type!=1}\"> 分时线</div>\r\n    <div class=\"col five_btn\" on-tap=\"_update(2)\" ng-class=\"{active:type==2, default:type!=2}\">五分</div>\r\n    <div class=\"col fifteen_btn\" on-tap=\"_update(3)\" ng-class=\"{active:type==3, default:type!=3}\">十五分</div>\r\n    <div class=\"col thirty_btn\" on-tap=\"_update(4)\" ng-class=\"{active:type==4, default:type!=4}\">三十分</div>\r\n    <div class=\"col hour_btn\" on-tap=\"_update(5)\" ng-class=\"{active:type==5, default:type!=5}\">一小时</div>\r\n</div>\r\n"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by liuhuisheng on 2015/2/28.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, UtilService) {

	    app.directive('inputNumber', function(UtilService) {
	            return {
	                restrict: 'AE',
	                replace: true,
	                scope: {
	                    data: '=',
	                    max: "@",
	                    min: "@",
	                    step: "@",
	                    minus: "&",
	                    plus: "&",
	                    editable: "@",
	                    unit: "@",
	                    maxreplace: "@",
	                    minreplace: "@",
	                    init: "="
	                },
	                template: '<div class="input_number row">' +
	                    '<div class="col  button_wrap">' +
	                    '<div class="input_button left_button" on-touch="minusBuyCount()"><i class="ion-minus-round" ></i></div>' +
	                    '</div>' +
	                    '<div class="col text-center" on-touch="showEditable()" >' +
	                    '<div  class="text-center number_value replaceStr" ng-show="isreplace">{{replaceStr}}</div>' +
	                    '<div  class="text-center number_value" ng-show="(!isshow)&&(!isreplace)">{{data}}{{unit}}</div>' +
	                    '<input type="tel" class="number_value" ng-show="(isshow)&&!isreplace" ng-model="data" ng-blur="cheackCount()" ng-disabled="!isshow" 　readOnly="{{!isshow}}">' +
	                    '</div>' +
	                    '<div class="col text-right button_wrap">' +
	                    '<div class="input_button right_button" on-touch="plusBuyCount()"><i class="ion-plus-round" ></i></div>' +
	                    '</div>' +
	                    '</div>',
	                link: function(scope, element, attrs, accordionController) {

	                    scope.replaceStr = '';
	                    scope.isshow = false;
	                    scope.isreplace = false;

	                    //检验是否替换显示
	                    var checkReplace = function(obj, str) {
	                        void 0;
	                        if (scope.data == obj && angular.isDefined(str)) {
	                            scope.replaceStr = str;
	                            scope.isreplace = true;
	                        } else {
	                            scope.replaceStr = '';
	                            scope.isreplace = false;
	                        }
	                        return scope.isreplace;
	                    }

	                    var init = function(value) {
	                            scope.data = value;
	                            void 0;
	                            //初始简称替换显示
	                            if (!checkReplace(scope.min, scope.minreplace)) {
	                                checkReplace(scope.max, scope.maxreplace);
	                            }
	                        }
	                        //初始化
	                    init(scope.data);

	                    scope.init['do'] = init;

	                    //触发显示编辑框
	                    scope.showEditable = function() {
	                        if (scope.editable == 'true') {
	                            scope.isshow = true;
	                        }
	                    };

	                    //减处理
	                    scope.minusBuyCount = function() {

	                        if (scope.data > scope.min) {
	                            scope.data = Number(scope.data) - Number(scope.step);
	                        }
	                        //检验数值
	                        scope.cheackCount();
	                        //检验最大最小值替换字符
	                        checkReplace(scope.min, scope.minreplace);

	                        scope.isshow = false;
	                        scope.minus();
	                    };

	                    //加处理
	                    scope.plusBuyCount = function() {

	                        if (scope.data < scope.max) {
	                            scope.data = Number(scope.data) + Number(scope.step);
	                        }
	                        //检验数值
	                        scope.cheackCount();
	                        //检验最大最小值替换字符
	                        checkReplace(scope.max, scope.maxreplace);

	                        scope.isshow = false;
	                        scope.plus();

	                    };
	                    //校验输入是否正确
	                    scope.cheackCount = function() {
	                        scope.isshow = false;
	                        scope.data = parseInt(scope.data);

	                        if (isNaN(scope.data)) {
	                            scope.data = scope.min;
	                        }

	                        if (scope.data > scope.max) {

	                            scope.data = scope.max;
	                            UtilService.alert('最大值为:' + scope.max);
	                        }
	                        if (scope.data < scope.min) {

	                            scope.data = scope.min;
	                            UtilService.alert('最小值为:' + scope.min);
	                        }
	                    }
	                }
	            }
	        })
	        // end oukeye
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by liuhuisheng on 2015/2/28.
	 */
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(16),__webpack_require__(21)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, UtilService) {
	    app.directive('productSlide', function($ionicSlideBoxDelegate, $window, UtilService,ContractFactory) {
	        return {
	            restrict: 'AE',
	            scope: {
	                contracts: "=",
	                changed: "&",
	                buy: "&"
	            },
	            transclude: true,
	            template: __webpack_require__(22),
	            link: function(scope, element, attrs) {


	                var init = function() {
	                    var window_height = $(window).height();
	                    var _s = 0.4
	                    if ($(window).width() > $(window).height()) {
	                        _s = 1
	                    }
	                    var _h = window_height * _s - 49;

	                    scope.sliderHeight = _h;
	                    $(element).height(_h);
	                    $(element).find('.slider').height(_h);

	                };

	                init();

	                scope.setHegith = function(product) {
	                    scope.count = product.length;
	                    return (scope.sliderHeight - 8) / scope.count;
	                };

	                angular.element($window).bind('resize', function() {
	                    init();
	                });


	                scope._changed = function(index) {
	                    scope.changed({ index: index });
	                    $ionicSlideBoxDelegate.update();
	                };

	                scope.getContracts = function() {
	                    ContractFactory.updateContracts().then(function() {
	                        scope.contracts = ContractFactory.getContracts();
	                    });
	                };

	            }
	        }
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilService) {

	    app.factory("ContractFactory", function($q, UtilService) {
	        var contracts = [
	            { 'contract': 'XAG1', 'index': 'SILVER', 'name': '粤银', 'product': [] },
	            { 'contract': 'OIL', 'index': 'OIL', 'name': '粤油', 'product': [] },
	            { 'contract': 'CU', 'index': 'COPPER', 'name': '粤铜', 'product': [] },
	        ];

	        var product = {};

	        var update = function() {

	            var deferred = $q.defer();
	            var data = {"code":200,"message":"成功",
	            "object":[
	            {"code":"CU","dataType":"COPPER","dealLimit":10,"handLimit":12,"handingCharge":0.9,"margin":10,
	            "name":"10kg粤铜","plRate":0.01,"plUnit":1,"specification":10,
	            "status":true,"ticketId":0,"unit":"元/公斤","version":0},
	            {"code":"CU2","dataType":"COPPER","dealLimit":30,"handLimit":12,"handingCharge":18,"margin":200,
	            "name":"200kg粤铜","plRate":0.2,"plUnit":1,"specification":200,
	            "status":true,"ticketId":0,"unit":"元/公斤","version":0},
	            {"code":"CU3","dataType":"COPPER","dealLimit":10,"handLimit":12,"handingCharge":9,"margin":100,
	            "name":"100kg粤铜","plRate":0.1,"plUnit":1,"specification":100,"status":false,"ticketId":0,"unit":"元/公斤",
	            "version":0},
	            {"code":"CU5","dataType":"COPPER","dealLimit":30,"handLimit":12,"handingCharge":2,"margin":18,
	            "name":"20千克电解铜","plRate":0.02,"plUnit":1,"specification":20,"status":false,"ticketId":0,
	            "unit":"元/公斤","version":0},
	            {"code":"CU6","dataType":"COPPER","dealLimit":10,"handLimit":12,"handingCharge":20,"margin":180,
	            "name":"200千克电解铜","plRate":0.2,"plUnit":1,"specification":200,"status":false,"ticketId":0,
	            "unit":"元/公斤","version":0},
	            {"code":"OIL","dataType":"OIL","dealLimit":10,"handLimit":12,"handingCharge":0.9,"margin":10,
	            "name":"1桶粤油","plRate":0.01,"plUnit":0.01,"specification":1,"status":true,"ticketId":0,
	            "unit":"元/桶","version":0},
	            {"code":"OIL2","dataType":"OIL","dealLimit":30,"handLimit":12,"handingCharge":18,"margin":200,
	            "name":"20桶粤油","plRate":0.2,"plUnit":0.01,"specification":20,"status":true,"ticketId":0,
	            "unit":"元/桶","version":0},
	            {"code":"OIL3","dataType":"OIL","dealLimit":10,"handLimit":12,"handingCharge":9,"margin":100,
	            "name":"5桶粤油","plRate":5,"plUnit":1,"specification":100,"status":false,"ticketId":0,
	            "unit":"元/桶","version":0},
	            {"code":"OIL5","dataType":"OIL","dealLimit":30,"handLimit":12,"handingCharge":2,"margin":18,
	            "name":"2桶燃料油","plRate":0.02,"plUnit":0.01,"specification":2,"status":false,"ticketId":0,
	            "unit":"元/桶","version":0},
	            {"code":"OIL6","dataType":"OIL","dealLimit":10,"handLimit":12,"handingCharge":20,"margin":180,
	            "name":"20桶燃料油","plRate":0.2,"plUnit":0.01,"specification":20,"status":false,"ticketId":0,
	            "unit":"元/桶","version":0},
	            {"code":"XAG1","dataType":"SILVER","dealLimit":10,"handLimit":12,
	            "handingCharge":0.9,"margin":10,"name":"150g粤银","plRate":0.15,"plUnit":1,"specification":150,
	            "status":true,"ticketId":0,"unit":"元/克","version":0},
	            {"code":"XAG3","dataType":"SILVER",
	            "dealLimit":30,"handLimit":12,"handingCharge":18,"margin":200,"name":"3000g粤银","plRate":3,
	            "plUnit":1,"specification":3000,"status":false,"ticketId":0,"unit":"元/克","version":0},
	            {"code":"XAG4","dataType":"SILVER","dealLimit":30,"handLimit":12,"handingCharge":0.2,"margin":1.8,
	            "name":"20克银制品","plRate":0.02,"plUnit":1,"specification":20,"status":true,"ticketId":0,
	            "unit":"元/克","version":0},
	            {"code":"XAG5","dataType":"SILVER","dealLimit":30,"handLimit":12,"handingCharge":2,"margin":18,
	            "name":"200克银制品","plRate":0.2,"plUnit":1,"specification":200,"status":false,"ticketId":0,
	            "unit":"元/克","version":0},
	            {"code":"XAG6","dataType":"SILVER","dealLimit":10,"handLimit":12,
	            "handingCharge":20,"margin":180,"name":"2500克银制品","plRate":2.5,"plUnit":1,"specification":2500,
	            "status":true,"ticketId":0,"unit":"元/克","version":0},
	            {"code":"XAG7","dataType":"SILVER","dealLimit":10,"handLimit":12,"handingCharge":50,"margin":450,
	            "name":"8000克银制品","plRate":8,"plUnit":1,"specification":8000,"status":false,"ticketId":0,
	            "unit":"元/克","version":0}],
	            "success":true};
	           if (true == data.success) {
	                var _list = data.object;
	                var _product = { 'SILVER': [], 'OIL': [], 'COPPER': [], };
	                for (var i = 0; i < _list.length; i++) {
	                    if (_list[i].status == true) {
	                        if ('SILVER' == _list[i].dataType) {
	                            _product.SILVER.push(_list[i]);
	                        }
	                        if ('OIL' == _list[i].dataType) {
	                            _product.OIL.push(_list[i]);
	                        }
	                        if ('COPPER' == _list[i].dataType) {
	                            _product.COPPER.push(_list[i]);
	                        }
	                    }

	                    //产品数组
	                    product[_list[i].code] = _list[i];
	                }
	                contracts[0].product = _product.SILVER;
	                contracts[1].product = _product.OIL;
	                contracts[2].product = _product.COPPER;


	                deferred.resolve(data);
	            } else {
	                deferred.reject(data);
	            }

	            // $.ajax({
	            //     type: 'get',
	            //     url: config.contractsUrl,
	            //     success: function(data, status, jqXHR) {
	            //         if (true == data.success) {
	            //             var _list = data.object;
	            //             var _product = { 'SILVER': [], 'OIL': [], 'COPPER': [], };
	            //             for (var i = 0; i < _list.length; i++) {
	            //                 if (_list[i].status == true) {
	            //                     if ('SILVER' == _list[i].dataType) {
	            //                         _product.SILVER.push(_list[i]);
	            //                     }
	            //                     if ('OIL' == _list[i].dataType) {
	            //                         _product.OIL.push(_list[i]);
	            //                     }
	            //                     if ('COPPER' == _list[i].dataType) {
	            //                         _product.COPPER.push(_list[i]);
	            //                     }
	            //                 }

	            //                 //产品数组
	            //                 product[_list[i].code] = _list[i];
	            //             }
	            //             contracts[0].product = _product.SILVER;
	            //             contracts[1].product = _product.OIL;
	            //             contracts[2].product = _product.COPPER;


	            //             deferred.resolve(data);
	            //         } else {
	            //             deferred.reject(data);
	            //         }


	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	            //     }
	            // });
	            return deferred.promise;


	        }

	        return {
	            getContracts: function() {
	                return contracts;

	            },
	            getProduct: function() {
	                return product;
	            },
	            updateContracts: function() {
	                return update();
	            },
	            upadteTickets: function() {

	            }
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<ion-slide-box does-continue=\"true\" width-proportion='0.92' on-slide-changed=\"_changed($index)\">\r\n    <ion-slide on-tap=\"onTap()\" ng-repeat=\"item in contracts\" class=\"contracts\">\r\n        <div class=\"box\" ng-show='item.product.length'>\r\n            <div ng-repeat=\"item_p in item.product track by $index\" class=\"product_item product_item{{$index}}\" style=\"height:{{setHegith(item.product)}}px;\">\r\n                <div class=\"product_info\">\r\n                    <div class=\"name\">\r\n                        <span>{{item_p.name}}</span>\r\n                    </div>\r\n                    <div class=\"yk\">\r\n                        <span>波动盈亏:{{item_p.plRate}}元</span>\r\n                    </div>\r\n                    <div class=\"buy_up\" on-tap=\"buy({item:item_p,type:'UP'})\">买涨</div>\r\n                    <div class=\"buy_down\" on-tap=\"buy({item:item_p,type:'DROP'})\">买跌</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"product_retry\" ng-show=\"!item.product.length\">\r\n            <a class=\"button button-outline button-small icon-left ion-ios-reload retry_btn\" on-tap=\"getContracts()\">重新获取</a>\r\n        </div>\r\n    </ion-slide>\r\n</ion-slide-box>\r\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app) {
	       app.directive('hideTabs', function($rootScope) {
	            return {
	                restrict: 'A',
	                link: function(scope, element, attributes) {
	                    
	                    scope.$on('$ionicView.beforeEnter', function() {
	                        scope.$watch(attributes.hideTabs, function(value) {
	                            $rootScope.hideTabs = value || true;
	                        });
	                    });

	                    scope.$on('$ionicView.beforeLeave', function() {
	                        $rootScope.hideTabs = false;
	                    });
	                }
	            };
	        })
	    
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16), __webpack_require__(25)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {

	    app.factory('CaptchaFactory', function($rootScope, $ionicModal, $timeout, UtilService, TEMPLATE) {

	        var scope = $rootScope.$new(true);
	        scope.geetestObj = {};

	        //**************验证码开始**************//
	        var CaptchaModal_pomise = false;

	        var createCaptchaModal = function() {
	                return $ionicModal.fromTemplate(__webpack_require__(26), {
	                    scope: scope,
	                    animation: 'slide-in-up',
	                    backdropClickToClose: false
	                });

	            }

	        //显示 验证码
	        var showCaptchaModal = function(reqId) {
	            UtilService.showLoading();
	            if (angular.isUndefined(scope.CaptchaModal) && !CaptchaModal_pomise) {

	                scope.CaptchaModal = createCaptchaModal();
	                scope.CaptchaModal.show().then(function() {
	                    star_captcha(reqId);
	                    UtilService.hideLoading();
	                });
	            } else {
	                if (angular.isDefined(scope.CaptchaModal)) {
	                    scope.CaptchaModal.show().then(function() {
	                        star_captcha(reqId);
	                        UtilService.hideLoading();
	                    });;
	                }
	            }

	        };
	        //隐藏
	        var closeCaptchaModal = function() {
	            if (angular.isDefined(scope.CaptchaModal)) {
	                return scope.CaptchaModal.hide();
	            }
	            return false;
	        };
	        //**************验证码 结束**************//

	        scope.$on('$destroy', function() {
	            scope.CaptchaModal.remove();
	            CaptchaModal_pomise = false;
	        });

	        /*弹框 结束*/

	        /*滑动验证码start*/
	        var successFn = function(geetest) {
	            void 0;
	        };
	        var handlerEmbed = function(captchaObj) {
	            UtilService.showLoading();
	            // 将验证码加到id为captcha的元素里，同时会有三个input的值：geetest_challenge, geetest_validate, geetest_seccode
	            // $("#embed-captcha").html('');
	            $("#captcha_content").html('');
	            captchaObj.appendTo("#captcha_content");

	            captchaObj.onReady(function() {
	                UtilService.hideLoading();
	            });
	            captchaObj.onSuccess(function(data) {
	                var validate = captchaObj.getValidate();
	                if (validate) {
	                    /* scope.geetest_challenge = validate.geetest_challenge;
	                     scope.geetest_validate = validate.geetest_validate;
	                     scope.geetest_seccode = validate.geetest_seccode;*/
	                    scope.geetestObj = validate;
	                    $timeout(function() {
	                        closeCaptchaModal().then(function() {
	                            successFn && successFn(scope.geetestObj);
	                        });
	                    }, 1000);

	                } else {
	                    void 0;
	                }
	            });
	            // 更多接口参考：http://www.geetest.com/install/sections/idx-client-sdk.html
	        };

	        var star_captcha = function(reqId) {
	            $.ajax({
	                // 获取id，challenge，success（是否启用failback）
	                url: "/api/geetest/star_captcha",
	                type: "get",
	                dataType: "json",
	                data: {
	                    sid: reqId,
	                },
	                success: function(data) {
	                    // 使用initGeetest接口
	                    // 参数1：配置参数
	                    // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它做appendTo之类的事件
	                    initGeetest({
	                        gt: data.object.gt,
	                        challenge: data.object.challenge,
	                        product: "embed", // 产品形式，包括：float，embed，popup。注意只对PC版验证码有效
	                        offline: !data.object.success // 表示用户后台检测极验服务器是否宕机，一般不需要关注
	                    }, handlerEmbed);
	                }
	            });
	        }

	        /*滑动验证码end*/

	        return {

	            initSuccessFn: function(fn) {
	                successFn = fn;
	                return successFn;
	            },
	            showCaptchaModal: showCaptchaModal,
	            closeCaptchaModal:closeCaptchaModal

	        };

	    });


	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = window.geetest;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal\">\r\n    <!-- <ion-header-bar class=\" bar-positive nav-title-slide-full\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear  icon-left ion-android-close\" on-tap=\"closeBuyModal()\"></button>\r\n        </div>\r\n        <h1 class=\"title title-center\">登录</h1>\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear light\" on-tap=\"gotoState('tab.reg',false)\">注册</button>\r\n        </div>\r\n    </ion-header-bar> -->\r\n    <ion-content has-bouncing=\"false\" padding=\"false\" class=\"padding center_h no-footer\" delegate-handle=\"captchaScroll\">\r\n        <div class=\"captcha\" id=\"captcha_content\">\r\n           \r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(9), __webpack_require__(16), __webpack_require__(28), __webpack_require__(24),
	    __webpack_require__(29)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool, LoadTheme) {

	    app.factory('CustomerFactory', function($q, $rootScope, $ionicLoading, $ionicPopup, $ionicBackdrop, $ionicModal, $timeout, $state,
	        UtilService, StoragesFactory, CaptchaFactory, NewsFactory, TEMPLATE) {

	        var scope = $rootScope.$new(true);
	        scope.IP = '';
	        scope.user = {};
	        scope.isErrorLimit = false;
	        scope.isShowCaptcha = false;
	        scope.user.geetest_challenge = "";
	        scope.user.geetest_validate = "";
	        scope.user.geetest_seccode = "";
	        scope.reqId = "";

	        scope.isH5 = UtilService.isH5();

	        //**************微信登录 注册提示 开始**************//
	        var createLoginTipsModal = function() {
	            return $ionicModal.fromTemplate(__webpack_require__(31), {
	                scope: scope,
	                animation: 'slide-in-up',
	                backdropClickToClose: false
	            });
	        }

	        var closeLoginTipsModal = function() {
	            if (angular.isDefined(scope.LoginTipsModal)) {
	                scope.LoginTipsModal.hide();
	            }
	        };
	        //显示 注册提示
	        var showLoginTipsModal = function() {
	            if (angular.isUndefined(scope.LoginTipsModal)) {
	                scope.LoginTipsModal = createLoginTipsModal();
	                scope.LoginTipsModal.show();
	            } else {
	                if (angular.isDefined(scope.LoginTipsModal)) {
	                    scope.LoginTipsModal.show();
	                }
	            }

	        };

	        scope.goState = function(modal, stateName) {

	            if (angular.isDefined(modal)) {
	                modal.hide().then(function() {
	                    $state.go(stateName);
	                });
	            } else {
	                $state.go(stateName);
	            }
	        };
	        //**************微信登录 注册提示 结束**************//

	        var createModal = function() {
	            return $ionicModal.fromTemplate(__webpack_require__(32), {
	                scope: scope,
	                animation: 'slide-in-up',
	                backdropClickToClose: false
	            });
	        }

	        //隐藏
	        var closeModal = function() {
	            if (angular.isDefined(scope.LoginModal)) {
	                return scope.LoginModal.hide();
	            }
	            return false;
	        };
	        //获取ip
	        var getIP = function() {
	            var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
	            var deferred = $q.defer();
	            $.ajax({
	                dataType: 'jsonp',
	                url: url,
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            })

	            return deferred.promise;
	            // return this.jsonpRequest(url, {});
	        };
	        scope.IP == ''
	            //显示
	        var showModal = function() {
	            if (scope.IP == '') {
	                getIP().then(function(data) {
	                    scope.IP = data.Ip;
	                });
	            }
	            // UtilService.showLoading();
	            if (angular.isUndefined(scope.LoginModal)) {

	                scope.LoginModal = createModal();
	                scope.LoginModal.show();
	                //   UtilService.hideLoading();

	            } else {
	                if (angular.isDefined(scope.LoginModal)) {
	                    scope.LoginModal.show();
	                }

	                // UtilService.hideLoading();
	            }

	        };

	        scope.$on('$destroy', function() {
	            scope.LoginModal.remove();
	            scope.LoginTipsModal.remove();
	            createLoginTipsModal_pomis = false;
	        });

	        
	        /*弹框 结束*/

	        //密码错误次数验证 超过3次需要滑动图片验证码
	        var getErrorLimit = function(tel) {
	            var deferred = $q.defer();

	            UtilService.showLoading();
	            setTimeout(function(){
	                scope.isErrorLimit = false;
	                deferred.resolve(false);
	            },1000);
	                        
	           /* $.ajax({
	                type: 'get',
	                url: '/api/users/errorLimit',
	                data: {
	                    "telNumber": tel
	                },
	                dataType: 'json',
	                success: function(data) {
	                    if (data.success) {
	                        scope.isErrorLimit = data.object;
	                        deferred.resolve(data.object);
	                    } else {
	                        UtilService.alert(data.message + "(" + data.code + ")");
	                        deferred.reject(data);
	                    }

	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    UtilService.alert(jqXHR.statusText + '(' + jqXHR.status + ')');
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });*/

	            return deferred.promise;
	        }

	        // 点击登录
	        scope.tapLoginBtn = function() {

	            if (angular.isUndefined(scope.user.account) && scope.isH5) {
	                UtilService.alert('请输入手机号码');
	                return false;
	            }
	            if (angular.isUndefined(scope.user.password)) {
	                UtilService.alert('请输入密码');
	                return false;
	            }
	            if (scope.isShowCaptcha) {
	                if (scope.user.geetest_challenge == '' || scope.user.geetest_validate == '' || scope.user.geetest_seccode == '') {
	                    UtilService.alert('请滑动验证码到相对位置');
	                    return false;
	                }
	            }

	            if (!scope.isH5) {
	                weiXinLogin();
	            } else {
	                getErrorLimit(scope.user.account).then(
	                    function(isErrorLimit) {
	                        if (isErrorLimit === true) {
	                            // star_captcha();
	                            scope.reqId = UtilService.getDateRandom(10000, 99999);
	                            CaptchaFactory.initSuccessFn(function(validate) {
	                                // 验证成功 返回 对应参数console.log('login modle',validate);
	                                scope.user.geetest_challenge = validate.geetest_challenge;
	                                scope.user.geetest_validate = validate.geetest_validate;
	                                scope.user.geetest_seccode = validate.geetest_seccode;
	                                reqestLogin();
	                            });
	                            CaptchaFactory.showCaptchaModal(scope.reqId);
	                        } else {
	                            scope.reqId = UtilService.getDateRandom(10000, 99999);
	                            doLogin();
	                        }
	                    },
	                    function() {

	                    });


	            }

	        }
	        var doLogin = function() {
	            if (!scope.isH5) {
	                weiXinLogin();
	            } else {
	                reqestLogin();
	            }
	        }

	        var loginSuccess = function(data) {

	            $("#embed-captcha").html('');
	            if (data.success == false) {
	                UtilService.alert(data.message);
	            } else {
	                var _token = data.object;
	                var units = _token.split(".");
	                var jwt_payload = JSON.parse(UtilService.decodeBase64Url(units[1]));
	                var time_cookie = (jwt_payload.exp - jwt_payload.iat) / 3600000;
	                UtilTool.setCookie('token', _token, time_cookie / 24);

	                $rootScope.$broadcast('token.update', data.object);
	                //清空用户数据
	                clearCustomer();
	                //获取用户信息
	                getUserMsg();
	                //获取用户资金体验券
	                getMoneyTicketInfo();
	                //获取用户持仓单
	                StoragesFactory.updateStorages();

	                UtilService.alert(data.message, 1000, function() {}, function() {
	                    closeModal();
	                    // //检查密码强度
	                    // checkStrongPwd().then(function() {

	                    // }, function() {
	                    //     //检查是否有公告未读
	                    //     cheakNews();
	                    // });

	                });

	            }
	        };
	        //登录后，检查是否有公告未读
	        var cheakNews = function() {
	            var news = NewsFactory.getNews();
	            /* if (!checkLogin()) {
	                 return false;
	             }*/

	            if (news.last == false) {
	                NewsFactory.updateNews().then(function() {
	                    news = NewsFactory.getNews();
	                    if (!UtilService.isEmptyObject(news.content)) {
	                        NewsFactory.showReadNews();
	                    }
	                });
	            } else if (!UtilService.isEmptyObject(news.content)) {
	                NewsFactory.showReadNews();
	            }
	        };
	        //登录
	        var reqestLogin = function() {
	            if (angular.isUndefined(scope.user.account) || '' == scope.user.account) {
	                UtilService.alert('请输入手机号码');
	                return false;
	            }
	            if (angular.isUndefined(scope.user.password) || '' == scope.user.password) {
	                UtilService.alert('请输入密码');
	                return false;
	            }

	            UtilService.showLoading();
	            setTimeout(function(){
	                var data = {
	                    code:200,
	                    message:"成功",
	                    object:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTMxOTk1MTk4OTksInN1YiI6IjE5OCIsImlzcyI6Ind3dy5meGVhc3kuY24iLCJhdWQiOiJwY19jbGllbnQiLCJhY2NvdW50IjoibzhONTR3RjJ1UnhQekV0Z01hTk5jRkVwN0FvTSIsImlhdCI6MTQ5MzE3NzkxOTg5OX0.yqH6ht67rSdPajroatYfa1XdRGlVkvdCBifO6NScdDk",
	                    success:true
	                };
	                 loginSuccess(data);
	            },3000)
	            // $.ajax({
	            //     type: 'post',
	            //     url: '/api/users/token',
	            //     data: {
	            //         "telNumber": scope.user.account,
	            //         "password": scope.user.password,
	            //         "sid": scope.reqId,
	            //         "geetest_challenge": scope.user.geetest_challenge,
	            //         "geetest_validate": scope.user.geetest_validate,
	            //         "geetest_seccode": scope.user.geetest_seccode
	            //     },
	            //     dataType: 'json',
	            //     success: function(data) {
	            //         loginSuccess(data);
	            //     },

	            //     error: function(jqXHR, statusText, errorthow) {
	            //         UtilService.hideLoading();
	            //         deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	            //     }

	            // });

	        };

	        //微信登录
	        var weiXinLogin = function() {
	            var _openID = getOpenId();
	            var _pwd = scope.user.password;
	            if (angular.isUndefined(_pwd) || '' == _pwd) {
	                UtilService.alert('请输入密码');
	                return false;
	            }

	            UtilService.showLoading();

	            $.ajax({
	                type: 'post',
	                url: '/api/users/token',
	                data: {
	                    "account": _openID,
	                    "password": _pwd
	                },
	                dataType: 'json',
	                success: function(data, status, jqxhr) {
	                    loginSuccess(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    UtilService.alert(jqXHR.statusText + '(' + jqXHR.status + ')');
	                }
	            });
	        }

	        var getUserMsg = function() {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                checkLogin();
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data = {"code":200,"message":"成功","object":{"account":"o8N54wF2uRxPzEtgMaNNcFEp7AoM","cancelStatus":true,"couponTransfer":0,"dealCountAll":0,"hasCodes":[],"headimgurl":"http://wx.qlogo.cn/mmopen/tsgqoSDtg9cUHEYSKJIlZsibAlZp9WTW0qI1IvAMTnv2E8Wibromd7EfDbfkIxiaGU2mXKRVKqbwDrxp6VuoqY7QRQ1o6ia0mfiaV/0","id":198,"memberId":1,"nickname":"OU.KEYE","openPositionsInfo":{},"orderAll":0,"organId":1,"profitlossAll":0,"rankStatus":true,"sex":1,"skinName":"gdiex","status":"DEFAULT","telNumber":"135****0583","tickets":[]},"success":true};
	            if (data.success == true) {
	                var _skin = data.object.skinName || 'gdiex';

	                UtilTool.setCookie('theme', _skin, 30);

	                //加载皮肤
	                LoadTheme.load();

	                if (data.object.telNumber == '' || data.object.telNumber == null) {
	                    showLoginTipsModal();
	                } else {
	                    UtilService.saveStorage('customer', data.object);
	                    $rootScope.$broadcast('customer.update', data.object);
	                    updateCustomer(data.object);
	                    deferred.resolve(data);
	                }

	            } else {
	                //判断token是否有效
	                if (data.code == 401) {
	                    UtilTool.setCookie('token', ''); //情况当前token 重新登录获取
	                    checkLogin();
	                } 
	                deferred.reject(data);
	            }
	            // $.ajax({
	            //     type: 'GET',
	            //     timeout: 3000,
	            //     url: '/api/customers',
	            //     dataType: "json",
	            //     headers: {
	            //         'Authorization': config.BASIC + _token
	            //     },
	            //     success: function(data) {

	            //         if (data.success == true) {
	            //             var _skin = data.object.skinName || 'gdiex';

	            //             UtilTool.setCookie('theme', _skin, 30);

	            //             //加载皮肤
	            //             LoadTheme.load();

	            //             if (data.object.telNumber == '' || data.object.telNumber == null) {
	            //                 showLoginTipsModal();
	            //             } else {
	            //                 UtilService.saveStorage('customer', data.object);
	            //                 $rootScope.$broadcast('customer.update', data.object);
	            //                 updateCustomer(data.object);
	            //                 deferred.resolve(data);
	            //             }

	            //         } else {
	            //             //判断token是否有效
	            //             if (data.code == 401) {
	            //                 UtilTool.setCookie('token', ''); //情况当前token 重新登录获取
	            //                 checkLogin();
	            //             } 
	            //             deferred.reject(data);
	            //         }
	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	            //     }
	            // });

	            return deferred.promise;
	        }

	        var checkLogin = function() {
	            //判断是否登录
	            var _Customer_token = UtilTool.getCookie('token');
	            var openID = UtilTool.getCookie('openID');
	            if (!scope.isH5) {

	                if (!openID || openID == undefined || openID == null || openID == 'undefined') { //有没有openID
	                    //没有openid
	                    if (!_Customer_token || _Customer_token == undefined || _Customer_token == null || _Customer_token == 'undefined') { //有没有token
	                        //没有openid,没有token
	                        window.location.href = "../../oauth.html?channel=NORMAL";
	                    } else {
	                        //没有openid,有token(新用户)
	                        //获取用户信息
	                        getUserMsg();
	                        //获取用户资金体验券
	                        getMoneyTicketInfo();
	                    }
	                } else {
	                    //有openid
	                    if (!_Customer_token || _Customer_token == undefined || _Customer_token == null || _Customer_token == 'undefined') { //有没有token
	                        showModal(); //生成登录框
	                    } else {
	                        //有openid,有token()
	                    }
	                }
	            } else {
	                if (_Customer_token == '') {
	                    showModal();
	                    return false;
	                } else {
	                    return true
	                }
	            }
	            return true;
	        };
	        var logout= function(){
	            customer = null;
	            UtilService.clearStorage('customer');
	            UtilTool.setCookie('token',''); 
	            UtilTool.delCookie('token');
	            $rootScope.$broadcast('customer.update');
	            
	        };

	        var getOpenId = function() {
	            var openID = UtilTool.getCookie('openID');
	            if ("" == openID) {
	                window.location.href = "../../oauth.html?channel=NORMAL";
	            } else {
	                return openID;
	            }
	        };
	        //判断强密码
	        var checkStrongPwd = function() {
	            var deferred = $q.defer();
	            //检验是否登录
	            if (checkLogin()) {
	                var _token = UtilTool.getCookie('token');
	                var data ={"code":200,"message":"成功","object":false,"success":true};
	                if (data.success) {
	                    if (data.object) {
	                        showStrongPwdTips();
	                        deferred.resolve(data.object);
	                    }
	                }
	                deferred.reject(false);
	                // $.ajax({
	                //     type: 'get',
	                //     url: '/api/users/isStrongPwd',
	                //     headers: {
	                //         'Authorization': config.BASIC + _token
	                //     },
	                //     dataType: 'json',
	                //     success: function(data) {
	                //         if (data.success) {
	                //             if (data.object) {
	                //                 showStrongPwdTips();
	                //                 deferred.resolve(data.object);
	                //             }
	                //         }
	                //         deferred.reject(false);
	                //     },
	                //     error: function(jqXHR, statusText, errorthow) {
	                //         deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                //     }
	                // });
	            } else {
	                void 0;
	                deferred.reject(false);
	            }

	            return deferred.promise;
	        };
	        var showStrongPwdTips = function() {
	            UtilService.popupTips("密码较弱,为不影响正常使用,请尽快重置密码", function(pop) {
	                pop.close();
	                $state.go("tab.password");
	            });
	        };

	        scope.goPcReg = function() {
	            var _pomise = closeModal();
	            if (_pomise) {
	                _pomise.then(function() {
	                    $state.go('tab.pcReg');
	                });
	            } else {
	                $state.go('tab.pcReg');
	            }

	        }

	        //获取用户资金
	        var getMoneyTicketInfo = function() {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                checkLogin();
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data ={"code":200,"message":"成功","object":{"cancelStatus":false,"dealCountAll":0,"hasCodes":[],"id":0,"memberId":0,"money":{"amount":9999,"blockedFunds":0,"customerId":198,"memberCode":"UA","version":0,"withdrawDeposit":0},"openPositionsInfo":{},"orderAll":0,"organId":0,"profitlossAll":0,"rankStatus":false,"sex":0,"status":"DEFAULT","tickets":[]},"success":true};
	           if (data.code == -255 || data.code == 401) {
	                UtilService.alert('用户' + data.message);
	                deferred.reject(data);
	            } else {
	                var _Customer = getCustomer();
	                _Customer['money'] = data.object.money;
	                _Customer['tickets'] = data.object.tickets;
	                updateCustomer(_Customer);
	                deferred.resolve(data);
	            }
	           /* $.ajax({
	                type: 'GET',
	                url: '/api/moneyAndTicketInfo',
	                dataType: "json",
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                success: function(data) {
	                    if (data.code == -255 || data.code == 401) {
	                        UtilService.alert('用户' + data.message);
	                        deferred.reject(data);
	                    } else {
	                        var _Customer = getCustomer();
	                        _Customer['money'] = data.object.money;
	                        _Customer['tickets'] = data.object.tickets;
	                        updateCustomer(_Customer);
	                        deferred.resolve(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });*/
	            return deferred.promise;
	        }

	        //更新用户token 并通知传播信息
	        var updateToken = function(data) {
	            UtilService.saveStorage('token', data);
	            $rootScope.$broadcast('token.update');
	        };
	        //更新用户资料 并通知传播信息
	        var customer = null;
	        var updateCustomer = function(data) {
	            UtilService.saveStorage('customer', data);
	            customer = data;
	            $rootScope.$broadcast('customer.update');
	        };
	        var getCustomer = function() {
	            if (customer) {
	                return customer;
	            } else {
	                customer = UtilService.loadStorage('customer');
	                if(customer){
	                  return customer; 
	                }else{
	                    return {};
	                }
	            }
	        };
	        var clearCustomer = function() {
	            UtilService.clearStorage('customer');
	            // customer={};
	            $rootScope.$broadcast('customer.update');
	        };
	        //获取挂会名称
	        var memberName = '';
	        var updateMenberName = function() {
	            var deferred = $q.defer();
	            $.ajax({
	                type: 'GET',
	                url: '/api/member',
	                dataType: "json",
	                success: function(data) {
	                    if (data.success) {
	                        memberName = data.object;
	                        deferred.resolve(data.object);
	                    } else {
	                        deferred.reject(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        };
	        // 获取挂会名称 结束
	        //获取 注册是否使用拖动图片验证方式
	        var useGeetest = '';
	        var updateUseGeetest = function() {
	            var deferred = $q.defer();

	            $.ajax({
	                type: 'GET',
	                url: '/api/member/useGeetest',
	                dataType: "json",
	                success: function(data) {
	                    if (data.success) {
	                        useGeetest = data.object;
	                        deferred.resolve(data);
	                    } else {
	                        deferred.reject(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });

	            return deferred.promise;
	        };
	        //获取 注册是否使用拖动图片验证方式 结束

	        //通过图片验证码获取短信验证码
	        var checkImageGetCode = function(telNumber, imgcode, reason, reqId) {
	            var deferred = $q.defer();
	            $.ajax({
	                type: 'GET',
	                url: '/api/codes',
	                dataType: "json",
	                timeout: 10000,
	                data: {
	                    telNumber: telNumber,
	                    imgcode: imgcode,
	                    reason: reason,
	                    reqId: reqId
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        };
	        //通过滑动图片获取短信验证码
	        var checkGeetestGetCode = function(geetest_challenge, geetest_validate, geetest_seccode, telNumber, reason, reqId) {
	            var deferred = $q.defer();
	            $.ajax({
	                url: "/api/geetest_code", // 进行二次验证
	                type: "POST",
	                dataType: "json",
	                data: {
	                    // 二次验证所需的三个值
	                    geetest_challenge: geetest_challenge,
	                    geetest_validate: geetest_validate,
	                    geetest_seccode: geetest_seccode,
	                    telNumber: telNumber,
	                    reason: reason,
	                    sid: reqId,
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        };
	        var register_tel = function(telNumber, newPwd, code) {
	            var deferred = $q.defer();
	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                // checkLogin();
	                deferred.reject({ code: 401, message: 'token失效', success: false });
	                return deferred.promise;
	            }
	            $.ajax({
	                type: 'PUT',
	                url: '/api/users',
	                dataType: 'json',
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    telNumber: telNumber,
	                    password: newPwd,
	                    code: code
	                },
	                success: function(data) {
	                    if (data.code == 401) {
	                        checkLogin();
	                        deferred.resolve({ code: 401, message: 'token失效,重新获取', success: false });
	                    } else {
	                        deferred.resolve(data);
	                    }

	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        }
	        var register_agentId = function(thirdTag, aId, tel, password, code) {
	            var deferred = $q.defer();

	            $.ajax({
	                type: 'post',
	                url: '/api/regByTel',
	                dataType: 'json',
	                data: {
	                    thirdTag: thirdTag,
	                    aId: aId,
	                    nickName: nickName,
	                    tel: tel,
	                    pwd: password,
	                    code: code
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        }
	        var queryCode = function(telNumber, code, reason) {
	            var deferred = $q.defer();
	            $.ajax({
	                type: 'GET',
	                url: '/api/queryCodes',
	                dataType: 'json',
	                data: {
	                    telNumber: telNumber,
	                    code: code,
	                    reason: reason
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        };
	        return {
	            updateToken: updateToken,
	            updateCustomer: updateCustomer,
	            getCustomer: getCustomer,
	            checkLogin: checkLogin,
	            closeModal: closeModal,
	            checkStrongPwd: checkStrongPwd,
	            showStrongPwdTips: showStrongPwdTips,
	            getMoneyTicketInfo: getMoneyTicketInfo,
	            getMemberName: function() {
	                return memberName;
	            },
	            updateMenberName: updateMenberName,
	            getUseGeetest: function() {
	                return useGeetest;
	            },
	            updateUseGeetest: updateUseGeetest,
	            cheakNews: cheakNews,
	            getUserMsg: getUserMsg,
	            getIP: getIP,
	            register_tel: register_tel,
	            register_agentId: register_agentId,
	            checkImageGetCode: checkImageGetCode,
	            checkGeetestGetCode: checkGeetestGetCode,
	            queryCode: queryCode,
	            logout:logout,
	        };

	    });


	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	    app.factory("StoragesFactory", function($rootScope, $q, UtilService) {
	        var Storages = {
	            'content': [],
	        };

	        var update = function() {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                void 0;
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data ={"code":200,"message":"成功","object":{"content":[],"first":true,"last":true,"number":0,"numberOfElements":0,"size":0,"totalElements":0,"totalPages":1},"success":true};
	           if (true == data.success) {
	                if (!angular.equals(Storages.content, data.object.content)) {
	                    Storages.content = data.object.content;
	                }
	            }
	            deferred.resolve(data);
	            // $.ajax({
	            //     type: 'GET',
	            //     url: '/api/storages',
	            //     dataType: 'json',
	            //     headers: {
	            //         'Authorization': config.BASIC + _token
	            //     },
	            //     data: {
	            //         sale: 'false',
	            //         page: '0',
	            //         size: 200,
	            //         sort: 'buyingDate,desc'
	            //     },
	            //     success: function(data) {
	            //         if (true == data.success) {
	            //             if (!angular.equals(Storages.content, data.object.content)) {
	            //                 Storages.content = data.object.content;
	            //             }
	            //         }
	            //         deferred.resolve(data);
	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	            //     }
	            // });

	            return deferred.promise;

	        }
	        var add = function(obj) {
	            Storages.content.push(obj);
	        }
	        var getStorageBuyId = function(cid) {

	            var deferred = $q.defer();

	            $.ajax({
	                type: 'GET',
	                url: '/api/v2/storages/' + cid,
	                dataType: "json",
	                success: function(data) {
	                    if (data.success == true) {
	                        var obj = data.object;
	                        if (angular.isDefined(obj) && angular.isDefined(obj.id)) {

	                            deferred.resolve(data)
	                        } else {
	                            void 0;
	                            deferred.reject(data);
	                        }

	                        ;
	                    } else {
	                        deferred.reject(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });

	            return deferred.promise;
	        };


	        var removeStoragesById = function(id) {
	            for (var i in Storages.content) {
	                if (id == Storages.content[i].id) {
	                    Storages.content.splice(i, 1);
	                    void 0;
	                }
	            }
	            void 0;
	        }

	        var dealHistory = {
	            content: [],
	            first: true,
	            last: false,
	            number: -1,
	            numberOfElements: 0,
	            size: 20,
	            sort: {},
	            totalElements: 0,
	            totalPages: 0
	        }

	        // 监听登录用户token
	        $rootScope.$on('token.update', function() {
	            //登录不同用户,初始化数据
	            dealHistory = {
	                content: [],
	                first: true,
	                last: false,
	                number: -1,
	                numberOfElements: 0,
	                size: 20,
	                sort: {},
	                totalElements: 0,
	                totalPages: 0
	            }
	            void 0;
	        });
	        var updateDealHistory = function() {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                void 0;
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data ={"code":200,"message":"成功","object":{"content":[],"first":true,"last":true,"number":0,"numberOfElements":0,"size":20,"sort":{},"totalElements":0,"totalPages":0},"success":true};
	             if (true == data.success) {
	                var _content = dealHistory.content;
	                dealHistory = data.object;
	                dealHistory.content = _content.concat(data.object.content);

	                _content = null;
	                deferred.resolve(data);
	            } else {

	                deferred.reject(data);
	            }
	            /*$.ajax({
	                type: 'GET',
	                url: '/api/storages',
	                dataType: 'json',
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    sale: 'true',
	                    page: dealHistory.number + 1,
	                    size: 20,
	                    sort: 'sellingDate,desc'
	                },
	                success: function(data) {
	                    if (true == data.success) {
	                        var _content = dealHistory.content;
	                        dealHistory = data.object;
	                        dealHistory.content = _content.concat(data.object.content);

	                        _content = null;
	                        deferred.resolve(data);
	                    } else {

	                        deferred.reject(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });*/

	            return deferred.promise;
	        };
	        var refreshDealHistory = function() {

	            dealHistory = {
	                content: [],
	                first: true,
	                last: false,
	                number: -1,
	                numberOfElements: 0,
	                size: 20,
	                sort: {},
	                totalElements: 0,
	                totalPages: 0
	            };
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	               // CustomerFactory.checkLogin();
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }

	            $.ajax({
	                type: 'GET',
	                url: '/api/storages',
	                dataType: 'json',
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    sale: 'true',
	                    page: dealHistory.number + 1,
	                    size: 20,
	                    sort: 'sellingDate,desc'
	                },
	                success: function(data, status, jqXHR) {
	                    if (true == data.success) {
	                        dealHistory = data.object;
	                        _content = null;
	                        deferred.resolve(data);
	                    } else {
	                        deferred.reject(data);
	                    }

	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });
	            return deferred.promise;
	        }

	        return {
	            getStorages: function() {
	                return Storages;
	            },
	            updateStorages: function() {
	                return update();
	            },
	            addStorage: function(obj) {
	                add(obj);
	            },
	            removeStoragesById: removeStoragesById,
	            getStorageBuyId: getStorageBuyId,
	            getDealHistory: function() {
	                return dealHistory;
	            },
	            updateDealHistory: updateDealHistory,
	            refreshDealHistory: refreshDealHistory
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilService) {

	    app.factory("NewsFactory", function($rootScope, $ionicModal, $q, $sce, UtilService, TEMPLATE) {
	        var News = {
	            'content': {},
	            'first': true,
	            'last': false,
	            'number': -1,
	            'numberOfElements': 0,
	            'size': 20, //最多可以20个发布有效的公告，其他的首页提示没有获取
	            'totalElements': 0,
	            'totalPages': 0,
	        };
	        var scope = $rootScope.$new(true);
	        var update = function() {
	            var deferred = $q.defer();
	            deferred.reject({success:false});
	            // $.ajax({
	            //     type: 'get',
	            //     url: '/api/msgs',
	            //     dataType: "json",
	            //     data: {
	            //         page: News.number + 1,
	            //         size: News.size
	            //     },
	            //     success: function(data, status, jqXHR) {
	            //         if (true == data.success) {
	            //             var _content = News.content;
	            //             News = data.object;
	            //             var _list = {};
	            //             for (var i in News.content) {
	            //                 var _id = News.content[i].id;
	            //                 _list[_id] = News.content[i];
	            //             }
	            //             News.content = angular.extend(_content, _list); //_content.concat(data.object.content);
	            //             console.log('News.content', News.content);
	            //             _content = null;
	            //             _list = null;
	            //             deferred.resolve(data);
	            //         } else {
	            //             deferred.reject(data);
	            //         }

	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	            //     }
	            // });
	            return deferred.promise;
	        }
	        var refresh = function() {
	            News = {
	                'content': [],
	                'first': true,
	                'last': false,
	                'number': -1,
	                'numberOfElements': 0,
	                'size': 20,
	                'totalElements': 0,
	                'totalPages': 0,
	            };
	            var deferred = $q.defer();
	            $.ajax({
	                type: 'get',
	                url: '/api/msgs',
	                dataType: "json",
	                data: {
	                    page: News.number + 1,
	                    size: News.size
	                },
	                success: function(data, status, jqXHR) {
	                    if (true == data.success) {
	                        News = data.object;
	                        var _list = {};
	                        for (var i in News.content) {
	                            var _id = News.content[i].id;
	                            _list[_id] = News.content[i];
	                        }
	                        News.content = _list;
	                    } else {
	                        deferred.reject(data);
	                    }
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                }
	            });
	            return deferred.promise;
	        }

	        //**************公告提示 开始**************//
	        scope.isReading = false;
	        var createNewsDetailModal = function() {
	                return $ionicModal.fromTemplate(__webpack_require__(30), {
	                    scope: scope,
	                    animation: 'slide-in-up',
	                    backdropClickToClose: false
	                });
	            }
	            //当前在读公告
	        scope.currontNews = {};
	        //显示 注册提示
	        var showNewsDetailModal = function(item, isReading) {

	            UtilService.showLoading();
	            //是否阅读模式 首页阅读
	            scope.isReading = isReading || false;
	            scope.currontNews = item;

	            if (angular.isUndefined(scope.NewsDetailModal)) {
	                scope.NewsDetailModal = createNewsDetailModal();
	                scope.NewsDetailModal.show();

	                item.content = UtilService.htmlDecodeByRegExp(item.content);
	                scope.currontNews['content'] = item.content; //$sce.trustAsHtml(item.content);
	                // scope.newsContent = trustHtml;
	                UtilService.hideLoading();

	            } else {
	                if (angular.isDefined(scope.NewsDetailModal)) {
	                    item.content = UtilService.htmlDecodeByRegExp(item.content);
	                    scope.currontNews['content'] = item.content; //$sce.trustAsHtml(item.content);
	                    scope.NewsDetailModal.show();
	                }

	                UtilService.hideLoading();
	            }

	        };

	        //显示未读公告
	        scope.currontKey = 0;
	        scope.readList = [];
	        scope.nextName = "下一条";
	        var showReadNews = function() {
	            scope.readList = newsIdFilter(News.content);
	            if (0 < scope.readList.length) {
	                if (1 == scope.readList.length) {
	                    scope.nextName = "返回首页";
	                }
	                showNewsDetailModal(scope.readList[0], true);
	            }


	        };

	        scope.nextNews = function() {

	            if (1 < scope.readList.length) {
	                //保存已读id
	                saveReadNews(scope.readList[0].id);
	                //数组中删除
	                scope.readList.shift();
	                //显示下一条
	                scope.currontNews['title'] = scope.readList[0].title;
	                scope.currontNews['content'] = UtilService.htmlDecodeByRegExp(scope.readList[0].content);

	                if (1 == scope.readList.length) {
	                    scope.nextName = "返回首页";

	                }

	            } else if(0 < scope.readList.length){
	                //保存已读id
	                saveReadNews(scope.readList[0].id);
	                //数组中删除
	                scope.readList.shift();
	                scope.closeNewsDetailModal();

	            }

	        };
	        //隐藏
	        scope.closeNewsDetailModal = function() {
	            if (angular.isDefined(scope.NewsDetailModal)) {
	                return scope.NewsDetailModal.hide();
	            }
	            return false;
	        };

	        //筛选未读的公告id  
	        var newsIdFilter = function(news) {
	            var _list = UtilService.loadStorage('readNews') || [];
	            var re = [];
	            for (var i in news) {
	                if (0 < _list.length) {
	                    var _index = UtilService.inArray(news[i].id, _list);
	                    if (_index < 0) {
	                        re.push(news[i]);
	                    }
	                } else {
	                    re.push(news[i]);
	                }
	            }
	            return re;

	        };
	        var saveReadNews = function(id) {

	            var _read = UtilService.loadStorage('readNews') || [];
	            _read.push(id);
	            UtilService.saveStorage('readNews', _read)

	        }
	        return {
	            getNews: function() {
	                return News;
	            },
	            updateNews: function() {
	                return update();
	            },
	            refresh: refresh,
	            showNewsDetailModal: showNewsDetailModal,
	            showReadNews: showReadNews,
	            closeNewsDetailModal: scope.closeNewsDetailModal

	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal news-detail-view \">\r\n    <ion-header-bar class=\" bar-energized nav-title-slide-full\">\r\n        <h1 class=\"title title-center\">公告</h1>\r\n        <div class=\"buttons\" ng-if=\"!isReading\">\r\n            <a class=\"button button-icon icon ion-ios-close-empty light\" on-tap=\"closeNewsDetailModal()\"></a>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"dark-bg has-header padding\" has-bouncing=\"false\" delegate-handle=\"newsDetailScroll\">\r\n        <div class=\"title\" ng-bind=\"currontNews.title\"></div>\r\n        <div class=\"news_content\" ng-bind-html=\"currontNews.content \">\r\n        </div>\r\n    </ion-content>\r\n    <ion-footer-bar align-title=\"left\" class=\"bar-newsReading\" ng-if=\"isReading\">\r\n        <button class=\"button button-block button-energized\"  on-tap=\"nextNews()\" >\r\n            {{nextName}}\r\n        </button>\r\n    </ion-footer-bar>\r\n</ion-modal-view>\r\n"

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal\">\r\n    <!-- <ion-header-bar class=\" bar-positive nav-title-slide-full\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear  icon-left ion-android-close\" on-tap=\"closeBuyModal()\"></button>\r\n        </div>\r\n        <h1 class=\"title title-center\">登录</h1>\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear light\" on-tap=\"gotoState('tab.reg',false)\">注册</button>\r\n        </div>\r\n    </ion-header-bar> -->\r\n    <ion-content has-bouncing=\"false\" padding=\"false\" class=\"padding no-footer\" delegate-handle=\"loginScroll\">\r\n        <div class=\"loginTips_box\">\r\n            <div class=\" list loginTips\">\r\n                <div class=\"icon\"></div>\r\n                <label class=\"item tips_text\">\r\n                    <div class=\"text-center\">新用户请点击下方按钮进行注册</div>\r\n                    \r\n                </label>\r\n                <label class=\"item goReg_btn button button-energized\" on-tap=\"goState(LoginTipsModal,'tab.register')\" >\r\n                    注册\r\n                </label>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal login-view\">\r\n    <!-- <ion-header-bar class=\" bar-positive nav-title-slide-full\">\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear  icon-left ion-android-close\" on-tap=\"closeBuyModal()\"></button>\r\n        </div>\r\n        <h1 class=\"title title-center\">登录</h1>\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear light\" on-tap=\"gotoState('tab.reg',false)\">注册</button>\r\n        </div>\r\n    </ion-header-bar> -->\r\n    <ion-content has-bouncing=\"false\" padding=\"false\" class=\"padding no-footer center_h\" delegate-handle=\"loginScroll\">\r\n        <div class=\"modal_box\" id=\"login_box\">\r\n            <div class=\" list\">\r\n                <label class=\"item item-input row modal_title\">\r\n                    <div class=\"col text-left title_text\">登录</div>\r\n                      <div class=\"col text-right\">\r\n                        <i class=\"sversion\"></i>\r\n                    </div> \r\n                </label>\r\n                <label class=\"item item-input item-icon-right  row modal_subtitle\">\r\n                    <div class=\"col text-left title_text\" ng-show=\"IP\">IP:{{IP}}</div>\r\n                </label>\r\n                <div class=\"list modal_content login_modal_content\" id=\"login_modal_content\" >\r\n                   <label class=\"item item-input\">\r\n                       <div class=\"col text-right\">\r\n                       <button class=\"button button-clear button-small button-positive reg_btn\" ng-if=\"isH5\" on-tap=\"goState(LoginModal,'tab.pcReg')\">注册\r\n                        </button>\r\n                        <button class=\"button button-clear button-small button-positive forgetPwd_btn\" on-tap=\"goState(LoginModal,'tab.forgetCode')\">忘记密码\r\n                        </button>\r\n                          <!--  <a href=\"javascript:;\" class=\"reg_btn\">注册</a>\r\n                          <a href=\"javascript:;\" class=\"forgetPwd_btn\">忘记密码</a> -->\r\n                       </div>\r\n                   </label>\r\n                   <label class=\"item item-input\" ng-if=\"isH5\">\r\n                       <input type=\"text\" class=\"input\" ng-model=\"user.account\" name=\"account\" placeholder=\"请输入手机号\" onfocus-action required>\r\n                   </label>\r\n                   <label class=\"item item-input\">\r\n                       <input type=\"password\" class=\"input\" ng-model=\"user.password\" name=\"password\" placeholder=\"请输入密码\" onfocus-action required>\r\n                   </label>\r\n                   <div id=\"embed-captcha\"></div>\r\n               </div>\r\n                <label class=\"modal_footer \">\r\n                </label>\r\n\r\n                <label class=\" button button-block loginBtn\" on-tap=\"tapLoginBtn()\" id=\"loginBtn\" >\r\n                    确认登录\r\n                </label>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(28), __webpack_require__(21),
	    __webpack_require__(27)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	    app.factory("OrderHistoryFactory", function($rootScope, $ionicModal, $q, $sce, UtilService, StoragesFactory,
	        ContractFactory, CustomerFactory, TEMPLATE) {
	        var OrderHistory = {
	            'content': [],
	            'first': true,
	            'last': false,
	            'number': -1,
	            'numberOfElements': 0,
	            'size': 20,
	            'totalElements': 0,
	            'totalPages': 0,
	            'nextPage': 0
	        };
	        var scope = $rootScope.$new(true);

	        // 监听登录用户token
	        $rootScope.$on('token.update', function() {
	            //登录不同用户,初始化数据
	            OrderHistory = {
	                'content': [],
	                'first': true,
	                'last': false,
	                'number': -1,
	                'numberOfElements': 0,
	                'size': 20,
	                'totalElements': 0,
	                'totalPages': 0,
	                'nextPage': 0
	            };
	            void 0;
	        });
	        var update = function() {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                CustomerFactory.checkLogin();
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data={"code":200,"message":"成功","object":{"content":[],"first":true,"last":true,"number":0,"numberOfElements":0,"size":20,"sort":{},"totalElements":0,"totalPages":0},"success":true};
	            if (true == data.success) {
	                var _content = OrderHistory.content;
	                OrderHistory = data.object;
	                OrderHistory.content = _content.concat(data.object.content);

	                _content = null;
	                deferred.resolve(data);
	            } else {

	                deferred.reject(data);
	            }
	            /*$.ajax({
	                type: 'get',
	                url: '/api/details', //'api/details?sort=date,desc?size=' + OrderHistory.size + '&page=' + OrderHistory.nextPage,
	                dataType: "json",
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    page: OrderHistory.number + 1,
	                    sort: 'date,desc',
	                    size: 20,
	                },
	                success: function(data, status, jqXHR) {
	                    if (true == data.success) {
	                        var _content = OrderHistory.content;
	                        OrderHistory = data.object;
	                        OrderHistory.content = _content.concat(data.object.content);

	                        _content = null;
	                        deferred.resolve(data);
	                    } else {

	                        deferred.reject(data);
	                    }

	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });*/
	            return deferred.promise;
	        }
	        var refresh = function() {

	            OrderHistory = {
	                'content': [],
	                'first': true,
	                'last': false,
	                'number': -1,
	                'numberOfElements': 0,
	                'size': 20,
	                'totalElements': 0,
	                'totalPages': 0,
	                'nextPage': 0
	            };
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                CustomerFactory.checkLogin();
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            var data={"code":200,"message":"成功","object":{"content":[],"first":true,"last":true,"number":0,"numberOfElements":0,"size":20,"sort":{},"totalElements":0,"totalPages":0},"success":true};
	            if (true == data.success) {
	                OrderHistory = data.object;
	                _content = null;
	                deferred.resolve(data);
	            } else {
	                deferred.reject(data);
	            }
	            /*$.ajax({
	                type: 'get',
	                url: '/api/details', //'api/details?sort=date,desc?size=' + OrderHistory.size + '&page=' + OrderHistory.nextPage,
	                dataType: "json",
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    page: OrderHistory.number + 1,
	                    sort: 'date,desc',
	                    size: OrderHistory.size,
	                },
	                success: function(data, status, jqXHR) {
	                    if (true == data.success) {
	                        OrderHistory = data.object;
	                        _content = null;
	                        deferred.resolve(data);
	                    } else {
	                        deferred.reject(data);
	                    }

	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });*/
	            return deferred.promise;
	        }

	        //**************微信登录 注册提示 开始**************//

	        var createOrderHistoryDetailModal = function() {
	                return $ionicModal.fromTemplate(__webpack_require__(34), {
	                    scope: scope,
	                    animation: 'slide-in-up',
	                    backdropClickToClose: false
	                });
	            }
	            //显示 注册提示
	        scope.currontOrderHistory = {};
	        var showOrderHistoryDetailModal = function(item) {

	            UtilService.showLoading();

	            scope.currontOrderHistory = item;

	            scope.currontOrderHistory.moneyString = UtilService.moneyStr(scope.currontOrderHistory.transactionMoney, scope.currontOrderHistory.transactionType);
	            scope.currontOrderHistory.formatDate = UtilService.date(scope.currontOrderHistory.date);

	            var orderHistory_Storage = UtilService.loadStorage('orderHistory') || {};


	            //判断缓存里有没有记录 没有再获取
	            if (angular.isUndefined(orderHistory_Storage[scope.currontOrderHistory.id])) {


	                if (scope.currontOrderHistory.transactionType == 'BUILD_STORAGE') {
	                    //建仓
	                    queryStorageHistory();
	                } else if (scope.currontOrderHistory.transactionType == 'SELL_STORAGE') {
	                    //平仓
	                    queryStorageHistory();
	                } else if (scope.currontOrderHistory.transactionType == 'RECHARGE') {
	                    //充值
	                    queryRechage(scope.currontOrderHistory.context);

	                } else if (scope.currontOrderHistory.transactionType == 'COMPENSATION') {
	                    //补偿;
	                    queryCompensation(scope.currontOrderHistory.context);
	                } else if (scope.currontOrderHistory.transactionType == 'WITHDRAWALS_SUCCESS') {
	                    //提现成功
	                    queryWithdrawals(scope.currontOrderHistory.context);
	                } else if (scope.currontOrderHistory.transactionType == 'WITHDRAWALS_APPLY') {
	                    //提现申请
	                    queryWithdrawals(scope.currontOrderHistory.context);
	                } else if (scope.currontOrderHistory.transactionType == 'WITHDRAWALS_FAIL') {
	                    // 冻结返还
	                    queryWithdrawals(scope.currontOrderHistory.context);
	                }

	            } else {
	                scope.currontOrderHistory['history'] = orderHistory_Storage;
	            }

	            if (angular.isUndefined(scope.OrderHistoryDetailModal)) {
	                scope.OrderHistoryDetailModal = createOrderHistoryDetailModal();
	                scope.OrderHistoryDetailModal.show();
	                UtilService.hideLoading();
	            } else {
	                if (angular.isDefined(scope.OrderHistoryDetailModal)) {

	                    scope.OrderHistoryDetailModal.show();
	                }

	                UtilService.hideLoading();
	            }

	        };
	        //保存缓存
	        var saveCacheStorage = function() {
	            var _orderHistory = {};

	            _orderHistory[scope.currontOrderHistory.id] = scope.currontOrderHistory;

	            UtilService.saveStorage('orderHistory', _orderHistory);

	            _orderHistory = null;
	        };
	        var queryCompensation = function() {

	            scope.currontOrderHistory['transactionTypeName'] = '补偿';

	            saveCacheStorage();
	        }
	        var queryStorageHistory = function() {
	            //产品列表
	            scope.products = ContractFactory.getProduct();

	            if (UtilService.isEmptyObject(scope.products)) {
	                ContractFactory.updateContracts().then(function(data) {
	                    //获取失败需要重新获取
	                    scope.products = ContractFactory.getProduct();
	                    getStorageHistory();

	                }, function(data) {
	                    void 0;
	                });

	            } else {

	                getStorageHistory();
	            }
	        };
	        var getStorageHistory = function() {
	            var promise_query = StoragesFactory.getStorageBuyId(scope.currontOrderHistory.context);

	            promise_query.then(function(re) {
	                if (angular.isDefined(re.object)) {
	                    var data = re.object;
	                    scope.currontOrderHistory['mark'] = scope.products[data.contractCode].name + ' ' + (data.dealCount + data.usedTicketCount) + '手';

	                    if (scope.currontOrderHistory.transactionType == 'BUILD_STORAGE') {
	                        scope.currontOrderHistory['transactionTypeName'] = UtilService.storagesStateName(data.sellingType, false);
	                    }
	                    if (scope.currontOrderHistory.transactionType == 'SELL_STORAGE') {
	                        scope.currontOrderHistory['transactionTypeName'] = UtilService.storagesStateName(data.sellingType, true);
	                    }

	                    saveCacheStorage();

	                } else {
	                    void 0;
	                }


	            }, function(data) {
	                void 0;
	            });
	        };
	        var queryRechage = function(context) {
	            getRechage(context).then(function(data) {
	                if (data.object.state == 'UNPAID') {
	                    scope.currontOrderHistory['transactionTypeName'] = '未付款';
	                } else if (data.object.state == 'PAID') {
	                    scope.currontOrderHistory['transactionTypeName'] = '已付款';
	                }

	                saveCacheStorage();

	            }, function(data) {
	                void 0;
	            });
	        };
	        var getRechage = function(context) {

	            var deferred = $q.defer();
	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                CustomerFactory.checkLogin();
	                deferred.reject('');
	                return deferred.promise;
	            }

	            $.ajax({
	                type: 'GET',
	                url: '/api/orders/' + context,
	                dataType: "json",
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                success: function(data) {
	                    if (data.success == false) {
	                        deferred.reject(data);
	                    } else {
	                        deferred.resolve(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });
	            return deferred.promise;
	        };
	        var queryWithdrawals = function(context) {
	            getWithdrawals(context).then(function(data) {
	                var textud = '';
	                if (data.object.state == 'APPLY') {
	                    textud = '申请中，待审核';
	                } else if (data.object.state == 'PRE_REMITTANCE') {
	                    textud = '审核通过，待汇款';
	                } else if (data.object.state == 'PRE_REMITTANCE') {
	                    textud = '审核通过，待汇款 ';
	                } else if (data.object.state == 'BLANK_PROCESSING') {
	                    textud = '银行处理中';
	                } else if (data.object.state == 'REMITTANCE_OK') {
	                    textud = '汇款成功';
	                } else if (data.object.state == 'REJECT') {
	                    textud = '拒绝';
	                }
	                scope.currontOrderHistory['transactionTypeName'] = '提现';
	                scope.currontOrderHistory['mark'] = textud;

	                saveCacheStorage();

	            }, function(data) {
	                void 0;
	            });
	        };
	        var getWithdrawals = function(context) {

	            var deferred = $q.defer();
	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                CustomerFactory.checkLogin();
	                deferred.reject('');
	                return deferred.promise;
	            }
	            $.ajax({
	                type: 'GET',
	                url: '/api/withdrawals/' + context,
	                dataType: "json",
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                success: function(data) {
	                    if (data.success == false) {
	                        deferred.reject(data);
	                    } else {
	                        deferred.resolve(data);
	                    }
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });
	            return deferred.promise;
	        };
	        //隐藏
	        scope.closeOrderHistoryDetailModal = function() {
	            if (angular.isDefined(scope.OrderHistoryDetailModal)) {
	                return scope.OrderHistoryDetailModal.hide();
	            }
	            return false;
	        };

	        return {
	            query: function() {
	                return OrderHistory;
	            },
	            update: function() {
	                return update();
	            },
	            refresh: refresh,
	            showOrderHistoryDetailModal: showOrderHistoryDetailModal,
	            closeOrderHistoryDetailModal:scope.closeOrderHistoryDetailModal
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal orderHistroy-detail-view \">\r\n    <ion-header-bar class=\" bar-energized nav-title-slide-full\">\r\n        \r\n        <h1 class=\"title title-center\">收支详情</h1>\r\n        <div class=\"buttons\">\r\n            <a class=\"button button-icon icon ion-ios-close-empty light\" on-tap=\"closeOrderHistoryDetailModal()\"></a>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"dark-bg has-header\" has-bouncing=\"false\" delegate-handle=\"orderHistoryDetailScroll\">\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                <span class=\"label\">流水号:</span><span class=\"value\">{{currontOrderHistory.context}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">类型:</span><span class=\"value\">{{currontOrderHistory.transactionTypeName}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">时间:</span><span class=\"value\">{{currontOrderHistory.formatDate}}</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"list\">\r\n            <div class=\"item transactionMoney\">\r\n                <span class=\"label\">收/支:</span><span class=\"value \" ng-class=\"{up:currontOrderHistory.transactionMoney>0,down:currontOrderHistory.transactionMoney<=0}\">\r\n               \r\n                {{currontOrderHistory.moneyString}}\r\n                元</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">余额:</span><span class=\"value\">{{currontOrderHistory.remainingMoney}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n               <span class=\"label\">备注:</span><span class=\"value\">{{currontOrderHistory.mark}}</span>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilService) {

	    app.factory("PriceFactory", function($http, $interval, $q, UtilService) {
	        var price = {
	            'COPPER': { 'priceStatus': 'up', 'data': [] },
	            'OIL': { 'priceStatus': 'up', 'data': [] },
	            'SILVER': { 'priceStatus': 'up', 'data': [] },
	        };

	        var update = function() {
	            var deferred = $q.defer();
	            var data ={"code":200,"message":"成功",
	            "object":{"SILVER":"3900.0,3894.0,3902.0,3908.0,3892.0,true,1493179152000","COPPER":"47502.0,47377.0,47469.0,47522.0,47316.0,true,1493178770000","OIL":"4750.0,4737.0,4746.0,4752.0,4731.0,true,1493178770000"},"success":true};
	            if (true == data.success && typeof(data.object) != 'undefined') {

	                var _COPPER = data.object['COPPER'];
	                var _COPPER_list = _COPPER.split(",");

	                if (price.COPPER.data.length > 0) {
	                    if (price.COPPER.data[0] > _COPPER_list[0]) {
	                        price.COPPER.priceStatus = 'down'
	                    } else if (price.COPPER.data[0] < _COPPER_list[0]) {
	                        price.COPPER.priceStatus = 'up'
	                    }

	                }
	                for (var i = 0; i < 5; i++) {
	                    _COPPER_list[i] = parseInt(_COPPER_list[i]);
	                }
	                price.COPPER.data = _COPPER_list;


	                var _OIL = data.object['OIL'];
	                var _OIL_list = _OIL.split(",");

	                if (price.OIL.data.length > 0) {
	                    if (price.OIL.data[0] > _OIL_list[0]) {
	                        price.OIL.priceStatus = 'down'
	                    } else if (price.OIL.data[0] < _OIL_list[0]) {
	                        price.OIL.priceStatus = 'up'
	                    }

	                }
	                price.OIL.data = _OIL_list;

	                var _SILVER = data.object['SILVER'];
	                var _SILVER_list = _SILVER.split(",");

	                if (price.SILVER.data.length > 0) {
	                    if (price.SILVER.data[0] > _SILVER_list[0]) {
	                        price.SILVER.priceStatus = 'down'
	                    } else if (price.SILVER.data[0] < _SILVER_list[0]) {
	                        price.SILVER.priceStatus = 'up'
	                    }

	                }
	                for (var i = 0; i < 5; i++) {
	                    _SILVER_list[i] = parseInt(_SILVER_list[i]);
	                }
	                price.SILVER.data = _SILVER_list;
	            }
	            deferred.resolve(price);
	            // $.ajax({
	            //     type: 'GET',
	            //     url: config.priceUrl + "?t=" + Date.now(),
	            //     timeout: 10000,
	            //     success:function(data) {
	            //         if (true == data.success && typeof(data.object) != 'undefined') {

	            //             var _COPPER = data.object['COPPER'];
	            //             var _COPPER_list = _COPPER.split(",");

	            //             if (price.COPPER.data.length > 0) {
	            //                 if (price.COPPER.data[0] > _COPPER_list[0]) {
	            //                     price.COPPER.priceStatus = 'down'
	            //                 } else if (price.COPPER.data[0] < _COPPER_list[0]) {
	            //                     price.COPPER.priceStatus = 'up'
	            //                 }

	            //             }
	            //             for (var i = 0; i < 5; i++) {
	            //                 _COPPER_list[i] = parseInt(_COPPER_list[i]);
	            //             }
	            //             price.COPPER.data = _COPPER_list;


	            //             var _OIL = data.object['OIL'];
	            //             var _OIL_list = _OIL.split(",");

	            //             if (price.OIL.data.length > 0) {
	            //                 if (price.OIL.data[0] > _OIL_list[0]) {
	            //                     price.OIL.priceStatus = 'down'
	            //                 } else if (price.OIL.data[0] < _OIL_list[0]) {
	            //                     price.OIL.priceStatus = 'up'
	            //                 }

	            //             }
	            //             price.OIL.data = _OIL_list;

	            //             var _SILVER = data.object['SILVER'];
	            //             var _SILVER_list = _SILVER.split(",");

	            //             if (price.SILVER.data.length > 0) {
	            //                 if (price.SILVER.data[0] > _SILVER_list[0]) {
	            //                     price.SILVER.priceStatus = 'down'
	            //                 } else if (price.SILVER.data[0] < _SILVER_list[0]) {
	            //                     price.SILVER.priceStatus = 'up'
	            //                 }

	            //             }
	            //             for (var i = 0; i < 5; i++) {
	            //                 _SILVER_list[i] = parseInt(_SILVER_list[i]);
	            //             }
	            //             price.SILVER.data = _SILVER_list;
	            //         }
	            //         deferred.resolve(price);
	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	            //     }
	            // });

	            return deferred.promise;

	        }
	        return {
	            getPrice: function() {
	                return price;
	            },
	            updatePrice: function() {
	                return update();
	            }
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	        app.factory('SetOrderModelFactory', function($q, $rootScope, $ionicModal, $timeout, CustomerFactory,
	            UtilService, TEMPLATE) {

	            var scope = $rootScope.$new(true);
	            scope.user = {};

	            var setOrderDefer = $q.defer();

	            var createModal = function() {
	                return $ionicModal.fromTemplate(__webpack_require__(37), {
	                    scope: scope,
	                    animation: 'slide-in-down'
	                });
	            }


	            scope.initProfit = { do: null };
	            scope.initloss = { do: null };
	            //显示
	            var showModal = function(order, currentOrder) {
	                setOrderDefer = $q.defer();
	                UtilService.showLoading();

	                scope.buyOrder = order;
	                scope.buyOrder['product'] = currentOrder;

	                if (angular.isDefined(scope.buyOrder.profit)) {
	                    if (Math.abs(scope.buyOrder.profit) < 1) {
	                        scope.buyOrder.profit = Math.abs(scope.buyOrder.profit * 100);
	                    }

	                    if (angular.isFunction(scope.initProfit.do)) {
	                        scope.initProfit.do(scope.buyOrder.profit);
	                    }
	                }
	                if (angular.isDefined(scope.buyOrder.loss)) {
	                    if (scope.buyOrder.loss == -1) {
	                        scope.buyOrder.loss = 0;
	                    } else {
	                        if (Math.abs(scope.buyOrder.loss) < 1) {
	                            scope.buyOrder.loss = Math.abs(scope.buyOrder.loss * 100);
	                        }
	                    }
	                    if (angular.isFunction(scope.initProfit.do)) {
	                        scope.initloss.do(scope.buyOrder.loss);
	                    }
	                }

	                if (angular.isUndefined(scope.SetOrderModel)) {
	                    scope.SetOrderModel = createModal();
	                    scope.SetOrderModel.show();
	                    UtilService.hideLoading()
	                } else {
	                    scope.SetOrderModel.show();
	                    UtilService.hideLoading();
	                }

	                return setOrderDefer.promise;

	            };
	            scope.closeSetOrderModal = function() {
	                if (angular.isDefined(scope.SetOrderModel)) {
	                    //scope.SetOrderModel.hide(); 
	                    scope.SetOrderModel.remove().then(function() {
	                        scope.SetOrderModel = undefined;
	                    });

	                }

	            };
	            scope.$on('$destroy', function() {
	                scope.SetOrderModel.remove();
	            });
	            scope.ordertype = function(type) {
	                return UtilService.ordertype(type);
	            };

	            var successData = { profit: '', loss: '' };


	            scope.setOrder = function(successFn) {
	                //判断是否登录
	                var isLogin = CustomerFactory.checkLogin();
	                if (!isLogin) {
	                    return false;
	                }
	                var _token = UtilTool.getCookie('token') || '';

	                var _profit = scope.buyOrder.profit / 100;
	                var _loss = -scope.buyOrder.loss / 100;
	                if (_loss == 0) {
	                    _loss = -1;
	                }

	                UtilService.showLoading();

	                $.ajax({
	                    type: 'PUT',
	                    url: '/api/storages',
	                    dataType: "json",
	                    headers: {
	                        'Authorization': config.BASIC + _token
	                    },
	                    data: {
	                        storageId: scope.buyOrder.id,
	                        profit: _profit,
	                        loss: _loss
	                    },
	                    success: function(data) {
	                        if (true == data.success) {
	                            UtilService.alert(data.message, 1000, function() {}, function() {
	                                scope.closeSetOrderModal();

	                                successData.profit = _profit;
	                                successData.loss = _loss;
	                                setOrderDefer.resolve(successData);
	                            });

	                        } else {
	                            UtilService.alert(data.message + "(" + data.code + ")");
	                            setOrderDefer.reject(data);
	                        }
	                    },

	                    error: function(jqXHR, statusText, errorthow) {
	                        UtilService.alert(jqXHR.statusText + '(' + jqXHR.status + ')');

	                        deferred.reject({ code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')', object: jqXHR, success: false });
	                    }
	                });
	            };
	            /*弹框 结束*/
	            return {
	                closeModal: scope.closeSetOrderModal,
	                createModal: createModal,
	                showModal: showModal,
	                getSuccessData: function() {
	                    return successData;
	                }

	            };

	        });


	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal setOrder_modal\" style=\"z-index: 12;\">\r\n    <!--  <ion-header-bar class=\" bar-positive nav-title-slide-full\">\r\n       <div class=\"buttons\">\r\n           <button class=\"button button-clear icon-left ion-android-arrow-back\" on-tap=\"closeOrdersModal()\"></button>\r\n       </div>\r\n       <h1 class=\"title title-center\">建仓</h1>\r\n       <div class=\"buttons\">\r\n           <button class=\"button button-clear icon \" on-tap=\"showNewTopicsheet()\">提交</button>\r\n       </div>\r\n   </ion-header-bar> -->\r\n    <ion-content class=\"no-header no-footer center_h  padding  \" has-bouncing=\"true\">\r\n        <div class=\"modal_box order_box\">\r\n            <div class=\" list \">\r\n                <label class=\"item item-input modal_title\">\r\n                    <div class=\" text-left \">\r\n                        <div class=\"order_number\">\r\n                            订单号:{{buyOrder.id}}\r\n                        </div>\r\n                        <div class=\"title_text\">\r\n                            继续设置止盈止损\r\n                        </div>\r\n                    </div>\r\n                    \r\n                </label>\r\n                <label class=\"item item-input item-icon-right  row modal_subtitle\">\r\n                    <div class=\"col text-left\">方向:{{ordertype(buyOrder.dealDirection)}}</div>\r\n                    <div class=\"col text-right\">规格:{{buyOrder.product.name}}</div>\r\n                </label>\r\n                <div class=\"list modal_content\">\r\n                    <label class=\"item item-input row\">\r\n                        <span class=\"input-label\">设置止盈</span>\r\n                    </label>\r\n                    <label class=\"item item-input  row_input-number\">\r\n                        <input-number init=\"initProfit\" max=\"90\" min=\"0\" step=\"10\" editable=\"false\" unit=\"%\" minreplace=\"不设\" data=\"buyOrder.profit\"></input-number>\r\n                    </label>\r\n                    <label class=\"item item-input row\">\r\n                        <span class=\"input-label\">设置止损</span>\r\n                    </label>\r\n                    <label class=\"item item-input  row_input-number\">\r\n                        <input-number init=\"initloss\" max=\"90\" min=\"0\" step=\"10\" editable=\"false\" unit=\"%\" minreplace=\"不设\" data=\"buyOrder.loss \"></input-number>\r\n                    </label>\r\n                </div>\r\n                <label class=\"modal_footer \">\r\n                </label>\r\n                <!-- <label class=\"item  buy_btn button button-light\" >\r\n                    购买\r\n                </label> -->\r\n                <div class=\" button-bar\">\r\n                    <a class=\"button cancel_btn\" on-tap=\"closeSetOrderModal()\">取消</a>\r\n                    <a class=\"button buy_btn\" on-tap=\"setOrder()\">确认</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilService) {

	    app.factory("TickesFactory", function($http, $interval, $q, UtilService) {
	        var Tickets = {};

	        var update = function() {
	            var deferred = $q.defer();
	            var data ={"code":200,"message":"成功","object":[{"canUseList":["XAG1","CU","OIL"],"describe":"10元","displayValue":10,"id":1,"status":false,"value":10,"version":0},{"canUseList":["XAG3","CU2","OIL2"],"describe":"旧200元","displayValue":200,"id":2,"status":false,"value":200,"version":0},{"canUseList":["XAG7"],"describe":"500元","displayValue":500,"id":3,"status":false,"value":450,"version":0},{"canUseList":["XAG4"],"describe":"2元","displayValue":2,"id":4,"status":false,"value":1.6,"version":0},{"canUseList":["XAG5","CU5","OIL5"],"describe":"20元","displayValue":20,"id":5,"status":true,"value":18,"version":0},{"canUseList":["XAG6","CU6","OIL6"],"describe":"新200元","displayValue":200,"id":6,"status":true,"value":180,"version":0}],"success":true};
	           if (true == data.success) {
	                var _list = data.object;
	                for (var i = 0; i < _list.length; i++) {
	                    /*if (true == _list[i].status) {
	                        Tickets.push(_list[i]);
	                    }*/
	                     Tickets[_list[i].id]=_list[i];
	                }
	            }
	            void 0;
	            deferred.resolve(data);
	            /*$.ajax({
	                method: 'get',
	                url: '/api/tickets',
	                success: function(data, textStatus, jqXHR) {
	                    if (true == data.success) {
	                        var _list = data.object;
	                        for (var i = 0; i < _list.length; i++) {
	                        
	                             Tickets[_list[i].id]=_list[i];
	                        }
	                    }
	                    console.log('Tickets',Tickets);
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });*/


	            return deferred.promise;

	        }

	        return {
	            getTickets: function() {
	                return Tickets;
	            },
	            updateTickets: function() {
	                return update();
	            }
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {

	    app.factory('TipsFactory', function($rootScope, $ionicModal, $timeout, UtilService, TEMPLATE, CustomerFactory) {

	        var scope = $rootScope.$new(true);

	        //**************微协议 提示**************//
	        // 监听登录用户登录
	        $rootScope.$on('memberName.update', function() {
	            scope.memberName = CustomerFactory.getMemberName();
	        });
	        var createProtocolModal = function() {
	            return $ionicModal.fromTemplate(__webpack_require__(40), {
	                scope: scope,
	                animation: 'slide-in-up',
	                backdropClickToClose: true
	            });
	        }
	        var okProtocol = function() {

	        }

	        scope.memberName = '';

	        //显示 微协议
	        var showProtocolModal = function(memberName, okFn) {
	            UtilService.showLoading();
	            scope.memberName = memberName;

	            if (angular.isUndefined(scope.ProtocolModal)) {
	                scope.ProtocolModal = createProtocolModal();
	                scope.ProtocolModal.show().then(function() {
	                    okProtocol = okFn;
	                    UtilService.hideLoading();
	                });
	            } else {
	                if (angular.isDefined(scope.ProtocolModal)) {
	                    scope.ProtocolModal.show();
	                    UtilService.hideLoading();
	                }
	            }
	        };
	        //隐藏 微协议
	        scope.closeProtocolModal = function() {
	            if (angular.isDefined(scope.ProtocolModal)) {
	                return scope.ProtocolModal.hide();
	            }
	            return false;
	        };

	        scope.makeSure = function() {
	                if (angular.isFunction(okProtocol)) {
	                    okProtocol();
	                    scope.closeProtocolModal();
	                }
	            }
	            //**************微协议 结束**************//

	        scope.$on('$destroy', function() {
	            scope.ProtocolModal.remove();
	            ProtocolModal_pomise = false;
	        });
	        /*弹框 结束*/

	        return {
	            closeProtocolModal: scope.closeProtocolModal,
	            showProtocolModal: showProtocolModal,


	        };

	    });


	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"protocolTips-view\">\r\n    <ion-header-bar class=\" bar-energized nav-title-slide-full\">\r\n        \r\n        <h1 class=\"title title-center\">粤国际微盘微协议</h1>\r\n        <div class=\"buttons\">\r\n            <button class=\"button button-clear  icon-left ion-android-close\" on-tap=\"closeProtocolModal()\"></button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content has-bouncing=\"false\" padding=\"false\" class=\"padding light-bg  has-footer\" delegate-handle=\"protocolTipsScroll\">\r\n        <div class=\"r-con \" style=\"overflow: scroll;\">\r\n            <p class=\"r-s-title\">甲方:<span id=\"member\" style=\"border-bottom:1px solid #000000\" ng-bind=\"memberName\"></span> </p>\r\n            <p class=\"r-s-title\">乙方:<span style=\"border-bottom:1px solid #000000\">本协议签署或确认方</span> </p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">一、合同主体</p>\r\n            <p class=\"\">(一) 甲方为广东国际商品交易中心有限公司（下称“交易中心”）的挂牌会员，在交易中心微盘平台上开展有关商品的现货交易业务（下称“交易业务”）的企业法人或者其他经济组织。</p>\r\n            <p class=\"\">(二) 乙方为根据交易中心相关规定，向挂牌会员申请开户，并与挂牌会员在交易中心微盘上进行有关商品交易的客户。乙方提供的开户资料虚假的，由此而引起的一切后果自行承担。甲方终止微盘业务的，乙方同意由交易中心旗下其他挂牌会员继承本协议中甲方的权利义务。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">二、交易事项</p>\r\n            <p class=\"\">(一) 甲方和乙方同意根据中华人民共和国有关法律法规、本协议约定及交易中心现行的或将来颁布的有关交易制度，在交易中心微盘平台上进行交易，并服从交易中心的监督管理。</p>\r\n            <p class=\"\">(二) 在交易中心微信平台上下达的交易指令，不得撤回或撤销。</p>\r\n            <p class=\"\">(三) 乙方自行对交易盈亏等风险结果负责，且在交易过程中产生的一切纠纷均由双方自行解决，与交易中心无关。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">三、交易标的</p>\r\n            <p class=\"\">交易中心微信平台上上线交易的所有商品，具体交易数量按交易中心发布的相关交易规则及管理规定执行。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">四、交易报价</p>\r\n            <p class=\"\">交易中心综合国际大宗商品现货市场价格和国内其他大宗商品现货市场价格以及中国人民银行人民币兑美元基准汇率、市场供求关系等，连续报出交易中心大宗商品现货的人民币中间指导价。交易中心根据相应的管理办法，在上述人民币中间指导价的基础上，连续报出大宗商品现货的人民币价格。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">五、账户管理</p>\r\n            <p class=\"\">(一) 凡通过乙方的交易账户和密码进行的交易操作，无论是否确属乙方本人进行的交易，均视为是乙方操作，乙方对交易结果负责。</p>\r\n            <p class=\"\">（二）乙方必须对交易账户和密码妥善保管，密码丢失的，可申请密码重置。因乙方密码遗失及被盗导致的损失，均与甲方及交易中心无关，由乙方自行承担。</p>\r\n            <p class=\"\">（三）交易中心的电话录音、系统记录等证据具有法律效力，甲、乙双方所有交易数据以交易中心提供的为准。</p>\r\n            <p class=\"\">（四）乙方开户申请资料发生变化时，应及时通知甲方，否则因此造成的损失由乙方自行承担。</p>\r\n            <p class=\"\">（五）乙方不得以任何方式委托甲方、交易中心及其工作人员代为操作交易账户，否则因此而造成的损失由乙方自行承担。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">六、交易保证金</p>\r\n            <p class=\"\">甲、乙双方均须按交易中心有关规定预存交易保证金，以确保交易顺利进行，预存的交易保证金不享有利息。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">七、交易及结算休市时间</p>\r\n            <p class=\"\">交易中心按照不同商品在官网上公布具体的开市时间，具体开市、休市时间遇国家法定节假日、国际市场休市则另行通知。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">八、交易费用</p>\r\n            <p class=\"\">乙方按交易中心的有关规定向甲方支付交易手续费，若乙方要求交收的，产生的库存费、提货费、交货费等费用，按交易中心的有关规定执行。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p clas=\"r-s-title\">九、结算与清算</p>\r\n            <p class=\"\">甲、乙双方同意执行交易中心的资金管理、结算和清算等制度。</p>\r\n            <p class=\"e\">因系统后台保留的小数点位数要长于前端展示给客户的小数点位数，加之系统后台计算自动四舍五入因素，两种数据取值的计算结果存在一定差异，以系统后台结算数据为准。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">十、免责条款</p>\r\n            <p class=\"\">（一）由于交易是通过电子通讯技术来实现的，这些技术存在着被网络黑客和病毒攻击的可能，由此可能给客户带来损失，该损失由客户自行承担，甲方和交易中心不承担任何责任。</p>\r\n            <p class=\"\">（二）由于微盘并不能控制电讯信号的中断和连接以及互联网的畅通，也不能保证客户自身网络设备及电讯设备的稳定性，由此等原因而使客户遭受的损失，由客户自行承担，甲方和交易中心不承担任何责任。</p>\r\n            <p class=\"\">（三）由于发生不可抗力诸如地震、火灾、水灾、战争、暴动、罢工等导致的交易中断、延误等风险，甲方和交易中心不承担责任，但应在条件允许的范围内采取必要的补救措施以减少因不可抗力造成的损失。</p>\r\n            <p class=\"\">（四）由于客户密码失密、操作不当、投资决策失误等原因可能会发生亏损，该损失将由客户自行承担，甲方和交易中心不承担任何责任。</p>\r\n            <p class=\"\">（五）由于市场情况或其他的特殊原因，交易无法继续进行的，甲方或交易中心将暂停交易，并可即时免除迟延交易责任。</p>\r\n            <p class=\"\">（六）由于国家有关法律法规、规章、政策的改变，或紧急措施的出台等原因导致交易系统临时或永久性关闭等风险的，甲方和交易中心不承担责任。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">十一、争议解决</p>\r\n            <p class=\"\">如甲、乙双方发生与本协议相关的一切争议，应以友好协商的原则商议解决。经协商不能达成一致意见的，可向交易中心申请调解；调解不成的，任何一方可提交广州仲裁委员会，按照申请仲裁时其现行有效的仲裁规则进行仲裁。仲裁裁决是终局的，对双方均有约束力。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">十二、其他条款</p>\r\n            <p>本协议以电子化形式存档，协议各方均认可该电子化存档文件的法律效力，如各方对协议版本及内容产生争议的，以交易中心存档数据及解释为准。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">十三、特别提示</p>\r\n            <p>（一）甲方已提醒乙方特别注意有关其权利义务的全部条款，并应乙方的要求对全部条款作了详尽的说明，乙方知悉、理解与同意并自愿接受本协议所有条款的约束。</p>\r\n            <p>（二）本协议书为甲方要约，乙方签署或通过互联网点击确认则视为承诺，本协议自乙方承诺之日起生效。</p>\r\n            <p class=\"r-s-title\"></p>\r\n            <p class=\"r-s-title\">入市有风险，投资需谨慎！</p>\r\n        </div>\r\n    </ion-content>\r\n    <div class=\"bar bar-footer bar-energized\">\r\n        <button class=\"button button-block button-energized ok_btn\" on-tap=\"makeSure()\" ng-disabled=registerform.$invalid>确定</button>\r\n    </div>\r\n</ion-modal-view>\r\n"

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	    app.factory("RankFactory", function($q) {
	         var ranks = {
	            'TRADE_RANK':      { 'self': {}, 'ranks': [],winPercent:0 },
	            'PROFIT_LOSS_RANK':{ 'self': {}, 'ranks': [],winPercent:0 },
	            'SHARE_RANK':      { 'self': {}, 'ranks': [],winPercent:0 },
	        };
	        
	        var update = function(type) {
	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                void 0;
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }
	            switch (type) {
	                case 'TRADE_RANK':
	                    data = { "code": 200, "message": "成功", "object": { "ranks": [], "self": { "headimgurl": "http://wx.qlogo.cn/mmopen/tsgqoSDtg9cUHEYSKJIlZsibAlZp9WTW0qI1IvAMTnv2E8Wibromd7EfDbfkIxiaGU2mXKRVKqbwDrxp6VuoqY7QRQ1o6ia0mfiaV/0", "name": "OU.KEYE", "rank": 0, "type": 1, "value": 0 }, "winPercent": 0 }, "success": true };
	                    break;
	                case 'PROFIT_LOSS_RANK':
	                    data={"code":200,"message":"成功","object":{"ranks":[],"self":{"headimgurl":"http://wx.qlogo.cn/mmopen/tsgqoSDtg9cUHEYSKJIlZsibAlZp9WTW0qI1IvAMTnv2E8Wibromd7EfDbfkIxiaGU2mXKRVKqbwDrxp6VuoqY7QRQ1o6ia0mfiaV/0","name":"OU.KEYE","rank":0,"type":2,"value":0},"winPercent":0},"success":true};
	                    break;
	                case 'SHARE_RANK':
	                    data={"code":200,"message":"成功","object":{"ranks":[],"self":{"headimgurl":"http://wx.qlogo.cn/mmopen/tsgqoSDtg9cUHEYSKJIlZsibAlZp9WTW0qI1IvAMTnv2E8Wibromd7EfDbfkIxiaGU2mXKRVKqbwDrxp6VuoqY7QRQ1o6ia0mfiaV/0","name":"OU.KEYE","rank":0,"type":3,"value":0},"winPercent":0},"success":true};
	                    break;
	            }
	            if(data.success){
	                ranks[type]=data.object;
	                deferred.resolve(data);
	            }else{
	               deferred.resolve(data); 
	            }
	            /*$.ajax({
	                type: 'get',
	                url: '/api/ranks',
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                timeout:10000,
	                data: {
	                    type: type,
	                },
	                success: function(data, status, jqXHR) {
	                    if(data.success){
	                        ranks[type]=data.object;
	                        deferred.resolve(data);
	                    }else{
	                       deferred.resolve(data); 
	                    }
	                    
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });*/
	            return deferred.promise;

	        }
	        return {
	            getRanks: function() {
	                return ranks;
	            },
	            update: update,

	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app) {

	    app.factory('SelectFactory', function($rootScope, $ionicModal, UtilService) {

	        var scope = $rootScope.$new(true);

	        var createSelectModal = function() {
	            return $ionicModal.fromTemplate(__webpack_require__(43), {
	                scope: scope,
	                animation: 'slide-in-up',
	                backdropClickToClose: true
	            });
	        }

	        scope.select = function() {};

	        //显示 
	        var showSelectModal = function(dataList,defautlData, okFn) {
	            scope.dataList = dataList;
	            scope.choice = defautlData;
	            scope.select = okFn;

	            if (angular.isUndefined(scope.SelectModal)) {
	                scope.SelectModal = createSelectModal();
	                scope.SelectModal.show();
	            } else {
	                if (angular.isDefined(scope.SelectModal)) {
	                    scope.SelectModal.show();
	                }
	            }
	        };
	        //隐藏 微协议
	        scope.closeSelectModal = function() {
	            if (angular.isDefined(scope.SelectModal)) {
	                return scope.SelectModal.hide();
	            }
	            return false;
	        };

	        scope.$on('$destroy', function() {
	            scope.SelectModal.remove();
	            SelectModal_pomise = false;
	        });

	        return {
	            closeSelectModal: scope.closeSelectModal,
	            showSelectModal: showSelectModal,
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal select_view\">\r\n    <ion-content has-bouncing=\"false\"  class=\"padding has-footer  has-header \" delegate-handle=\"loginScroll\">\r\n        <div class=\" list select_box\">\r\n            <ion-radio ng-model=\"choice\" ng-repeat=\"(key, value) in  dataList track by $index\" ng-value=\"value\" ng-click=\"select(value)\">{{value}}</ion-radio>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app) {
	    'use strict';

	    app.controller('AccountCtrl', ['$rootScope', '$scope', '$state', '$timeout', 'CustomerFactory', 'UtilService',
	        function($rootScope, $scope, $state, $timeout, CustomerFactory, UtilService) {
	            var _path = '/tab/account';
	            $scope.Customer = CustomerFactory.getCustomer();
	            // 监听登录用户登录
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();;
	                void 0;
	            });

	           
	            $scope.gotoState = function(state) {
	                $state.go(state);
	            };

	            $scope.$on('$ionicView.beforeEnter', function() {
	                //1.检查是否登录
	                var isLogin = CustomerFactory.checkLogin();

	                if (isLogin) {
	                    //2.检查是否获取了资金
	                    if (angular.isUndefined($scope.Customer.money)) {
	                        CustomerFactory.getMoneyTicketInfo();
	                    }
	                }

	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16), __webpack_require__(27), __webpack_require__(46)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {
	    'use strict';

	    app.controller('ChargeCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$q', '$filter', '$ionicPopup',
	        'UtilService', 'CustomerFactory', 'ChargeFactory',
	        function($rootScope, $scope, $state, $timeout, $q, $filter, $ionicPopup, UtilService, CustomerFactory, ChargeFactory) {
	            $scope.moneyReg = config.moneyReg;
	            $scope.Customer = CustomerFactory.getCustomer();

	            var _path = '/tab/charge';

	            // 监听登录用户登录
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	                void 0;
	            });

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };

	            $scope.charge = { money: 500, chargeScale: 0.992, isUseNewWxPay: false };

	            //只可以输入数字
	            $scope.changeInput = function() {
	                if (angular.isDefined($scope.charge.money) && 　$scope.charge.money != '') {
	                    $scope.charge.money = UtilService.getNumber($scope.charge.money);
	                } else {
	                    $scope.charge.money = '';
	                }
	            }
	            $scope.clearNoNum =
	                $scope.selectMoney = function(selectMoney) {
	                    $scope.charge.money = selectMoney;

	                }
	            $scope.checkMoney = function() {
	                $scope.charge.money = parseInt($scope.charge.money);

	                if (isNaN($scope.charge.money) || $scope.charge.money < 20) {
	                    UtilService.tips(_path, '请输入数字且最小20', 2000);
	                    $scope.charge.money = 20;
	                }
	                if ($scope.charge.money > 5000) {
	                    $scope.charge.money = 5000;
	                    UtilService.tips(_path, '最多充值5000元', 2000);
	                }
	            };

	            $scope.isWeixin = UtilService.isWeixin();


	            $scope.recharge = function(url) {
	                if (!UtilService.checkMoney($scope.charge.money)) {
	                    UtilService.tips(_path, '充值金额异常');
	                    return false;
	                }

	               
	    
	                UtilService.showLoading();

	                ChargeFactory.recharge(url, $scope.charge.money).then(function(data) {

	                        UtilService.hideLoading();
	                        if (data.success) {
	                            if (url == '/api/recharge_wxpay_gdiex') {
	                                 // 自定义弹窗
	                               $ionicPopup.show({
	                                   template: '<input type="text" class="code" disabled="disabled" value="验证码: '+data.object+'">' + '<div>复制验证码到粤国际服务中心公众号支付。</div>',
	                                   title: '充值信息',
	                                   subTitle: '长按验证码可复制',
	                                   buttons: [{
	                                       text: '<b>确定</b>',
	                                       type: 'button-energized',
	                                       onTap: function(e) {
	                                           window.location.href = 'http://edu.gdiex.com/ypay/wxpay.html';
	                                       }
	                                   }],
	                                   cssClass: 'chargeCode'
	                               });

	                            } else if (url == '/api/recharge_unionpay_gdiex') {
	                                window.location.href = data.object;
	                            }

	                        } else {
	                            UtilService.tips(_path, data.message + '(' + data.code + ')');
	                        }


	                    },
	                    function(data) {
	                        UtilService.tips(_path, data.message);
	                    });

	            };

	            $scope.rechargeUnionpay = function() {
	                $scope.recharge('/api/recharge_unionpay_gdiex');
	            }

	            $scope.rechargeWxpay = function() {
	                var _url = $scope.charge.isUseNewWxPay ? '/api/recharge_wxpay_gdiex2' : '/api/recharge_wxpay_gdiex';

	                $scope.recharge(_url);
	            }
	            $scope.chargeMoney = function() {
	                    var _r = $scope.charge.money * $scope.charge.chargeScale;
	                    if (isNaN(_r)) {
	                        return "0.00";
	                    } else {
	                        return _r.toFixed(2);
	                    }

	                }
	                //检查必须数据
	            var init = function() {
	                //1.检查是否登录
	                var isLogin = CustomerFactory.checkLogin();

	                if (isLogin) {
	                    //2.检查是否获取了资金
	                    if (angular.isUndefined($scope.Customer.money)) {
	                        CustomerFactory.getMoneyTicketInfo();
	                    }
	                }

	                //3.检查是否有公告未读
	                CustomerFactory.cheakNews();

	            };

	            var queryRechargeRule = function() {
	                var deferred = $q.defer();
	                var _timer = $timeout(function() {
	                    UtilService.showLoading();
	                }, 1000);

	                ChargeFactory.rechargeRule().then(function(data) {
	                    $timeout.cancel(_timer);

	                    if (data.success) {
	                        if (data.object.intime == false) {
	                            deferred.reject();
	                            UtilService.tips(_path, '非充值时间', 2000, function() {}, function() {
	                                $state.go('tab.account');
	                            }, false);
	                        } else {
	                            //  挂会承担充值手续费 到账比例就为1
	                            if (data.object.handAmountSwitch) {
	                                $scope.charge.chargeScale = 1;
	                            }
	                            $scope.charge.isUseNewWxPay = data.object.useNewWxPay;
	                            UtilService.hideLoading();
	                            deferred.resolve();
	                        }
	                    } else {
	                        //获取接口数据异常 接口处理promise：resolve,也继续充值
	                        deferred.resolve();
	                        UtilService.tips(_path, data.message + '(' + data.code + ')');
	                    }
	                }, function(data) {
	                    $timeout.cancel(_timer);
	                    //获取接口失败 接口处理promise：reject,重新获取
	                    deferred.reject();
	                    UtilService.lipsLink(_path,'获取参数失败' + data.message + ',点击重试', $rootScope, function() {
	                        queryRechargeRule();
	                    });
	                });


	                return deferred.promise;

	            };


	            $scope.$on('$ionicView.beforeEnter', function() {
	                init();
	                queryRechargeRule();
	            });
	            $scope.$on('$ionicView.beforeLeave', function() {
	                UtilService.hideLoading();
	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11),__webpack_require__(10), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	    app.factory("ChargeFactory", function($q, UtilService) {

	        var recharge = function(url, amount) {

	            var deferred = $q.defer();
	            var _token = UtilTool.getCookie('token') || '';
	            if (!(url == '/api/recharge_unionpay_gdiex' || url == '/api/recharge_wxpay_gdiex2' || url == '/api/recharge_wxpay_gdiex')) {
	                 deferred.reject({ code: -1, message: 'url参数错误', success: false });
	                return deferred.promise;
	            }
	            if (!UtilService.checkMoney(amount)) {
	                deferred.reject({ code: -1, message: '金额参数错误', success: false });
	                return deferred.promise;
	            }
	            if (_token == '') {
	                void 0;
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }

	            $.ajax({
	                type: 'POST',
	                url: url, //'/api/recharge_unionpay_gdiex',
	                dataType: "json",
	                timeout: 10000,
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    amount: amount,
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });

	            return deferred.promise;
	        }
	        //充值页面接口
	        var rechargeRule = function() {

	            var deferred = $q.defer();
	            var data={"code":200,"message":"成功","object":{"handAmountSwitch":true,"intime":true,"useNewWxPay":false},"success":true};
	             deferred.resolve(data);
	            // $.ajax({
	            //     type: "get",
	            //     url: "/api/currency/rechargeRule",
	            //     dataType: "json",
	            //     timeout: 10000,
	            //     success: function(data) {
	            //         deferred.resolve(data);
	            //     },
	            //     error: function(jqXHR, statusText, errorthow) {
	            //         deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	            //     }
	            // });
	            return deferred.promise;
	        }
	        return {
	            recharge: recharge,
	            rechargeRule:rechargeRule
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(28),
	    __webpack_require__(27), __webpack_require__(21), __webpack_require__(38)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {
	    'use strict';

	    app.controller('DealhistoryCtrl', ['$rootScope', '$scope', '$state','$stateParams',  '$filter', '$ionicModal', 'UtilService',
	        'StoragesFactory', 'CustomerFactory', 'ContractFactory', 'TickesFactory', 'TEMPLATE',
	        function($rootScope, $scope, $state, $stateParams,$filter, $ionicModal, UtilService, StoragesFactory, CustomerFactory,
	            ContractFactory, TickesFactory, TEMPLATE) {

	            var _path = '/tab/dealhistory';

	            $scope.Customer = CustomerFactory.getCustomer();
	            // 监听登录用户信息更新
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	                void 0;
	            });


	            $scope.products = ContractFactory.getProduct();
	            if (UtilService.isEmptyObject($scope.products)) {
	                ContractFactory.updateContracts().then(function(data) {
	                    //获取失败需要重新获取
	                    $scope.products = ContractFactory.getProduct();
	                });
	            }

	            $scope.Tickets = TickesFactory.getTickets();
	            //体验券对应的产品
	            if (UtilService.isEmptyObject($scope.Tickets)) {
	                TickesFactory.updateTickets().then(function() {
	                    $scope.Tickets = TickesFactory.getTickets();
	                });
	            }

	            $scope.dealhistory = StoragesFactory.getDealHistory();
	            // 监听登录用户token
	            $rootScope.$on('token.update', function() {
	                $scope.dealhistory.last = false;
	                $scope.dealhistory = StoragesFactory.getDealHistory();
	            });

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };
	            $scope.infinite = function() {
	                if ($scope.dealhistory.last != true) {
	                    StoragesFactory.updateDealHistory().then(function(data) {
	                        $scope.dealhistory = StoragesFactory.getDealHistory();
	                        $scope.$broadcast('scroll.infiniteScrollComplete');
	                    }, function(data) {
	                        if (data.code == 401) {
	                            $scope.dealhistory.last = true;
	                            UtilTool.setCookie('token', '');
	                            CustomerFactory.checkLogin();
	                            $scope.$broadcast('scroll.infiniteScrollComplete');
	                        }

	                    });
	                }

	            }
	            $scope.doRefresh = function() {
	                void 0;
	                StoragesFactory.refreshDealHistory().then(function() {
	                    var _dealhistory = $scope.dealhistory;
	                    $scope.dealhistory = StoragesFactory.getDealHistory();
	                    UtilService.tips(_path, '刷新成功');
	                    //总数量变化 获取用户信息 总盈亏 总手数 总单数
	                    if ($scope.dealhistory.totalElements != _dealhistory.totalElements) {

	                        CustomerFactory.getUserMsg();
	                    }
	                    _dealhistory = null;
	                    $scope.$broadcast('scroll.refreshComplete');
	                }, function(data) {
	                    UtilService.tips(_path, data.message + "(" + data.code + ")");
	                    $scope.$broadcast('scroll.refreshComplete');
	                });

	            }

	            //**************订单详情 开始**************//
	            var createDealhistoryDetailModal = function() {
	                    return $ionicModal.fromTemplate(__webpack_require__(48), {
	                        scope: $scope,
	                        animation: 'slide-in-up',
	                        backdropClickToClose: false
	                    });
	                }
	                //显示 注册提示
	            $scope.currontDealhistory = {};
	            $scope.showDealhistoryDetailModal = function(item) {

	                UtilService.showLoading();
	                $scope.currontDealhistory = item;
	                $scope.currontDealhistory.dealDirection = $scope.ordertype($scope.currontDealhistory.dealDirection);
	                $scope.currontDealhistory.profit = ($scope.currontDealhistory.profitAndLoss - $scope.currontDealhistory.handingChargeAmount).toFixed(2);

	                if (angular.isUndefined($scope.DealhistoryDetailModal)) {
	                    $scope.DealhistoryDetailModal = createDealhistoryDetailModal();
	                    $scope.DealhistoryDetailModal.show();

	                    UtilService.hideLoading();
	                } else {
	                    if (angular.isDefined($scope.DealhistoryDetailModal)) {

	                        $scope.DealhistoryDetailModal.show();
	                    }

	                    UtilService.hideLoading();
	                }

	            };
	            //隐藏
	            $scope.closeDealhistoryDetailModal = function() {
	                if (angular.isDefined($scope.DealhistoryDetailModal)) {
	                    return $scope.DealhistoryDetailModal.hide();
	                }
	                return false;
	            };


	            $scope.$on('$ionicView.beforeEnter', function() {

	                var islogin = CustomerFactory.checkLogin();

	                if (UtilService.isEmptyObject($scope.products)) {
	                    ContractFactory.updateContracts().then(function(data) {
	                        //获取失败需要重新获取
	                        $scope.products = ContractFactory.getProduct();
	                    });
	                }

	                //体验券对应的产品
	                if (UtilService.isEmptyObject($scope.Tickets)) {
	                    TickesFactory.updateTickets().then(function() {
	                        $scope.Tickets = TickesFactory.getTickets();
	                    });
	                }
	                var id = $stateParams.Id;//UtilService.getURLPara('id');

	                if (id && islogin) {
	                    StoragesFactory.getStorageBuyId(id).then(function(data) {
	                        if (data.success == true && angular.isDefined(data.object)) {
	                            $scope.showDealhistoryDetailModal(data.object);
	                        }

	                    }, function() {

	                    });
	                }

	            });
	            $scope.$on('$ionicView.beforeLeave', function() {
	                $scope.closeDealhistoryDetailModal();
	            });

	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal dealhistory-detail-view \">\r\n    <ion-header-bar class=\" bar-energized nav-title-slide-full\">\r\n        <h1 class=\"title title-center\">订单详情</h1>\r\n        <div class=\"buttons\">\r\n            <a class=\"button button-icon icon ion-ios-close-empty light\" on-tap=\"closeDealhistoryDetailModal()\"></a>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content class=\"dark-bg has-header\" has-bouncing=\"false\" delegate-handle=\"orderHistoryDetailScroll\">\r\n        <div class=\"list\">\r\n            <div class=\"item productsName\">\r\n                <span>产品:</span><span class=\"value\">{{products[currontDealhistory.contractCode].name}}</span>\r\n                <div class=\"userTicket\" ng-if=\"currontDealhistory.usedTicket \">\r\n                    <div class=\"valueTicket\">{{Tickets[currontDealhistory.usedTicketId].displayValue}}元</div>\r\n                    <div class=\"countTicket\">已使用体验券({{currontDealhistory.usedTicketCount}})</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">订单号:</span><span class=\"value\">{{currontDealhistory.id}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">建仓时间:</span><span class=\"value\">{{date(currontDealhistory.buyingDate) }}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">平仓时间:</span><span class=\"value\">{{date(currontDealhistory.sellingDate)}}</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                <span class=\"label\">方向:</span><span class=\"value\">{{currontDealhistory.dealDirection}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">入仓价:</span><span class=\"value\">{{currontDealhistory.buyingRate }}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">平仓价:</span><span class=\"value\">{{currontDealhistory.sellingRate }}</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                <span class=\"label\">入仓支付金额:</span><span class=\"value\">{{currontDealhistory.payAmount}}元</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">入仓手续费:</span><span class=\"value\">{{currontDealhistory.handingChargeAmount}}元</span>\r\n            </div>\r\n            <div class=\"item profitAndLoss\">\r\n                <span class=\"label\">盈亏金额:</span><span class=\"value\" ng-class=\"{up:currontDealhistory.profitAndLoss >=0,down:currontDealhistory.profitAndLoss <0}\">{{currontDealhistory.profitAndLoss }}元</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                <span class=\"label\">平仓收入金额:</span><span class=\"value\">{{currontDealhistory.sellingIncome}}元</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"label\">本单实际盈亏:</span><span class=\"value\">{{currontDealhistory.profit}}元</span>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {
	    'use strict';

	    app.controller('ForgetCodeCtrl', ['$scope', '$ionicHistory', '$state', '$interval', 'UtilService', 'CustomerFactory',
	        function($scope, $ionicHistory, $state, $interval, UtilService, CustomerFactory) {
	             var _path='/tab/forgetCode';
	            
	            $scope.forgetCode = {};
	            $scope.telReg = config.telReg;

	            var imgUrl = "/api/imgcode.jpg?reqId=";
	            $scope.reqId = UtilService.getDateRandom(10000, 99999);
	            $scope.imageUrl = imgUrl + $scope.reqId;
	            //刷新图形验证码图片
	            $scope.refreshImageCode = function() {
	                $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                $scope.imageUrl = imgUrl + $scope.reqId;
	            }
	            //返回
	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };
	            $scope.forgetCode = function() {

	            };
	            //发送获取验证码后 倒计时
	            $scope.sendTime = 120;
	            $scope.getCodeText = '获取验证码';
	            var countDown = function() {
	                var countDown_timer = $interval(function() {

	                    if ($scope.sendTime <= 1) {
	                        $interval.cancel(countDown_timer);
	                        $scope.sendTime = 120;
	                        $scope.getCodeText = '获取验证码';
	                    } else {

	                        $scope.sendTime -= 1;
	                        $scope.getCodeText = '重新发送(' + $scope.sendTime + ')';
	                    }
	                }, 1000);
	            };
	            //图片验证码 获取 短信或者语音验证
	            $scope.getCode = function() {

	                if ($scope.getCodeText != '获取验证码') {
	                        UtilService.tips(_path,'120秒后才能再次获取');
	                        return false;
	                    }
	                if (angular.isUndefined($scope.forgetCode.telNumber) || $scope.forgetCode.telNumber == '') {
	                    UtilService.tips(_path,"请输入手机号码");
	                    return false;
	                }
	                if (angular.isUndefined($scope.forgetCode.imgcode) || $scope.forgetCode.imgcode == '') {
	                    UtilService.tips(_path,"请输入图形验证码");
	                    return false;
	                }

	                UtilService.showLoading();

	                CustomerFactory.checkImageGetCode($scope.forgetCode.telNumber, $scope.forgetCode.imgcode, "FIND_PWD", $scope.reqId)
	                    .then(function(data) {
	                        if (data.success == false) {
	                            UtilService.tips(_path,data.message);
	                           /* $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                            $scope.imageUrl = imgUrl + $scope.reqId;*/

	                        } else {
	                            //语音验证，弹出提示框
	                            if (data.object == 'speech') {
	                                // showSpeechMsg();
	                                UtilService.tips(_path,'获取验证码成功，请留意来电播报验证码', 1500);
	                            } else {
	                                UtilService.tips(_path,data.message+',请查收短信', 1500);
	                            }
	                            countDown();
	                        }
	                    }, function(data) {
	                        UtilService.tips(_path,data.message);
	                    });
	            };

	            $scope.queryCode = function() {

	                if (angular.isUndefined($scope.forgetCode.telNumber) || $scope.forgetCode.telNumber == '') {
	                    UtilService.tips(_path,"请输入手机号码");
	                    return false;
	                }
	                if (angular.isUndefined($scope.forgetCode.code) || $scope.forgetCode.code == '') {
	                    UtilService.tips(_path,"请输入图形验证码");
	                    return false;
	                }

	                UtilService.showLoading();

	                CustomerFactory.queryCode($scope.forgetCode.telNumber, $scope.forgetCode.code, "FIND_PWD")
	                    .then(function(data) {
	                        if (data.success == false) {
	                            UtilService.tips(_path,data.message);
	                        } else {
	                            UtilService.tips(_path,data.message, 1500, function() {}, function() {
	                                $state.go('tab.verify',{code:$scope.forgetCode.code,tel:$scope.forgetCode.telNumber});
	                            });

	                        }
	                    }, function(data) {
	                        UtilService.tips(_path,data.message);
	                    });
	            };
	            var init = function() {

	            }
	            $scope.$on('$ionicView.beforeEnter', function() {
	                init();

	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(12),__webpack_require__(51), __webpack_require__(4), __webpack_require__(5),
	        __webpack_require__(16), __webpack_require__(17), __webpack_require__(20), __webpack_require__(35),
	        __webpack_require__(21), __webpack_require__(38),
	        __webpack_require__(27), __webpack_require__(36),
	        __webpack_require__(28), __webpack_require__(29)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool, ChartOptionFactory) {
	        'use strict';
	        app.controller('HomeCtrl', function($rootScope, $filter, $scope, $timeout, $ionicModal,
	            $ionicActionSheet, $ionicScrollDelegate, $state,
	            PriceFactory, ContractFactory, TickesFactory,OfflineFactory,
	            CustomerFactory, SetOrderModelFactory, StoragesFactory, NewsFactory,
	            UtilService, TEMPLATE) {

	            var _path='/tab/home';

	            $scope.currentObj = { 'type': 1 };

	            $scope.Customer = CustomerFactory.getCustomer();

	            $scope.Customer_token = UtilTool.getCookie('token') || '';


	            // 监听登录用户登录
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	                void 0;
	            });
	            // 监听登录用户token
	            $rootScope.$on('token.update', function() {
	                $scope.Customer_token = UtilTool.getCookie('token') || '';
	            });


	            $scope.Price = PriceFactory.getPrice();

	            //合约产品
	            $scope.Contracts = ContractFactory.getContracts();
	            void 0;
	            $scope.getContracts = function(callback) {
	                ContractFactory.updateContracts().then(function() {

	                    $scope.Contracts = ContractFactory.getContracts();
	                    void 0;
	                    //默认当前合约为银
	                    $scope.currentContract = $scope.Contracts[0];
	                    callback && callback();
	                });
	            };
	            //体验券信息
	            $scope.Tickets = TickesFactory.getTickets();
	            $scope.getTickets = function(callback) {
	                //体验券对应的产品
	                TickesFactory.updateTickets().then(function() {
	                    $scope.Tickets = TickesFactory.getTickets();
	                });
	            };

	            $scope.getContracts(function() {
	                $scope.getTickets(function() {

	                });
	            });

	            //通过产品code 查出使用的体验券id
	            $scope.ticketsIdFilter = function(code) {
	                var _id = '';
	                for (var i in $scope.Tickets) {
	                    var _codeList = $scope.Tickets[i].canUseList;
	                    for (var y = 0; y < _codeList.length; y++) {
	                        if (code == _codeList[y]) {
	                            _id = $scope.Tickets[i].id;
	                            return _id;
	                        }
	                    }
	                }
	                return _id;

	            };
	            //通过产品code 查出使用的体验券id
	            $scope.countTicketsFilter = function(id) {
	                var _tickets = $scope.Customer.tickets;
	                _tickets = $filter('filter')(_tickets, { ticketId: id });

	                return angular.isArray(_tickets)?_tickets.length:0;

	            };

	            $scope.goCharge = function() {
	                $state.go('tab.charge');
	            };

	            //刷新资金与体验券
	            var _refreshMoney_time = null;
	            $scope.doRefreshMoney = function() {
	                if (_refreshMoney_time) {
	                    $timeout.cancel(_refreshMoney_time);
	                }
	                _refreshMoney_time = $timeout(function() {
	                    CustomerFactory.getMoneyTicketInfo().then(function(data) {
	                        void 0;
	                    }, function(data) {
	                        UtilService.tips(_path,'获取失败' + '(' + data.code + ')');
	                    });
	                }, 1000);


	            };

	            // k线数据处理
	            var kLineHandle = function(msg) {
	                if (msg.success == false) { //proxy failed
	                    return msg;
	                }
	                if (msg.object.success == false) {
	                    return msg.object;
	                }
	                //数据清空
	                var data = [];
	                var Xdata_K = [];
	                var ValtK = msg.object.object;
	                var data_1K = [];
	                var data_2K = [];
	                data_1K = ValtK.split("|"); // 字符分割
	                for (var i = 0; i < data_1K.length; i++) {
	                    data_2K[i] = data_1K[i].split(",");
	                }
	                for (var i = data_1K.length - 2; i > -1; i--) {
	                    // 数据处理
	                    var arr = new Array();
	                    arr = [];
	                    var DTime = data_2K[i][0].substr(8, 2) + ":" + data_2K[i][0].substr(10, 2);
	                    Xdata_K.push(DTime);
	                    for (var y = 0; y < 6; y++) {
	                        var shuzhu2 = data_2K[i][2];
	                        if (y == 0) {
	                            arr[0] = parseFloat(data_2K[i][3]); //开盘
	                        }
	                        if (y == 1) {
	                            arr[1] = parseFloat(data_2K[i][4]); //收盘
	                        }
	                        if (y == 2) {
	                            arr[2] = parseFloat(data_2K[i][6]); //最低
	                        }
	                        if (y == 3) {
	                            arr[3] = parseFloat(data_2K[i][5]); //最高
	                        }
	                    }
	                    data.push(arr);
	                }
	                var result = { xdata: [], ydata: [] };
	                result.xdata = Xdata_K;
	                result.ydata = data;
	                return result
	            };

	            // 分时线数据处理
	            var timeLineHandle = function(msg) {

	                if (msg.success == false) { //proxy failed
	                    return msg;
	                }
	                if (msg.object.success == false) {

	                    return msg.object;
	                }
	                //数据清空
	                var Xdata = [];
	                var Ydata = [];
	                var Valt = msg.object.object;
	                var data_1 = [];
	                var data_2 = [];
	                data_1 = Valt.split("|"); // 字符分割
	                for (var i = 0; i < data_1.length; i++) {
	                    data_2[i] = data_1[i].split(",");
	                }
	                for (var i = data_1.length - 2; i > -1; i--) {
	                    // 数据处理
	                    var DTime = data_2[i][0].substr(8, 2) + ":" + data_2[i][0].substr(10, 2);
	                    Xdata.push(DTime);
	                    var DY_date = data_2[i][1].trim();
	                    Ydata.push(parseFloat(DY_date));
	                }
	                var result = { xdata: [], ydata: [] };
	                result.xdata = Xdata;
	                result.ydata = Ydata;
	                return result

	            };

	            $scope.echartConfig = {
	                echart: {},
	                showTips: false,
	                showRetry: false,
	                loading: false
	            };
	            //更新echarts
	            $scope.updatEchart = function(chart, type, success, error) {
	                var isHas= checkCurrentContract(chart, type, success, error);
	                if(!isHas){
	                    return false
	                }
	                $scope.echartConfig.echart = chart;
	                void 0;
	                ChartOptionFactory.setEcharat(chart);
	                
	                $scope.echartConfig.loading = true;
	                $scope.echartConfig.showRetry = false;
	                if ($scope.currentObj.type == 1) {
	                    var url_link = "/timeline/query.do?contract=" + $scope.currentContract.contract + "&number=" + 91;
	                    var data ={"code":200,"message":"成功","object":{"code":0,"message":"交易成功","object":"20170426123501,3901,null|20170426123401,3901,null|20170426123301,3901,null|20170426123201,3901,null|20170426123101,3901,null|20170426123001,3900,null|20170426122901,3900,null|20170426122801,3900,null|20170426122701,3901,null|20170426122601,3901,null|20170426122501,3901,null|20170426122401,3901,null|20170426122301,3901,null|20170426122201,3901,null|20170426122101,3901,null|20170426122001,3901,null|20170426121901,3901,null|20170426121801,3900,null|20170426121701,3901,null|20170426121601,3900,null|20170426121501,3900,null|20170426121401,3899,null|20170426121301,3899,null|20170426121201,3899,null|20170426121101,3899,null|20170426121001,3899,null|20170426120901,3899,null|20170426120801,3899,null|20170426120701,3899,null|20170426120601,3899,null|20170426120501,3900,null|20170426120401,3900,null|20170426120301,3900,null|20170426120201,3900,null|20170426120101,3900,null|20170426120001,3899,null|20170426115901,3900,null|20170426115801,3899,null|20170426115701,3899,null|20170426115601,3900,null|20170426115501,3899,null|20170426115401,3899,null|20170426115301,3899,null|20170426115201,3899,null|20170426115101,3899,null|20170426115001,3899,null|20170426114901,3900,null|20170426114801,3901,null|20170426114701,3901,null|20170426114601,3901,null|20170426114501,3901,null|20170426114401,3901,null|20170426114301,3901,null|20170426114201,3900,null|20170426114101,3899,null|20170426114001,3899,null|20170426113901,3899,null|20170426113801,3900,null|20170426113701,3899,null|20170426113601,3899,null|20170426113501,3899,null|20170426113401,3899,null|20170426113301,3899,null|20170426113201,3899,null|20170426113101,3899,null|20170426113001,3899,null|20170426112901,3899,null|20170426112801,3899,null|20170426112701,3899,null|20170426112601,3899,null|20170426112501,3899,null|20170426112401,3898,null|20170426112301,3898,null|20170426112201,3899,null|20170426112101,3899,null|20170426112001,3898,null|20170426111901,3898,null|20170426111801,3898,null|20170426111701,3898,null|20170426111601,3898,null|20170426111501,3898,null|20170426111401,3898,null|20170426111301,3898,null|20170426111201,3898,null|20170426111101,3898,null|20170426111001,3899,null|20170426110901,3899,null|20170426110801,3899,null|20170426110701,3899,null|20170426110601,3899,null|20170426110501,3899,null|","success":true},"success":true};
	                    $scope.echartConfig.loading = false;
	                    var _obj = timeLineHandle(data);

	                    if (_obj.success == false) {
	                        if (93 == _obj.code) {
	                            var _status = $scope.Price[$scope.currentContract.index].data[5];
	                            if (_status == 'false') {
	                                $scope.echartConfig.showTips = true;
	                            }
	                            $scope.echartConfig.showRetry = false;
	                            success && success([], []);
	                        } else {
	                            UtilService.tips(_path,_obj.message + "(" + _obj.code + ")");
	                            $scope.echartConfig.showRetry = true;

	                        }

	                    } else {
	                        $scope.echartConfig.showRetry = false;
	                        success && success(_obj.xdata, _obj.ydata);

	                    }
	                    /*$.ajax({
	                        type: 'GET',
	                        url: '/proxy',
	                        timeout: 10000,
	                        data: { host: config.hostUrl, url: url_link },
	                        success: function(data, status, jqxhr) {
	                            $scope.echartConfig.loading = false;
	                            var _obj = timeLineHandle(data);

	                            if (_obj.success == false) {
	                                if (93 == _obj.code) {
	                                    var _status = $scope.Price[$scope.currentContract.index].data[5];
	                                    if (_status == 'false') {
	                                        $scope.echartConfig.showTips = true;
	                                    }
	                                    $scope.echartConfig.showRetry = false;
	                                    success && success([], []);
	                                } else {
	                                    UtilService.tips(_path,_obj.message + "(" + _obj.code + ")");
	                                    $scope.echartConfig.showRetry = true;

	                                }

	                            } else {
	                                $scope.echartConfig.showRetry = false;
	                                success && success(_obj.xdata, _obj.ydata);

	                            }
	                        },
	                        error: function(jqXHR, statusText, errorthow) {
	                            $scope.echartConfig.showRetry = true;
	                            $scope.echartConfig.loading = false;

	                            UtilService.tips(_path,'加载失败' + jqXHR.statusText + '(' + jqXHR.status + ')');
	                            error && error(status);
	                        }
	                    });*/

	                } else {
	                    //隐藏分时线休市提示
	                    $scope.echartConfig.showTips = false;
	                    var url_link = "/kliner/query.do?contract=" + $scope.currentContract.contract + "&type=" + $scope.currentObj.type + "&number=" + 40;
	                    var data={};
	                    switch($scope.currentObj.type){
	                        case 2:
	                            data={"code":200,"message":"成功","object":{"code":0,"message":"交易成功","object":"20170414035501,20170414040000,20170413,4101,4105,4105,4101,null,null|20170414035001,20170414035500,20170413,4099,4101,4102,4098,null,null|20170414034501,20170414035000,20170413,4099,4098,4101,4098,null,null|20170414034001,20170414034500,20170413,4100,4100,4103,4099,null,null|20170414033501,20170414034000,20170413,4099,4099,4102,4099,null,null|20170414033001,20170414033500,20170413,4097,4099,4100,4097,null,null|20170414032501,20170414033000,20170413,4094,4098,4099,4093,null,null|20170414032001,20170414032500,20170413,4098,4095,4098,4094,null,null|20170414031501,20170414032000,20170413,4098,4098,4101,4097,null,null|20170414031001,20170414031500,20170413,4101,4099,4102,4098,null,null|20170414030501,20170414031000,20170413,4100,4101,4101,4099,null,null|20170414030001,20170414030500,20170413,4103,4100,4103,4099,null,null|20170414025501,20170414030000,20170413,4106,4102,4108,4102,null,null|20170414025001,20170414025500,20170413,4105,4106,4107,4104,null,null|20170414024501,20170414025000,20170413,4106,4104,4107,4103,null,null|20170414024001,20170414024500,20170413,4107,4104,4107,4102,null,null|20170414023501,20170414024000,20170413,4104,4105,4106,4102,null,null|20170414023001,20170414023500,20170413,4104,4103,4105,4102,null,null|20170414022501,20170414023000,20170413,4103,4105,4106,4103,null,null|20170414022001,20170414022500,20170413,4105,4105,4107,4103,null,null|20170414021501,20170414022000,20170413,4105,4105,4107,4103,null,null|20170414021001,20170414021500,20170413,4105,4105,4107,4103,null,null|20170414020501,20170414021000,20170413,4106,4105,4107,4103,null,null|20170414020001,20170414020500,20170413,4107,4105,4108,4104,null,null|20170414015501,20170414020000,20170413,4107,4107,4108,4105,null,null|20170414015001,20170414015500,20170413,4101,4107,4107,4101,null,null|20170414014501,20170414015000,20170413,4101,4103,4104,4101,null,null|20170414014001,20170414014500,20170413,4102,4101,4104,4099,null,null|20170414013501,20170414014000,20170413,4101,4103,4103,4099,null,null|20170414013001,20170414013500,20170413,4101,4101,4101,4099,null,null|20170414012501,20170414013000,20170413,4104,4101,4105,4100,null,null|20170414012001,20170414012500,20170413,4101,4104,4104,4098,null,null|20170414011501,20170414012000,20170413,4101,4102,4103,4100,null,null|20170414011001,20170414011500,20170413,4105,4102,4105,4100,null,null|20170414010501,20170414011000,20170413,4104,4105,4106,4103,null,null|20170414010001,20170414010500,20170413,4103,4104,4105,4101,null,null|20170414005501,20170414010000,20170413,4103,4102,4105,4099,null,null|20170414005001,20170414005500,20170413,4106,4103,4107,4103,null,null|20170414004501,20170414005000,20170413,4103,4106,4107,4103,null,null|20170414004001,20170414004500,20170413,4099,4103,4103,4098,null,null|","success":true},"success":true}; 
	                            break;
	                        case 3:
	                            data={"code":200,"message":"成功","object":{"code":0,"message":"交易成功","object":"20170414035501,20170414040000,20170413,4101,4105,4105,4101,null,null|20170414035001,20170414035500,20170413,4099,4101,4102,4098,null,null|20170414034501,20170414035000,20170413,4099,4098,4101,4098,null,null|20170414034001,20170414034500,20170413,4100,4100,4103,4099,null,null|20170414033501,20170414034000,20170413,4099,4099,4102,4099,null,null|20170414033001,20170414033500,20170413,4097,4099,4100,4097,null,null|20170414032501,20170414033000,20170413,4094,4098,4099,4093,null,null|20170414032001,20170414032500,20170413,4098,4095,4098,4094,null,null|20170414031501,20170414032000,20170413,4098,4098,4101,4097,null,null|20170414031001,20170414031500,20170413,4101,4099,4102,4098,null,null|20170414030501,20170414031000,20170413,4100,4101,4101,4099,null,null|20170414030001,20170414030500,20170413,4103,4100,4103,4099,null,null|20170414025501,20170414030000,20170413,4106,4102,4108,4102,null,null|20170414025001,20170414025500,20170413,4105,4106,4107,4104,null,null|20170414024501,20170414025000,20170413,4106,4104,4107,4103,null,null|20170414024001,20170414024500,20170413,4107,4104,4107,4102,null,null|20170414023501,20170414024000,20170413,4104,4105,4106,4102,null,null|20170414023001,20170414023500,20170413,4104,4103,4105,4102,null,null|20170414022501,20170414023000,20170413,4103,4105,4106,4103,null,null|20170414022001,20170414022500,20170413,4105,4105,4107,4103,null,null|20170414021501,20170414022000,20170413,4105,4105,4107,4103,null,null|20170414021001,20170414021500,20170413,4105,4105,4107,4103,null,null|20170414020501,20170414021000,20170413,4106,4105,4107,4103,null,null|20170414020001,20170414020500,20170413,4107,4105,4108,4104,null,null|20170414015501,20170414020000,20170413,4107,4107,4108,4105,null,null|20170414015001,20170414015500,20170413,4101,4107,4107,4101,null,null|20170414014501,20170414015000,20170413,4101,4103,4104,4101,null,null|20170414014001,20170414014500,20170413,4102,4101,4104,4099,null,null|20170414013501,20170414014000,20170413,4101,4103,4103,4099,null,null|20170414013001,20170414013500,20170413,4101,4101,4101,4099,null,null|20170414012501,20170414013000,20170413,4104,4101,4105,4100,null,null|20170414012001,20170414012500,20170413,4101,4104,4104,4098,null,null|20170414011501,20170414012000,20170413,4101,4102,4103,4100,null,null|20170414011001,20170414011500,20170413,4105,4102,4105,4100,null,null|20170414010501,20170414011000,20170413,4104,4105,4106,4103,null,null|20170414010001,20170414010500,20170413,4103,4104,4105,4101,null,null|20170414005501,20170414010000,20170413,4103,4102,4105,4099,null,null|20170414005001,20170414005500,20170413,4106,4103,4107,4103,null,null|20170414004501,20170414005000,20170413,4103,4106,4107,4103,null,null|20170414004001,20170414004500,20170413,4099,4103,4103,4098,null,null|","success":true},"success":true};
	                            break;
	                        case 4:
	                            data={"code":200,"message":"成功","object":{"code":0,"message":"交易成功","object":"20170414033001,20170414040000,20170413,4097,4105,4105,4097,null,null|20170414030001,20170414033000,20170413,4103,4098,4103,4093,null,null|20170414023001,20170414030000,20170413,4104,4102,4108,4102,null,null|20170414020001,20170414023000,20170413,4107,4105,4108,4103,null,null|20170414013001,20170414020000,20170413,4101,4107,4108,4099,null,null|20170414010001,20170414013000,20170413,4103,4101,4106,4098,null,null|20170414003001,20170414010000,20170413,4096,4102,4107,4095,null,null|20170414000001,20170414003000,20170413,4091,4096,4098,4090,null,null|20170413233001,20170414000000,20170413,4093,4090,4096,4088,null,null|20170413230001,20170413233000,20170413,4095,4093,4101,4091,null,null|20170413223001,20170413230000,20170413,4093,4095,4104,4089,null,null|20170413220001,20170413223000,20170413,4094,4092,4096,4086,null,null|20170413213001,20170413220000,20170413,4113,4094,4116,4082,null,null|20170413210001,20170413213000,20170413,4119,4113,4121,4110,null,null|20170413203001,20170413210000,20170413,4112,4119,4122,4108,null,null|20170413200001,20170413203000,20170413,4111,4113,4117,4108,null,null|20170413193001,20170413200000,20170413,4110,4112,4114,4108,null,null|20170413190001,20170413193000,20170413,4113,4109,4116,4109,null,null|20170413183001,20170413190000,20170413,4115,4113,4116,4112,null,null|20170413180001,20170413183000,20170413,4119,4115,4123,4115,null,null|20170413173001,20170413180000,20170413,4115,4119,4120,4112,null,null|20170413170001,20170413173000,20170413,4107,4115,4115,4107,null,null|20170413163001,20170413170000,20170413,4107,4107,4109,4107,null,null|20170413160001,20170413163000,20170413,4107,4107,4113,4105,null,null|20170413153001,20170413160000,20170413,4105,4107,4108,4104,null,null|20170413150001,20170413153000,20170413,4098,4106,4107,4097,null,null|20170413143001,20170413150000,20170413,4100,4098,4102,4097,null,null|20170413140001,20170413143000,20170413,4102,4099,4103,4096,null,null|20170413133001,20170413140000,20170413,4101,4102,4103,4095,null,null|20170413130001,20170413133000,20170413,4105,4100,4106,4100,null,null|20170413123001,20170413130000,20170413,4105,4105,4107,4104,null,null|20170413120001,20170413123000,20170413,4104,4105,4105,4103,null,null|20170413113001,20170413120000,20170413,4100,4103,4104,4100,null,null|20170413110001,20170413113000,20170413,4105,4100,4105,4100,null,null|20170413103001,20170413110000,20170413,4106,4105,4108,4104,null,null|20170413100001,20170413103000,20170413,4107,4106,4107,4102,null,null|20170413093001,20170413100000,20170413,4101,4106,4114,4097,null,null|20170413090001,20170413093000,20170413,4099,4101,4103,4090,null,null|20170413083001,20170413090000,20170413,4100,4099,4102,4097,null,null|20170413080001,20170413083000,20170413,4104,4100,4105,4097,null,null|","success":true},"success":true}; 
	                            break;
	                        case 5:
	                            data={"code":200,"message":"成功","object":{"code":0,"message":"交易成功","object":"20170414030001,20170414040000,20170413,4103,4105,4105,4093,null,null|20170414020001,20170414030000,20170413,4107,4102,4108,4102,null,null|20170414010001,20170414020000,20170413,4103,4107,4108,4098,null,null|20170414000001,20170414010000,20170413,4091,4102,4107,4090,null,null|20170413230001,20170414000000,20170413,4095,4090,4101,4088,null,null|20170413220001,20170413230000,20170413,4094,4095,4104,4086,null,null|20170413210001,20170413220000,20170413,4119,4094,4121,4082,null,null|20170413200001,20170413210000,20170413,4111,4119,4122,4108,null,null|20170413190001,20170413200000,20170413,4113,4112,4116,4108,null,null|20170413180001,20170413190000,20170413,4119,4113,4123,4112,null,null|20170413170001,20170413180000,20170413,4107,4119,4120,4107,null,null|20170413160001,20170413170000,20170413,4107,4107,4113,4105,null,null|20170413150001,20170413160000,20170413,4098,4107,4108,4097,null,null|20170413140001,20170413150000,20170413,4102,4098,4103,4096,null,null|20170413130001,20170413140000,20170413,4105,4102,4106,4095,null,null|20170413120001,20170413130000,20170413,4104,4105,4107,4103,null,null|20170413110001,20170413120000,20170413,4105,4103,4105,4100,null,null|20170413100001,20170413110000,20170413,4107,4105,4108,4102,null,null|20170413090001,20170413100000,20170413,4099,4106,4114,4090,null,null|20170413080001,20170413090000,20170413,4104,4099,4105,4097,null,null|20170413070001,20170413080000,20170413,4105,4104,4109,4102,null,null|20170413060001,20170413070000,20170413,4099,4105,4105,4094,null,null|20170413030001,20170413040000,20170412,4055,4086,4089,4053,null,null|20170413020001,20170413030000,20170412,4050,4055,4058,4049,null,null|20170413010001,20170413020000,20170412,4063,4050,4064,4045,null,null|20170413000001,20170413010000,20170412,4059,4063,4063,4048,null,null|20170412230001,20170413000000,20170412,4067,4059,4069,4059,null,null|20170412220001,20170412230000,20170412,4064,4067,4073,4056,null,null|20170412210001,20170412220000,20170412,4061,4064,4070,4052,null,null|20170412200001,20170412210000,20170412,4069,4061,4077,4060,null,null|20170412190001,20170412200000,20170412,4066,4069,4070,4060,null,null|20170412180001,20170412190000,20170412,4062,4066,4068,4061,null,null|20170412170001,20170412180000,20170412,4063,4062,4064,4056,null,null|20170412160001,20170412170000,20170412,4062,4063,4064,4058,null,null|20170412150001,20170412160000,20170412,4064,4062,4065,4053,null,null|20170412140001,20170412150000,20170412,4061,4063,4067,4060,null,null|20170412130001,20170412140000,20170412,4067,4061,4069,4058,null,null|20170412120001,20170412130000,20170412,4063,4066,4067,4063,null,null|20170412110001,20170412120000,20170412,4068,4063,4071,4060,null,null|20170412100001,20170412110000,20170412,4072,4068,4076,4065,null,null|","success":true},"success":true};
	                            break;
	                    }
	                    //一秒内取消显示加载提示
	                    $scope.echartConfig.loading = false;

	                    var _obj = kLineHandle(data);

	                    if (_obj.success == false) {
	                        UtilService.tips(_path,_obj.message + '(' + status + ',' + data.code + ')');
	                        $scope.echartConfig.showRetry = true;
	                    } else {
	                        $scope.echartConfig.showRetry = false;
	                        success && success(_obj.xdata, _obj.ydata);
	                    }
	                    /*$.ajax({
	                        type: 'GET',
	                        url: '/proxy',
	                        timeout: 10000,
	                        data: { host: config.hostUrl, url: url_link },
	                        success: function(data, status, jqxhr) {
	                            //一秒内取消显示加载提示
	                            $scope.echartConfig.loading = false;

	                            var _obj = kLineHandle(data);

	                            if (_obj.success == false) {
	                                UtilService.tips(_path,_obj.message + '(' + status + ',' + data.code + ')');
	                                $scope.echartConfig.showRetry = true;
	                            } else {
	                                $scope.echartConfig.showRetry = false;
	                                success && success(_obj.xdata, _obj.ydata);
	                            }
	                        },
	                        error: function(jqXHR, statusText, errorthow) {
	                            $scope.echartConfig.showRetry = true;
	                            $scope.echartConfig.loading = false;
	                            UtilService.tips(_path,'加载失败' + jqXHR.statusText + '(' + jqXHR.status + ')');
	                            error && error(status);
	                        }
	                    });*/
	                };
	            };
	            var checkCurrentContract = function(chart, type, success, error){
	                if(angular.isUndefined($scope.currentContract)){
	                    $scope.getContracts(function(){
	                        $scope.updatEchart(chart, type, success, error);
	                    });
	                    return false;
	                }else{
	                    return true;
	                }
	            };
	            //滑动产品列表后更新数据
	            var change_timer = null;
	            $scope.changed = function(index) {
	                $timeout.cancel(change_timer);
	                change_timer = $timeout(function() {
	                    $scope.currentContract = $scope.Contracts[index];

	                    $scope.updatEchart($scope.echartConfig.echart, $scope.currentObj.type, function(xdata, ydata) {
	                        if ($scope.currentObj.type == 1) {

	                            ChartOptionFactory.setData('timeLine', xdata, ydata);
	                            $scope.option = ChartOptionFactory.get();
	                            $scope.echartConfig.echart.setOption($scope.option.timeLine, true);

	                        } else {

	                            ChartOptionFactory.setData('kLine', xdata, ydata);
	                            $scope.option = ChartOptionFactory.get();
	                            $scope.echartConfig.echart.setOption($scope.option.kLine, true);
	                        }
	                    }, function() {
	                        void 0;
	                    });
	                }, 500);


	            };

	            //输入框必须的初始方法
	            $scope.initBuyCount = { do: null };
	            $scope.initTicketCount = { do: null };


	            /*建仓buy 开始*/

	            var createOrdersModal = function() {
	                    return $ionicModal.fromTemplate(__webpack_require__(52), {
	                        scope: $scope,
	                        animation: 'slide-in-up',
	                    });
	                }

	            //  close it
	            $scope.closeOrdersModal = function() {
	                if (angular.isDefined($scope.OrdersModal)) {
	                    $scope.OrdersModal.hide();
	                }

	            };
	            // Open 
	            $scope.showOrdersModal = function(item, type) {
	                if ($scope.Price[$scope.currentContract.index].data[5] == 'false') {
	                    UtilService.tips(_path,'该合约已休市');
	                } else {

	                    $scope.currentOrder = angular.extend({ type: type, buyCount: 1, ticketCount: 0 }, item);
	                    $scope.currentOrder.ticketId = $scope.ticketsIdFilter($scope.currentOrder.code);

	                    $scope.currentOrder.countTicketsUse = $scope.countTicketsFilter($scope.currentOrder.ticketId);
	                    $ionicScrollDelegate.scrollTop();

	                    if (angular.isUndefined($scope.OrdersModal)) {

	                        $scope.OrdersModal = createOrdersModal();

	                        $scope.OrdersModal.show();

	                    } else {
	                        if (angular.isDefined($scope.OrdersModal)) {
	                            $scope.OrdersModal.show();
	                        }
	                    }
	                }


	            };
	            $scope.$on('$destroy', function() {
	                $scope.OrdersModal.remove();
	            });

	            //体验券下单与资金下单 切换 另外一方设置为0
	            $scope.minusBuyCount = function() {
	                $scope.currentOrder.ticketCount = 0;
	            }
	            $scope.plusBuyCount = function() {
	                $scope.currentOrder.ticketCount = 0;
	            }
	            $scope.minusTicketCount = function() {
	                $scope.currentOrder.buyCount = 0;
	            }
	            $scope.plusTicketCount = function() {
	                $scope.currentOrder.buyCount = 0;
	            }

	            //建仓
	            $scope.buy = function() {
	                //判断是否登录
	                var isLogin = CustomerFactory.checkLogin();
	                if (!isLogin) {
	                    return false;
	                }
	                UtilService.showLoading();

	                $.ajax({
	                    type: 'POST',
	                    url: '/api/v2/storages',
	                    dataType: "json",
	                    timeout: 10000,
	                    headers: {
	                        'Authorization': config.BASIC + $scope.Customer_token
	                    },
	                    data: {
	                        code: $scope.currentOrder.code,
	                        dealCount: $scope.currentOrder.buyCount,
	                        dealDirection: $scope.currentOrder.type,
	                        ticketId: $scope.currentOrder.ticketId,
	                        ticketCount: $scope.currentOrder.ticketCount,
	                    },
	                    success: function(data) {
	                        void 0;
	                        if (true == data.success) {

	                            UtilService.tips(_path,data.message, 1000, function() {}, function() {
	                                $scope.closeOrdersModal();
	                                if (angular.isDefined(data.object.customerInfo)) {
	                                    CustomerFactory.updateCustomer(data.object.customerInfo);
	                                }
	                                //更新持仓单
	                                StoragesFactory.updateStorages();
	                                //参数：1 返回数据，2，当前产品
	                                SetOrderModelFactory.showModal(data.object, $scope.currentOrder);
	                            });
	                        } else {

	                            if (data.code == 0) {
	                                UtilService.hideLoading();
	                                CustomerFactory.showStrongPwdTips();
	                            } else {
	                                UtilService.tips(_path,data.message + "(" + data.code + ")");
	                            }
	                        }
	                    },
	                    error: function(jqXHR, statusText, errorthow) {
	                        UtilService.tips(_path,jqXHR.statusText + '(' + jqXHR.status + ')');
	                    }
	                });
	            }
	            $scope.showTypesheet = function() {
	                $ionicActionSheet.show({
	                    titleText: '方向',
	                    buttons: [{
	                        text: '<i class="icon ion-arrow-up-a"></i> 买涨',
	                        className: "up",
	                    }, {
	                        text: '<i class="icon ion-arrow-down-a"></i> 买跌',
	                        className: "down",
	                    }, ],
	                    destructiveText: '',
	                    cancelText: "取消",
	                    cancel: function() {
	                        void 0;
	                    },
	                    buttonClicked: function(index) {
	                        if (index == 0) {
	                            $scope.currentOrder.type = "UP";
	                        } else {
	                            $scope.currentOrder.type = "DROP";
	                        }
	                        return true;
	                    },
	                    destructiveButtonClicked: function() {
	                        void 0;
	                        return true;
	                    },
	                    cssClass: "app-sheet"
	                });
	            };


	            // 获取最新价格
	            $scope.isUpdate = true;
	            $scope.offline = OfflineFactory.getState();

	            var updatePrice_time = null;
	            var _loopUpdate = function() {
	                if ($scope.isUpdate) {
	                    updatePrice_time = $timeout(function() {
	                        updatePrice();
	                    }, 1000);
	                }
	            };
	            var updatePrice = function() {
	                PriceFactory.updatePrice().then(
	                    function(price) {

	                        if ($scope.currentObj.type == 1) {
	                            if (price[$scope.currentContract.index].data[5] == 'false') {
	                                $scope.echartConfig.showTips = true;
	                            } else {
	                                $scope.echartConfig.showTips = false;
	                            }
	                        }
	                        _loopUpdate();
	                    },
	                    function(data) {
	                        //失败检查网络
	                         Offline.check();
	                        _loopUpdate();

	                    });
	            };


	            //检查是否强密码
	            CustomerFactory.checkStrongPwd();
	            //检查必须数据
	            var init = function() {
	                //1.检查是否登录
	                var isLogin = CustomerFactory.checkLogin();

	                if (isLogin) {
	                    //2.检查是否获取了资金
	                    if (angular.isUndefined($scope.Customer.money)) {
	                        CustomerFactory.getMoneyTicketInfo();
	                    }
	                }

	                //3.检查合约产品
	                if (angular.isArray($scope.Contracts) && 0 == $scope.Contracts[0].product.length) {
	                    $scope.getContracts();
	                }

	                //4.检查体验券信息
	                if (UtilService.isEmptyObject($scope.Tickets)) {
	                    $scope.getTickets();
	                }

	                //5.检查是否有公告未读
	                CustomerFactory.cheakNews();

	            };
	            $scope.$on('$ionicView.beforeEnter', function() {
	                init();

	            });
	            $scope.$on('$ionicView.afterEnter', function() {
	                $scope.isUpdate = true;
	                updatePrice();
	            });
	            $scope.$on('$ionicView.enter', function () {
	              // 显示 tabs
	              $rootScope.hideTabs = false;
	            }); 
	            $scope.$on('$ionicView.beforeLeave', function() {
	                $scope.isUpdate = false;
	                $timeout.cancel(updatePrice_time);
	                $scope.closeOrdersModal();
	            });
	            // 获取最新价格 结束
	        });
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11)/*, 'offline'*/], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config/*, Offline*/) {

	    app.factory("OfflineFactory", function() {
	        var offline  = {state :'up'};

	        // Offline.on("up", function() {
	        //     offline.state = 'up';
	        // });
	        // Offline.on("down", function() {
	        //     offline.state = 'down';
	        // });
	        // Offline.on("reconnect:connecting", function() {
	        //     offline.state = 'reconnectConnecting';
	        // });
	        // Offline.on("reconnect:tick", function() {
	        //     offline.state = 'reconnectTick';
	        // });
	        // Offline.on("reconnect:stopped", function() {
	        //     offline.state = 'econnectStopped';
	        // });
	        // Offline.on("reconnect:failure", function() {
	        //     offline.state = 'reconnectFailure';
	        // });
	        // Offline.on("reconnect:success", function() {
	        //     offline.state = 'reconnectSuccess';
	        // });

	        return {
	            getState: function() {
	                return offline;
	            }
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view class=\"transparent_bg_modal\">\r\n    <!--  <ion-header-bar class=\" bar-positive nav-title-slide-full\">\r\n       <div class=\"buttons\">\r\n           <button class=\"button button-clear icon-left ion-android-arrow-back\" on-tap=\"closeOrdersModal()\"></button>\r\n       </div>\r\n       <h1 class=\"title title-center\">建仓</h1>\r\n       <div class=\"buttons\">\r\n           <button class=\"button button-clear icon \" on-tap=\"showNewTopicsheet()\">提交</button>\r\n       </div>\r\n   </ion-header-bar> -->\r\n    <ion-content class=\"no-header no-footer center_h  padding  \" has-bouncing=\"true\">\r\n        <div class=\"modal_box order_box\">\r\n            <div class=\" list \">\r\n                <label class=\"item item-input row modal_title\">\r\n                    <div class=\"col text-left title_text\">￥{{(currentOrder.margin*currentOrder.buyCount+currentOrder.margin*currentOrder.ticketCount).toFixed(2)}}</div>\r\n                    <div class=\"col text-right\" >\r\n                        建仓价:<span ng-class=\"Price[currentContract.index].priceStatus\" ng-bind=\"Price[currentContract.index].data[0]\" ></span>\r\n                    </div>\r\n                </label>\r\n                <label class=\"item item-input item-icon-right  row modal_subtitle\">\r\n                    <div class=\"col text-left\">手续费:{{(currentOrder.handingCharge*currentOrder.buyCount).toFixed(2) }}元</div>\r\n                    <div class=\"col text-center\" on-tap=\"showTypesheet()\">方向:{{ordertype(currentOrder.type)}}</div>\r\n                    <div class=\"col text-right\">规格:{{currentOrder.name}}</div>\r\n                </label>\r\n                <div class=\"list modal_content\">\r\n                    <label class=\"item item-input row\">\r\n                        <span class=\"col input-label buyCountLabel\">选择数量(手)</span>\r\n                    </label>\r\n                    <label class=\"item item-input  row_input-number\">\r\n                        <input-number init=\"initBuyCount\" max=\"{{currentOrder.dealLimit}}\" min=\"1\" step=\"1\" editable=\"true\" minus=\"minusBuyCount()\" plus=\"plusBuyCount()\" data=\"currentOrder.buyCount\"></input-number>\r\n                    </label>\r\n                    <label class=\"item item-input row\">\r\n                        <div class=\"col input-label text-left ticketLabel\">使用体验券(张)</div>\r\n                        <div class=\"col input-label text-right ticketInfo\">您有({{currentOrder.countTicketsUse}})张体验券</div>\r\n                    </label>\r\n                    <label class=\"item item-input  row_input-number\">\r\n                        <input-number init=\"initTicketCount\" max=\"{{currentOrder.dealLimit}}\" min=\"1\" step=\"1\" editable=\"true\" minus=\"minusTicketCount()\" plus=\"plusTicketCount()\" data=\"currentOrder.ticketCount\"></input-number>\r\n                    </label>\r\n                </div>\r\n                <label class=\"modal_footer \">\r\n                </label>\r\n                <!-- <label class=\"item  buy_btn button button-light\" >\r\n                    购买\r\n                </label> -->\r\n                <div class=\" button-bar\">\r\n                    <a class=\"button cancel_btn\" on-tap=\"closeOrdersModal()\">取消</a>\r\n                    <a class=\"button buy_btn\" on-tap=\"buy()\">建仓</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16), __webpack_require__(29), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {
	    'use strict';

	    app.controller('NewsCtrl', ['$rootScope', '$scope', '$state', 'UtilService', 'NewsFactory', 'CustomerFactory',
	        function($rootScope, $scope, $state, UtilService, NewsFactory,CustomerFactory) {

	            var _path='/tab/news';
	            
	            $scope.news = NewsFactory.getNews();

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };
	            $scope.hasNews = !UtilService.isEmptyObject($scope.news.content);

	            $scope.infinite = function() {
	                void 0;

	                if ($scope.news.last != true) {
	                    NewsFactory.updateNews().then(function() {
	                        $scope.news = NewsFactory.getNews();
	                        $scope.hasNews = !UtilService.isEmptyObject($scope.news.content);
	                        $scope.$broadcast('scroll.infiniteScrollComplete');

	                    }, function() {
	                        void 0;
	                        $scope.$broadcast('scroll.infiniteScrollComplete');

	                    });
	                }

	            }
	            $scope.doRefresh = function() {
	                void 0;
	                NewsFactory.refresh().then(function() {
	                    $scope.news = NewsFactory.getNews();
	                    UtilService.tips(_path,'刷新成功');
	                    $scope.$broadcast('scroll.refreshComplete');
	                }, function(data) {
	                    UtilService.tips(_path,data.message + "(" + data.code + ")");
	                    $scope.$broadcast('scroll.refreshComplete');
	                });

	            }

	            $scope.showNewsDetailModal = function(item) {
	                if (CustomerFactory.checkLogin()) {
	                    NewsFactory.showNewsDetailModal(item);
	                }

	            }
	            $scope.Customer = CustomerFactory.getCustomer();
	            // 监听登录用户登录
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	            });
	            $scope.$on('$ionicView.beforeEnter', function() {

	                CustomerFactory.checkLogin();

	            });
	             $scope.$on('$ionicView.beforeLeave', function() {
	                NewsFactory.closeNewsDetailModal();
	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11),__webpack_require__(10), __webpack_require__(16), __webpack_require__(33), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config,UtilTool) {
	    'use strict';

	    app.controller('OrderHistoryCtrl', ['$rootScope','$scope', '$state', 'UtilService', 'OrderHistoryFactory','CustomerFactory',
	        function($rootScope,$scope, $state, UtilService, OrderHistoryFactory,CustomerFactory) {

	            var _path='/tab/orderHistory';

	            $scope.orderHistory = OrderHistoryFactory.query();
	            // 监听登录用户token
	            $rootScope.$on('token.update', function() {
	                $scope.orderHistory.last = false;
	                $scope.orderHistory = OrderHistoryFactory.query();
	            });

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };
	            $scope.infinite = function() {
	                void 0;
	                if ($scope.orderHistory.last!=true) {
	                    OrderHistoryFactory.update().then(function(data) {
	                        $scope.orderHistory = OrderHistoryFactory.query();
	                        $scope.$broadcast('scroll.infiniteScrollComplete');
	                    }, function(data) {
	                        if(data.code==401){
	                            $scope.orderHistory.last = true;
	                            UtilTool.setCookie('token','');
	                            CustomerFactory.checkLogin();
	                            $scope.$broadcast('scroll.infiniteScrollComplete');
	                        }
	                        void 0;
	                       

	                    });
	                }

	            }
	            $scope.doRefresh = function() {
	                void 0;
	                OrderHistoryFactory.refresh().then(function(){
	                     $scope.orderHistory = OrderHistoryFactory.query();
	                    UtilService.tips(_path,'刷新成功');
	                    $scope.$broadcast('scroll.refreshComplete');
	                },function(data){
	                    UtilService.tips(_path,data.message+"("+data.code+")");
	                    $scope.$broadcast('scroll.refreshComplete');
	                });
	               
	            }
	            $scope.showOrderHistoryDetailModal = function(item){
	                OrderHistoryFactory.showOrderHistoryDetailModal(item);
	            }

	            $scope.$on('$ionicView.beforeLeave', function() {
	                
	                 OrderHistoryFactory.closeOrderHistoryDetailModal();
	            });
	           
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7),__webpack_require__(11),__webpack_require__(10),__webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app,config,UtilTool) {
	    'use strict';

	    app.controller('PasswordCtrl', ['$scope', '$ionicHistory', '$state', 'CustomerFactory','UtilService',
	        function($scope, $ionicHistory, $state, CustomerFactory,UtilService) {
	            
	            var _path='/tab/password';

	            $scope.pwd = {};
	            $scope.reg = config.pwdReg;

	            $scope.updatePwd = function() {

	                if(angular.isUndefined($scope.pwd.oldPwd)||''==$scope.pwd.oldPwd){
	                    UtilService.tips(_path,'请输入旧密码');
	                    return false;
	                }
	                if(angular.isUndefined($scope.pwd.newPwd)||''==$scope.pwd.newPwd){
	                    UtilService.tips(_path,'请输入新密码');
	                    return false;
	                }
	                if(!UtilService.checkPwd($scope.pwd.newPwd)){
	                     UtilService.tips(_path,'新密码格式错误');
	                    return false;
	                }

	                if(angular.isUndefined($scope.pwd.reNewPwd)||''==$scope.pwd.reNewPwd){
	                    UtilService.tips(_path,'请重复新密码');
	                    return false;
	                }

	                if($scope.pwd.newPwd != $scope.pwd.reNewPwd){
	                    UtilService.tips(_path,'重复新密码错误');
	                    return false;
	                }

	                var _token = UtilTool.getCookie('token') || '';

	                UtilService.showLoading();
	                $.ajax({
	                    type: 'PUT',
	                    url: '/api/customers',
	                    dataType: 'json',
	                    headers: {
	                        'Authorization': config.BASIC + _token
	                    },
	                    data: {
	                        oldPassword: $scope.pwd.oldPwd,
	                        newPassword: $scope.pwd.newPwd
	                    },
	                    success: function(data) {

	                        if (true == data.success) {
	                            UtilService.tips(_path,data.message, 1000, function() {}, function() {
	                                $scope.pwd = {};
	                                UtilTool.setCookie('token','');
	                                $state.go('tab.account');
	                                //修改完密码后，需要检查有没有未读公告
	                                CustomerFactory.cheakNews();
	                            });
	                        } else {
	                            UtilService.tips(_path,data.message + "(" + data.code + ")");
	                        }
	                    },
	                    error: function(jqXHR, statusText, errorthow) {
	                        UtilService.tips(_path,jqXHR.statusText + '(' + jqXHR.status + ')');
	                    }
	                });
	            };

	            $scope.goBack = function() {
	                $state.go('tab.personInfo');
	            };

	            $scope.$on('$ionicView.afterEnter', function() {
	                CustomerFactory.checkLogin();
	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(39), __webpack_require__(27), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {
	        'use strict';

	        app.controller('PcRegCtrl', ['$scope', '$ionicHistory', '$state', '$interval', 'UtilService', 'TipsFactory',
	            'CustomerFactory', 'CaptchaFactory',
	            function($scope, $ionicHistory, $state, $interval, UtilService, TipsFactory, CustomerFactory, CaptchaFactory) {

	                var _path = '/tab/pcReg';

	                $scope.register = { protocol: true };
	                $scope.reg = config.pwdReg;
	                $scope.telReg = config.telReg;

	                var imgUrl = "/api/imgcode.jpg?reqId=";
	                $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                $scope.imageCode = imgUrl + $scope.reqId;

	                $scope.UseGeetest = CustomerFactory.getUseGeetest();
	                //刷新图形验证码图片
	                $scope.refreshImageCode = function() {
	                        $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                        $scope.imageCode = imgUrl + $scope.reqId;
	                    }
	                    //注册
	                $scope.doRegister = function() {

	                    var thirdTag = UtilService.getURLPara('thirdTag');

	                    if (angular.isUndefined($scope.register.thirdTag) || '' == $scope.register.thirdTag) {
	                        UtilService.tips(_path, '标签错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.angentId) || '' == $scope.register.angentId) {
	                        UtilService.tips(_path, '请输入经纪人ID');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.nickName) || '' == $scope.register.nickName) {
	                        UtilService.tips(_path, '请输入昵称');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.telNumber) || '' == $scope.register.telNumber) {
	                        UtilService.tips(_path, '请输入手机号码');
	                        return false;
	                    }
	                    if (!UtilService.checkTel($scope.register.telNumber)) {
	                        UtilService.tips(_path, '手机号码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path, '请输入新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path, '新密码格式错误');
	                        return false;
	                    }

	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '请重复新密码');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '重复密码与新密码不一致');
	                        return false;
	                    }

	                    if (angular.isUndefined($scope.register.code) || '' == $scope.register.code) {
	                        UtilService.tips(_path, '请短信验证码');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.protocol) || '' == $scope.register.protocol) {
	                        UtilService.tips(_path, '请阅读微协议');
	                        return false;
	                    }
	                    UtilService.showLoading();

	                    CustomerFactory.register_agentId($scope.register.telNumber, $scope.register.newPwd, $scope.register.code)
	                        .then(function(data) {
	                            if (true == data.success) {
	                                UtilService.tips(_path, data.message, 1000, function() {}, function() {
	                                    $scope.register = {};
	                                    $state.go('tab.account');
	                                });
	                            } else {
	                                UtilService.tips(_path, data.message);
	                            }
	                        }, function(data) {
	                            UtilService.tips(_path, data.message);

	                        });

	                };
	                //返回 个人中心
	                $scope.goBack = function() {
	                    $state.go('tab.account');
	                };
	                $scope.checkProtocol = function() {

	                    $scope.register.protocol = !$scope.register.protocol;
	                };
	                //显示微协议
	                $scope.showProtocol = function() {
	                        //   $scope.register.protocol = !$scope.register.protocol;
	                        var _memberName = CustomerFactory.getMemberName();
	                        if (_memberName == '') {
	                            CustomerFactory.updateMenberName().then(function(data) {
	                                TipsFactory.showProtocolModal(data, function() {
	                                    $scope.register.protocol = true;
	                                });
	                            });
	                        } else {
	                            TipsFactory.showProtocolModal(_memberName, function() {
	                                $scope.register.protocol = true;
	                            });
	                        }
	                    }
	                    //获取拖动图形验证码
	                var showGeetest = function() {
	                    if (angular.isUndefined($scope.register.telNumber) || $scope.register.telNumber == '') {
	                        UtilService.tips(_path, "请输入手机号码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path, '请输入新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path, '新密码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '请重复新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.reNewPwd)) {
	                        UtilService.tips(_path, '重复新密码格式错误');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '新密码跟重复密码不一致');
	                        return false;
	                    }

	                    CaptchaFactory.initSuccessFn(function(validate) {
	                        // 验证成功 返回 对应参数console.log('login modle',validate);
	                        $scope.register.geetest_challenge = validate.geetest_challenge;
	                        $scope.register.geetest_validate = validate.geetest_validate;
	                        $scope.register.geetest_seccode = validate.geetest_seccode;
	                        checkGeetestGetCode();
	                    });
	                    CaptchaFactory.showCaptchaModal($scope.reqId);
	                };

	                //通过拖动图片验证 短信或者语音验证
	                var checkGeetestGetCode = function() {
	                    UtilService.showLoading();
	                    CustomerFactory.checkGeetestGetCode(
	                            $scope.register.geetest_challenge,
	                            $scope.register.geetest_validate,
	                            $scope.register.geetest_seccode,
	                            $scope.register.telNumber,
	                            'REGISTER',
	                            $scope.reqId)
	                        .then(function(data) {
	                            if (data.success == false) {
	                                UtilService.tips(_path, data.message);
	                                $scope.reqId = UtilService.getDateRandom(10000, 99999);

	                            } else {
	                                //语音验证，弹出提示框
	                                if (data.object == 'speech') {
	                                    countDown();
	                                    UtilService.tips(_path, '获取验证码成功，请留意来电播报验证码', 1500);
	                                } else {
	                                    countDown();
	                                    UtilService.tips(_path, data.message + ',请查收短信', 1500);
	                                }

	                            }
	                        }, function(data) {
	                            UtilService.tips(_path, data.message);

	                        });

	                };
	                //发送获取验证码后 倒计时
	                $scope.sendTime = 120;
	                $scope.getCodeText = '获取验证码';
	                var countDown = function() {
	                    var countDown_timer = $interval(function() {

	                        if ($scope.sendTime <= 1) {
	                            $interval.cancel(countDown_timer);
	                            $scope.sendTime = 120;
	                            $scope.getCodeText = '获取验证码';
	                        } else {

	                            $scope.sendTime -= 1;
	                            $scope.getCodeText = '重新发送(' + $scope.sendTime + ')';
	                        }
	                    }, 1000);
	                };
	                //图片验证码 获取 短信或者语音验证
	                var checkImageGetCode = function() {

	                    if (angular.isUndefined($scope.register.telNumber) || $scope.register.telNumber == '') {
	                        UtilService.tips(_path, "请输入手机号码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.imgcode) || $scope.register.imgcode == '') {
	                        UtilService.tips(_path, "请输入图形验证码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path, '请输入新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path, '新密码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '请重复新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.reNewPwd)) {
	                        UtilService.tips(_path, '重复新密码格式错误');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path, '新密码跟重复密码不一致');
	                        return false;
	                    }
	                    UtilService.showLoading();
	                    CustomerFactory.checkImageGetCode($scope.register.telNumber, $scope.imgcode, "REGISTER", $scope.reqId)
	                        .then(function(data) {
	                            if (data.success == false) {
	                                UtilService.tips(_path, data.message);
	                                $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                                $scope.imageCode = imgUrl + $scope.reqId;

	                            } else {
	                                //语音验证，弹出提示框
	                                if (data.object == 'speech') {
	                                    // showSpeechMsg();
	                                    UtilService.tips(_path, '获取验证码成功，请留意来电播报验证码', 1500);
	                                } else {
	                                    UtilService.tips(_path, data.message + ',请查收短信', 1500);
	                                }
	                                countDown();
	                            }
	                        }, function(data) {
	                            UtilService.tips(_path, data.message);
	                        });
	                };
	                $scope.getRegisterCode = function() {
	                    if ($scope.getCodeText != '获取验证码') {
	                        UtilService.tips(_path, '120秒后才能再次获取');
	                        return false;
	                    }
	                    if ($scope.UseGeetest == true) {
	                        showGeetest();
	                    } else {
	                        checkImageGetCode();
	                    }
	                };
	                var init = function() {
	                    //验证 是否获取验证方式 语音验证
	                    if ($scope.UseGeetest == '') {
	                        CustomerFactory.updateUseGeetest().then(function() {
	                            $scope.UseGeetest = CustomerFactory.getUseGeetest();
	                        });
	                    }
	                    if (UtilService.isH5()) {
	                        $state.go('tab.pcReg');
	                    }
	                }
	                $scope.$on('$ionicView.beforeEnter', function() {
	                    init();

	                });
	                $scope.$on('$ionicView.beforeLeave', function() {
	                    TipsFactory.closeProtocolModal();
	                    CaptchaFactory.closeCaptchaModal();
	                });
	            }
	        ]);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {
	    'use strict';

	    app.controller('PersonInfoCtrl', ['$rootScope', '$scope', '$state', '$ionicPopup', 'CustomerFactory', 'UtilService',
	        function($rootScope, $scope, $state, $ionicPopup, CustomerFactory, UtilService) {

	            var _path = '/tab/personInfo';

	            $scope.isPC = UtilService.isH5();

	            $scope.Customer = CustomerFactory.getCustomer();
	            // 监听登录用户信息更新
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	                void 0;
	            });

	            $scope.gotoState = function(state) {
	                $state.go(state);
	            };
	            $scope.doRefresh = function() {
	                CustomerFactory.getUserMsg().then(
	                    function(data) {
	                        $scope.Customer = CustomerFactory.getCustomer();
	                        $scope.$broadcast('scroll.refreshComplete');
	                    },
	                    function(data) {
	                        UtilService.tips(_path, data.message + '(' + data.code + ')',function(){},function(){
	                             $scope.$broadcast('scroll.refreshComplete');
	                        });
	                       
	                    });



	            }
	            //解绑银行卡信息 提示
	            $scope.showPopUnbindBank = function() {

	                var confirmPopup = $ionicPopup.confirm({
	                    title: '解绑银行卡',
	                    template: '是否解绑银行卡？',
	                    cancelText: '取消',
	                    cancelType: 'button-stable',
	                    okText: '确定',
	                    okType: 'button-energized'

	                });
	                confirmPopup.then(function(res) {
	                    if (res) {
	                        unbindBank();
	                    } else {}
	                });
	            };

	            //注销
	            $scope.logout = function() {
	                // 自定义弹窗
	                 $ionicPopup.show({
	                    title: '确认退出',
	                    template: '您确认是否退出？',
	                    buttons: [{
	                        text: '取消',
	                        type: 'button-stable'
	                    }, {
	                        text: '<b>确定</b>',
	                        type: 'button-energized',
	                        onTap: function(e) {

	                            CustomerFactory.logout();
	                            $state.go('tab.home');
	                           
	                        }
	                    }, ]
	                });

	            };
	            var unbindBank = function() {

	                var _token = UtilTool.getCookie('token') || '';
	                if (_token == '') {
	                    CustomerFactory.checkLogin();
	                    return false;
	                }

	                UtilService.showLoading();

	                $.ajax({
	                    type: 'GET',
	                    url: '/api/unbindBankcard',
	                    dataType: "json",
	                    headers: {
	                        'Authorization': config.BASIC + _token
	                    },
	                    success: function(data) {
	                        if (data.success == true) {
	                            var obj = data.object;
	                            if (obj) {
	                                UtilService.tips(_path, "解绑成功", 1500);
	                            } else {
	                                UtilService.tips(_path, "为保证资金安全，账号无提现订单未处理的情况，在银行卡正式绑定 2 周后才能解绑银行卡信息", 3000);
	                            }
	                        }
	                    },
	                    error: function(jqXHR, statusText, errorthow) {
	                        UtilService.tips(_path, jqXHR.statusText + '(' + jqXHR.status + ')');
	                    }
	                });
	            };
	            $scope.IP = '';

	            $scope.$on('$ionicView.beforeEnter', function() {

	                CustomerFactory.checkLogin();

	                //每次进来都查询ip
	                CustomerFactory.getIP().then(function(data) {
	                    $scope.IP = data.Ip;
	                });

	            });

	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(28), __webpack_require__(28), __webpack_require__(35),
	    __webpack_require__(21), __webpack_require__(36),
	    __webpack_require__(38), __webpack_require__(27)
	], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {
	    'use strict';

	    app.controller('PositionCtrl', ['$rootScope', '$scope', '$ionicPopup', '$ionicModal', '$timeout',
	        '$ionicScrollDelegate', '$location',
	        'SetOrderModelFactory', 'StoragesFactory', 'PriceFactory', 'ContractFactory', 'UtilService',
	        'TEMPLATE', 'TickesFactory', 'CustomerFactory',
	        function($rootScope, $scope, $ionicPopup, $ionicModal, $timeout, $ionicScrollDelegate, $location, SetOrderModelFactory,
	            StoragesFactory, PriceFactory, ContractFactory, UtilService, TEMPLATE, TickesFactory, CustomerFactory) {

	            var _path = '/tab/position';

	            $scope.Price = PriceFactory.getPrice();
	            $scope.Storages = StoragesFactory.getStorages();
	            $scope.products = ContractFactory.getProduct();
	            if (UtilService.isEmptyObject($scope.products)) {
	                ContractFactory.updateContracts().then(function(data) {
	                    //获取失败需要重新获取
	                    $scope.products = ContractFactory.getProduct();
	                });
	            }

	            $scope.Tickets = TickesFactory.getTickets();
	            //体验券对应的产品
	            if (UtilService.isEmptyObject($scope.Tickets)) {
	                TickesFactory.updateTickets().then(function() {
	                    $scope.Tickets = TickesFactory.getTickets();
	                });
	            }


	            $scope.Storages_CalPro = [];

	            //计算盈亏
	            var sumCalPro = function() {
	                var _s = $scope.Storages.content;
	                var _all = 0;
	                var _all_status = 'up';

	                for (var i = 0; i < _s.length; i++) {
	                    var _obj = _s[i];
	                    var _isUp = _obj.dealDirection == 'UP' ? 1 : -1;

	                    var _p = $scope.products[_obj.contractCode];

	                    var plRate = _p.plRate;
	                    var newSP = newSP = $scope.Price[_p.dataType].data[0];

	                    if (angular.isUndefined(newSP)) {
	                        continue;
	                    }
	                    var plUnit = _p.plUnit;

	                    var calpro = UtilService.CalPro(newSP, _obj.buyingRate, _obj.dealCount + _obj.usedTicketCount, plRate, plUnit, _isUp);
	                    calpro = Number(calpro).toFixed(2); //保留2位小数
	                    _all += Number(calpro);
	                    var _status = "up";
	                    if (calpro < 0) {
	                        _status = 'down';
	                    } else {
	                        calpro = '+' + calpro;
	                        _status = 'up';
	                    }
	                    $scope.Storages_CalPro[_obj.id] = { data: calpro, status: _status };
	                }
	                _all = _all.toFixed(2); //保留2位小数
	                if (_all < 0) {
	                    _all_status = 'down';
	                } else {
	                    _all = '+' + _all;
	                    _all_status = 'up';
	                }
	                $scope.Storages_CalPro['all'] = { data: _all, status: _all_status };

	            };
	            //处理平仓
	            var doSale = function(storageId) {

	                    var _token = UtilTool.getCookie('token') || '';
	                    UtilService.showLoading();
	                    $.ajax({
	                        type: 'PUT',
	                        url: '/api/storages',
	                        dataType: "json",
	                        timeout: 10000,
	                        headers: {
	                            'Authorization': config.BASIC + _token
	                        },
	                        data: {
	                            storageId: storageId
	                        },
	                        success: function(data) {
	                            if (true == data.success) {

	                                StoragesFactory.removeStoragesById(storageId);

	                                CustomerFactory.getMoneyTicketInfo();
	                                UtilService.tips(_path, data.message, 1000, function() {}, function() {
	                                    UtilService.hideLoading();
	                                    $scope.doSalePopup.close();
	                                    //如果是当前订单详情 则关闭
	                                    $scope.closePositionDetailModal();
	                                });
	                            } else {
	                                if (data.status == 401) {
	                                    CustomerFactory.updateToken('')
	                                    CustomerFactory.checkLogin();
	                                } else {
	                                    UtilService.tips(_path, data.message);
	                                }
	                                $scope.doSalePopup.close();
	                            }
	                        },
	                        error: function(jqXHR, statusText, errorthow) {
	                            UtilService.tips(_path, jqXHR.statusText + '(' + jqXHR.status + ')');
	                        }
	                    });
	                }
	                // 平仓提示框
	            $scope.tapSale = function(name, storageId) {

	                // 自定义弹窗
	                $scope.doSalePopup = $ionicPopup.show({
	                    title: '平仓确认',
	                    template: '规格:' + name + ',是否平仓？',
	                    buttons: [{
	                        text: '取消',
	                        type: 'button-stable'
	                    }, {
	                        text: '<b>确定</b>',
	                        type: 'button-energized',
	                        onTap: function(e) {

	                            doSale(storageId);
	                            e.preventDefault();
	                        }
	                    }, ]
	                });
	            };


	            /*订单详情 开始*/
	            $scope.PositionDetailModal = $ionicModal.fromTemplate(__webpack_require__(59), {
	                scope: $scope,
	                animation: 'slide-in-up'
	            });

	            //  close it
	            $scope.closePositionDetailModal = function() {
	                if (angular.isDefined($scope.PositionDetailModal)) {
	                    $scope.PositionDetailModal.hide();
	                }

	            };

	            var initProLoss = function() {
	                    if ($scope.currentPosition.profit == 0) {
	                        $scope.currentPosition.profitStr = "不设";
	                    } else if ($scope.currentPosition.profit < 1) {
	                        $scope.currentPosition.profitStr = Math.abs($scope.currentPosition.profit * 100) + "%";
	                    }


	                    if ($scope.currentPosition.loss == -1 || $scope.currentPosition.loss == 0) {
	                        $scope.currentPosition.loss = 0;
	                        $scope.currentPosition.lossStr = "不设";
	                    } else if (Math.abs($scope.currentPosition.loss < 1)) {
	                        $scope.currentPosition.lossStr = Math.abs($scope.currentPosition.loss * 100) + "%";
	                    }
	                }
	                // Open 
	            $scope.showPositionDetailModal = function(item) {

	                $scope.currentPosition = item;

	                $scope.closeDate = UtilService.getCloseDate($scope.currentPosition.buyingDate);

	                initProLoss();

	                $ionicScrollDelegate.scrollTop();
	                $scope.PositionDetailModal.show();
	            };

	            //盈亏比例
	            $scope.ratioPosition = function(position) {
	                    var path = $location.path();
	                    if (path != _path) {
	                        return "-";
	                    }
	                    var paySum = 0;
	                    if (angular.isUndefined(position)) {
	                        return "-";
	                    }
	                    var yk = $scope.Storages_CalPro[position.id].data;

	                    if (position.payAmount == 0) {
	                        //体验券
	                        var cmoney = $scope.products[position.contractCode].margin;
	                        paySum = position.usedTicketCount * cmoney;
	                    } else {
	                        paySum = position.payAmount;
	                    }
	                    if (paySum == 0) {
	                        return "-";
	                    }

	                    var _ratio = Number(yk) / Number(paySum) * 100;

	                    return _ratio.toFixed(2) + "%";
	                }
	                //本单余额
	            $scope.balancePosition = function(position) {
	                var balance = 0;
	                if (angular.isUndefined(position)) {
	                    return balance;
	                }
	                var yk = $scope.Storages_CalPro[position.id].data;


	                balance = Number(position.payAmount) + Number(yk);
	                if (balance < 0) {
	                    balance = 0;
	                }
	                return balance.toFixed(3);

	            }
	            $scope.$on('$destroy', function() {
	                $scope.PositionDetailModal.remove();
	            });


	            $scope.updateTap = function(data, currentOrder) {
	                //参数：1 返回数据，2，当前产品
	                SetOrderModelFactory.showModal(data, currentOrder).then(
	                    function(data) {

	                        $scope.currentPosition.profit = data.profit;
	                        $scope.currentPosition.loss = data.loss;
	                        initProLoss();

	                    },
	                    function(data) {
	                        void 0;
	                    });
	            };
	            // 获取最新持仓单
	            $scope.isUpdate = true;
	            var updateStorages_time = null;
	            var _loopUpdate = function() {
	                if ($scope.isUpdate) {
	                    updateStorages_time = $timeout(function() {
	                        updateStorages();
	                    }, 1000);
	                }
	            };
	            var updateStorages = function() {
	                StoragesFactory.updateStorages().then(
	                    function(data) {
	                        //  $scope.Storages = StoragesFactory.getStorages();
	                        _loopUpdate();
	                    },
	                    function(data) {
	                        if (data.code == 401) {
	                            UtilTool.setCookie('token', '');
	                            CustomerFactory.checkLogin();
	                        }
	                        _loopUpdate();

	                    });
	            };

	            //获取最新价格
	            $scope.isUpdatePrice = true;
	            var updatePrice_time = null;
	            var _loopUpdatePrice = function() {
	                if ($scope.isUpdate) {
	                    updatePrice_time = $timeout(function() {
	                        updatePrice();
	                    }, 1000);
	                }
	            };
	            var updatePrice = function() {
	                PriceFactory.updatePrice().then(
	                    function(data) {

	                        sumCalPro();

	                        _loopUpdatePrice();
	                    },
	                    function() {
	                        _loopUpdatePrice();
	                    });
	            };


	            $scope.$on('$ionicView.beforeEnter', function() {
	                CustomerFactory.checkLogin();

	                if (UtilService.isEmptyObject($scope.products)) {
	                    ContractFactory.updateContracts().then(function(data) {
	                        //获取失败需要重新获取
	                        $scope.products = ContractFactory.getProduct();
	                    });
	                }

	            });
	            $scope.$on('$ionicView.afterEnter', function() {
	                $scope.isUpdate = true;
	                updateStorages();

	                $scope.isUpdatePrice = true;
	                updatePrice();

	            });
	            $scope.$on('$ionicView.beforeLeave', function() {
	                $scope.isUpdate = false;
	                $timeout.cancel(updateStorages_time);

	                $scope.isUpdatePrice = false;
	                $timeout.cancel(updatePrice_time);

	                $scope.closePositionDetailModal();

	                if (angular.isDefined($scope.doSalePopup)) {
	                    $scope.doSalePopup.close();
	                }
	                SetOrderModelFactory.closeModal();
	            });
	        }
	    ]);

	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = "<ion-modal-view  class=\"position-detail-view\">\r\n    <ion-header-bar class=\" bar-energized  nav-title-slide-full\">\r\n        \r\n        <h1 class=\"title title-center\">详情</h1>\r\n       <div class=\"buttons\">\r\n            <button class=\" button button-icon icon ion-ios-close-empty\" on-tap=\"closePositionDetailModal()\"></button>\r\n        </div>\r\n    </ion-header-bar>\r\n    <ion-content has-bouncing=\"false\" padding=\"false\" class=\" no-footer dark-bg \" delegate-handle=\"loginScroll\">\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                <div class=\"name\">{{products[currentPosition.contractCode].name}}({{products[currentPosition.contractCode].margin}})元</div>\r\n                <div class=\"yk\">盈亏资金:<span class=\"value\" ng-class=\"Storages_CalPro[currentPosition.id].status\">{{Storages_CalPro[currentPosition.id].data }}元({{ratioPosition(currentPosition)}})</span></div>\r\n                <div class=\"userTicket\" ng-if=\"currentPosition.usedTicket \">\r\n                    <div class=\"valueTicket\">{{Tickets[currentPosition.usedTicketId].displayValue}}元</div>\r\n                    <div class=\"countTicket\">已使用体验券({{currentPosition.usedTicketCount}})</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span>入仓价:<span class=\"value\" ng-bind=\"currentPosition.buyingRate\"></span></span>\r\n                <span class=\"item-note\">本单余额:<span class=\"value\">{{balancePosition(currentPosition)}}元</span></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span>入仓金额:<span class=\"value\" ng-bind=\"currentPosition.payAmount\"></span></span>\r\n                <span class=\"item-note\">方向:<span class=\"value\" ng-bind=\"ordertype(currentPosition.dealDirection)\"></span></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span class=\"salePrice\">平仓价:<span class=\"value\"\r\n                 ng-class=\"Price[products[currentPosition.contractCode].dataType].priceStatus\"\r\n                 ng-bind=\"Price[products[currentPosition.contractCode].dataType].data[0]\">-</span></span>\r\n                <span class=\"item-note\">数量:<span class=\"value\" ng-bind=\"currentPosition.usedTicketCount + currentPosition.dealCount\">-</span></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span>建仓时间:<span class=\"value\" ng-bind=\"date(currentPosition.buyingDate)\">-</span></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <span>订单号:<span class=\"value\" ng-bind=\"currentPosition.id\">-</span></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                <div>止盈:<span class=\"value\" ng-bind=\"currentPosition.profitStr\">-</span></div>\r\n                <div>止损:<span class=\"value\" ng-bind=\"currentPosition.lossStr\">-</span></div>\r\n                <button class=\"button button-small  button-default editeBtn\" on-tap=\"updateTap(currentPosition,products[currentPosition.contractCode])\">修改止盈止损</button>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"saleTips\">\r\n            <div>如果该订单在结算时间({{ date(closeDate,'yyyy-MM-dd')}} 04:00:00)前还未平仓，会被强行平仓</div>\r\n        </div>\r\n        <div class=\"padding\">\r\n            <button class=\"button button-block button-energized\" on-tap=\"tapSale(products[currentPosition.contractCode].name,currentPosition.id)\">\r\n              我要平仓\r\n            </button>\r\n        </div>\r\n        \r\n    </ion-content>\r\n</ion-modal-view>\r\n"

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(16), __webpack_require__(27), __webpack_require__(41)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config) {
	    'use strict';

	    app.controller('RanklistCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$q', 'UtilService', 'CustomerFactory',
	        'RankFactory',
	        function($rootScope, $scope, $state, $timeout, $q, UtilService, CustomerFactory, RankFactory) {

	            var _path='/tab/ranklist';

	            $scope.rank = {
	                headImg: '../images/ufo.png',
	                today: new Date(),
	                ranks: {
	                    'TRADE_RANK': { self: {}, ranks: [], winPercent: 0 },
	                    'PROFIT_LOSS_RANK': { self: {}, ranks: [], winPercent: 0 },
	                    'SHARE_RANK': { self: {}, ranks: [], winPercent: 0 },
	                },
	                currentRank: { type: 'TRADE_RANK', text: '交易' },
	            };
	            $scope.rank.ranks = RankFactory.getRanks();

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };

	            $scope.changeCurrentRank = function(type) {
	                switch (type) {
	                    case 'TRADE_RANK':
	                        $scope.rank.currentRank = { type: 'TRADE_RANK', text: '交易' };
	                        break;
	                    case 'PROFIT_LOSS_RANK':
	                        $scope.rank.currentRank = { type: 'PROFIT_LOSS_RANK', text: '盈利' };
	                        break;
	                    default:
	                        $scope.rank.currentRank = { type: 'TRADE_RANK', text: '交易' };
	                        break;
	                }
	                checkRank(type);
	            }
	            var checkRank = function(type) {
	                if ($scope.rank.ranks[type]['ranks'].length == 0) {
	                    var _timer = $timeout(function() {
	                        UtilService.showLoading();
	                    }, 1000);

	                    RankFactory.update(type).then(function() {
	                        $timeout.cancel(_timer);
	                        UtilService.hideLoading();
	                        $scope.rank.ranks = RankFactory.getRanks();
	                        void 0;
	                    }, function(data) {
	                        $timeout.cancel(_timer);
	                        if (401 == data.code) {
	                            UtilService.hideLoading();
	                            CustomerFactory.checkLogin();
	                        } else {
	                           UtilService.tips(_path,data.message);

	                        }
	                    });
	                }
	            }

	            checkRank($scope.rank.currentRank.type);

	            $scope.doRefresh = function() {

	                var _timer = $timeout(function() {
	                    UtilService.showLoading();
	                }, 1000);

	                RankFactory.update($scope.rank.currentRank.type).then(function() {
	                    $timeout.cancel(_timer);
	                    UtilService.hideLoading();
	                    $scope.rank.ranks = RankFactory.getRanks();
	                   UtilService.tips(_path,'刷新成功')
	                    $scope.$broadcast('scroll.refreshComplete');
	                }, function(data) {
	                    $timeout.cancel(_timer);
	                    if (401 == data.code) {
	                        UtilService.hideLoading();
	                        CustomerFactory.checkLogin();
	                    } else {
	                       UtilService.tips(_path,data.message);

	                    }
	                    $scope.$broadcast('scroll.refreshComplete');
	                });
	            };
	            $scope.$on('$ionicView.beforeEnter', function() {

	            });
	            $scope.$on('$ionicView.beforeLeave', function() {

	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10), __webpack_require__(16), __webpack_require__(39), __webpack_require__(27), __webpack_require__(24)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {
	        'use strict';

	        app.controller('RegisterCtrl', ['$scope', '$ionicHistory', '$state', '$interval', 'UtilService', 'TipsFactory',
	            'CustomerFactory', 'CaptchaFactory',
	            function($scope, $ionicHistory, $state, $interval, UtilService, TipsFactory, CustomerFactory, CaptchaFactory) {

	                var _path='/tab/register';
	                    
	                $scope.register = { protocol: true };
	                $scope.reg = config.pwdReg;
	                $scope.telReg = config.telReg;

	                var imgUrl = "/api/imgcode.jpg?reqId=";
	                $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                $scope.imageCode = imgUrl + $scope.reqId;

	                $scope.UseGeetest = CustomerFactory.getUseGeetest();
	                //刷新图形验证码图片
	                $scope.refreshImageCode = function() {
	                        $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                        $scope.imageCode = imgUrl + $scope.reqId;
	                    }
	                    //注册
	                $scope.doRegister = function() {
	                    if (angular.isUndefined($scope.register.telNumber) || '' == $scope.register.telNumber) {
	                        UtilService.tips(_path,'请输入手机号码');
	                        return false;
	                    }
	                    if (!UtilService.checkTel($scope.register.telNumber)) {
	                        UtilService.tips(_path,'手机号码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path,'请输入密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path,'新密码格式错误');
	                        return false;
	                    }

	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'请重复新密码');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'重复密码与新密码不一致');
	                        return false;
	                    }

	                    if (angular.isUndefined($scope.register.code) || '' == $scope.register.code) {
	                        UtilService.tips(_path,'请短信验证码');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.protocol) || '' == $scope.register.protocol) {
	                        UtilService.tips(_path,'请阅读微协议');
	                        return false;
	                    }
	                    UtilService.showLoading();
	                    CustomerFactory.register_tel($scope.register.telNumber, $scope.register.newPwd, $scope.register.code)
	                        .then(function(data) {
	                            if (true == data.success) {
	                                UtilService.tips(_path,data.message, 1000, function() {}, function() {
	                                    $scope.register = {};
	                                    $state.go('tab.account');
	                                });
	                            } else {
	                                UtilService.tips(_path,data.message);
	                            }
	                        }, function(data) {
	                            if(data.code==401){
	                                UtilService.tips(_path,data.message,1500,function(){},function(){
	                                CustomerFactory.checkLogin();
	                            });
	                            }else{
	                                UtilService.tips(_path,data.message);
	                            }
	                            
	                        });

	                };
	                //返回 个人中心
	                $scope.goBack = function() {
	                    $state.go('tab.account');
	                };
	                $scope.checkProtocol = function(){

	                    $scope.register.protocol = !$scope.register.protocol;
	                };
	                //显示微协议
	                $scope.showProtocol = function() {
	                     //   $scope.register.protocol = !$scope.register.protocol;
	                        var _memberName = CustomerFactory.getMemberName();
	                        if (_memberName == '') {
	                            CustomerFactory.updateMenberName().then(function(data) {
	                                TipsFactory.showProtocolModal(data, function() {
	                                    $scope.register.protocol = true;
	                                });
	                            });
	                        } else {
	                            TipsFactory.showProtocolModal(_memberName, function() {
	                                $scope.register.protocol = true;
	                            });
	                        }
	                    }
	                    //获取拖动图形验证码
	                var showGeetest = function() {
	                    if (angular.isUndefined($scope.register.telNumber) || $scope.register.telNumber == '') {
	                        UtilService.tips(_path,"请输入手机号码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path,'请输入新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path,'新密码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'请重复新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.reNewPwd)) {
	                        UtilService.tips(_path,'重复新密码格式错误');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'新密码跟重复密码不一致');
	                        return false;
	                    }

	                    CaptchaFactory.initSuccessFn(function(validate) {
	                        // 验证成功 返回 对应参数console.log('login modle',validate);
	                        $scope.register.geetest_challenge = validate.geetest_challenge;
	                        $scope.register.geetest_validate = validate.geetest_validate;
	                        $scope.register.geetest_seccode = validate.geetest_seccode;
	                        checkGeetestGetCode();
	                    });
	                    CaptchaFactory.showCaptchaModal($scope.reqId);
	                };

	                //通过拖动图片验证 短信或者语音验证
	                var checkGeetestGetCode = function() {
	                    UtilService.showLoading();
	                    CustomerFactory.checkGeetestGetCode(
	                            $scope.register.geetest_challenge,
	                            $scope.register.geetest_validate,
	                            $scope.register.geetest_seccode,
	                            $scope.register.telNumber,
	                            'REGISTER',
	                            $scope.reqId)
	                        .then(function(data) {
	                            if (data.success == false) {
	                                UtilService.tips(_path,data.message);
	                                $scope.reqId = UtilService.getDateRandom(10000, 99999);

	                            } else {
	                                //语音验证，弹出提示框
	                                if (data.object == 'speech') {
	                                    countDown();
	                                    UtilService.tips(_path,'获取验证码成功，请留意来电播报验证码', 1500);
	                                } else {countDown();
	                                    UtilService.tips(_path,data.message + ',请查收短信', 1500);
	                                }

	                            }
	                        }, function(data) {
	                            UtilService.tips(_path,data.message);

	                        });

	                };
	                //发送获取验证码后 倒计时
	                $scope.sendTime = 120;
	                $scope.getCodeText = '获取验证码';
	                var countDown = function() {
	                    var countDown_timer = $interval(function() {

	                        if ($scope.sendTime <= 1) {
	                            $interval.cancel(countDown_timer);
	                            $scope.sendTime = 120;
	                            $scope.getCodeText = '获取验证码';
	                        } else {

	                            $scope.sendTime -= 1;
	                            $scope.getCodeText = '重新发送(' + $scope.sendTime + ')';
	                        }
	                    }, 1000);
	                };
	                //图片验证码 获取 短信或者语音验证
	                var checkImageGetCode = function() {

	                    if (angular.isUndefined($scope.register.telNumber) || $scope.register.telNumber == '') {
	                        UtilService.tips(_path,"请输入手机号码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.imgcode) || $scope.register.imgcode == '') {
	                        UtilService.tips(_path,"请输入图形验证码");
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.newPwd) || '' == $scope.register.newPwd) {
	                        UtilService.tips(_path,'请输入新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.newPwd)) {
	                        UtilService.tips(_path,'新密码格式错误');
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.register.reNewPwd) || '' == $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'请重复新密码');
	                        return false;
	                    }
	                    if (!UtilService.checkPwd($scope.register.reNewPwd)) {
	                        UtilService.tips(_path,'重复新密码格式错误');
	                        return false;
	                    }

	                    if ($scope.register.newPwd != $scope.register.reNewPwd) {
	                        UtilService.tips(_path,'新密码跟重复密码不一致');
	                        return false;
	                    }
	                    UtilService.showLoading();
	                    CustomerFactory.checkImageGetCode($scope.register.telNumber, $scope.imgcode, "REGISTER", $scope.reqId)
	                        .then(function(data) {
	                            if (data.success == false) {
	                                UtilService.tips(_path,data.message);
	                                $scope.reqId = UtilService.getDateRandom(10000, 99999);
	                                $scope.imageCode = imgUrl + $scope.reqId;

	                            } else {
	                                //语音验证，弹出提示框
	                                if (data.object == 'speech') {
	                                    // showSpeechMsg();
	                                    UtilService.tips(_path,'获取验证码成功，请留意来电播报验证码', 1500);
	                                } else {
	                                     UtilService.tips(_path,data.message + ',请查收短信', 1500);
	                                }
	                                countDown();
	                            }
	                        }, function(data) {
	                            UtilService.tips(_path,data.message);
	                        });
	                };
	                $scope.getRegisterCode = function() {
	                    if ($scope.getCodeText != '获取验证码') {
	                        UtilService.tips(_path,'120秒后才能再次获取');
	                        return false;
	                    }
	                    if ($scope.UseGeetest == true) {
	                        showGeetest();
	                    } else {
	                        checkImageGetCode();
	                    }
	                };
	                var init = function() {
	                    //验证 是否获取验证方式 语音验证
	                    if ($scope.UseGeetest == '') {
	                        CustomerFactory.updateUseGeetest().then(function() {
	                            $scope.UseGeetest = CustomerFactory.getUseGeetest();
	                        });
	                    }
	                    if (UtilService.isH5()) {
	                        $state.go('tab.pcReg');
	                    }
	                }
	                $scope.$on('$ionicView.beforeEnter', function() {
	                    init();

	                });
	                $scope.$on('$ionicView.beforeLeave', function() {
	                    TipsFactory.closeProtocolModal();
	                    CaptchaFactory.closeCaptchaModal();
	                });
	            }
	        ]);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(16), __webpack_require__(28), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function (app) {
	    'use strict';

	    app.controller('TabCtrl', ['$rootScope', '$scope', '$location', '$interval', 'UtilService', 'StoragesFactory', 'CustomerFactory',
	        function ($rootScope, $scope, $location, $interval, UtilService, StoragesFactory, CustomerFactory) {

	            $scope.Storages = StoragesFactory.getStorages();

	            var _path = $location.path();
	            if (_path == '/tab/home' || _path == '/tab/position' || _path == '/tab/account') {
	                StoragesFactory.updateStorages();
	            }

	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(10),__webpack_require__(16), __webpack_require__(27), __webpack_require__(38)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config,UtilTool) {
	    'use strict';

	    app.controller('TiketsCtrl', ['$rootScope', '$scope', '$state', 'UtilService',
	        'CustomerFactory', 'TickesFactory',
	        function($rootScope, $scope, $state, UtilService, CustomerFactory, TickesFactory) {
	            
	            var _path='/tab/tikets';

	            $scope.Customer = CustomerFactory.getCustomer();
	            // 监听登录用户信息更新
	            $rootScope.$on('customer.update', function() {
	                $scope.Customer = CustomerFactory.getCustomer();
	                void 0;
	            });

	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };

	            $scope.infinite = function() {
	                if (angular.isUndefined($scope.Customer.money) && (angular.isUndefined($scope.Customer.tikets) || 0 == $scope.Customer.tikets.length)) {
	                    CustomerFactory.getMoneyTicketInfo().then(function(data) {

	                    }, function(data) {
	                        if (data.code == 401) {
	                            UtilTool.setCookie('token', '');
	                            CustomerFactory.checkLogin();
	                            $scope.$broadcast('scroll.infiniteScrollComplete');
	                        }

	                    });
	                } else {
	                    $scope.$broadcast('scroll.infiniteScrollComplete');
	                }

	            }
	            $scope.doRefresh = function() {

	                var isLogin = CustomerFactory.checkLogin();
	                if (isLogin) {
	                    CustomerFactory.getMoneyTicketInfo().then(function(data) {
	                        UtilService.tips(_path,'刷新成功');
	                        $scope.$broadcast('scroll.refreshComplete');
	                    }, function(data) {
	                        if (data.code == 401) {
	                            UtilTool.setCookie('token', '');
	                            CustomerFactory.checkLogin();
	                            $scope.$broadcast('scroll.refreshComplete');
	                        }else{
	                            UtilService.tips(_path,data.message+'('+data.code+')');
	                        }

	                    });
	                }

	            }

	            var itemHeight = $("body").width() * 182 / 590;
	            $scope.itemStyle = {
	                "height": itemHeight + 'px',
	            }
	            $scope.$on('$ionicView.beforeEnter', function() {

	                CustomerFactory.checkLogin();

	                $scope.Tickets = TickesFactory.getTickets();
	                //体验券对应的产品
	                if (UtilService.isEmptyObject($scope.Tickets)) {
	                    TickesFactory.updateTickets().then(function() {
	                        $scope.Tickets = TickesFactory.getTickets();
	                    });
	                }

	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7),__webpack_require__(11),__webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app,config) {
	    'use strict';

	    app.controller('TradingRulesCtrl', ['$scope',  '$state','UtilService',
	        function($scope, $state,UtilService) {

	            var setH = function(){
	                var rules_image = $(".rules_image");
	               // var _w_width = $("body").width();
	              //  var _css={"width":_w_width/3,"height":_w_width/3};
	                rules_image.height(rules_image.width());
	            };
	            setH();
	            $scope.goBack = function() {
	                $state.go('tab.account');
	            };


	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7),__webpack_require__(11),__webpack_require__(10),__webpack_require__(16), __webpack_require__(27)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app,config,UtilTool) {
	    'use strict';

	    app.controller('VerifyCtrl', ['$scope', '$ionicHistory', '$state','$stateParams', 'CustomerFactory','UtilService',
	        function($scope, $ionicHistory, $state, $stateParams,CustomerFactory,UtilService) {
	            
	             var _path='/tab/verify';
	             
	            $scope.pwd = {};
	            $scope.reg = config.pwdReg;

	            $scope.updatePwd = function() {

	                if(angular.isUndefined($scope.pwd.newPwd)||''==$scope.pwd.newPwd){
	                    UtilService.tips(_path,'请输入新密码');
	                    return false;
	                }
	                if(!UtilService.checkPwd($scope.pwd.newPwd)){
	                     UtilService.tips(_path,'新密码格式错误');
	                    return false;
	                }

	                if(angular.isUndefined($scope.pwd.reNewPwd)||''==$scope.pwd.reNewPwd){
	                    UtilService.tips(_path,'请重复新密码');
	                    return false;
	                }

	                if($scope.pwd.newPwd != $scope.pwd.reNewPwd){
	                    UtilService.tips(_path,'重复新密码错误');
	                    return false;
	                }

	                UtilService.showLoading();
	                $.ajax({
	                    type: 'PUT',
	                    url: '/api/customers',
	                    dataType: 'json',
	                    data: {
	                        telNumber: $stateParams.tel,
	                        newPassword: $scope.pwd.newPwd,
	                        code: $stateParams.code
	                    },
	                    success: function(data) {

	                        if (true == data.success) {
	                            UtilService.tips(_path,data.message, 1000, function() {}, function() {
	                                $scope.pwd = {};
	                                UtilTool.setCookie('token','');
	                                $state.go('tab.account');
	                            });
	                        } else {
	                            UtilService.tips(_path,data.message + "(" + data.code + ")");
	                        }
	                    },
	                    error: function(jqXHR, statusText, errorthow) {
	                        UtilService.tips(_path,jqXHR.statusText + '(' + jqXHR.status + ')');
	                    }
	                });
	            };

	            $scope.goBack = function() {
	                $state.go('tab.forgetCode');
	            };

	            $scope.$on('$ionicView.afterEnter', function() {
	                void 0;

	                if ( $stateParams.code==null || !$stateParams.tel==null) {
	                   UtilService.tips(_path,'请先短信验证',1500,function(){},function(){
	                        $state.go('tab.forgetCode');
	                    });
	                } else {
	                    return false;
	                }
	                
	            });
	        }
	    ]);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11), __webpack_require__(67), __webpack_require__(10), __webpack_require__(16), __webpack_require__(27),
	        __webpack_require__(68), __webpack_require__(42)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, configData, UtilTool) {

	        'use strict';
	        app.controller('WithdrawalCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$q', '$ionicPopup', '$location','UtilService',
	            'CustomerFactory', 'WithdrawalFactory', 'SelectFactory',
	            function($rootScope, $scope, $state, $timeout, $q, $ionicPopup,$location, UtilService, CustomerFactory, WithdrawalFactory, SelectFactory) {
	                
	                var _path='/tab/withdrawal';

	                $scope.moneyReg = config.moneyReg;
	                $scope.Customer = CustomerFactory.getCustomer();

	                // 监听登录用户登录
	                $rootScope.$on('customer.update', function() {
	                    $scope.Customer = CustomerFactory.getCustomer();
	                    void 0;
	                });

	                $scope.goBack = function() {
	                    $state.go('tab.account');
	                };

	                $scope.withdrawal = { money: '', bindBankcardInfo: false, withdrawMoney: 0, handAmountSwitch: false };

	                //只可以输入数字
	                $scope.changeInput = function() {
	                    if (angular.isDefined($scope.withdrawal.money) && 　$scope.withdrawal.money != '') {
	                        $scope.withdrawal.money = UtilService.getFloat($scope.withdrawal.money);
	                    } else {
	                        $scope.withdrawal.money = '';
	                    }
	                }
	                $scope.checkMoney = function() {
	                    $scope.withdrawal.money = parseInt($scope.withdrawal.money);
	                    if (isNaN($scope.withdrawal.money) || $scope.withdrawal.money < 10) {
	                        UtilService.tips(_path,'请输入数字且最小10元', 2000);
	                        $scope.withdrawal.money = 10;
	                        return false
	                    }else{
	                        return true;
	                    }
	                };

	                var wthdrawal = function() {
	                    if (!$scope.checkMoney()) {
	                       // UtilService.tips(_path,'充值金额异常');
	                        return false;
	                    }

	                    if (!UtilService.checkMoney($scope.withdrawal.money)) {
	                        UtilService.tips(_path,'充值金额异常');
	                        return false;
	                    }

	                    if (UtilTool.isEmptyObject($scope.withdrawal.bankName)) {
	                        UtilService.tips(_path,'银行名称不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.province)) {
	                        UtilService.tips(_path,'省份不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.city)) {
	                        UtilService.tips(_path,'城市不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.blankBranch)) {
	                        UtilService.tips(_path,'银行支行不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.blankCardNum)) {
	                        UtilService.tips(_path,'银行卡号不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.blankUseName)) {
	                        UtilService.tips(_path,'持卡人姓名不能为空');
	                        return false;
	                    }
	                    if (UtilTool.isEmptyObject($scope.withdrawal.password)) {
	                        UtilService.tips(_path,'密码不能为空');
	                        return false;
	                    }

	                    UtilService.showLoading();

	                    WithdrawalFactory.wthdrawal(
	                        $scope.withdrawal.money,
	                        $scope.withdrawal.bankName,
	                        $scope.withdrawal.province,
	                        $scope.withdrawal.city,
	                        $scope.withdrawal.blankBranch,
	                        $scope.withdrawal.blankCardNum,
	                        $scope.withdrawal.blankUseName,
	                        $scope.withdrawal.password
	                    ).then(function(data) {

	                        UtilService.hideLoading();
	                        if (data.success) {
	                            //获取最新余额
	                            CustomerFactory.getMoneyTicketInfo();
	                            $scope.withdrawal.password ='';
	                            $scope.withdrawal.password_temp = '';
	                            var withdrawal_pop = $ionicPopup.alert({
	                                title: '提现成功',
	                                subTitle: '提现金额:' + data.object.amount + '元',
	                                template: '提现金额将会在二个工作日内转至您的银行账户',
	                                okText: '确定', // String (默认: 'OK')。OK按钮的文字。
	                                okType: 'button-energized', // String (默认: 'button-positive')。OK按钮的类型
	                                cssClass: "app-show"
	                            });
	                            withdrawal_pop.then(function(re) {
	                                if (re) {
	                                  //  $location.path('/home');
	                                  $state.go('tab.home');
	                                }
	                            })
	                        } else {
	                            $scope.withdrawal.password ='';
	                            $scope.withdrawal.password_temp = '';
	                            
	                            UtilService.tips(_path,data.message + '(' + data.code + ')');
	                        }

	                    }, function(data) {
	                        UtilService.tips(_path,data.message);
	                    });
	                };

	                $scope.selectBranch = function() {

	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }

	                    // 自定义弹窗
	                   $scope.pop= $ionicPopup.show({
	                        template: '<input type="text" class="withdrawal_pop" ng-model="withdrawal.blankBranch_temp" placeholder="请输入银行支行">',
	                        title: '银行支行',
	                        scope: $scope,
	                        buttons: [{
	                            text: '取消',
	                            type: 'button-stable'
	                        }, {
	                            text: '<b>确定</b>',
	                            type: 'button-energized',
	                            onTap: function(e) {
	                                if (angular.isDefined($scope.withdrawal.blankBranch_temp)) {
	                                    $scope.withdrawal.blankBranch_temp = UtilService.removeAllSpace($scope.withdrawal.blankBranch_temp);
	                                }
	                                if (!$scope.withdrawal.blankBranch_temp) {
	                                    e.preventDefault();
	                                } else {
	                                    $scope.withdrawal.blankBranch = $scope.withdrawal.blankBranch_temp;
	                                    return $scope.withdrawal.blankBranch_temp;
	                                }
	                            }
	                        }, ]
	                    });

	                };
	                $scope.selectBlankCardNum = function() {
	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }
	                    // 自定义弹窗
	                    $scope.pop=$ionicPopup.show({
	                        template: '<input type="text" class="withdrawal_pop" ng-model="withdrawal.blankCardNum_temp" placeholder="请输入银行卡号">',
	                        title: '银行卡号',
	                        scope: $scope,
	                        buttons: [{
	                            text: '取消',
	                            type: 'button-stable'
	                        }, {
	                            text: '<b>确定</b>',
	                            type: 'button-energized',
	                            onTap: function(e) {
	                                if (angular.isDefined($scope.withdrawal.blankCardNum_temp)) {
	                                    $scope.withdrawal.blankCardNum_temp = UtilService.removeAllSpace($scope.withdrawal.blankCardNum_temp);
	                                }
	                                if (!$scope.withdrawal.blankCardNum_temp) {
	                                    e.preventDefault();
	                                } else {
	                                    if (UtilService.checkBlankCardNum($scope.withdrawal.blankCardNum_temp)) {
	                                        $scope.withdrawal.blankCardNum = $scope.withdrawal.blankCardNum_temp;
	                                        return $scope.withdrawal.blankCardNum_temp;
	                                    } else {
	                                        UtilService.tips(_path,'银行卡号需全部为数字');
	                                        e.preventDefault();
	                                    }


	                                }
	                            }
	                        }, ]
	                    });

	                };
	                $scope.selectBlankUseName = function() {
	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }
	                    // 自定义弹窗
	                    $scope.pop=$ionicPopup.show({
	                        template: '<input type="text" class="withdrawal_pop" ng-model="withdrawal.blankUseName_temp" placeholder="请输入持卡人姓名">',
	                        title: '姓名',
	                        scope: $scope,
	                        buttons: [{
	                            text: '取消',
	                            type: 'button-stable'
	                        }, {
	                            text: '<b>确定</b>',
	                            type: 'button-energized',
	                            onTap: function(e) {
	                                if (angular.isDefined($scope.withdrawal.blankUseName_temp)) {
	                                    $scope.withdrawal.blankUseName_temp = UtilService.removeAllSpace($scope.withdrawal.blankUseName_temp);
	                                }
	                                if (!$scope.withdrawal.blankUseName_temp) {
	                                    e.preventDefault();
	                                } else {
	                                    $scope.withdrawal.blankUseName = $scope.withdrawal.blankUseName_temp;
	                                    return $scope.withdrawal.blankUseName_temp;
	                                }
	                            }
	                        }, ]
	                    });

	                };

	                $scope.selectBbankName = function() {
	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }
	                    SelectFactory.showSelectModal(configData.bankList(), $scope.withdrawal.bankName, function(value) {
	                        $scope.withdrawal.bankName = value;
	                        SelectFactory.closeSelectModal();
	                    });
	                };
	                $scope.selectProvince = function() {
	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }
	                    SelectFactory.showSelectModal(configData.provinceList(), $scope.withdrawal.province, function(value) {
	                        $scope.withdrawal.province = value;
	                        $scope.withdrawal.cityList = configData.cityList(value);

	                        $scope.withdrawal.city = '';

	                        SelectFactory.closeSelectModal();

	                    });
	                };
	                $scope.selectCity = function() {
	                    if ($scope.withdrawal.bindBankcardInfo) {
	                        return false;
	                    }
	                    if (angular.isUndefined($scope.withdrawal.province) || (angular.isArray($scope.withdrawal.province) && $scope.withdrawal.province.length == 0)) {
	                        UtilService.tips(_path,'请先选择省份');
	                        return false;
	                    }
	                    SelectFactory.showSelectModal($scope.withdrawal.cityList, $scope.withdrawal.city, function(value) {
	                        $scope.withdrawal.city = value;
	                        SelectFactory.closeSelectModal();
	                    });
	                };
	                $scope.checkPassword = function() {
	                    // 自定义弹窗
	                    $scope.pop=$ionicPopup.show({
	                        template: '<input type="password" class="withdrawal_pop" ng-model="withdrawal.password_temp" placeholder="请输入交易密码">',
	                        title: '交易密码',
	                        subTitle: '提现金额:' + $scope.withdrawal.money,
	                        scope: $scope,
	                        buttons: [{
	                            text: '取消',
	                            type: 'button-stable',
	                            onTap: function(e) {
	                                $scope.withdrawal.password = '';
	                            }
	                        }, {
	                            text: '<b>确定</b>',
	                            type: 'button-energized',
	                            onTap: function(e) {
	                                if (!$scope.withdrawal.password_temp) {
	                                    e.preventDefault();
	                                } else {
	                                    $scope.withdrawal.password = $scope.withdrawal.password_temp;
	                                    wthdrawal();
	                                    return $scope.withdrawal.password;
	                                }
	                            }
	                        }, ],
	                        cssClass:'app-show'
	                    });
	                                    };
	                
	                var withdrawalRule = function() {
	                    var deferred = $q.defer();
	                    var _timer = $timeout(function() {
	                        UtilService.showLoading();
	                    }, 1000);

	                    WithdrawalFactory.withdrawalRule().then(function(data) {
	                        $timeout.cancel(_timer);

	                        if (data.success) {
	                            if (data.object.outtime == false) {
	                                deferred.reject();
	                                UtilService.tips(_path,'非提现时间', 2000, function() {}, function() {
	                                    $state.go('tab.account');
	                                }, false);
	                            } else {
	                                //  会员承担提现手续费开关:0关  1开
	                                if (data.object.handAmountSwitch) {
	                                    $scope.withdrawal.handAmountSwitch = true;
	                                }
	                                if (angular.isDefined(data.object.bindBankcardInfo)) {
	                                    var info = data.object.bindBankcardInfo;
	                                    $scope.withdrawal.bindBankcardInfo = true;
	                                    if (info) {
	                                        $scope.withdrawal.bankName = info.blank;
	                                        $scope.withdrawal.blankBranch = info.blankBranch;
	                                        $scope.withdrawal.blankCardNum = info.blankCardNum;
	                                        $scope.withdrawal.blankUseName = info.blankUseName;
	                                        $scope.withdrawal.city = info.city;
	                                        $scope.withdrawal.province = info.province;
	                                    }
	                                }


	                                UtilService.hideLoading();
	                                deferred.resolve();
	                            }
	                        } else {
	                            //获取接口数据异常 接口处理promise：resolve,也继续充值
	                            deferred.resolve();
	                            if (data.code == 401) {
	                                CustomerFactory.checkLogin();
	                            } else {
	                                UtilService.tips(_path,data.message + '(' + data.code + ')');

	                            }
	                        }
	                    }, function(data) {
	                        $timeout.cancel(_timer);
	                        //获取接口失败 接口处理promise：reject,重新获取
	                        deferred.reject();
	                        UtilService.lipsLink('获取参数失败' + data.message + ',点击重试', $rootScope, function() {
	                            queryRechargeRule();
	                        });
	                    });


	                    return deferred.promise;

	                };
	                var getWithdrawMoney = function() {
	                    var deferred = $q.defer();
	                    var _timer_getWithdrawMoney = $timeout(function() {
	                        UtilService.showLoading();
	                    }, 1000);

	                    WithdrawalFactory.getWithdrawMoney().then(function(data) {
	                        $timeout.cancel(_timer_getWithdrawMoney);
	                        if (data.success) {
	                            deferred.resolve();
	                            $scope.withdrawal.withdrawMoney = data.object;
	                        } else {
	                            //获取接口数据异常 接口处理promise：resolve,也继续充值
	                            deferred.resolve();
	                            if (data.code == 401) {
	                                CustomerFactory.checkLogin();
	                            } else {
	                                deferred.reject();
	                                UtilService.lipsLink(_path,'获取资金失败' + data.message + ',点击重试', $rootScope, function() {
	                                    getWithdrawMoney();
	                                });

	                            }
	                        }
	                    }, function(data) {
	                        $timeout.cancel(_timer_getWithdrawMoney);
	                        //获取接口失败 接口处理promise：reject,重新获取
	                        deferred.reject();
	                        UtilService.lipsLink(_path,data.message + ',点击重试', $rootScope, function() {
	                            queryRechargeRule();
	                        });
	                    });


	                    return deferred.promise;

	                };
	                //检查必须数据
	                var init = function() {
	                    //1.检查是否登录
	                    var isLogin = CustomerFactory.checkLogin();

	                    if (isLogin) {
	                        //2.检查是否获取了资金
	                        if (angular.isUndefined($scope.Customer.money)) {
	                            CustomerFactory.getMoneyTicketInfo();
	                        }
	                    }

	                    //3.检查是否有公告未读
	                    CustomerFactory.cheakNews();

	                };

	                $scope.$on('$ionicView.beforeEnter', function() {
	                    init();
	                    withdrawalRule().then(function() {
	                        getWithdrawMoney();
	                    });

	                });
	                $scope.$on('$ionicView.beforeLeave', function() {
	                    UtilService.hideLoading();
	                    if(angular.isDefined($scope.pop)){
	                        $scope.pop.close();
	                    }
	                    SelectFactory.closeSelectModal();
	                    
	                });
	            }
	        ]);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	    'use strict';

	    var bank = [
	        '中国银行',
	        '中国工商银行',
	        '中国农业银行',
	        '中国建设银行',
	        '交通银行',
	        '招商银行',
	        '广发银行',
	        '中国邮政储蓄银行',
	        '招商银行',
	        '兴业银行',
	        '平安银行',
	        '中国光大银行',
	        '华夏银行',
	        '上海浦东发展银行'
	    ];


	    var province = [
	        "北京", "上海", "天津", "重庆", "浙江", "江苏", "广东", "福建", "湖南", "湖北", "辽宁",
	        "吉林", "黑龙江", "河北", "河南", "山东", "陕西", "甘肃", "新疆", "青海", "山西", "四川",
	        "贵州", "安徽", "江西", "云南", "内蒙古", "西藏", "广西", "宁夏", "海南", "香港", "澳门", "台湾"
	    ];

	    //定义数组,存储城市信息
	    var city = {
	        'beijing': ["东城区", "西城区", "海淀区", "朝阳区", "丰台区", "石景山区", "通州区", "顺义区", "房山区", "大兴区", "昌平区", "怀柔区", "平谷区", "门头沟区", "延庆县", "密云县"],
	        'shanghai': ["浦东新区", "徐汇区", "长宁区", "普陀区", "闸北区", "虹口区", "杨浦区", "黄浦区", "卢湾区", "静安区", "宝山区", "闵行区", "嘉定区", "金山区", "松江区", "青浦区", "南汇区", "奉贤区", "崇明县"],
	        'tianjing': ["东丽", "北辰", "北辰", "南开", "和平", "和平", "塘沽", "大港", "宁河", "宁河", "宝坻", "武清", "武清", "汉沽", "河东", "河东", "河北", "河北", "河西", "津南", "津南", "滨海新区", "红桥", "蓟县", "西青", "西青", "静海"],
	        'chongqing': ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "渝北区", "巴南区", "涪陵区", "綦江区", "大足区", "长寿区", "江津区", "合川区", "永川区", "南川区", "铜梁区", "璧山区", "潼南区", "荣昌区", "万州区", "梁平县", "城口县", "丰都县", "垫江县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "黔江区", "武隆县", "石柱土家族自治县", "秀山土家族苗族自治县", "酉阳土家族苗族自治县", "彭水苗族土家族自治县", "巫溪县", "万盛区", "双桥区"],
	        'jiangsu': ["南京", "南通", "宿迁", "常州", "徐州", "扬州", "无锡", "泰州", "淮安", "盐城", "胥浦", "苏州", "连云港", "镇江"],
	        'zhejiang': ["杭州", "宁波", "温州", "嘉兴", "湖州", "绍兴", "金华", "衢州", "舟山", "台州", "丽水", "宁波"],
	        'guangdong': ["广州", "韶关", "深圳", "珠海", "汕头", "佛山", "江门", "湛江", "茂名", "肇庆", "惠州", "梅州", "汕尾", "河源", "阳江", "清远", "东莞", "中山", "潮州", "揭阳", "云浮"],
	        'fujiang': ["福州", "厦门", "莆田", "三明", "泉州", "漳州", "南平", "龙岩", "宁德", "平潭"],
	        'hunan': ["长沙", "株洲", "湘潭", "衡阳", "邵阳", "岳阳", "常德", "张家界", "益阳", "郴州", "永州", "怀化", "娄底", "湘西土家苗族自治区"],
	        'hubei': ["仙桃市", "十堰市", "咸宁市", "天门市", "孝感市", "宜昌市", "恩施土家族苗族自治州", "武汉市", "潜江市", "神农架林区", "荆州", "荆门市", "襄阳市", "鄂州市", "随州市", "黄冈", "黄石市"],
	        'liaoning': ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
	        'jilin': ["长春", "吉林", "四平", "辽源", "通化", "白山", "松原", "白城", "延边朝鲜族自治区", "长白山管委会", "梅河口", "公主岭"],
	        'heilongjiang': ["哈尔滨", "齐齐哈尔", "鸡西", "牡丹江", "佳木斯", "大庆", "伊春", "黑河", "大兴安岭", "鹤岗", "双鸭山", "七台河", "绥化", "大兴安岭地区", "绥芬河", "抚远县"],
	        'hebei': ["石家庄", "保定", "唐山", "邯郸", "承德", "廊坊", "衡水", "秦皇岛", "张家口", "邢台", "沧州"],
	        'henan': ["郑州", "洛阳", "商丘", "安阳", "南阳", "开封", "平顶山", "焦作", "濮阳", "新乡", "鹤壁", "许昌", "漯河", "三门峡", "信阳", "周口", "驻马店", "济源"],
	        'shandong': ["济南", "青岛", "菏泽", "淄博", "枣庄", "东营", "烟台", "潍坊", "济宁", "泰安", "威海", "日照", "滨州", "德州", "聊城", "临沂", "莱芜"],
	        'shangxi': ["西安", "宝鸡", "咸阳", "渭南", "铜川", "延安", "榆林", "汉中", "安康", "商洛", "杨凌示范区"],
	        'gansu': ["兰州", "嘉峪关", "金昌", "金川", "白银", "天水", "武威", "张掖", "酒泉", "平凉", "庆阳", "定西", "陇南", "临夏", "合作", "甘南"],
	        'qinghai': ["西宁", "海东地区", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州", "海西蒙古族藏族自治州"],
	        'xinjiang': ["乌鲁木齐", "奎屯", "石河子", "昌吉", "吐鲁番", "库尔勒", "阿克苏", "喀什", "伊宁", "克拉玛依", "塔城", "哈密", "和田", "阿勒泰", "阿图什", "博乐", "博尔塔拉", "巴音郭楞", "克孜勒苏柯尔克孜自治州", "伊犁哈萨克", "阿拉尔", "图木舒克", "五家渠", "北屯", "铁门关", "双河", "可克达拉"],
	        'shanxi': ["太原", "大同", "阳泉", "长治", "晋城", "朔州", "晋中", "运城", "忻州", "临汾", "吕梁"],
	        'sichuan': ["成都", "自贡", "攀枝花", "泸州", "德阳", "绵阳", "广元", "遂宁", "内江", "乐山", "南充", "眉山", "宜宾", "广安", "达州", "雅安", "巴中", "资阳", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"],
	        'guizhou': ["贵阳", "六盘水", "遵义", "安顺", "黔南布依族苗族自治州", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "铜仁", "毕节", "兴义市"],
	        'anhui': ["亳州", "六安", "合肥", "安庆", "亳州市", "宣城", "宿州", "巢湖", "池州", "淮北", "淮南", "滁州", "芜湖", "蚌埠", "铜陵", "阜阳", "马鞍山", "黄山"],
	        'jiangxi': ["南昌", "九江", "景德镇", "萍乡", "新余", "鹰潭", "赣州", "宜春", "上饶", "吉安", "抚州"],
	        'yunnan': ["昆明", "曲靖", "玉溪", "保山", "昭通", "丽江", "普洱", "临沧", "楚雄彝族自治州", "大理白族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州"],
	        'neimenggu': ["呼和浩特", "包头", "乌海", "赤峰", "通辽", "鄂尔多斯", "呼伦贝尔", "巴彦淖尔", "乌兰察布", "兴安盟", "锡林郭勒盟", "阿拉善盟"],
	        'guangxi': ["南宁", "柳州", "桂林", "梧州", "北海", "防城港", "钦州", "贵港", "玉林", "百色", "贺州", "河池", "崇左", "来宾"],
	        'xizang': ["拉萨", "昌都地区", "林芝地区", "山南地区", "日喀则地区", "那曲地区", "阿里地区"],
	        'ningxia': ["银川", "石嘴山", "吴忠", "固原", "中卫"],
	        'hainan': ["海口", "三亚"],
	        'xianggang': ["中西区", "湾仔区", "东区", "南区", "九龙城区", "油尖旺区", "观塘区", "黄大仙区", "深水埗区", "北区", "大埔区", "沙田区", "西贡区", "元朗区", "屯门区", "荃湾区", "葵青区", "离岛区"],
	        'taiwan': ["台北", "高雄", "基隆", "台中", "台南", "新竹", "嘉义"],
	        'aomeng': ["澳门半岛", "氹仔岛", "路环岛"],
	    }

	    function cityfilter(province) {
	        var cityArr = new Array();
	        switch (province) {
	            case "北京":
	                cityArr = city.beijing;
	                break;
	            case "上海":
	                cityArr = city.shanghai;
	                break;
	            case "天津":
	                cityArr = city.tianjing;
	                break;
	            case "重庆":
	                cityArr = city.chongqing;
	                break;
	            case "浙江":
	                cityArr = city.zhejiang;
	                break;
	            case "江苏":
	                cityArr = city.jiangsu;
	                break;
	            case "广东":
	                cityArr = city.guangdong;
	                break;
	            case "福建":
	                cityArr = city.fujiang;
	                break;
	            case "湖南":
	                cityArr = city.hunan;
	                break;
	            case "湖北":
	                cityArr = city.hubei;
	                break;
	            case "辽宁":
	                cityArr = city.liaoning;
	                break;
	            case "吉林":
	                cityArr = city.jilin;
	                break;
	            case "黑龙江":
	                cityArr = city.heilongjiang;
	                break;
	            case "河北":
	                cityArr = city.hebei;
	                break;
	            case "河南":
	                cityArr = city.henan;
	                break;
	            case "山东":
	                cityArr = city.shandong;
	                break;
	            case "陕西":
	                cityArr = city.shangxi;
	                break;
	            case "甘肃":
	                cityArr = city.gansu;
	                break;
	            case "新疆":
	                cityArr = city.xinjiang;
	                break;
	            case "青海":
	                cityArr = city.qinghai;
	                break;
	            case "山西":
	                cityArr = city.shanxi;
	                break;
	            case "四川":
	                cityArr = city.sichuan;
	                break;
	            case "贵州":
	                cityArr = city.guizhou;
	                break;
	            case "安徽":
	                cityArr = city.anhui;
	                break;
	            case "江西":
	                cityArr = city.jiangxi;
	                break;
	            case "云南":
	                cityArr = city.yunnan;
	                break;
	            case "内蒙古":
	                cityArr = city.neimenggu;
	                break;
	            case "西藏":
	                cityArr = city.xizang;
	                break;
	            case "广西":
	                cityArr = city.guangxi;
	                break;
	            case "":
	                cityArr = city.xizang;
	                break;
	            case "宁夏":
	                cityArr = city.ningxia;
	                break;
	            case "海南":
	                cityArr = city.hainan;
	                break;
	            case "香港":
	                cityArr = city.xianggang;
	                break;
	            case "澳门":
	                cityArr = city.aomeng;
	                break;
	            case "台湾":
	                cityArr = city.taiwan;
	                break;
	        }
	        return cityArr;
	    }
	    return {
	        bankList: function() {
	            return bank;
	        },
	        cityList: cityfilter,
	        provinceList:function(){
	            return province;
	        },

	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7), __webpack_require__(11),__webpack_require__(10), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(app, config, UtilTool) {

	    app.factory("WithdrawalFactory", function($q, UtilService) {

	        var wthdrawal = function(amount,blank,province,city,blankBranch,blankCardNum,blankUseName,password) {

	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';
	            if (_token == '') {
	                void 0;
	                deferred.reject({ code: 401 });
	                return deferred.promise;
	            }

	            if (!UtilService.checkMoney(amount)) {
	                deferred.reject({ code: -1, message: '金额参数错误', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(blank)) {
	                deferred.reject({ code: -2, message: '银行名称不能为空', success: false });
	                return deferred.promise;
	            }
	           if (UtilService.isEmptyObject(province)) {
	                deferred.reject({ code: -3, message: '省份不能为空', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(city)) {
	                deferred.reject({ code: -4, message: '城市不能为空', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(blankBranch)) {
	                deferred.reject({ code: -5, message: '支行不能为空', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(blankCardNum)) {
	                deferred.reject({ code: -6, message: '卡号不能为空', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(blankUseName)) {
	                deferred.reject({ code: -7, message: '持卡人姓名不能为空', success: false });
	                return deferred.promise;
	            }
	            if (UtilService.isEmptyObject(password)) {
	                deferred.reject({ code: -8, message: '密码不能为空', success: false });
	                return deferred.promise;
	            }
	            
	           
	            $.ajax({
	                type: 'POST',
	                url: '/api/withdrawals',
	                dataType: "json",
	                timeout: 10000,
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                data: {
	                    amount: amount,
	                    blank: blank,
	                    province: province,
	                    city: city,
	                    blankBranch: blankBranch,
	                    blankCardNum: blankCardNum,
	                    blankUseName: blankUseName,
	                    password: password
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });

	            return deferred.promise;
	        }
	        //充值页面接口
	        var withdrawalRule = function() {

	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                void 0;
	                deferred.reject({code: 401 });
	                return deferred.promise;
	            }

	            $.ajax({
	                type: "get",
	                url: "/api/currency/withdrawalRule",
	                dataType: "json",
	                timeout: 10000,
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, statusText, errorthow) {
	                    deferred.reject({code: -100, message: jqXHR.statusText + '(' + jqXHR.status + ')',object:jqXHR, success:false});
	                }
	            });
	            return deferred.promise;
	        }

	        //可提现金额接口
	        var getWithdrawMoney = function() {

	            var deferred = $q.defer();

	            var _token = UtilTool.getCookie('token') || '';

	            if (_token == '') {
	                void 0;
	                deferred.reject({code: 401 });
	                return deferred.promise;
	            }

	            $.ajax({
	                type: "get",
	                url: "/api/withdraws/limit",
	                dataType: "json",
	                timeout: 10000,
	                headers: {
	                    'Authorization': config.BASIC + _token
	                },
	                success: function(data) {
	                    deferred.resolve(data);
	                },
	                error: function(jqXHR, status, errorthow) {
	                    deferred.reject({ code: -100, message: status + '(' + jqXHR.status + ')', success: false });
	                }
	            });
	            return deferred.promise;
	        }
	        return {
	            wthdrawal: wthdrawal,
	            withdrawalRule:withdrawalRule,
	            getWithdrawMoney:getWithdrawMoney
	        };
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = "<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab's child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-calm  menuTabs \" id=\"tabs\" ng-class=\"{'tabs-item-hide': $root.hideTabs}\">\n\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"首页\" icon-off=\"ion-ios-pulse\" icon-on=\"ion-ios-pulse-strong\" href=\"#/tab/home\">\n    <ion-nav-view name=\"tab-home\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Chats Tab -->\n  <ion-tab title=\"持仓单\" icon-off=\"ion-ios-list-outline\" icon-on=\"ion-ios-list\" href=\"#/tab/position\" badge =\"Storages.content.length\" badge-style=\"badge-assertive\" class=\"border_badge\">\n    <ion-nav-view name=\"tab-position\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Account Tab -->\n  <ion-tab title=\"个人中心\" icon-off=\"ion-ios-person-outline\" icon-on=\"ion-ios-person\" href=\"#/tab/account\">\n    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n"

/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"粤国际微盘\" class=\"home-view\">\n    <div class=\"bar bar-header info_bar\" id=\"home_header\">\n        <div class=\"bar_networkTips {{offline.state}}\" id=\"networkTips\">\n            <div class=\"title\"><i class=\"icon ion-android-alert\"></i>网络不可以用,请检查当前网络</div>\n        </div>\n        <button class=\" button button-small button-default charge_btn\" on-tap=\"goCharge()\">\n            充值\n        </button>\n        <!-- <button class=\" button button-small  button-clear button-light\" >  -->\n        <button class=\"button icon-left  button-clear button-light amount\" ng-class=\"{'ion-ios-reload':!Customer.money}\" on-tap=\"doRefreshMoney()\">\n            ￥{{Customer.money.amount}}\n        </button>\n        <a class=\"button button-small  button-clear button-energized tickets\" on-tap=\"doRefreshMoney()\">体验券({{Customer.tickets.length}})</a>\n        <!--  <div class=\"h1 title\">￥0.00</div> -->\n        <!-- <div class=\"info_bar\">\n           \n        </div> -->\n    </div>\n    <ion-content class=\"home-bg has-header\" id=\"home-bg\" has-bouncing=\"false\" delegate-handle=\"homeScroll\">\n        <div class=\"price_bar\" id=\"price_bar\">\n            <div class=\"row\">\n                <div class=\"col col-50 contact \" ng-class=\"Price[currentContract.index].priceStatus\">\n                    <span class=\"contact_name\" ng-bind=\"currentContract.name\">-</span>\n                    <span ng-show=\"Price[currentContract.index].data[5]=='false'\">休市</span>\n                    <span class=\"new_price\" ng-show=\"Price[currentContract.index].data[5]=='true'\" ng-bind=\"Price[currentContract.index].data[0]\">-</span>\n                    <span class=\"price_icon ion-arrow-{{Price[currentContract.index].priceStatus}}-a\" ng-show=\"Price[currentContract.index].data[5]=='true'\"></span>\n                </div>\n                <div class=\"col col-25\">\n                    <div class=\"highest\">最高:\n                        <span ng-show=\"Price[currentContract.index].data[5]=='true'\" ng-bind=\"Price[currentContract.index].data[3]\">-</span>\n                        <span ng-show=\"Price[currentContract.index].data[5]=='false'\">-</span>\n                    </div>\n                    <div class=\"lowest \">最低:\n                        <span ng-show=\"Price[currentContract.index].data[5]=='true'\" ng-bind=\"Price[currentContract.index].data[4]\">-</span>\n                        <span ng-show=\"Price[currentContract.index].data[5]=='false'\">-</span>\n                    </div>\n                </div>\n                <div class=\"col col-25\">\n                    <div class=\"yesterday\">昨收:\n                        <span ng-show=\"Price[currentContract.index].data[5]=='true'\" ng-bind=\"Price[currentContract.index].data[2]\">-</span>\n                        <span ng-show=\"Price[currentContract.index].data[5]=='false'\">-</span>\n                    </div>\n                    <div class=\"today\">今开:\n                        <span ng-show=\"Price[currentContract.index].data[5]=='true'\" ng-bind=\"Price[currentContract.index].data[1]\">-</span>\n                        <span ng-show=\"Price[currentContract.index].data[5]=='false'\">-</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <echarts class=\"echarts_box\" url=\"kDataUrl\" show-tips=\"echartConfig.showTips\" show-retry=\"echartConfig.showRetry\" loading='echartConfig.loading' type='currentObj.type' updatechart=\"updatEchart(chart,type, success, error)\"></echarts>\n        <product-slide class=\"product_content\" contracts=\"Contracts\" changed=\"changed(index)\" buy=\"showOrdersModal(item,type)\"></product-slide>\n    </ion-content>\n</ion-view>\n"

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"粤国际微盘\" class=\"position-view\">\n    <ion-content class=\"dark-bg \">\n        <div class=\"storage_list list\">\n            <div class=\"storage_item item\" ng-repeat=\"storage in Storages.content track by $index\">\n                <div class=\"info-wrap\" on-tap=\"showPositionDetailModal(storage)\">\n                    <div class=\"yk\" ng-show=\"!Storages_CalPro[storage.id].data\">\n                        <span class=\"icon ion-load-c\"></span>\n                    </div>\n                    \n                    <div class=\"yk\" ng-class=\"Storages_CalPro[storage.id].status\" ng-bind=\"Storages_CalPro[storage.id].data\" ng-show=\"Storages_CalPro[storage.id].data\">-</div>\n                    <div class=\"price_bar\" ng-class=\"Price[products[storage.contractCode].dataType].priceStatus\">\n                        <span class=\"label\">行情</span>\n                        <span class=\"price\">\n                        <i></i>\n                        <em ng-bind=\"Price[products[storage.contractCode].dataType].data[0]\">-</em>\n                      </span>\n                    </div>\n                    <div class=\"storage_info\">\n                        <span class=\"type\">{{storage.dealCount+storage.usedTicketCount}}手{{ordertype(storage.dealDirection) }}</span>\n                        <span class=\"name\">规格:{{products[storage.contractCode].name}}</span>\n                        <span class=\"buyrate\">建仓价:<em>{{storage.buyingRate}}</em></span>\n                    </div>\n                </div>\n                <div class=\"btn-wrap\">\n                    <div class=\"sell-btn\" on-tap=\"tapSale(products[storage.contractCode].name,storage.id)\">平仓</div>\n                </div>\n            </div>\n            <div class=\"emptyTips\" ng-if=\"0==Storages.content.length\">您没有持仓</div>\n        </div>\n    </ion-content>\n    <ion-footer-bar align-title=\"left\" class=\"bar-allCalPro\">\n      <h1 class=\"title\">总盈亏:{{Storages_CalPro['all'].data}}</h1>\n    </ion-footer-bar>\n</ion-view>\n"

/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"粤国际微盘\" class=\"account-view\" show-tabs>\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\n        <div class=\"list \">\n            <div class=\"item item-icon-left item-icon-right news\" on-tap=\"gotoState('tab.news')\">\n                <i class=\"icon\"></i>公告\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n        </div>\n        <div class=\"list \">\n            <div class=\"item item-icon-left item-icon-right cash \" on-tap=\"gotoState('tab.charge')\">\n                <i class=\"icon\">\n                </i>充值\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n            <div class=\"item item-icon-left item-icon-right withdrawal\" on-tap=\"gotoState('tab.withdrawal')\">\n                <i class=\"icon\">\n                </i>提现\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n        </div>\n        <div class=\"list \">\n            <div class=\"item item-icon-left item-icon-right payment_details \" on-tap=\"gotoState('tab.orderHistory')\">\n                <i class=\"icon\">\n                </i>收支明细\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n            <div class=\"item item-icon-left item-icon-right trading_rules\" on-tap=\"gotoState('tab.tradingRules')\">\n                <i class=\"icon\">\n                </i>交易规则\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n            <div class=\"item item-icon-left item-icon-right transaction_history\" on-tap=\"gotoState('tab.dealhistory')\">\n                <i class=\"icon\">\n                </i>交易历史\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n        </div>\n        <div class=\"list \">\n            <div class=\"item item-icon-left item-icon-right experience_volume \" on-tap=\"gotoState('tab.tikets')\">\n                <i class=\"icon account_icon1\">\n                </i>体验券\n                <span class=\"item-note\">{{Customer.tickets.length}}张</span>\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n               \n            </div>\n            <div class=\"item item-icon-left item-icon-right rank\" on-tap=\"gotoState('tab.ranklist')\">\n                <i class=\"icon\">\n                </i>排行榜\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n            <div class=\"item item-icon-left item-icon-right personcenter\" on-tap=\"gotoState('tab.personInfo')\">\n                <i class=\"icon\">\n                </i>个人中心\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\n            </div>\n        </div>\n    </ion-content>\n</ion-view>\n"

/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"修改密码\" class=\"password-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\r\n        <form name=\"updatePwdForm\">\r\n            <div class=\"list has_bg_list\">\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入旧密码\" ng-model=\"pwd.oldPwd\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入新密码\" ng-model=\"pwd.newPwd\"\r\n                     ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"重复新密码\" ng-model=\"pwd.reNewPwd\" \r\n                     ng-pattern=\"reg\" required>\r\n                </label>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <span class=\"pwdTips\">为保障用户资金安全，用户密码必须是8-16位英文字母、数字、字符组合（不能是纯数字）</span>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <button class=\"button button-block button-energized\" on-tap=\"updatePwd()\"  ng-disabled=updatePwdForm.$invalid>确定</button>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"注册\" class=\"register-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\r\n        <form name=\"registerform\">\r\n            <div class=\"list has_bg_list\">\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"tel\" class=\"has_bg_input\" placeholder=\"输入手机号码\" ng-model=\"register.telNumber\" ng-pattern=\"telReg\" required>\r\n                </label>\r\n                <span class=\"list_tips\">密码必须8-16位(字母、数字、字符)组合</span>\r\n                <label class=\"item item-input  item-dark \">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入交易密码\" ng-model=\"register.newPwd\" ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"重复交易密码\" ng-model=\"register.reNewPwd\" ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\" ng-if=\"!UseGeetest\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入图形验证码\" ng-model=\"register.imgcode\" required>\r\n                    <img class=\"imgcode\" ng-src=\"{{imageCode}}\" on-tap=\"refreshImageCode()\"/>\r\n                </label>\r\n\r\n                 <label class=\"item item-input item-dark item50\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <input type=\"text\" class=\"col has_bg_input\" placeholder=\"输入验证码\" ng-model=\"register.code\" required>\r\n                        </div>\r\n                        <div class=\"col right_btn\" on-tap=\"getRegisterCode()\" ng-disabled=\"getCodeText!='获取验证码'\" ng-bind=\"getCodeText\" >获取验证码</div>\r\n                    </div>\r\n                </label>\r\n                <label class=\"item-dark protocol item item-checkbox \" on-tap=\"checkProtocol()\" >\r\n                    <div class=\"checkbox checkbox-input-hidden disable-pointer-events\" >\r\n                        <input type=\"checkbox\" ng-model=\"register.protocol\" value=\"on\">\r\n                        <i class=\"checkbox-icon\" ></i>\r\n                     </div>\r\n                    <div class=\"item-content\">\r\n                    <span class=\"protocolTips\">我已经阅读同意</span>\r\n                    <span class=\"protocol_btn \" on-tap=\"showProtocol()\">微协议</span>\r\n                    </div>\r\n                </label>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <button class=\"button button-block button-energized\" on-tap=\"doRegister()\" ng-disabled=registerform.$invalid>确定</button>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"注册\" class=\"register-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\r\n        <form name=\"registerform\">\r\n            <div class=\"list has_bg_list\">\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"tel\" class=\"has_bg_input\" placeholder=\"输入经纪人ID\" ng-model=\"register.angentId\"  required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"tel\" class=\"has_bg_input\" placeholder=\"输入昵称\" ng-model=\"register.nickName\"  required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"tel\" class=\"has_bg_input\" placeholder=\"输入手机号码\" ng-model=\"register.telNumber\" ng-pattern=\"telReg\" required>\r\n                </label>\r\n                <span class=\"list_tips\">密码必须8-16位(字母、数字、字符)组合</span>\r\n                <label class=\"item item-input  item-dark \">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入交易密码\" ng-model=\"register.newPwd\" ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"重复交易密码\" ng-model=\"register.reNewPwd\" ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\" ng-if=\"!UseGeetest\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入图形验证码\" ng-model=\"register.imgcode\" required>\r\n                    <img class=\"imgcode\" ng-src=\"{{imageCode}}\" on-tap=\"refreshImageCode()\" />\r\n                </label>\r\n                <label class=\"item item-input item-dark item50\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <input type=\"text\" class=\"col has_bg_input\" placeholder=\"输入验证码\" ng-model=\"register.code\" required>\r\n                        </div>\r\n                        <div class=\"col right_btn\" on-tap=\"getRegisterCode()\" ng-disabled=\"getCodeText!='获取验证码'\" ng-bind=\"getCodeText\">获取验证码</div>\r\n                    </div>\r\n                </label>\r\n                <label class=\"item-dark protocol item item-checkbox \" on-tap=\"checkProtocol()\">\r\n                    <div class=\"checkbox checkbox-input-hidden disable-pointer-events\">\r\n                        <input type=\"checkbox\" ng-model=\"register.protocol\" value=\"on\">\r\n                        <i class=\"checkbox-icon\"></i>\r\n                    </div>\r\n                    <div class=\"item-content\">\r\n                        <span class=\"protocolTips\">我已经阅读同意</span>\r\n                        <span class=\"protocol_btn \" on-tap=\"showProtocol()\">微协议</span>\r\n                    </div>\r\n                </label>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <button class=\"button button-block button-energized\" on-tap=\"doRegister()\" ng-disabled=registerform.$invalid>确定</button>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"身份验证\" class=\"forgetCode-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\r\n        <form name=\"forgetCodeform\">\r\n            <div class=\"list has_bg_list\">\r\n                <div class=\"list_tips\">为了您的账户安全,请先进行身份验证</div>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"tel\" class=\"has_bg_input\" placeholder=\"输入手机号码\" ng-model=\"forgetCode.telNumber\" ng-pattern=\"telReg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark item50\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <input type=\"text\" class=\"has_bg_input\" placeholder=\"输入图形验证码\" ng-model=\"forgetCode.imgcode\" required>\r\n                        </div>\r\n                        <img class=\"imgcode col right_btn\" ng-src=\"{{imageUrl}}\" on-tap=\"refreshImageCode()\" />\r\n                    </div>\r\n                </label>\r\n                <label class=\"item item-input item-dark item50\">\r\n                    <div class=\"row\">\r\n                        <div class=\"col\">\r\n                            <input type=\"text\" class=\"col has_bg_input\" placeholder=\"输入验证码\" ng-model=\"forgetCode.code\" required>\r\n                        </div>\r\n                        <div class=\"col  right_btn\" on-tap=\"getCode()\" ng-disabled=\"getCodeText!='获取验证码'\" ng-bind=\"getCodeText\" >获取验证码</div>\r\n                    </div>\r\n                </label>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <button class=\"button button-block button-energized\" on-tap=\"queryCode()\" ng-disabled=forgetCodeform.$invalid>下一步</button>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"重置交易密码\" class=\"password-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"accountScroll\">\r\n        <form name=\"updatePwdForm\">\r\n            <div class=\"list has_bg_list\">\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"输入新密码\" ng-model=\"pwd.newPwd\"\r\n                     ng-pattern=\"reg\" required>\r\n                </label>\r\n                <label class=\"item item-input item-dark\">\r\n                    <input type=\"password\" class=\"has_bg_input\" placeholder=\"重复新密码\" ng-model=\"pwd.reNewPwd\" \r\n                     ng-pattern=\"reg\" required>\r\n                </label>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <span class=\"pwdTips\">为保障用户资金安全，用户密码必须是8-16位英文字母、数字、字符组合（不能是纯数字）</span>\r\n            </div>\r\n            <div class=\"padding\">\r\n                <button class=\"button button-block button-energized\" on-tap=\"updatePwd()\"  ng-disabled=updatePwdForm.$invalid>确定</button>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"公告列表\" class=\"news-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"NewsScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        \r\n         <div class=\" list news\" ng-if=\"hasNews\">\r\n           \r\n            <div class=\"item \" ng-repeat=\"item in news.content track by item.id\"  on-tap=\"showNewsDetailModal(item)\">\r\n                <div class=\"title\">{{item.title}}</div>\r\n                <div class=\"date\">{{date(item.date * 1000)}}</div>\r\n            </div>\r\n        </div>\r\n         <div class=\"emptyTips\" ng-if=\"!hasNews && news.last\">暂无数据</div>\r\n        <ion-infinite-scroll on-infinite=\"infinite()\" distance=\"1%\" ng-show=\"!news.last\" spinner=\"ios\" class=\"wg_spinner\"></ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"收支明细\" class=\"orderHistory-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"orderHistoryScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        <div class=\" list orderHistory\" ng-if=\"0<orderHistory.content.length\">\r\n            <div class=\"item \" ng-repeat=\"item in orderHistory.content track by item.id\" on-tap=\"showOrderHistoryDetailModal(item)\">\r\n                <div class=\"money\" ng-class=\"{up:item.transactionMoney>0,down:item.transactionMoney<=0}\">\r\n                {{ moneyStr(item.transactionMoney,item.transactionType) }}</div>\r\n                <div class=\"type\">{{moneyType(item.transactionMoney,item.transactionType) }}</div>\r\n\r\n                <div class=\"transactionType\">{{transactionType(item.transactionType)}}</div>\r\n                <div class=\"remainingMoney\">{{item.remainingMoney }}</div>\r\n                <div class=\"date\">{{date(item.date)}}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"emptyTips\" ng-if=\"0==orderHistory.content.length && orderHistory.last\">暂无数据</div>\r\n        <ion-infinite-scroll on-infinite=\"infinite()\" distance=\"1%\" ng-if=\"!orderHistory.last\" spinner=\"ios\" class=\"wg_spinner\"></ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"交易规则\" class=\"tradingRules-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"NewsScroll\">\r\n        <div class=\"row\">\r\n            <div class=\"col the_rules \">\r\n                <a href=\"http://minitest.gdiex.com/news/detail/1\" class=\"rules_image\"></a>\r\n                <p>产品规则介绍</p>\r\n            </div>\r\n            <div class=\"col account \">\r\n                <a href=\"http://minitest.gdiex.com/news/detail/2\" class=\"rules_image\"></a>\r\n                <p>帐号绑定注册</p>\r\n            </div>\r\n        </div>\r\n        \r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"交易历史\" class=\"dealhistory-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"dealhistoryScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        <div class=\" list dealhistory\" ng-if=\"0<dealhistory.content.length\">\r\n            <div class=\"item \" ng-repeat=\"item in dealhistory.content track by item.id\" on-tap=\"showDealhistoryDetailModal(item)\">\r\n                <div class=\"money\" ng-class=\"{up:item.profitAndLoss >=0,down:item.profitAndLoss <0}\">\r\n                    {{ moneyStr(item.profitAndLoss,1) }}</div>\r\n                <div class=\"type\">{{ ordertype(item.dealDirection)}}</div>\r\n                <div class=\"sellingType\">{{ storagesStateName(item.sellingType,1)}}({{products[item.contractCode].name}})</div>\r\n                <div class=\"date\">{{date(item.sellingDate)}}</div>\r\n            </div>\r\n        </div>\r\n        <div class=\"emptyTips\" ng-if=\"0==dealhistory.content.length && dealhistory.last\">暂无数据</div>\r\n        <ion-infinite-scroll on-infinite=\"infinite()\" distance=\"1%\" ng-if=\"!dealhistory.last\" spinner=\"ios\" class=\"wg_spinner\"></ion-infinite-scroll>\r\n    </ion-content>\r\n    <ion-footer-bar align-title=\"left\" class=\"bar-count\">\r\n        <div class=\"CountAll\">总手数:{{Customer.dealCountAll || 0}} 总单数:{{dealhistory.totalElements || 0}}</div>\r\n        <div class=\"profitlossAll\">总盈亏:{{Customer.profitlossAll.toFixed(2) || 0.00}}</div>\r\n    </ion-footer-bar>\r\n</ion-view>\r\n"

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"体验券\" class=\"tickets-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"dealhistoryScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        <div class=\" list \" ng-if=\"0<Customer.tickets.length\">\r\n            <div class=\"item \" ng-repeat=\"item in Customer.tickets track by item.id\">\r\n                <div class=\"tickets\" ng-style=\"itemStyle\">\r\n                    <div class=\"displayValue\">{{Tickets[item.ticketId].displayValue}}元体验券 </div>\r\n                    <div class=\"lastUseTime\">有效期 {{ date(item.lastUseTime)}}</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"emptyTips\" ng-if=\"0==Customer.tickets.length \">暂无数据</div>\r\n        <ion-infinite-scroll on-infinite=\"infinite()\" distance=\"1%\" ng-if=\"!Customer.money && 0==Customer.tickets.length\" spinner=\"ios\" class=\"wg_spinner\"></ion-infinite-scroll>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"个人中心\" class=\"personInfo-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"gotoState('tab.account')\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"personInfoScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        <div class=\"list\">\r\n            <div class=\"item\">\r\n                头像\r\n                <span class=\"item-note headimgurl\"><img ng-src=\"{{::Customer.headimgurl}}\" alt=\"头像\"></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                姓名\r\n                <span class=\"item-note nickname value\" ng-bind=\"::Customer.nickname\"></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                性别\r\n                <span class=\"item-note sex value\">{{::sexName(Customer.sex)}}</span>\r\n            </div>\r\n            <div class=\"item\">\r\n                电话\r\n                <span class=\"item-note telNumber value\" ng-bind=\"::Customer.telNumber\"></span>\r\n            </div>\r\n            <div class=\"item\">\r\n                IP\r\n                <span class=\"item-note ip value\" ng-bind=\"IP\"></span>\r\n            </div>\r\n            <div class=\"item  item-icon-right \" on-tap=\"gotoState('tab.password')\">\r\n                修改密码\r\n                <i class=\"icon ion-chevron-right icon-accessory\"></i>\r\n            </div>\r\n            <div class=\"item  item-icon-right unbindBank \" on-tap=\"showPopUnbindBank()\">\r\n                解绑银行卡信息\r\n                <!--  <i class=\"icon ion-chevron-right icon-accessory\"></i> -->\r\n            </div>\r\n            <div class=\"item  item-icon-right logout \" on-tap=\"logout()\" ng-if=\"isPC\">\r\n                退出\r\n                <!--  <i class=\"icon ion-log-out icon-accessory\"></i> -->\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"充值\" class=\"charge-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n        \r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"ChargeScroll\">\r\n        <!--   <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n      </ion-refresher> -->\r\n        <div class=\" list has_bg_list charge\">\r\n            <div class=\"item \">\r\n                <div class=\"nickname\">用户名:{{Customer.nickname}}</div>\r\n            </div>\r\n            <div class=\"item \">\r\n                <div class=\"amount\">用户金额:{{Customer.money.amount}}</div>\r\n                <div class=\"chargeMoney\">充值金额:{{chargeMoney()}}</div>\r\n            </div>\r\n            <label class=\"item item-input inputMoney \">\r\n                <input type=\"text\" class=\"has_bg_input\" placeholder=\"输入充值金额\" ng-model=\"charge.money \" ng-keyup=\"changeInput()\" ng-blur=\"checkMoney()\" ng-pattern=\"moneyReg\">\r\n            </label>\r\n            <div class=\"bar_btn row\">\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==20}\" on-tap=\"selectMoney(20)\">￥20</div>\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==50}\" on-tap=\"selectMoney(50)\">￥50</div>\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==120}\" on-tap=\"selectMoney(120)\">￥120</div>\r\n            </div>\r\n            <div class=\"bar_btn row\">\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==500}\" on-tap=\"selectMoney(500)\">￥500</div>\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==1000}\" on-tap=\"selectMoney(1000)\">￥1000</div>\r\n                <div class=\"col\" ng-class=\"{active:charge.money ==2000}\" on-tap=\"selectMoney(2000)\">￥2000</div>\r\n            </div>\r\n            <div class=\"tips\">\r\n                <p ng-if=\"charge.chargeScale!=1\">每笔收取通道费用0.8%</p>\r\n                <p>每笔最少20元,每笔限额5000元,每天限额两万元</p>\r\n                <a href=\"http://kf.qq.com/touch/sappfaq/151210NZzmuY151210ZRj2y2.html?platform=15&amp;ADTAG=veda.weixinpay.wenti&amp;pass_ticket=D1nDkxCBjLQv6TIOzsZ7D3cvJVjw%2FDPDehOR58jYxVrnicC7Vn1aAmBvDc9GLuPq\" class=\"weixinTips\">微信支付绑卡的银行卡限额说明</a>\r\n                <a href=\"https://static.95516.com/static/help/detail_38.html\" class=\"cardTips\">银联在线支付各支持银行的限额说明</a>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n    <ion-footer-bar align-title=\"left\" class=\"bar-newsReading\">\r\n        <div class=\"button-bar\">\r\n            <a class=\"button buy_btn disable-user-behavior bank-card\" on-tap=\"rechargeUnionpay()\">网银</a>\r\n            <a class=\"button cancel_btn disable-user-behavior bank-weixin\" on-tap=\"rechargeWxpay()\" ng-if=\"isWeixin\">微信</a>\r\n        </div>\r\n    </ion-footer-bar>\r\n</ion-view>\r\n"

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = "<ion-view view-title=\"提现\" class=\"withdrawal-view\" hide-tabs>\r\n    <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n    </ion-nav-bar>\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"withdrawalScroll\">\r\n        <form name=\"withdrawalForm\">\r\n            <div class=\"list withdrawal has_bg_list\">\r\n                <div class=\"item \">\r\n                    <div class=\"amount\">\r\n                        <span class=\"label\">可提现金额:</span>\r\n                        <span class=\"value\">{{withdrawal.withdrawMoney}}</span>\r\n                    </div>\r\n                </div>\r\n                <label class=\"item item-input inputMoney \">\r\n                    <input type=\"text\" class=\"has_bg_input\" placeholder=\"输入提现金额\" ng-model=\"withdrawal.money\" ng-keyup=\"changeInput()\" ng-blur=\"checkMoney()\" ng-pattern=\"moneyReg\" required>\r\n                </label>\r\n                <span class=\"list_tips withdrawalTips\">(每笔钱至少10元;<span ng-if=\"!withdrawal.handAmountSwitch\">每笔收取2元手续费</span>)</span>\r\n                <span class=\"list_tips bindCartTips\">提现成功后将自动绑定银行卡</span>\r\n                <div class=\"list \">\r\n                    <div class=\"item item-icon-left bankName \" on-tap=\"selectBbankName()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">银行信息</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入银行\" disabled=\"disabled\" ng-model=\"withdrawal.bankName\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item item-icon-left provice \" on-tap=\"selectProvince()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">省份</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入省份\" disabled=\"disabled\" ng-model=\"withdrawal.province\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item item-icon-left city \" on-tap=\"selectCity()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">城市</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入城市\" disabled=\"disabled\" ng-model=\"withdrawal.city\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item item-icon-left branch \" on-tap=\"selectBranch()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">银行支行</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入银行支行\" disabled=\"disabled\" ng-model=\"withdrawal.blankBranch\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item item-icon-left bankNumber \" on-tap=\"selectBlankCardNum()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">银行卡号</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入银行卡号\" disabled=\"disabled\" ng-model=\"withdrawal.blankCardNum\" required>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"item item-icon-left blankUseName \" on-tap=\"selectBlankUseName()\">\r\n                        <i class=\"icon\"></i>\r\n                        <div class=\"info\">\r\n                            <div class=\"label\">姓名</div>\r\n                            <input type=\"text\" class=\"value\" placeholder=\"请输入持卡人姓名\" disabled=\"disabled\" ng-model=\"withdrawal.blankUseName\" required>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"withdrawalBtn\">\r\n                    <button class=\"button button-block button-energized\" on-tap=\"checkPassword()\" ng-disabled=withdrawalForm.$invalid>\r\n                        提现\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "<ion-view class=\"ranklist-view\" hide-tabs>\r\n    <!-- <ion-nav-bar class=\"bar-energized\">\r\n        <ion-nav-buttons side=\"left\">\r\n            <a class=\"button button-icon icon ion-ios-arrow-left light\" on-tap=\"goBack()\"></a>\r\n        </ion-nav-buttons>\r\n        \r\n    </ion-nav-bar> -->\r\n    <ion-content class=\"dark-bg\" has-bouncing=\"false\" delegate-handle=\"ChargeScroll\">\r\n        <ion-refresher pulling-text=\"下拉刷新...\" spinner=\"ios\" on-refresh=\"doRefresh()\" class=\"wg_spinner\">\r\n        </ion-refresher>\r\n        <div class=\"backBtn\" on-tap=\"goBack()\"></div>\r\n        <div class=\"reank_title\">\r\n            <div class=\"headimg\">\r\n                <img ng-src=\"{{rank.ranks[rank.currentRank.type].self.headimgurl}}\" class=\"\" alert=\"头像\" />\r\n            </div>\r\n            <div class=\"name\">{{rank.ranks[rank.currentRank.type].self.name}}</div>\r\n            <div class=\"title\">本周{{rank.currentRank.text}}击败全国</div>\r\n            <div class=\"rank_beat\"><span class=\"percent\">{{percenTage(rank.ranks[rank.currentRank.type].winPercent)}}</span>用户</div>\r\n        </div>\r\n        <div class=\"rank_nav\">\r\n            <div class=\"button-bar \">\r\n                <a class=\"button\" ng-class=\"{active:rank.currentRank.type=='TRADE_RANK'}\" on-tap=\"changeCurrentRank('TRADE_RANK')\">交易榜</a>\r\n                <a class=\"button\" ng-class=\"{active:rank.currentRank.type=='PROFIT_LOSS_RANK'}\" on-tap=\"changeCurrentRank('PROFIT_LOSS_RANK')\">盈利榜</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"date\">{{ date(rank.today,'MM月dd日') }}</div>\r\n\r\n        <div class=\"list rank_list\">\r\n            <div class=\"item item-avatar \" ng-repeat=\"item in rank.ranks[rank.currentRank.type].ranks track by $index \" >\r\n                <img ng-src=\"{{item.headimgurl}}\" alt=\"头像\" class=\"headimg\">\r\n                <h2 class=\"name\" ng-bind=\"item.name\"></h2>\r\n                <span class=\"value\" >{{item.value}}元</span>\r\n                <span class=\"rank rank{{item.rank}}\">{{item.rank}}</span>\r\n\r\n            </div>\r\n             <div class=\"item emptyValue\" ng-show=\"rank.ranks[rank.currentRank.type].ranks.length==0\">\r\n               暂无数据\r\n            </div>\r\n             <!--<div class=\"item item-avatar rank2\">\r\n               <img src=\"venkman.jpg\" class=\"headimg\">\r\n               <h2 class=\"name\">Venkman</h2>\r\n               <span class=\"value\">Grammy</span>\r\n                        </div> -->\r\n        </div>\r\n    </ion-content>\r\n</ion-view>\r\n"

/***/ }
/******/ ]);