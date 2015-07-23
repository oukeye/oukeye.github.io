/**
 * Created by abc on 2015/7/23.
 */
var Game = (function () {
    function Game(root) {
        this._root = root;
        this.createGroupsRect();
        this.createTimer();
        this.startGame();
    }
    var __egretProto__ = Game.prototype;
    __egretProto__.createGroupsRect = function () {
        this._rectRoot = new egret.Sprite;
        this._root.addChild(this._rectRoot);
        this._rectGroups = [];
        this._row = Data.getRectRow();
        var groupRect;
        for (var i = 0; i < this._row; i++) {
            groupRect = new GroupRect();
            groupRect.addEventListener("gameOver", this.gameOver, this);
            groupRect.addEventListener("clickRight", this.nextRow, this);
            this._rectGroups.push(groupRect);
            groupRect.y = Data.getRectWidth() * i;
            this._rectRoot.addChild(groupRect);
        }
        this._rectRoot.y = Data.getStageHeight() - this._rectRoot.height;
    };
    __egretProto__.nextRow = function () {
        for (var i = 0; i < this._row; i++) {
            this._rectGroups[i].move();
        }
        Data.score++;
    };
    __egretProto__.gameOver = function () {
        this._timerPanel.start();
        if (!this.gameOverPanel) {
            this.gameOverPanel = new GameOverPanel();
            this.gameOverPanel.addEventListener("startGame", this.startGame, this);
        }
        this._root.addChild(this.gameOverPanel);
        this._timerPanel.stop();
    };
    __egretProto__.createTimer = function () {
        this._timerPanel = new TimerPanel();
        this._timerPanel.addEventListener("gameOver", this.gameOver, this);
        this._root.addChild(this._timerPanel);
    };
    __egretProto__.startGame = function () {
        Data.score = 0;
        for (var i = 0; i < this._row; i++) {
            this._rectGroups[i].init();
            this._rectGroups[i].y = Data.getRectWidth() * i;
            this._rectGroups[i]._currentRow = i;
            if (i != (this._row - 1)) {
                this._rectGroups[i].createBlackRect();
            }
        }
        this._timerPanel.start();
    };
    return Game;
})();
Game.prototype.__class__ = "Game";
