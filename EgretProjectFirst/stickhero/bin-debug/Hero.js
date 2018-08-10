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
//自己的英雄类
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(heroType) {
        var _this = _super.call(this) || this;
        _this.heroSprite = new egret.Bitmap(); //英雄图片
        _this.init(heroType);
        return _this;
    }
    Hero.prototype.init = function (heroType) {
        var herosprite = RES.getRes("hero0" + heroType); //图片
        var tempBit = new egret.Bitmap();
        tempBit.texture = herosprite;
        this.heroSprite = tempBit;
        this.animation(heroType);
    };
    Hero.prototype.animation = function (heroType) {
        var movieJson = RES.getRes("hero" + heroType + "_json"); //json
        var moviePng = RES.getRes("hero" + heroType + "_png"); //图集
        var mcFactoty = new egret.MovieClipDataFactory(movieJson, moviePng);
        var mcHero = new egret.MovieClip(mcFactoty.generateMovieClipData("stay"));
        this.addChild(mcHero);
        mcHero.play(-1);
        this.anchorOffsetX = 0;
        this.anchorOffsetY = this.heroSprite.height / 2;
        this.mcDataFactory = mcFactoty;
        this.heroMC = mcHero;
    };
    return Hero;
}(egret.Sprite));
__reflect(Hero.prototype, "Hero");
//# sourceMappingURL=Hero.js.map