/**
 * Created by abc on 2015/7/22.
 */
var GameApp = (function (_super) {
    __extends(GameApp, _super);
    function GameApp() {
        _super.call(this);
        console.log("GameApp Hello");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
    }
    var __egretProto__ = GameApp.prototype;
    __egretProto__.addStage = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);
        var game = new Game(this);
    };
    return GameApp;
})(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
