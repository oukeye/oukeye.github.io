/**
 * Created by abc on 2015/7/23.
 */
var Data = (function () {
    function Data() {
    }
    var __egretProto__ = Data.prototype;
    Data.getRectWidth = function () {
        if (Data._rectWidth == 0) {
            Data._rectWidth = egret.MainContext.instance.stage.stageWidth / 4;
        }
        return Data._rectWidth;
    };
    Data.getRectRow = function () {
        if (Data._rectRow == 0) {
            Data._rectRow = Math.ceil(this.getStageHeight() / Data.getRectWidth()) + 1;
        }
        return Data._rectRow;
    };
    Data.getStageHeight = function () {
        return egret.MainContext.instance.stage.stageHeight;
    };
    Data._rectWidth = 0;
    Data.score = 0;
    Data._rectRow = 0;
    return Data;
})();
Data.prototype.__class__ = "Data";
