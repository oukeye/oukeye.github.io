/**
 * Created by abc on 2015/7/23.
 */
var GroupRect = (function (_super) {
    __extends(GroupRect, _super);
    function GroupRect() {
        _super.call(this);
        this._currentRow = 0;
        this._currentBlackRectIndex = 0;
        this.createRects();
    }
    var __egretProto__ = GroupRect.prototype;
    __egretProto__.createRects = function () {
        this._rects = [];
        for (var i = 0; i < 4; i++) {
            var rect = new Rect();
            this._rects.push(rect);
            rect.x = rect.width * i;
            this.addChild(rect);
            rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickRect, this);
        }
    };
    __egretProto__.onClickRect = function (evt) {
        evt.target.onRectClick();
        if (evt.target.type == RectType.NONCLICKABLE || this._currentRow != (Data.getRectRow() - 2)) {
            this.dispatchEventWith("gameOver");
        }
        else {
            this.dispatchEventWith("clickRight");
        }
    };
    __egretProto__.createBlackRect = function () {
        this.init();
        var n = Math.random();
        if (n >= 0 && n < 0.25) {
            this._currentBlackRectIndex = 0;
        }
        else if (n >= 0.25 && n < 0.5) {
            this._currentBlackRectIndex = 1;
        }
        else if (n >= 0.5 && n < 0.75) {
            this._currentBlackRectIndex = 2;
        }
        else if (n >= 0.75 && n <= 1) {
            this._currentBlackRectIndex = 3;
        }
        this._rects[this._currentBlackRectIndex].type = RectType.CLICKABLE;
    };
    __egretProto__.init = function () {
        for (var i = 0; i < 4; i++) {
            this._rects[i].type = RectType.NONCLICKABLE;
        }
    };
    __egretProto__.move = function () {
        this._currentRow++;
        if (this._currentRow == Data.getRectRow()) {
            this._currentRow = 0;
            this.createBlackRect();
        }
        this.y = this._currentRow * Data.getRectWidth();
    };
    return GroupRect;
})(egret.Sprite);
GroupRect.prototype.__class__ = "GroupRect";
