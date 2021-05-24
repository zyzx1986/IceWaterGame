var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var GamePanel = (function () {
    function GamePanel() {
        this._arr = []; //
        this.len = 9;
        this._str = "person_";
        this._strWet = "personWet_";
        this._clickNum = 0;
        this.accelerator = 120;
        this.personTweenTime = 1000;
        // 出现的速度
        this.speed = 1;
        this.count = 0;
        this.countTime = 0;
        fgui.GRoot.inst.addEventListener("start_go", this.onStart, this);
    }
    GamePanel.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, tempLoad;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fgui.UIPackage.loadPackage("GamePanel")];
                    case 1:
                        _a.sent(); //动态加载资源
                        this._view = fgui.UIPackage.createObject("GamePanel", "GamePanel").asCom;
                        this._view.makeFullScreen();
                        fgui.GRoot.inst.addChild(this._view);
                        this._timeTxt = this._view.getChild("txt_time").asTextField;
                        this._countTxt = this._view.getChild("countNum").asTextField;
                        this._countTxt.text = "";
                        this._arr = [];
                        for (i = 0; i < this.len; i++) {
                            tempLoad = this._view.getChild("load_" + (i + 1)).asLoader;
                            this._arr.push(tempLoad);
                        }
                        console.log("this.arr len==" + this._arr.length);
                        this._waterImage = this._view.getChild("img_water").asImage;
                        this._waterImage.visible = false;
                        this._tran = this._view.getTransition("t0");
                        return [2 /*return*/];
                }
            });
        });
    };
    GamePanel.prototype.playSound = function () {
        //方法1 通过音频放UI里   通过动效的没法停止音乐
        // this._tran.play();
        var _this = this;
        // return;
        //方法2 通过sound load
        this._sound = new egret.Sound();
        this._sound.load("resource/assets/UI/aaaaaa.mp3");
        this._sound.addEventListener(egret.Event.COMPLETE, function () {
            _this._channel = _this._sound.play();
        }, this);
    };
    GamePanel.prototype.onStart = function () {
        GameUtil.score = 0;
        this.speed = 1;
        this.count = 0;
        this._clickNum = 0;
        this._waterImage.visible = false;
        this.doTimeCool();
        this.changePerson();
    };
    GamePanel.prototype.changePerson = function () {
        this.peopleChange();
        egret.stopTick(this.update, this);
        egret.startTick(this.update, this);
    };
    // update函数
    // 控制人物出现速度 + 判断游戏是否结束
    GamePanel.prototype.update = function () {
        this.count++;
        if (this.count === Math.floor(this.accelerator / this.speed)) {
            this.peopleChange();
            this.count = 0;
            this.speed += 0.1;
        }
        // 判断游戏是否结束
        if (this.countTime <= 0) {
            egret.stopTick(this.update, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.gameOver();
        }
        return false;
    };
    GamePanel.prototype.peopleChange = function () {
        var _this = this;
        var ran = Math.floor(Math.random() * this.len);
        var load = this._arr[ran];
        if (load.icon != null) {
            this.peopleChange();
            return;
        }
        ;
        var picRan = Math.floor(Math.random() * 3);
        load.icon = "ui://GamePanel/" + this._str + picRan;
        load.visible = true;
        load.enabled = true;
        /// 用以被遮罩的形状
        var _shpBeMask = new egret.Shape;
        _shpBeMask.graphics.lineStyle(0x000000);
        _shpBeMask.graphics.beginFill(0xff0000);
        _shpBeMask.graphics.drawEllipse(0, 0, 190, 170);
        _shpBeMask.graphics.endFill();
        _shpBeMask.x = load.x - 26;
        _shpBeMask.y = load.y - 80;
        this._view.displayListContainer.addChild(_shpBeMask);
        load.displayObject.mask = _shpBeMask;
        var tw = egret.Tween.get(load).to({ y: load.y - load.height }, this.personTweenTime).to({ y: load.y }, this.personTweenTime).call(function () {
            load.visible = false;
            load.icon = null;
            _shpBeMask.graphics.clear();
            load.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, _this);
            egret.Tween.removeTweens(load);
        });
        var clickFun = function () {
            load.icon = "ui://GamePanel/" + _this._strWet + picRan; //换图
            // 暂停动画
            tw.setPaused(true);
            // 防多次点击
            // load.enabled = false;
            _this._clickNum++;
            GameUtil.score++;
            _this._waterImage.x = load.x;
            _this._waterImage.y = load.y - 150;
            _this._waterImage.visible = true;
            _this._countTxt.text = _this._clickNum + "";
            // 动画继续播放 after 200ms
            setTimeout(function () {
                tw.setPaused(false);
                _this._waterImage.visible = false;
            }, 200);
            load.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, _this);
        };
        load.addEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, this);
    };
    GamePanel.prototype.doTimeCool = function () {
        if (null != this.timer) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.resetCount();
        this.timer.start();
        this.setTimeTxt(this.countTime);
    };
    GamePanel.prototype.timerFunc = function (event) {
        this.countTime--;
        // console.log("this.countTime=" + this.countTime)
        this.setTimeTxt(this.countTime);
        // if (this.countTime <= 0) {
        // 	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        // 	this.gameOver();
        // }
    };
    GamePanel.prototype.resetCount = function () {
        // this.countTime = 30;
        this.countTime = 5;
    };
    GamePanel.prototype.setTimeTxt = function (count) {
        this._timeTxt.text = "剩余" + count + "秒";
    };
    GamePanel.prototype.gameOver = function () {
        console.log("游戏结束了！");
        this.timer = null;
        fgui.GRoot.inst.removeChild(this._view);
        fgui.GRoot.inst.dispatchEventWith("gameOver_", false, null);
        if (this._channel) {
            this._channel.stop();
            this._channel = null;
        }
        // this._view.dispose();
    };
    return GamePanel;
}());
__reflect(GamePanel.prototype, "GamePanel");
//# sourceMappingURL=GamePanel.js.map