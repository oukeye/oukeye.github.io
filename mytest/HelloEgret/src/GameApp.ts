/**
 * Created by abc on 2015/7/22.
 */
class GameApp extends egret.DisplayObjectContainer{
    public constructor(){
        super();
        console.log("GameApp Hello");
       this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addStage,this);
    }
    private addStage(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.addStage,this);
        var game  =new Game(this);
    }

}
