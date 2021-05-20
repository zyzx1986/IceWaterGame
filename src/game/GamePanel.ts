class GamePanel {

	private _view: fgui.GComponent;
	private _timeTxt: fgui.GTextField;
	private _countTxt: fgui.GTextField;

	private _arr = [];//
	private len: number = 9;
	private _str = "person_";
	private _strWet = "personWet_";
	private _clickNum: number = 0;
	private _waterImage: fgui.GImage;

	private _tran: fgui.Transition;

	public constructor() {
		fgui.GRoot.inst.addEventListener("start_go", this.onStart, this);
	}

	public async init() {

		await fgui.UIPackage.loadPackage("GamePanel");//动态加载资源

		this._view = fgui.UIPackage.createObject("GamePanel", "GamePanel").asCom;
		this._view.makeFullScreen();
		fgui.GRoot.inst.addChild(this._view);


		this._timeTxt = this._view.getChild("txt_time").asTextField;
		this._countTxt = this._view.getChild("countNum").asTextField;
		this._countTxt.text = "";

		this._arr = [];
		for (let i = 0; i < this.len; i++) {
			let tempLoad: fgui.GLoader = this._view.getChild("load_" + (i + 1)).asLoader;
			this._arr.push(tempLoad);
		}

		console.log("this.arr len=="+this._arr.length);


		this._waterImage = this._view.getChild("img_water").asImage;
		this._waterImage.visible = false;


		this._tran = this._view.getTransition("t0");

	}

	private _sound: egret.Sound;
	private _channel: egret.SoundChannel;
	public playSound() {


		//方法1 通过音频放UI里   通过动效的没法停止音乐
		// this._tran.play();


		// return;
		//方法2 通过sound load
		this._sound = new egret.Sound();
		this._sound.load("resource/assets/UI/aaaaaa.mp3");
		this._sound.addEventListener(egret.Event.COMPLETE, () => {
			this._channel = this._sound.play();
		}, this);
	}

	private onStart() {
		GameUtil.score = 0;
		this.speed = 1;
		this.count = 0;
		this._clickNum = 0;
		this._waterImage.visible = false;
		this.doTimeCool();
		this.changePerson();
	}


	private accelerator = 120;
	private personTweenTime = 1000;
	// 出现的速度
	private speed = 1;
	private count = 0;
	private changePerson() {//改变出现效果
		this.peopleChange();
		egret.stopTick(this.update, this);
		egret.startTick(this.update, this);
	}

	// update函数
	// 控制人物出现速度 + 判断游戏是否结束
	private update(): boolean {
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
	}

	private peopleChange() {

		let ran = Math.floor(Math.random() * this.len);
		let load: fgui.GLoader = this._arr[ran];
		if (load.icon != null) {
			this.peopleChange();
			return;
		};
		let picRan = Math.floor(Math.random() * 3);
		load.icon = "ui://GamePanel/" + this._str + picRan;
		load.visible = true;
		load.enabled = true;

		/// 用以被遮罩的形状
		let _shpBeMask = new egret.Shape;
		_shpBeMask.graphics.lineStyle(0x000000)
		_shpBeMask.graphics.beginFill(0xff0000);
		_shpBeMask.graphics.drawEllipse(0, 0, 190, 170);
		_shpBeMask.graphics.endFill();
		_shpBeMask.x = load.x - 26;
		_shpBeMask.y = load.y - 80;
		this._view.displayListContainer.addChild(_shpBeMask);
		load.displayObject.mask = _shpBeMask;

		let tw = egret.Tween.get(load).to({ y: load.y - load.height }, this.personTweenTime).to({ y: load.y }, this.personTweenTime).call(() => {
			load.visible = false;
			load.icon = null;
			_shpBeMask.graphics.clear();
			load.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, this);
			egret.Tween.removeTweens(load);
		});

		let clickFun: Function = () => {
			load.icon = "ui://GamePanel/" + this._strWet + picRan;//换图
			// 暂停动画
			tw.setPaused(true);
			// 防多次点击
			// load.enabled = false;
			this._clickNum++;
			GameUtil.score++;
			this._waterImage.x = load.x;
			this._waterImage.y = load.y - 150;
			this._waterImage.visible = true;
			this._countTxt.text = this._clickNum + "";
			// 动画继续播放 after 200ms
			setTimeout(() => {
				tw.setPaused(false);
				this._waterImage.visible = false;
			}, 200);
			load.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, this);
		}
		load.addEventListener(egret.TouchEvent.TOUCH_BEGIN, clickFun, this);

	}


	private timer: egret.Timer;
	private countTime: number = 0;
	private doTimeCool() {//倒计时
		if (null != this.timer) {
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		}
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		this.resetCount();
		this.timer.start();
		this.setTimeTxt(this.countTime);
	}

	private timerFunc(event: egret.TimerEvent) {
		this.countTime--;
		// console.log("this.countTime=" + this.countTime)
		this.setTimeTxt(this.countTime);
		// if (this.countTime <= 0) {
		// 	this.timer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
		// 	this.gameOver();
		// }
	}


	private resetCount() {
		this.countTime = 30;
	}

	private setTimeTxt(count: number) {
		this._timeTxt.text = "剩余" + count + "秒";
	}

	private gameOver() {
		console.log("游戏结束了！");
		this.timer = null;
		fgui.GRoot.inst.removeChild(this._view);
		fgui.GRoot.inst.dispatchEventWith("gameOver_", false, null);

		if (this._channel) {
			this._channel.stop();
			this._channel = null;
		}
		// this._view.dispose();
	}
}