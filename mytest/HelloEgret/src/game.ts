/**
 * Created by abc on 2015/7/23.
 */
class Game{
    private _root:egret.DisplayObjectContainer;
    public constructor(root:egret.DisplayObjectContainer){
        this._root = root;
        this.createGroupsRect();
        this.createTimer();
        this.startGame();
    }

    private _row:number;
    private _rectRoot:egret.Sprite;
    private _rectGroups:Array<GroupRect>;
    private createGroupsRect(){
        this._rectRoot = new egret.Sprite;
        this._root.addChild(this._rectRoot)
        this._rectGroups=[];
        this._row = Data.getRectRow();

        var groupRect:GroupRect;
        for(var i=0;i<this._row;i++){
            groupRect = new GroupRect();
            groupRect.addEventListener("gameOver",this.gameOver,this);
            groupRect.addEventListener("clickRight",this.nextRow,this);
            this._rectGroups.push(groupRect);
            groupRect.y= Data.getRectWidth()*i;
            this._rectRoot.addChild(groupRect);
        }
        this._rectRoot.y= Data.getStageHeight()-this._rectRoot.height;
    }

    private nextRow(){
        for(var i=0;i<this._row;i++){
            this._rectGroups[i].move();
        }
        Data.score++;
    }

    private gameOverPanel:GameOverPanel;
    private gameOver(){
        this._timerPanel.start();
        if(!this.gameOverPanel){
            this.gameOverPanel  =new GameOverPanel();
            this.gameOverPanel.addEventListener("startGame",this.startGame,this);
        }
        this._root.addChild(this.gameOverPanel);
        this._timerPanel.stop();
    }
    private _timerPanel:TimerPanel;
    private createTimer(){
        this._timerPanel = new TimerPanel();
        this._timerPanel.addEventListener("gameOver",this.gameOver,this);
        this._root.addChild(this._timerPanel);
    }

    private  startGame(){
        Data.score = 0;
        for(var i=0;i<this._row;i++){
            this._rectGroups[i].init();
            this._rectGroups[i].y = Data.getRectWidth()*i;
            this._rectGroups[i]._currentRow = i;
            if(i!=(this._row-1)){
                this._rectGroups[i].createBlackRect();
            }
        }
        this._timerPanel.start();
    }










}















