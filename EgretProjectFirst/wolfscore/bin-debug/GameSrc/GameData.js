var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//全局类
var GameData = (function () {
    function GameData() {
    }
    //得到当前玩家
    GameData.getPlayer = function (type) {
        return type === GameData.p1 ? GameData.player1 : GameData.player2;
    };
    //得到自己玩家
    GameData.getMePlayer = function () {
        return GameData.type === GameData.p1 ? GameData.player1 : GameData.player2;
    };
    //得到别的玩家
    GameData.getOtherPlayer = function () {
        return GameData.type === GameData.p2 ? GameData.player1 : GameData.player2;
    };
    GameData.initPlayer = function (type, name, ID, url) {
        var player = GameData.getPlayer(type);
        player.userId = ID;
        player.userName = name;
        player.type = type;
        player.url = url;
        player.score = 0;
        player.blood = GameData.MAX_BLOOD;
        player.isDie = false;
        player.comboNum = 0;
        player.highComobNum = 0;
        player.perfect = 0;
        player.good = 0;
        player.miss = 0;
        player.isHalfLeave = false;
        console.log("[GameData] player.init =>" + JSON.stringify(player));
        return player;
    };
    GameData.setType = function (userID) {
        GameData.type = userID > GameData.userId ? GameData.p1 : GameData.p2;
        console.log("GameData.type => " + GameData.type);
    };
    GameData.resetType = function () {
        GameData.type = GameData.p1;
    };
    GameData.resetAll = function () {
        GameData.type = GameData.p1;
    };
    GameData.FPS = 10; //FPS 
    GameData.BUFFER_TIME = 100; //网络延迟
    //room
    GameData.isAddRobot = false;
    GameData.debug = true;
    GameData.userId = 0;
    GameData.userName = "";
    GameData.avatarUrl = "avatar_png";
    GameData.token = "";
    GameData.roomId = "";
    GameData.p1 = "r"; //红玩家
    GameData.p2 = "b"; //蓝玩家
    GameData.player1 = new Player(GameData.p1);
    GameData.player2 = new Player(GameData.p2);
    GameData.type = GameData.p1; //r boolean  当前玩家
    //成长数据
    GameData.gold = 10;
    GameData.MAX_BLOOD = 20;
    GameData.BASE_SCORE = 10;
    GameData.Gold4Relive = 10;
    GameData.TIME_MIN_INTVRAL_ENEMY_CREATE = 0.5;
    GameData.SPEED_MAX_RUN_MULTIPLE = 2;
    GameData.GAME_TOTAL_TIME = 100;
    // 状态 用于状态标识 
    GameData.GAME_STATUS_PLAY = 5;
    GameData.GAME_STATUS_SINGLE = -1;
    GameData.GAME_STATUS_OVER = 6;
    GameData.GAME_STATUS_PLAY_DEAD = 7;
    GameData.gameStatus = GameData.GAME_STATUS_SINGLE;
    GameData.closeMusic = false;
    GameData.closeBgMusic = false;
    GameData.bgSpeed = 1;
    GameData.enemySpeed = 30; //enemy run speed
    GameData.createEnemyInterval = 2; //secend
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map