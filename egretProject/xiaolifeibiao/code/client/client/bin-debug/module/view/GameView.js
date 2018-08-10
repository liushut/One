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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.guanji = 1; //闯关数
        _this.shootN = 0; //射掉靶的个数
        _this.jifenN = 0; //直到失败前射掉靶的总个数，积分数
        _this.MING_SHU = 30;
        _this.mingshu = _this.MING_SHU; //命数
        _this.shuzu = [];
        _this.yuanzu = [];
        _this.id = 1;
        _this.rota = 0; //记录飞镖射出时的角度
        _this.i = 0;
        _this.weekTopScore = -1;
        _this.friendRank = -1;
        _this.gameRank = -1;
        _this.skinName = "GameViewSkin";
        return _this;
    }
    GameView.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GameView.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        ZJ.EventManager.instance.addEventListener(EventName.Test, this.restart, this);
        ZJ.UIManager.instance.destroyView(UIName.Loading);
        if (ModuleConfig.compile.danji) {
            this.yindao = ZJ.ResManager.instance.loadDragonBones("shou");
            this.yindao.x = this.bgAll.width / 2;
            this.yindao.y = this.bgAll.height / 4;
            this.bgAll.addChild(this.yindao);
            this.yindao.animation.play();
            this.createMain();
            setTimeout(function () {
                _this.bgAll.removeChild(_this.yindao);
                _this.createBar();
                _this.bgAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.setClick, _this);
            }, 2330);
        }
        else {
            this.initdate = ChushouDataModel.instance;
            this.initdate.onData11003 = function (data) {
                _this.initdate.getHighestScore11008();
                if (_this.initdate.myData.battleTimes < 10) {
                    _this.yindao = ZJ.ResManager.instance.loadDragonBones("shou");
                    _this.yindao.x = _this.bgAll.width / 2;
                    _this.yindao.y = _this.bgAll.height / 4;
                    _this.bgAll.addChild(_this.yindao);
                    _this.yindao.animation.play();
                }
                _this.createMain();
                setTimeout(function () {
                    _this.bgAll.removeChild(_this.yindao);
                    _this.createBar();
                    _this.bgAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.setClick, _this);
                }, 2330);
            };
            this.initdate.onData11007 = function (data) {
                ChushouDataModel.instance.getHighestScore11008();
            };
            this.initdate.onData11008 = function (data) {
                _this.weekTopScore = data.weekScore;
            };
            this.initdate.onData11012 = function (data) {
                if (data.result == 0) {
                    _this.gameRank = data.rank;
                    _this.friendRank = data.friendRank;
                    setTimeout(function () {
                        ZJ.AudioManager.Instance.play('jiesuantanchu', 1);
                        var view = ZJ.UIManager.instance.openView(UIName.Settle);
                        view.setData({ score: _this.jifenN, friend: _this.friendRank, paiming: _this.gameRank, weekTop: _this.weekTopScore });
                    }, 1000);
                }
            };
        }
        // this.yindao=ZJ.ResManager.instance.loadDragonBones("shou");
        // this.yindao.x=this.bgAll.width/2;
        // this.yindao.y=this.bgAll.height/4;
        // this.bgAll.addChild(this.yindao);
        // this.yindao.animation.play();
        // this.createMain();
        // setTimeout(() => {
        //     this.bgAll.removeChild(this.yindao);
        //     this.createBar();
        //     this.bgAll.addEventListener("touchTap", this.setClick, this);
        // }, 2330)
    };
    // private initData(){
    //     let initdate=ChushouDataModel.instance;
    //     initdate.csAuthRequestCallBack=()=>{
    //         ChushouSDK.instance.csGetFriendList((data: string) => {
    // 			let d = data as any
    // 			let l = d.friends as Array<any>
    // 			let r = []
    // 			for (let i = 0; i < l.length; i++) {
    // 				r.push(l[i].openUid as string)
    // 			}
    // 			ChushouDataModel.instance.sendFriendList({
    // 				openId: r
    // 			})
    // 		})
    //     }
    // }
    GameView.prototype.createMain = function () {
        this.djs = ZJ.ResManager.instance.loadDragonBones("djs");
        this.djs.x = this.bgAll.width / 2;
        this.djs.y = this.bgAll.height / 2;
        this.bgAll.addChild(this.djs);
        this.djs.animation.play("djs", 1);
        this.setConfigure();
        this.arrow = this.createArrow();
        this.createTarget();
        this.setLife();
        this.setFen();
    };
    GameView.prototype.setClick = function () {
        if (this.i == 0) {
            ZJ.AudioManager.Instance.play('targetFei', 1);
            this.rota = this.arrow.rotation;
            egret.Tween.removeTweens(this.arrow);
            this.arrowHui = this.createArrowHui();
            this.arrHuiImg.addChild(this.arrowHui);
            this.runArrow();
            this.i++;
        }
    };
    //产生进度条
    GameView.prototype.createBar = function () {
        var _this = this;
        // let a = new eui.ProgressBar()
        // a.skinName = "YYLoadingPBSkin"
        // a.height = 39
        // a.width = 600
        // a.x = 300
        // a.y = 300
        // a.value = 30;
        // this.addChild(a)=
        var barB1 = new eui.Image();
        barB1.source = "barblack_png";
        this.bar.addChild(barB1);
        //  barB1.visible = false
        var barR1 = new eui.Image();
        barR1.source = "barred_png";
        this.bar.addChild(barR1);
        this.barB = new eui.Image();
        this.barB.source = "barblack_png";
        this.barB.mask = barB1;
        this.bar.addChild(this.barB);
        this.barR = new eui.Image();
        this.barR.source = "barred_png";
        this.barR.visible = false;
        this.bar.addChild(this.barR);
        this.barR.mask = barR1;
        var barRW = barR1.width;
        var barBW = barB1.width;
        //  this.barB.alpha = 0.5
        //  barB1.alpha = 0.5
        egret.Tween.get(this.barB).to({ x: -(barBW - barRW) }, (1 - (barRW / barBW)) * this.time).call(function () {
            _this.barB.visible = false;
            _this.barR.visible = true;
            // egret.Tween.get(barR1, { loop: true }).to({ alpha: 0 }, 60).to({ alpha: 1 }, 60);
            //this.barR.alpha = 0.5
            // let a = egret.Tween.get(this.barR, { loop: true }).to({ alpha: 0 }, 150).to({ alpha: 1 }, 150);
            _this.dingshi1 = setInterval(function () {
                _this.barR.source = "barred_png";
                setTimeout(function () {
                    _this.barR.source = "barred1_png";
                }, 50);
            }, 100);
            egret.Tween.get(_this.barR).to({ x: -barRW }, (barRW / barBW) * _this.time).call(function () {
                egret.Tween.removeTweens(this.barB);
                egret.Tween.removeTweens(this.barR);
                clearInterval(this.dingshi1);
                this.bar.removeChildren();
                if (this.i == 0) {
                    this.mingshu = this.mingshu - 1;
                    this.setLife();
                    if (this.mingshu == 0) {
                        //  if(!ModuleConfig.compile.danji){
                        //     ChushouDataModel.instance.sendGameResult11012({
                        //         winPlayerId: ChushouDataModel.instance.myData.playerId
                        //     })
                        // }
                        egret.Tween.removeTweens(this.arrow);
                        egret.Tween.removeTweens(this.arrowHui);
                        this.arrImg.removeChildren();
                        this.arrHuiImg.removeChildren();
                        ZJ.AudioManager.Instance.play('shibai', 1);
                        var feibiao = ZJ.ResManager.instance.loadDragonBones("js");
                        feibiao.x = this.bgAll.width / 2;
                        feibiao.y = this.bgAll.height / 2;
                        this.bgAll.addChild(feibiao);
                        feibiao.animation.play("feibiao", 1);
                        this.reAnimation();
                    }
                    else if (this.mingshu > 0) {
                        this.createBar();
                    }
                }
            }, _this);
        }, this);
    };
    // private moveBar(timeStamo: number): boolean {
    //     let w = (this.barB.width * (1000 / 60)) / this.time;
    //     let k = w / this.barB.width;
    //     let l = w / this.barR.width;
    //     this.barB.scaleX = this.barB.scaleX - k;
    //     let a = this.barB.width * this.barB.scaleX;
    //     if (a <= this.barR.width) {
    //         this.barB.visible = false;
    //         this.barR.visible = true;
    //         this.barR.scaleX = this.barR.scaleX - l;
    //         let b = this.barR.width * this.barR.scaleX;
    //         if (b <= 10) {
    //             egret.stopTick(this.moveBar, this);
    //             this.bar.removeChildren();
    //             if (this.i == 0) {
    //                 this.mingshu = this.mingshu - 1;
    //                 this.setLife();
    //                 if (this.mingshu == 0) {
    //                     //  if(!ModuleConfig.compile.danji){
    //                     //     ChushouDataModel.instance.sendGameResult11012({
    //                     //         winPlayerId: ChushouDataModel.instance.myData.playerId
    //                     //     })
    //                     // }
    //                     this.arrImg.removeChildren();
    //                     this.arrHuiImg.removeChildren();
    //                     ZJ.AudioManager.Instance.play('shibai', 1);
    //                     let feibiao = ZJ.ResManager.instance.loadDragonBones("js");
    //                     feibiao.x = this.bgAll.width / 2;
    //                     feibiao.y = this.bgAll.height / 2;
    //                     this.bgAll.addChild(feibiao);
    //                     feibiao.animation.play("feibiao", 1);
    //                     this.reAnimation();
    //                 } else if (this.mingshu > 0) {
    //                     this.createBar();
    //                 }
    //             }
    //         }
    //     }
    //     return true;
    // }
    //产生靶子
    GameView.prototype.createTarget = function () {
        var bgX = this.bg.x;
        var bgY = this.bg.y;
        var bgWidth = this.bg.width;
        var bgHeight = this.bg.height;
        var yuanW = new YuanJiao().width;
        var jihao = [0, 1, 2, 3];
        var jihao1 = [4, 5, 6, 7];
        var b = 4;
        var c = 4;
        for (var j = 0; j < this.bashuliang; j++) {
            var p = new Plate();
            console.log(this.targetV);
            this.targetV = 5;
            p.scaleX = this.targetV;
            if (j < 4) {
                var a = Math.floor(Math.random() * b);
                var i = jihao[a];
                jihao.splice(a, 1);
                b--;
            }
            else if (j >= 4 && j < 8) {
                var a = Math.floor(Math.random() * c);
                var i = jihao1[a];
                jihao1.splice(a, 1);
                c--;
            }
            this.plateW = p.width * p.scaleX;
            var wid = this.bgAll.width - this.plateW - yuanW - yuanW - 10;
            var wid1 = this.bgAll.height - this.plateW - yuanW - yuanW - 10; //-10是为了避免正好生成在可生成范围的边界处
            var count = Math.ceil((Math.random() * wid) + yuanW + 5);
            var count1 = Math.ceil((Math.random() * wid1) + yuanW + 5);
            if (i == 0) {
                p.x = count;
                p.y = bgY;
                p.anchorOffsetY = p.height;
                p.id = this.id;
                this.id++;
            }
            else if (i == 1) {
                p.rotation = 90;
                p.x = bgX;
                p.y = count1;
                p.id = this.id;
                this.id++;
            }
            else if (i == 2) {
                p.x = count;
                p.y = bgY + bgHeight;
                p.id = this.id;
                this.id++;
            }
            else if (i == 3) {
                p.x = bgX + bgWidth;
                p.y = count1;
                p.rotation = 90;
                p.anchorOffsetY = p.height;
                p.id = this.id;
                this.id++;
            }
            else if (i == 4) {
                for (var k = 0; k < 4; k++) {
                    if (this.shuzu[k].y == bgY) {
                        if (this.shuzu[k].x >= wid / 2 + yuanW) {
                            p.x = Math.ceil((Math.random() * (wid / 2 - this.plateW)) + yuanW);
                        }
                        else {
                            p.x = Math.ceil((Math.random() * (wid / 2 - this.plateW)) + yuanW + wid / 2 + this.plateW);
                        }
                    }
                }
                p.y = bgY;
                p.anchorOffsetY = p.height;
                p.id = this.id;
                this.id++;
            }
            else if (i == 5) {
                for (var k = 0; k < 4; k++) {
                    if (this.shuzu[k].x == bgX) {
                        if (this.shuzu[k].y >= wid1 / 2 + yuanW) {
                            p.y = Math.ceil((Math.random() * (wid1 / 2 - this.plateW)) + yuanW);
                        }
                        else {
                            p.y = Math.ceil((Math.random() * (wid1 / 2 - this.plateW)) + yuanW + wid1 / 2 + this.plateW);
                        }
                    }
                }
                p.rotation = 90;
                p.x = bgX;
                p.id = this.id;
                this.id++;
            }
            else if (i == 6) {
                for (var k = 0; k < 4; k++) {
                    if (this.shuzu[k].y == bgY + bgHeight) {
                        if (this.shuzu[k].x >= (bgWidth - this.plateW) / 2 + bgX) {
                            p.x = Math.ceil((Math.random() * (wid / 2 - this.plateW)) + yuanW);
                        }
                        else {
                            p.x = Math.ceil((Math.random() * (wid / 2 - this.plateW)) + yuanW + wid / 2 + this.plateW);
                        }
                    }
                }
                p.y = bgY + bgHeight;
                p.id = this.id;
                this.id++;
            }
            else if (i == 7) {
                for (var k = 0; k < 4; k++) {
                    if (this.shuzu[k].x == bgX + bgWidth) {
                        if (this.shuzu[k].y >= wid1 / 2 + yuanW) {
                            p.y = Math.ceil((Math.random() * (wid1 / 2 - this.plateW)) + yuanW);
                        }
                        else {
                            p.y = Math.ceil((Math.random() * (wid1 / 2 - this.plateW)) + yuanW + wid1 / 2 + this.plateW);
                        }
                    }
                }
                p.x = bgX + bgWidth;
                p.rotation = 90;
                p.anchorOffsetY = p.height;
                p.id = this.id;
                this.id++;
            }
            this.tarImg.addChild(p);
            this.shuzu.push(p);
        }
    };
    //产生飞镖
    GameView.prototype.createArrow = function () {
        var a = new Arrow();
        a.x = this.bgAll.width / 2;
        a.y = this.bgAll.height / 2;
        a.anchorOffsetX = a.width / 2;
        a.anchorOffsetY = a.height - 18;
        a.rotation = this.rota;
        // setInterval(()=>{
        //     a.rotation++
        // }, this.arrowV/360)
        // console.log(this.rota)
        // console.log('11111')
        // console.log(this.rota + this.arrowR)
        egret.Tween.get(a, { loop: true }).to({ rotation: this.rota + this.arrowR }, this.arrowV);
        this.arrImg.addChild(a);
        return a;
    };
    //产生灰飞镖
    GameView.prototype.createArrowHui = function () {
        var a = new ArrowHui();
        a.x = this.bgAll.width / 2;
        a.y = this.bgAll.height / 2;
        a.anchorOffsetX = a.width / 2;
        a.anchorOffsetY = a.height - 18;
        a.rotation = this.rota;
        egret.Tween.get(a, { loop: true }).to({ rotation: this.rota + this.arrowR }, this.arrowV);
        this.arrImg.addChild(a);
        return a;
    };
    //飞镖运动
    GameView.prototype.runArrow = function () {
        var _this = this;
        //this.circle.addEventListener("touchTap",()=>{
        //egret.Tween.removeTweens(this.arrow);
        var arrowX = this.arrow.x;
        var arrowY = this.arrow.y;
        var arrowH = this.arrow.height;
        var bgX = this.bg.x;
        var bgY = this.bg.y;
        var bgWidth = this.bg.width;
        var bgHeight = this.bg.height;
        var arrowR = this.arrow.rotation;
        var yuanW = new YuanJiao().width;
        var r = Math.atan((bgWidth / 2 - yuanW + bgX) / (bgHeight / 2)) * 180 / Math.PI;
        var R = Math.atan((this.bgAll.width / 2) / (this.bgAll.height / 2)) * 180 / Math.PI;
        var rC = R - r; //差
        var k = 0;
        var b = 0;
        var x = 0;
        var y = 0;
        var x1 = 0;
        var y1 = 0;
        var time = 0;
        var angle = Math.abs(arrowR - 90);
        var radian = Math.abs(angle * Math.PI / 180);
        k = Math.abs(Math.tan(radian));
        var aX = Math.abs(Math.cos(radian)) * (arrowH - 18);
        var aY = Math.abs(Math.sin(radian)) * (arrowH - 18); //18是飞镖向上的距离，因为飞镖不是在正中心
        var dd = this.bgAll.width - yuanW - yuanW;
        var ee = this.bgAll.height - yuanW - yuanW;
        if (arrowR > -180 && arrowR < -90) {
            k = -k;
        }
        if (arrowR > 0 && arrowR < 90) {
            k = -k;
        }
        ;
        b = arrowY - (k * arrowX);
        if (arrowR > -R && arrowR <= R) {
            y = bgY;
            x = (y - b) / k;
            y1 = y + aY;
            x1 = (y1 - b) / k;
            if (x < yuanW || x > this.bgAll.width - yuanW) {
                if (x < yuanW) {
                    x1 = this.getPoint(k, b, yuanW, yuanW, 0);
                    y1 = k * x1 + b;
                }
                else {
                    x1 = this.getPoint(k, b, this.bgAll.width - yuanW, yuanW, 1);
                    y1 = k * x1 + b;
                }
                y1 = y1 + aY;
                x1 = (y1 - b) / k;
            }
        }
        else if (arrowR > R && arrowR <= 180 - R) {
            x = bgX + bgWidth;
            y = k * x + b;
            x1 = x - aX;
            y1 = k * x1 + b;
            if (y < yuanW || y > this.bgAll.height - yuanW) {
                if (y < yuanW) {
                    x1 = this.getPoint(k, b, this.bgAll.width - yuanW, yuanW, 1);
                    y1 = k * x1 + b;
                }
                else {
                    x1 = this.getPoint(k, b, this.bgAll.width - yuanW, this.bgAll.height - yuanW, 1);
                    y1 = k * x1 + b;
                }
                x1 = x1 - aX;
                y1 = k * x1 + b;
            }
        }
        else if (arrowR > 180 - R && arrowR <= 180) {
            y = bgY + bgHeight;
            x = (y - b) / k;
            y1 = y - aY;
            x1 = (y1 - b) / k;
            if (x > this.bgAll.width - yuanW) {
                x1 = this.getPoint(k, b, this.bgAll.width - yuanW, this.bgAll.height - yuanW, 1);
                y1 = k * x1 + b;
                y1 = y1 - aY;
                x1 = (y1 - b) / k;
            }
        }
        else if (arrowR > -180 && arrowR <= -180 + R) {
            y = bgY + bgHeight;
            x = (y - b) / k;
            y1 = y - aY;
            x1 = (y1 - b) / k;
            if (x < yuanW) {
                x1 = this.getPoint(k, b, yuanW, this.bgAll.height - yuanW, 0);
                y1 = k * x1 + b;
                y1 = y1 - aY;
                x1 = (y1 - b) / k;
            }
        }
        else if (arrowR > -180 + R && arrowR <= -R) {
            x = bgX;
            y = k * x + b;
            x1 = x + aX;
            y1 = k * x1 + b;
            if (y < yuanW || y > this.bgAll.height - yuanW) {
                if (y < yuanW) {
                    x1 = this.getPoint(k, b, yuanW, yuanW, 0);
                    y1 = k * x1 + b;
                }
                else {
                    x1 = this.getPoint(k, b, yuanW, this.bgAll.height - yuanW, 0);
                    y1 = k * x1 + b;
                }
                x1 = x1 + aX;
                y1 = k * x1 + b;
            }
        }
        ;
        this.k = k;
        this.arrX = x;
        this.arrY = y;
        time = Math.sqrt((x1 - arrowX) * (x1 - arrowX) + (y1 - arrowY) * (y1 - arrowY));
        egret.Tween.get(this.arrow).to({ x: x1, y: y1 }, time).call(function () {
            _this.mingshu--;
            _this.shootTarget();
            egret.Tween.get(_this.arrow).to({ alpha: 0 }, 100).call(function () {
                _this.setLife();
                _this.setFen();
                if (!ModuleConfig.compile.danji) {
                    _this.initdate.sendScoredData11011({ score: _this.jifenN, resultData: "" });
                }
                // egret.stopTick(this.moveBar, this);
                egret.Tween.removeTweens(_this.barB);
                egret.Tween.removeTweens(_this.barR);
                clearInterval(_this.dingshi1);
                _this.bar.removeChildren();
                if (_this.mingshu == 0) {
                    //  if(!ModuleConfig.compile.danji){
                    //     ChushouDataModel.instance.sendGameResult11012({
                    //         winPlayerId: ChushouDataModel.instance.myData.playerId
                    //     })
                    //  }
                    egret.Tween.removeTweens(_this.arrow);
                    egret.Tween.removeTweens(_this.arrowHui);
                    egret.Tween.removeAllTweens();
                    _this.arrImg.removeChildren();
                    _this.arrHuiImg.removeChildren();
                    ZJ.AudioManager.Instance.play('shibai', 1);
                    var feibiao = ZJ.ResManager.instance.loadDragonBones("js");
                    feibiao.x = x1;
                    feibiao.y = y1;
                    _this.bgAll.addChild(feibiao);
                    feibiao.animation.play("feibiao", 1);
                    _this.reAnimation();
                }
                else {
                    egret.Tween.removeTweens(_this.arrow);
                    egret.Tween.removeTweens(_this.arrowHui);
                    _this.arrImg.removeChildren();
                    _this.rota = _this.arrowHui.rotation;
                    _this.arrHuiImg.removeChildren();
                    if (_this.bashuliang != _this.shootN) {
                        _this.arrow = _this.createArrow();
                        _this.createBar();
                    }
                    if (_this.bashuliang == _this.shootN) {
                        egret.Tween.removeAllTweens();
                        _this.tarImg.removeChildren();
                        _this.yuanImg.removeChildren();
                        _this.shuzu.splice(0, _this.shuzu.length);
                        _this.yuanzu.splice(0, _this.yuanzu.length);
                        _this.id = 1;
                        _this.guanji++;
                        _this.createBar();
                        _this.setConfigure();
                        _this.shootN = 0;
                        _this.arrow = _this.createArrow();
                        setTimeout(function () {
                            _this.createTarget();
                            if (_this.guanji == _this.plateRguan) {
                                clearInterval(_this.dingshi);
                                _this.runTarget();
                            }
                        }, 300);
                    }
                    _this.i = 0;
                }
            }, _this);
        }, this);
    };
    GameView.prototype.setMask = function () {
        var yuanW = new YuanJiao().width;
        var shp = new egret.Shape();
        shp.x = yuanW;
        shp.y = yuanW;
        shp.graphics.beginFill(0xffffff);
        shp.graphics.drawRect(0, 0, yuanW, yuanW);
        shp.graphics.endFill();
        shp.anchorOffsetX = yuanW;
        shp.anchorOffsetY = yuanW;
        shp.rotation = 90 - this.jd;
        return shp;
    };
    //靶子运动      
    GameView.prototype.runTarget = function () {
        var _this = this;
        var bgX = this.bg.x;
        var bgY = this.bg.y;
        var bgWidth = this.bg.width;
        var bgHeight = this.bg.height;
        var yuanW = new YuanJiao().width;
        var yuanH = new YuanJiao().height;
        var pH = new Plate().height;
        var pW = new Plate().width;
        var ad = (2 * Math.PI * yuanH) / 4;
        this.jd = Math.floor((this.plateW / ad) * 90);
        console.log(this.jd);
        var a = ((90 - this.jd) * Math.PI) / 180;
        var b = Math.tan(a) * yuanW;
        // let yu1=0; let yu2=0; let yu3=0; let yu4=0;
        // let tar1=0; let tar2=0; let tar3=0; let tar4=0;
        // egret.Tween.get(this.shuzu[i], {onChange:()=>{
        // }}).to({x:yuanW},this.plateW*this.targetS);
        // setInterval(() => {
        //     let a, b
        //     a.x
        // }, 100)
        this.dingshi = setInterval(function () {
            for (var i = 0; i < _this.shuzu.length; i++) {
                if (_this.shuzu[i].y == bgY && _this.shuzu[i].rotation == 0) {
                    // let shuzuX=this.shuzu[i].x  1;
                    if (_this.shuzu[i].x == yuanW - _this.plateW) {
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ x: yuanW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_1 = 0; i_1 < this.shuzu.length; i_1++) {
                                if (this.shuzu[i_1].x == yuanW && this.shuzu[i_1].y == bgY && this.shuzu[i_1].rotation == 0) {
                                    for (var k = 0; k < this.yuanzu.length; k++) {
                                        if (this.yuanzu[k].id == this.shuzu[i_1].id && this.yuanzu[k].x == yuanW && this.yuanzu[k].y == yuanW && this.yuanzu[k].rotation > 0 && this.yuanzu[k].name == '2') {
                                            if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                                egret.Tween.removeTweens(this.yuanzu[k]);
                                                this.yuanzu[k].parent.removeChild(this.yuanzu[k]);
                                                this.yuanzu.splice(k, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                    else if (_this.shuzu[i].x >= yuanW && _this.shuzu[i].name != '1' && _this.shuzu[i].x < _this.bgAll.width - yuanW - _this.plateW) {
                        _this.shuzu[i].name = '1';
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ x: _this.bgAll.width - yuanW - _this.plateW }, (_this.bgAll.width - yuanW - _this.plateW - _this.shuzu[i].x) * _this.targetS).call(function () {
                            for (var i_2 = 0; i_2 < this.shuzu.length; i_2++) {
                                if (this.shuzu[i_2].x == this.bgAll.width - yuanW - this.plateW && this.shuzu[i_2].y == bgY && this.shuzu[i_2].rotation == 0) {
                                    var id = this.shuzu[i_2].id;
                                }
                            }
                            var y = new YuanJiao();
                            y.x = this.bgAll.width - yuanW;
                            y.y = yuanH;
                            y.anchorOffsetX = yuanW;
                            y.anchorOffsetY = yuanW;
                            y.id = id;
                            y.name = '1';
                            if (this.plateW < ad) {
                                console.log('888888');
                                var shp = this.setMask();
                                y.addChild(shp);
                            }
                            y.mask = shp;
                            this.yuanzu.push(y);
                            this.yuanImg.addChild(y);
                            egret.Tween.get(y).to({ rotation: 90 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS).call(function () {
                                for (var j = 0; j < this.yuanzu.length; j++) {
                                    if (this.yuanzu[j].id == id && this.yuanzu[j].x == this.bgAll.width - yuanW && this.yuanzu[j].y == yuanW && this.yuanzu[j].rotation == 90 && this.yuanzu[j].name == '1') {
                                        if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                            var p = new Plate();
                                            p.x = bgX + bgWidth;
                                            p.y = yuanW - this.plateW;
                                            p.scaleX = this.targetV;
                                            p.rotation = 90;
                                            p.anchorOffsetY = p.height;
                                            p.id = this.yuanzu[j].id;
                                            this.shuzu.push(p);
                                            this.tarImg.addChild(p);
                                            if (this.plateW < ad) {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 180 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }, this);
                        }, _this).to({ x: _this.bgAll.width - yuanW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_3 = 0; i_3 < this.shuzu.length; i_3++) {
                                if (this.shuzu[i_3].x == this.bgAll.width - yuanW && this.shuzu[i_3].y == bgY && this.shuzu[i_3].rotation == 0) {
                                    var id = this.shuzu[i_3].id;
                                    egret.Tween.removeTweens(this.shuzu[i_3]);
                                    this.shuzu[i_3].parent.removeChild(this.shuzu[i_3]);
                                    this.shuzu.splice(i_3, 1);
                                    if (this.plateW >= ad) {
                                        for (var j = 0; j < this.yuanzu.length; j++) {
                                            if (this.yuanzu[j].id == id && this.yuanzu[j].x == this.bgAll.width - yuanW && this.yuanzu[j].y == yuanW && this.yuanzu[j].rotation == 90 && this.yuanzu[j].name == '1') {
                                                //let id=this.yuanzu[j].id;
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 180 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                }
                else if (_this.shuzu[i].x == bgX && _this.shuzu[i].rotation == 90) {
                    if (_this.shuzu[i].y == _this.bgAll.height - yuanW) {
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ y: _this.bgAll.height - yuanW - _this.plateW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_4 = 0; i_4 < this.shuzu.length; i_4++) {
                                if (this.shuzu[i_4].y == this.bgAll.height - yuanW - this.plateW && this.shuzu[i_4].x == bgX && this.shuzu[i_4].rotation == 90) {
                                    for (var k = 0; k < this.yuanzu.length; k++) {
                                        if (this.yuanzu[k].id == this.shuzu[i_4].id && this.yuanzu[k].x == yuanW && this.yuanzu[k].y == this.bgAll.height - yuanW && this.yuanzu[k].rotation > -90 && this.yuanzu[k].name == '3') {
                                            if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                                egret.Tween.removeTweens(this.yuanzu[k]);
                                                this.yuanzu[k].parent.removeChild(this.yuanzu[k]);
                                                this.yuanzu.splice(k, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                    else if (_this.shuzu[i].y <= _this.bgAll.height - yuanW - _this.plateW && _this.shuzu[i].name != '1' && _this.shuzu[i].y > yuanW) {
                        _this.shuzu[i].name = '1';
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ y: yuanW }, (_this.shuzu[i].y - yuanW) * _this.targetS).call(function () {
                            for (var i_5 = 0; i_5 < this.shuzu.length; i_5++) {
                                if (this.shuzu[i_5].y == yuanW && this.shuzu[i_5].x == bgX && this.shuzu[i_5].rotation == 90) {
                                    var id = this.shuzu[i_5].id;
                                }
                            }
                            var y = new YuanJiao();
                            y.x = yuanW;
                            y.y = yuanW;
                            y.anchorOffsetX = yuanW;
                            y.anchorOffsetY = yuanW;
                            y.rotation = -90;
                            y.id = id;
                            y.name = '2';
                            if (this.plateW < ad) {
                                var shp = this.setMask();
                                y.addChild(shp);
                            }
                            y.mask = shp;
                            this.yuanzu.push(y);
                            this.yuanImg.addChild(y);
                            egret.Tween.get(y).to({ rotation: 0 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS).call(function () {
                                for (var j = 0; j < this.yuanzu.length; j++) {
                                    if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == yuanW && this.yuanzu[j].rotation == 0 && this.yuanzu[j].name == '2') {
                                        if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                            var p = new Plate();
                                            p.x = yuanW - this.plateW;
                                            p.y = bgY;
                                            p.scaleX = this.targetV;
                                            p.anchorOffsetY = p.height;
                                            p.id = this.yuanzu[j].id;
                                            this.shuzu.push(p);
                                            this.tarImg.addChild(p);
                                            if (this.plateW < ad) {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 90 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }, this);
                        }, _this).to({ y: yuanW - _this.plateW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_6 = 0; i_6 < this.shuzu.length; i_6++) {
                                if (this.shuzu[i_6].y == yuanW - this.plateW && this.shuzu[i_6].x == bgX && this.shuzu[i_6].rotation == 90) {
                                    var id = this.shuzu[i_6].id;
                                    egret.Tween.removeTweens(this.shuzu[i_6]);
                                    this.shuzu[i_6].parent.removeChild(this.shuzu[i_6]);
                                    this.shuzu.splice(i_6, 1);
                                    if (this.plateW >= ad) {
                                        for (var j = 0; j < this.yuanzu.length; j++) {
                                            if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == yuanW && this.yuanzu[j].rotation == 0 && this.yuanzu[j].name == '2') {
                                                // let id=this.yuanzu[j].id;
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 90 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                }
                else if (_this.shuzu[i].y == bgY + bgHeight && _this.shuzu[i].rotation == 0) {
                    if (_this.shuzu[i].x == _this.bgAll.width - yuanW) {
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ x: _this.bgAll.width - yuanW - _this.plateW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_7 = 0; i_7 < this.shuzu.length; i_7++) {
                                if (this.shuzu[i_7].x == this.bgAll.width - yuanW - this.plateW && this.shuzu[i_7].y == bgY + bgHeight && this.shuzu[i_7].rotation == 0) {
                                    for (var k = 0; k < this.yuanzu.length; k++) {
                                        if (this.yuanzu[k].id == this.shuzu[i_7].id && this.yuanzu[k].x == this.bgAll.width - yuanW && this.yuanzu[k].y == this.bgAll.height - yuanW && this.yuanzu[k].rotation <= -90 && this.yuanzu[k].rotation > -180 && this.yuanzu[k].name == '4') {
                                            if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                                egret.Tween.removeTweens(this.yuanzu[k]);
                                                this.yuanzu[k].parent.removeChild(this.yuanzu[k]);
                                                this.yuanzu.splice(k, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                    else if (_this.shuzu[i].x <= _this.bgAll.width - yuanW - _this.plateW && _this.shuzu[i].name != '1' && _this.shuzu[i].x > yuanW) {
                        _this.shuzu[i].name = '1';
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ x: yuanW }, (_this.shuzu[i].x - yuanW) * _this.targetS).call(function () {
                            for (var i_8 = 0; i_8 < this.shuzu.length; i_8++) {
                                if (this.shuzu[i_8].x == yuanW && this.shuzu[i_8].y == bgY + bgHeight && this.shuzu[i_8].rotation == 0) {
                                    var id = this.shuzu[i_8].id;
                                }
                            }
                            var y = new YuanJiao();
                            y.x = yuanW;
                            y.y = this.bgAll.height - yuanW;
                            y.anchorOffsetX = yuanW;
                            y.anchorOffsetY = yuanW;
                            y.rotation = 180;
                            y.id = id;
                            y.name = '3';
                            if (this.plateW < ad) {
                                var shp = this.setMask();
                                y.addChild(shp);
                            }
                            y.mask = shp;
                            this.yuanzu.push(y);
                            this.yuanImg.addChild(y);
                            egret.Tween.get(y).to({ rotation: 270 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS).call(function () {
                                for (var j = 0; j < this.yuanzu.length; j++) {
                                    if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == -90 && this.yuanzu[j].name == '3') {
                                        if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                            var p = new Plate();
                                            p.x = bgX;
                                            p.y = this.bgAll.height - yuanW;
                                            p.scaleX = this.targetV;
                                            p.rotation = 90;
                                            p.id = this.yuanzu[j].id;
                                            this.shuzu.push(p);
                                            this.tarImg.addChild(p);
                                            if (this.plateW < ad) {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 0 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }, this);
                        }, _this).to({ x: yuanW - _this.plateW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_9 = 0; i_9 < this.shuzu.length; i_9++) {
                                if (this.shuzu[i_9].x == yuanW - this.plateW && this.shuzu[i_9].y == bgY + bgHeight && this.shuzu[i_9].rotation == 0) {
                                    var id = this.shuzu[i_9].id;
                                    egret.Tween.removeTweens(this.shuzu[i_9]);
                                    this.shuzu[i_9].parent.removeChild(this.shuzu[i_9]);
                                    this.shuzu.splice(i_9, 1);
                                    if (this.plateW >= ad) {
                                        for (var j = 0; j < this.yuanzu.length; j++) {
                                            if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == -90 && this.yuanzu[j].name == '3') {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 0 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                    // else if (this.shuzu[i].x == yuanW) {
                    //      egret.Tween.removeTweens(this.shuzu[i]);
                    //     egret.Tween.get(this.shuzu[i]).to({ x: yuanW - this.plateW }, this.plateW * this.targetS)
                    // }
                    // if (Math.ceil(this.shuzu[i].x) == Math.ceil(yuanW)&&yu3==0) {
                    //     let y = new YuanJiao();
                    //     let id = this.shuzu[i].id;
                    //     y.x = yuanW;
                    //     y.y = this.bgAll.height - yuanW;
                    //     y.anchorOffsetX = yuanW;
                    //     y.anchorOffsetY = yuanW;
                    //     y.rotation = 180;
                    //     y.id = id;
                    //     y.name = '3';
                    //     if (this.plateW < ad) {
                    //         var shp = this.setMask();
                    //         y.addChild(shp);
                    //     }
                    //     y.mask = shp;
                    //     this.yuanzu.push(y);
                    //     this.yuanImg.addChild(y);
                    //     yu3=1;
                    //     egret.Tween.get(y).to({ rotation: 270 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS).call(function () {
                    //         yu3=0;
                    //         for (let j = 0; j < this.yuanzu.length; j++) {
                    //             if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == -90 && this.yuanzu[j].name == '3') {
                    //                 if (this.mingshu != 0 && this.bashuliang != this.shootN&&tar3==0) {
                    //                     let p = new Plate();
                    //                     p.x = bgX;
                    //                     p.y = this.bgAll.height - yuanW;
                    //                     p.scaleX = this.targetV;
                    //                     p.rotation = 90;
                    //                     p.id = this.yuanzu[j].id;
                    //                     this.shuzu.push(p);
                    //                     this.tarImg.addChild(p);
                    //                     tar3=1;
                    //                     if (this.plateW < ad) {
                    //                         egret.Tween.removeTweens(this.yuanzu[j]);
                    //                         egret.Tween.get(this.yuanzu[j]).to({ rotation: 0 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                    //                     }
                    //                 }
                    //             }
                    //         }
                    //     }, this);
                    // }
                    // if (Math.ceil(this.shuzu[i].x) == Math.ceil(this.bgAll.width - yuanW - this.plateW)) {
                    //     tar4=0;
                    //     for (let k = 0; k < this.yuanzu.length; k++) {
                    //         if (this.yuanzu[k].id == this.shuzu[i].id && this.yuanzu[k].x == this.bgAll.width - yuanW && this.yuanzu[k].y == this.bgAll.height - yuanW && this.yuanzu[k].rotation <= -90 && this.yuanzu[k].rotation > -180 && this.yuanzu[k].name == '4') {
                    //             if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                    //                 egret.Tween.removeTweens(this.yuanzu[k]);
                    //                 this.yuanzu[k].parent.removeChild(this.yuanzu[k]);
                    //                 this.yuanzu.splice(k, 1);
                    //             }
                    //         }
                    //     }
                    // }
                    // if (Math.ceil(this.shuzu[i].x) == Math.ceil(yuanW - this.plateW)) {
                    //     let id = this.shuzu[i].id;
                    //     egret.Tween.removeTweens(this.shuzu[i]);
                    //     this.shuzu[i].parent.removeChild(this.shuzu[i]);
                    //     this.shuzu.splice(i, 1);
                    //     if (this.plateW >= ad) {
                    //         for (let j = 0; j < this.yuanzu.length; j++) {
                    //             if (this.yuanzu[j].id == id && this.yuanzu[j].x == yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == -90 && this.yuanzu[j].name == '3') {
                    //                  egret.Tween.removeTweens(this.yuanzu[j]);
                    //                 egret.Tween.get(this.yuanzu[j]).to({ rotation: 0 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                    //             }
                    //         }
                    //     }
                    // }
                }
                else if (_this.shuzu[i].x == bgX + bgWidth && _this.shuzu[i].rotation == 90) {
                    if (_this.shuzu[i].y == yuanW - _this.plateW) {
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ y: yuanW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_10 = 0; i_10 < this.shuzu.length; i_10++) {
                                if (this.shuzu[i_10].y == yuanW && this.shuzu[i_10].x == bgX + bgWidth && this.shuzu[i_10].rotation == 90) {
                                    for (var k = 0; k < this.yuanzu.length; k++) {
                                        if (this.yuanzu[k].id == this.shuzu[i_10].id && this.yuanzu[k].x == this.bgAll.width - yuanW && this.yuanzu[k].y == yuanW && this.yuanzu[k].rotation > 90 && this.yuanzu[k].name == '1') {
                                            if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                                egret.Tween.removeTweens(this.yuanzu[k]);
                                                this.yuanzu[k].parent.removeChild(this.yuanzu[k]);
                                                this.yuanzu.splice(k, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                    else if (_this.shuzu[i].y >= yuanW && _this.shuzu[i].name != '1' && _this.shuzu[i].y < _this.bgAll.height - yuanW - _this.plateW) {
                        _this.shuzu[i].name = '1';
                        egret.Tween.removeTweens(_this.shuzu[i]);
                        egret.Tween.get(_this.shuzu[i]).to({ y: _this.bgAll.height - yuanW - _this.plateW }, (_this.bgAll.height - yuanW - _this.plateW - _this.shuzu[i].y) * _this.targetS).call(function () {
                            for (var i_11 = 0; i_11 < this.shuzu.length; i_11++) {
                                if (this.shuzu[i_11].y == this.bgAll.height - yuanW - this.plateW && this.shuzu[i_11].x == bgX + bgWidth && this.shuzu[i_11].rotation == 90) {
                                    var id = this.shuzu[i_11].id;
                                }
                            }
                            var y = new YuanJiao();
                            y.x = this.bgAll.width - yuanW;
                            y.y = this.bgAll.height - yuanW;
                            y.anchorOffsetX = yuanW;
                            y.anchorOffsetY = yuanW;
                            y.rotation = 90;
                            y.id = id;
                            y.name = '4';
                            if (this.plateW < ad) {
                                var shp = this.setMask();
                                y.addChild(shp);
                            }
                            y.mask = shp;
                            this.yuanzu.push(y);
                            this.yuanImg.addChild(y);
                            egret.Tween.get(y).to({ rotation: 180 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS).call(function () {
                                for (var j = 0; j < this.yuanzu.length; j++) {
                                    if (this.yuanzu[j].id == id && this.yuanzu[j].x == this.bgAll.width - yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == 180 && this.yuanzu[j].name == '4') {
                                        if (this.mingshu != 0 && this.bashuliang != this.shootN) {
                                            var p = new Plate();
                                            p.x = this.bgAll.width - yuanW;
                                            p.y = bgY + bgHeight;
                                            p.scaleX = this.targetV;
                                            p.id = this.yuanzu[j].id;
                                            this.shuzu.push(p);
                                            this.tarImg.addChild(p);
                                            if (this.plateW < ad) {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 270 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }, this);
                        }, _this).to({ y: _this.bgAll.height - yuanW }, _this.plateW * _this.targetS).call(function () {
                            for (var i_12 = 0; i_12 < this.shuzu.length; i_12++) {
                                if (this.shuzu[i_12].y == this.bgAll.height - yuanW && this.shuzu[i_12].x == bgX + bgWidth && this.shuzu[i_12].rotation == 90) {
                                    var id = this.shuzu[i_12].id;
                                    egret.Tween.removeTweens(this.shuzu[i_12]);
                                    this.shuzu[i_12].parent.removeChild(this.shuzu[i_12]);
                                    this.shuzu.splice(i_12, 1);
                                    if (this.plateW >= ad) {
                                        for (var j = 0; j < this.yuanzu.length; j++) {
                                            if (this.yuanzu[j].id == id && this.yuanzu[j].x == this.bgAll.width - yuanW && this.yuanzu[j].y == this.bgAll.height - yuanW && this.yuanzu[j].rotation == 180 && this.yuanzu[j].name == '4') {
                                                egret.Tween.removeTweens(this.yuanzu[j]);
                                                egret.Tween.get(this.yuanzu[j]).to({ rotation: 270 }, ((yuanW * 2 * Math.PI) / 4) * this.targetS);
                                            }
                                        }
                                    }
                                }
                            }
                        }, _this);
                    }
                }
            }
        }, this.targetS);
    };
    GameView.prototype.countJifen = function (k, k1, k2) {
        if (k >= k1 + (k2 - k1) * 0.3 && k <= k1 + (k2 - k1) * 0.7) {
            if (k >= k1 + (k2 - k1) * 0.45 && k <= k1 + (k2 - k1) * 0.55) {
                this.jifenN = this.jifenN + 2;
            }
            else {
                this.jifenN = this.jifenN + 1;
            }
        }
    };
    GameView.prototype.addImg = function (ax, ay, fenshu) {
        var _this = this;
        // let juli=10;
        // let juli1=150;
        var juli = 65;
        var yuanW = new YuanJiao().width;
        if (ax == this.bg.x) {
            ax = ax + 145;
        }
        else if (ax == this.bgAll.width - this.bg.x) {
            ax = ax - 35;
        }
        else if (ay == this.bg.y) {
            ay = ay + juli;
        }
        else if (ay == this.bgAll.height - this.bg.y) {
            ay = ay - juli;
        }
        // else if(ay==yuanW&&ax==yuanW){
        //     ax=ax-juli2;
        //     ay=ay-juli2;
        // }else if(ax==this.bgAll.width-yuanW&&ay==yuanW){
        //     ax=ax-juli;
        //     ay=ay-juli;
        // }else if(ax==this.bgAll.width-yuanW&&ay==this.bgAll.height-yuanW){
        //     ax=ax-juli;
        //     ay=ay+juli;
        // }else if(ax==yuanW&&ay==this.bgAll.height-yuanW){
        //     ax=ax-juli;
        //     ay=ay+juli;
        // }
        this.addFen.anchorOffsetX = this.addFen.width / 2;
        this.addFen.anchorOffsetY = this.addFen.height / 2;
        this.addFen.x = ax;
        this.addFen.y = ay;
        this.defen.text = fenshu.toString();
        this.addFen.visible = true;
        //  this.addFen.alpha=1;
        //   egret.Tween.removeTweens(this.addFen);
        setTimeout(function () {
            //egret.Tween.get(this.addFen).to({alpha:0},10)
            _this.addFen.visible = false;
        }, 300);
        //  console.log(this.addFen.alpha+'1111');
        // egret.Tween.get(this.addFen).to({alpha:0},500).call(()=>{
        //     if(this.addFen.alpha==0){
        //         console.log(this.addFen.alpha);
        //         this.addFen.visible=false;
        //          console.log(this.addFen.alpha);
        //     }
        // },this)
        //  console.log(this.addFen.alpha+'2222');
    };
    //判断是否射中靶子
    GameView.prototype.shootTarget = function () {
        var bgX = this.bg.x;
        var bgY = this.bg.y;
        var bgWidth = this.bg.width;
        var bgHeight = this.bg.height;
        var zId = null;
        var angle = null;
        var yuanH = new YuanJiao().height;
        var yuanC = yuanH - bgY;
        var yuanjifen = this.jifenN;
        if ((this.arrX >= yuanH && this.arrX <= this.bgAll.width - yuanH) || (this.arrY >= yuanH && this.arrY <= this.bgAll.height - yuanH)) {
            for (var i = 0; i < this.shuzu.length; i++) {
                var a = ZJ.ResManager.instance.loadDragonBones("hk");
                if (this.arrX >= this.shuzu[i].x && this.arrX <= this.shuzu[i].x + this.plateW && this.arrY == this.shuzu[i].y) {
                    zId = this.shuzu[i].id;
                    egret.Tween.removeTweens(this.shuzu[i]);
                    this.shuzu[i].parent.removeChild(this.shuzu[i]);
                    a.x = this.shuzu[i].x + this.plateW / 2;
                    a.y = this.shuzu[i].y;
                    this.bgAll.addChild(a);
                    a.animation.play("guidao", 1);
                    ZJ.AudioManager.Instance.play('mingzhongbazi', 1);
                    if (this.arrX >= this.shuzu[i].x + this.plateW * 0.3 && this.arrX <= this.shuzu[i].x + this.plateW * 0.7) {
                        if (this.arrX >= this.shuzu[i].x + this.plateW * 0.45 && this.arrX <= this.shuzu[i].x + this.plateW * 0.55) {
                            this.jifenN = this.jifenN + 3;
                        }
                        else {
                            this.jifenN = this.jifenN + 2;
                        }
                    }
                    else {
                        this.jifenN++;
                    }
                    // egret.Tween.removeTweens(this.addFen);
                    this.addImg(a.x, a.y, this.jifenN - yuanjifen);
                    // this.addFen.visible=true;
                    // egret.Tween.get(this.addFen).to({alpha:0},1000).call(()=>{
                    //     this.addFen.alpha=1;
                    //     this.addFen.visible=false;
                    // },this)
                    this.shuzu.splice(i, 1);
                    this.mingshu++;
                    this.shootN = this.shootN + 1;
                }
                else if (this.arrY >= this.shuzu[i].y && this.arrY <= this.shuzu[i].y + this.plateW && this.arrX == this.shuzu[i].x) {
                    zId = this.shuzu[i].id;
                    egret.Tween.removeTweens(this.shuzu[i]);
                    this.shuzu[i].parent.removeChild(this.shuzu[i]);
                    a.x = this.shuzu[i].x;
                    a.y = this.shuzu[i].y + this.plateW / 2;
                    this.bgAll.addChild(a);
                    a.animation.play("guidao", 1);
                    ZJ.AudioManager.Instance.play('mingzhongbazi', 1);
                    if (this.arrY >= this.shuzu[i].y + this.plateW * 0.3 && this.arrY <= this.shuzu[i].y + this.plateW * 0.7) {
                        if (this.arrY >= this.shuzu[i].y + this.plateW * 0.45 && this.arrY <= this.shuzu[i].y + this.plateW * 0.55) {
                            this.jifenN = this.jifenN + 3;
                        }
                        else {
                            this.jifenN = this.jifenN + 2;
                        }
                    }
                    else {
                        this.jifenN++;
                    }
                    // egret.Tween.removeTweens(this.addFen);
                    this.addImg(a.x, a.y, this.jifenN - yuanjifen);
                    // this.addFen.visible=true;
                    // egret.Tween.get(this.addFen).to({alpha:0},1000).call(()=>{
                    //     this.addFen.alpha=1;
                    //     this.addFen.visible=false;
                    // },this)
                    this.shuzu.splice(i, 1);
                    this.mingshu++;
                    this.shootN = this.shootN + 1;
                }
            }
        }
        else {
            var zxX = this.bgAll.width / 2;
            var zxY = this.bgAll.height / 2;
            var zssK = (bgY - zxY) / (yuanH - zxX);
            var zsxK = (yuanH - zxY) / (bgX - zxX);
            var yssK = (bgY - zxY) / (this.bgAll.width - yuanH - zxX);
            var ysxK = (yuanH - zxY) / (this.bgAll.width - bgX - zxX);
            var yxsK = (this.bgAll.height - yuanH - zxY) / (this.bgAll.width - bgX - zxX);
            var yxxK = (this.bgAll.height - bgX - zxY) / (this.bgAll.width - yuanH - zxX);
            var zxsK = (this.bgAll.height - yuanH - zxY) / (bgX - zxX);
            var zxxK = (this.bgAll.height - bgX - zxY) / (yuanH - zxX);
            var ad = (2 * Math.PI * yuanH) / 4;
            var targ = false;
            for (var j = 0; j < this.yuanzu.length; j++) {
                if (Math.abs(this.yuanzu[j].rotation) > 90) {
                    angle = 180 - Math.abs(this.yuanzu[j].rotation);
                }
                else {
                    angle = Math.abs(this.yuanzu[j].rotation);
                }
                var radian = Math.abs(angle * Math.PI / 180);
                var cos = Math.abs(Math.cos(radian)) * yuanC;
                var sin = Math.abs(Math.sin(radian)) * yuanC;
                if (Math.abs(this.arrow.rotation) < 90) {
                    if (this.yuanzu[j].x < bgWidth / 2 && this.yuanzu[j].y < bgWidth / 2) {
                        if (this.yuanzu[j].rotation <= 0 && this.yuanzu[j].rotation >= -90) {
                            var y = yuanH - cos;
                            var x = yuanH - sin;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.plateW < ad) {
                                if (this.yuanzu[j].rotation > this.jd - 90 && this.yuanzu[j].rotation < 0) {
                                    var radian1 = Math.abs((angle + this.jd) * Math.PI / 180);
                                    var cos1 = Math.abs(Math.cos(radian1)) * yuanC;
                                    var sin1 = Math.abs(Math.sin(radian1)) * yuanC;
                                    var y1 = yuanH - cos1;
                                    var x1 = yuanH - sin1;
                                    zsxK = (y1 - zxY) / (x1 - zxX);
                                    this.countJifen(this.k, zsxK, k1);
                                }
                            }
                            if (this.k >= zsxK && this.k <= k1) {
                                targ = true;
                                if (this.yuanzu[j].rotation == -90) {
                                    this.countJifen(this.k, zsxK, zssK);
                                }
                            }
                        }
                        else if (this.yuanzu[j].rotation > 0 && this.yuanzu[j].rotation <= 90) {
                            if (this.plateW < ad) {
                                var radian1 = Math.abs((angle + (90 - this.jd)) * Math.PI / 180);
                                cos = Math.abs(Math.cos(radian1)) * yuanC;
                                sin = Math.abs(Math.sin(radian1)) * yuanC;
                            }
                            var y = yuanH - sin;
                            var x = yuanH - cos;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.k >= k1 && this.k <= zssK) {
                                targ = true;
                            }
                        }
                    }
                    else if (this.yuanzu[j].x > bgWidth / 2 && this.yuanzu[j].y < bgWidth / 2) {
                        if (this.yuanzu[j].rotation >= 0 && this.yuanzu[j].rotation <= 90) {
                            var y = yuanH - cos;
                            var x = this.bgAll.width - yuanH + sin;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.plateW < ad) {
                                if (this.yuanzu[j].rotation > this.jd && this.yuanzu[j].rotation < 90) {
                                    var radian1 = Math.abs((angle - this.jd) * Math.PI / 180);
                                    var cos1 = Math.abs(Math.cos(radian1)) * yuanC;
                                    var sin1 = Math.abs(Math.sin(radian1)) * yuanC;
                                    var y1 = yuanH - cos1;
                                    var x1 = this.bgAll.width - yuanH + sin1;
                                    yssK = (y1 - zxY) / (x1 - zxX);
                                    this.countJifen(this.k, yssK, k1);
                                }
                            }
                            if (this.k >= yssK && this.k <= k1) {
                                targ = true;
                                if (this.yuanzu[j].rotation == 90) {
                                    this.countJifen(this.k, yssK, ysxK);
                                }
                            }
                        }
                        else if (this.yuanzu[j].rotation > 90 && this.yuanzu[j].rotation <= 180) {
                            if (this.plateW < ad) {
                                var radian1 = Math.abs((angle - (90 - this.jd)) * Math.PI / 180);
                                cos = Math.abs(Math.cos(radian1)) * yuanC;
                                sin = Math.abs(Math.sin(radian1)) * yuanC;
                            }
                            var y = yuanH - sin;
                            var x = this.bgAll.width - yuanH + cos;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.k >= k1 && this.k <= ysxK) {
                                targ = true;
                            }
                        }
                    }
                    // }   
                }
                else {
                    if (this.yuanzu[j].x > bgWidth / 2 && this.yuanzu[j].y > bgWidth / 2) {
                        if (this.yuanzu[j].rotation >= 90 && this.yuanzu[j].rotation <= 180) {
                            var x = this.bgAll.width - yuanH + sin;
                            var y = this.bgAll.height - yuanH + cos;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.plateW < ad) {
                                if (this.yuanzu[j].rotation > 90 + this.jd && this.yuanzu[j] < 180) {
                                    var radian1 = Math.abs((angle + this.jd) * Math.PI / 180);
                                    var cos1 = Math.abs(Math.cos(radian1)) * yuanC;
                                    var sin1 = Math.abs(Math.sin(radian1)) * yuanC;
                                    var x1 = this.bgAll.width - yuanH + sin1;
                                    var y1 = this.bgAll.height - yuanH + cos1;
                                    yxsK = (y1 - zxY) / (x1 - zxX);
                                    this.countJifen(this.k, yxsK, k1);
                                }
                            }
                            if (this.k >= yxsK && this.k <= k1) {
                                targ = true;
                                if (this.yuanzu[j].rotation == 180) {
                                    this.countJifen(this.k, yxsK, yxxK);
                                }
                            }
                        }
                        else {
                            var x = this.bgAll.width - yuanH + cos;
                            var y = this.bgAll.height - yuanH + sin;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.plateW < ad) {
                                var radian1 = Math.abs((angle + (90 - this.jd)) * Math.PI / 180);
                                cos = Math.abs(Math.cos(radian1)) * yuanC;
                                sin = Math.abs(Math.sin(radian1)) * yuanC;
                            }
                            x = this.bgAll.width - yuanH + cos;
                            y = this.bgAll.height - yuanH + sin;
                            k1 = (y - zxY) / (x - zxX);
                            if (this.k >= k1 && this.k <= yxxK) {
                                targ = true;
                            }
                        }
                    }
                    else if (this.yuanzu[j].x < bgWidth / 2 && this.yuanzu[j].y > bgWidth / 2) {
                        if (this.yuanzu[j].rotation <= -90 && this.yuanzu[j].rotation >= -180) {
                            var x = yuanH - sin;
                            var y = this.bgAll.height - yuanH + cos;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.plateW < ad) {
                                if (this.yuanzu[j] > -180 + this.jd && this.yuanzu[j].rotation < -90) {
                                    var radian1 = Math.abs((angle - this.jd) * Math.PI / 180);
                                    var cos1 = Math.abs(Math.cos(radian1)) * yuanC;
                                    var sin1 = Math.abs(Math.sin(radian1)) * yuanC;
                                    var x1 = yuanH - sin1;
                                    var y1 = this.bgAll.height - yuanH + cos1;
                                    zxxK = (y1 - zxY) / (x1 - zxX);
                                    this.countJifen(this.k, zxxK, k1);
                                }
                            }
                            if (this.k >= zxxK && this.k <= k1) {
                                targ = true;
                                if (this.yuanzu[j].rotation == -180) {
                                    this.countJifen(this.k, zxxK, zxsK);
                                }
                            }
                        }
                        else {
                            if (this.plateW < ad) {
                                var radian1 = Math.abs((angle - (90 - this.jd)) * Math.PI / 180);
                                cos = Math.abs(Math.cos(radian1)) * yuanC;
                                sin = Math.abs(Math.sin(radian1)) * yuanC;
                            }
                            var x = yuanH - cos;
                            var y = this.bgAll.height - yuanH + sin;
                            var k1 = (y - zxY) / (x - zxX);
                            if (this.k >= k1 && this.k <= zxsK) {
                                targ = true;
                            }
                        }
                    }
                }
                if (targ) {
                    zId = this.yuanzu[j].id;
                    egret.Tween.removeTweens(this.yuanzu[j]);
                    this.yuanzu[j].parent.removeChild(this.yuanzu[j]);
                    var a = ZJ.ResManager.instance.loadDragonBones("hk");
                    a.x = this.yuanzu[j].x;
                    a.y = this.yuanzu[j].y;
                    this.bgAll.addChild(a);
                    a.animation.play("guidao", 1);
                    ZJ.AudioManager.Instance.play('mingzhongbazi', 1);
                    this.yuanzu.splice(j, 1);
                    this.mingshu++;
                    this.jifenN = this.jifenN + 1;
                    this.addImg(a.x, a.y, this.jifenN - yuanjifen);
                    this.shootN = this.shootN + 1;
                    break;
                }
            }
        }
        for (var j = 0; j < this.shuzu.length; j++) {
            if (this.shuzu[j].id == zId) {
                egret.Tween.removeTweens(this.shuzu[j]);
                this.shuzu[j].parent.removeChild(this.shuzu[j]);
                this.shuzu.splice(j, 1);
            }
        }
        if (this.yuanzu.length > 0) {
            for (var j = 0; j < this.yuanzu.length; j++) {
                if (this.yuanzu[j].id == zId) {
                    egret.Tween.removeTweens(this.yuanzu[j]);
                    this.yuanzu[j].parent.removeChild(this.yuanzu[j]);
                    this.yuanzu.splice(j, 1);
                }
            }
        }
    };
    //重新开始游戏
    GameView.prototype.restart = function (e) {
        var _this = this;
        this.bgAll.removeEventListener("touchTap", this.setClick, this);
        this.i = 0;
        this.djs.animation.play("djs", 1);
        this.dituo.visible = true;
        this.guidao.visible = true;
        this.guidao1.visible = true;
        this.guidao2.visible = true;
        this.guidao3.visible = true;
        this.guidao4.visible = true;
        this.jifen.visible = true;
        this.bardi.visible = true;
        this.life.visible = true;
        this.guanji = 1;
        this.setConfigure();
        this.mingshu = this.MING_SHU;
        this.jifenN = 0;
        this.shootN = 0;
        this.id = 1;
        if (!ModuleConfig.compile.danji) {
            ChushouDataModel.instance.getHighestScore11008();
            ChushouDataModel.instance.playAgain11007();
        }
        // this.initdate.onData11007=(data:any)=>{
        //     this.createMain();
        //     setTimeout(() => {
        //         this.bgAll.removeChild(this.yindao);
        //         this.createBar();
        //         this.bgAll.addEventListener("touchTap", this.setClick, this);
        //     }, 2330)
        // }
        this.createMain();
        setTimeout(function () {
            _this.createBar();
            _this.bgAll.addEventListener("touchTap", _this.setClick, _this);
        }, 2330);
    };
    GameView.prototype.reAnimation = function () {
        var _this = this;
        clearInterval(this.dingshi);
        // this.arrImg.removeChildren();
        // egret.stopTick(this.moveBar, this);
        egret.Tween.removeTweens(this.barB);
        egret.Tween.removeTweens(this.barR);
        this.bar.removeChildren();
        this.tarImg.removeChildren();
        this.yuanImg.removeChildren();
        this.shuzu.splice(0, this.shuzu.length);
        this.yuanzu.splice(0, this.yuanzu.length);
        if (!ModuleConfig.compile.danji) {
            ChushouDataModel.instance.sendGameResult11012({
                winPlayerId: ChushouDataModel.instance.myData.playerId
            });
        }
        var dituo = ZJ.ResManager.instance.loadDragonBones("js");
        dituo.x = this.bgAll.width / 2;
        dituo.y = this.bgAll.height / 2;
        this.bgAll.addChild(dituo);
        dituo.animation.play("bazi", 1);
        this.dituo.visible = false;
        this.guidao.visible = false;
        this.guidao1.visible = false;
        this.guidao2.visible = false;
        this.guidao3.visible = false;
        this.guidao4.visible = false;
        this.jifen.visible = false;
        this.bardi.visible = false;
        this.life.visible = false;
        var guidao1 = ZJ.ResManager.instance.loadDragonBones("js");
        guidao1.x = this.bgAll.width / 2;
        this.bgAll.addChild(guidao1);
        guidao1.animation.play("guidao", 1);
        var guidao2 = ZJ.ResManager.instance.loadDragonBones("js");
        guidao2.y = this.bgAll.height / 2;
        this.bgAll.addChild(guidao2);
        guidao2.animation.play("guidao", 1);
        var guidao3 = ZJ.ResManager.instance.loadDragonBones("js");
        guidao3.x = this.bgAll.width / 2;
        guidao3.y = this.bgAll.height;
        this.bgAll.addChild(guidao3);
        guidao3.animation.play("guidao", 1);
        var guidao4 = ZJ.ResManager.instance.loadDragonBones("js");
        guidao4.x = this.bgAll.width;
        guidao4.y = this.bgAll.height / 2;
        this.bgAll.addChild(guidao4);
        guidao4.animation.play("guidao", 1);
        for (var i = 0; i < this.shuzu.length; i++) {
            var a = ZJ.ResManager.instance.loadDragonBones("hk");
            this.bgAll.addChild(a);
            a.x = this.shuzu[i].x;
            a.y = this.shuzu[i].y;
            if (this.shuzu[i].y == this.bg.y || this.shuzu[i].y == this.bg.y + this.bg.height) {
                a.x = this.shuzu[i].x + this.plateW / 2;
            }
            else {
                a.y = this.shuzu[i].y + this.plateW / 2;
            }
            a.animation.play("guidao", 1);
        }
        if (ModuleConfig.compile.danji) {
            setTimeout(function () {
                var view = ZJ.UIManager.instance.openView(UIName.Settle);
                view.setData({ score: _this.jifenN });
            }, 1000);
            ZJ.AudioManager.Instance.play('jiesuantanchu', 1);
        }
    };
    GameView.prototype.setLife = function () {
        if (this.mingshu == 2) {
            // let life='life'+this.mingshu+1;
            this.life3.source = "lifeHui_png";
        }
        else if (this.mingshu == 1) {
            this.life2.source = "lifeHui_png";
        }
        else if (this.mingshu == 0) {
            this.life1.source = "lifeHui_png";
        }
        else if (this.mingshu >= 3) {
            this.life1.source = "lifeRed_png";
            this.life2.source = "lifeRed_png";
            this.life3.source = "lifeRed_png";
        }
    };
    GameView.prototype.setFen = function () {
        this.jifen.text = this.jifenN.toString();
        // if (this.jifenN < 10) {
        //     this.jifen1.visible = false;
        //     this.jifen2.visible = false;
        //     this.jifen3.source = this.jifenN + "_png";
        // } else if (this.jifenN >= 10 && this.jifenN < 100) {
        //     let a = this.jifenN % 10;
        //     let b = (this.jifenN - a) / 10;
        //     this.jifen1.visible = false;
        //     this.jifen2.visible = true;
        //     this.jifen2.source = b + "_png";
        //     this.jifen3.source = a + "_png";
        // } else if (this.jifenN >= 100 && this.jifenN < 1000) {
        //     let a = this.jifenN % 10;
        //     let b = ((this.jifenN - a) % 100) / 10;
        //     let c = (this.jifenN - (b * 10) - a) / 100;
        //     this.jifen1.visible = true;
        //     this.jifen2.visible = true;
        //     this.jifen1.source = c + "_png";
        //     this.jifen2.source = b + "_png";
        //     this.jifen3.source = a + "_png";
        // }
    };
    GameView.prototype.setConfigure = function () {
        var pat = /\d+/g;
        var target_num = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["TARGET_NUM"][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < target_num.length; i += 2) {
            if (this.guanji >= target_num[i]) {
                if (this.guanji >= target_num[i + 2]) {
                    continue;
                }
                this.bashuliang = target_num[i + 1];
            }
        }
        var target_move_type = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["TARGET_MOVE_TYPE"][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < target_move_type.length; i += 5) {
            if (this.guanji >= target_move_type[i]) {
                if (this.guanji >= target_move_type[i + 5]) {
                    continue;
                }
                if (Math.ceil(Math.random() * 100) < target_move_type[i + 4]) {
                    this.plateRguan = this.guanji;
                    var target_move_speed = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["TARGET_MOVE_SPEED"][xlsx.c_xiaoli_data].match(pat);
                    for (var i_13 = 0; i_13 < target_move_speed.length; i_13 += 3) {
                        if (this.guanji >= target_move_speed[i_13]) {
                            if (this.guanji >= target_move_speed[i_13 + 3]) {
                                continue;
                            }
                            this.targetS = Math.ceil(parseInt(target_move_speed[i_13 + 1]) + Math.random() * (target_move_speed[i_13 + 2] - target_move_speed[i_13 + 1]));
                        }
                    }
                }
            }
        }
        var target_length = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["TARGET_LENGTH"][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < target_length.length; i += 3) {
            if (this.guanji >= target_length[i]) {
                if (this.guanji >= target_length[i + 3]) {
                    continue;
                }
                this.targetV = Math.ceil(parseInt(target_length[i + 1]) + Math.random() * (target_length[i + 2] - target_length[i + 1]));
            }
        }
        var rotate_direc = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["DARTS_ROTATE_DIREC "][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < rotate_direc.length; i += 3) {
            if (this.guanji >= rotate_direc[i]) {
                if (Math.ceil(Math.random() * 100) < rotate_direc[i + 1]) {
                    this.arrowR = 360;
                }
                else {
                    this.arrowR = -360;
                }
            }
        }
        var rotate_speed = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["DARTS_ROTATE_SPEED"][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < rotate_speed.length; i += 2) {
            if (this.guanji >= rotate_speed[i]) {
                this.arrowV = rotate_speed[i + 1];
            }
        }
        var time_limit = ZJ.TableManager.instance.tables[xlsx.cfg_c_xiaoli]["TIME_LIMIT"][xlsx.c_xiaoli_data].match(pat);
        for (var i = 0; i < time_limit.length; i += 2) {
            if (this.guanji >= time_limit[i]) {
                this.time = time_limit[i + 1];
            }
        }
    };
    GameView.prototype.getPoint = function (k, b, a1, b1, c) {
        var yuanW = new YuanJiao().width;
        var bgX = this.bg.x;
        var aa = 1 + Math.pow(k, 2);
        var bb = 2 * k * (b - b1) - 2 * a1;
        var cc = Math.pow(a1, 2) + Math.pow(b - b1, 2) - Math.pow(yuanW - bgX, 2);
        var dd = Math.pow(bb, 2) - 4 * aa * cc;
        if (c == 0) {
            var x = (-bb - Math.sqrt(dd)) / (2 * aa);
        }
        else if (c == 1) {
            var x = (-bb + Math.sqrt(dd)) / (2 * aa);
        }
        return x;
    };
    return GameView;
}(ZJ.ViewBase));
__reflect(GameView.prototype, "GameView");
//# sourceMappingURL=GameView.js.map