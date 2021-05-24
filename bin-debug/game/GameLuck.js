var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameLuck = (function (_super) {
    __extends(GameLuck, _super);
    function GameLuck() {
        return _super.call(this) || this;
    }
    GameLuck.prototype.onInit = function () {
        this.contentPane = fgui.UIPackage.createObject("GameOver", "LuckWin").asCom;
        this.center();
    };
    GameLuck.prototype.onShown = function () {
        // var list: fgui.GList = this.contentPane.getChild("list").asList;
        // list.addEventListener(fgui.ItemEvent.CLICK, this.onClickItem, this);
        // list.itemRenderer = this.renderListItem;
        // list.callbackThisObj = this;
        // list.setVirtual();
        // list.numItems = 45;
    };
    GameLuck.prototype.renderListItem = function (index, obj) {
        obj.icon = "resource/assets/Icons/i" + Math.floor(Math.random() * 10) + ".png";
        obj.text = "" + Math.floor(Math.random() * 100);
    };
    GameLuck.prototype.onClickItem = function (evt) {
        this.contentPane.getChild("n11").asLoader.url = evt.itemObject.icon;
        this.contentPane.getChild("n13").text = evt.itemObject.icon;
    };
    return GameLuck;
}(fgui.Window));
__reflect(GameLuck.prototype, "GameLuck");
//# sourceMappingURL=GameLuck.js.map