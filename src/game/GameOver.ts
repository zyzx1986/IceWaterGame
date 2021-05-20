class GameOver{


    private _view:fgui.GComponent;
    private _score:fgui.GTextField;
    public constructor(){

    }

    public async init(){
        await fgui.UIPackage.loadPackage("GameOverPanel");

        this._view = fgui.UIPackage.createObject("GameOverPanel","GameOver").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);

        this._score = this._view.getChild("txt_score").asTextField;
        this._score.text = "得分："+GameUtil.score+"";

        this._view.getChild("btn_again").addClickListener(()=>{
            console.log("点击再来一次")
            fgui.GRoot.inst.dispatchEventWith("start_", false, null);
            fgui.GRoot.inst.removeChild(this._view);
        },this);
        this._view.getChild("btn_share").addClickListener(()=>{
            console.log("点击分享")
        },this);

    }

}