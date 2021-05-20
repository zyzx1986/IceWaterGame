var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Start = (function () {
    function Start() {
        fgui.UIPackage.addPackage("Start"); //因为start包的资源在预加载里加载过 所以可以用addPackage
        // fgui.GRoot.inst.addEventListener("start_demo", this.onDemoStart, this);
        // this._currentDemo = new Start();
        this._view = fgui.UIPackage.createObject("Start", "GameStart").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);
        this._view.getChild("btn_start").addClickListener(function () {
            fgui.GRoot.inst.removeChildren(0, -1, true);
            fgui.GRoot.inst.dispatchEventWith("start_", false, null);
        }, this);
        // fgui.UIPackage.addPackage("Test");
    }
    return Start;
}());
__reflect(Start.prototype, "Start");
//# sourceMappingURL=Start.js.map