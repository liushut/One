var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game(root) {
        this._root = root;
        this.createGroupRect();
        this.createTimer();
        this.startGame();
    }
    Game.prototype.createGroupRect = function () {
        this._rootRect = new egret.Sprite();
        this._root.addChild(this._rootRect);
        this._groupRects = [];
        this._row = Data.getRectRow();
        var groupRect; //创建地图
        for (var i = 0; i < this._row; i++) {
            groupRect = new GroupRect();
            groupRect.addEventListener("gameOver", this.gameOver, this);
            groupRect.addEventListener("clickRight", this.MoveNextRow, this);
            this._groupRects.push(groupRect);
            groupRect.y = Data.getRectWidth() * i;
            this._rootRect.addChild(groupRect);
        }
        this._rootRect.y = Data.getStageHeight() - this._rootRect.height; //舞台高度 - 当前rectroot高度   显示最下面的就ok了
    };
    Game.prototype.gameOver = function () {
        this._timerPanel.stop();
        if (!this.gameOverPanel) {
            this.gameOverPanel = new GameOverPanel();
            this.gameOverPanel.addEventListener("startGame", this.startGame, this);
        }
        this._root.addChild(this.gameOverPanel);
    };
    Game.prototype.MoveNextRow = function () {
        for (var i = 0; i < this._row; i++) {
            this._groupRects[i].move();
        }
        Data._score++;
    };
    Game.prototype.createTimer = function () {
        this._timerPanel = new TimerPanel();
        this._timerPanel.addEventListener("gameOver", this.gameOver, this);
        this._root.addChild(this._timerPanel);
    };
    Game.prototype.startGame = function () {
        Data._score = 0;
        for (var i = 0; i < this._row; i++) {
            this._groupRects[i].init(); //初始化状态
            this._groupRects[i].y = Data.getRectWidth() * i; //Y轴排列
            this._groupRects[i]._currentRow = i;
            //判断i的值
            if (i != (this._row - 1)) {
                this._groupRects[i].createBlackRect();
            }
        }
        this._timerPanel.start();
    };
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map