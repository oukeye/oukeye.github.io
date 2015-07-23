/**
 * Created by abc on 2015/7/23.
 */
var TimerPanel = (function (_super) {
    __extends(TimerPanel, _super);
    function TimerPanel() {
        _super.call(this);
        this._num = 20;
        this._timers = 20;
        this.draw();
        this.createTimer();
    }
    var __egretProto__ = TimerPanel.prototype;
    __egretProto__.draw = function () {
        this.txt = new egret.TextField();
        this.txt.width = egret.MainContext.instance.stage.stageWidth;
        this.txt.y = 100;
        this.txt.textColor = 0xff0000;
        this.txt.textAlign = egret.HorizontalAlign.CENTER;
        this.txt.text = "20'00''";
        this.addChild(this.txt);
    };
    __egretProto__.createTimer = function () {
        this._timer = new egret.Timer(1000, this._num);
        this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this._timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerCom, this);
    };
    __egretProto__.onTimer = function () {
        this._timers -= 1;
        this.txt.text = this._timers + "'00''";
    };
    __egretProto__.onTimerCom = function () {
        this.txt.text = "00'00''";
        this.dispatchEventWith("gameOver");
    };
    __egretProto__.start = function () {
        this.txt.text = "20'00''";
        this._timers = 20;
        this._timer.reset();
        this._timer.start();
    };
    __egretProto__.stop = function () {
        this._timer.stop();
        this.txt.text = "";
    };
    return TimerPanel;
})(egret.Sprite);
TimerPanel.prototype.__class__ = "TimerPanel";
