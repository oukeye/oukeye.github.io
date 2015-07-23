/**
 * Created by abc on 2015/7/23.
 */
var GameOverPanel = (function (_super) {
    __extends(GameOverPanel, _super);
    function GameOverPanel() {
        _super.call(this);
        this.draw();
        this.addEventListener(egret.Event.ADDED, this.showText, this);
    }
    var __egretProto__ = GameOverPanel.prototype;
    __egretProto__.draw = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        this.graphics.beginFill(0x111111, 0.5);
        this.graphics.drawRect(0, 0, w, h);
        this.graphics.endFill();
        this.txt = new egret.TextField();
        this.txt.width = w;
        this.txt.y = 100;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this.txt);
        var btn = new egret.Sprite();
        btn.graphics.beginFill(0x000ff);
        btn.graphics.drawRect(0, 0, 200, 100);
        btn.graphics.endFill();
        btn.width = 200;
        btn.height = 100;
        btn.x = (w - 200) / 2;
        btn.y = (h - 100) / 2;
        this.addChild(btn);
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    __egretProto__.showText = function () {
        this.txt.text = "我努力点击了" + Data.score + "步";
    };
    __egretProto__.startGame = function () {
        this.parent.removeChild(this);
        this.dispatchEventWith("startGame");
    };
    return GameOverPanel;
})(egret.Sprite);
GameOverPanel.prototype.__class__ = "GameOverPanel";
