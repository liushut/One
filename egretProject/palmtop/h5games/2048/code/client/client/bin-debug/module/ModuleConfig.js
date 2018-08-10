var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UILayer = (function () {
    function UILayer() {
    }
    UILayer.View = 0;
    UILayer.Pop = 1;
    UILayer.SDK = 2;
    return UILayer;
}());
__reflect(UILayer.prototype, "UILayer");
var UIName = (function () {
    function UIName() {
    }
    UIName.Game = "Game";
    UIName.Loading = "Loading";
    return UIName;
}());
__reflect(UIName.prototype, "UIName");
var ModuleConfig = (function () {
    function ModuleConfig() {
    }
    ///////////////// 保留变量
    /**
     * 显示层级
     */
    ModuleConfig.uiLayers = [UILayer.View, UILayer.Pop, UILayer.SDK];
    // public static protoFiles = ["p11_proto"]; // 旧
    ModuleConfig.protoText = "message cs_10000{required string openId = 1;required string nickname = 2; required string avatarUrl = 3; required string sign = 4; required int32 timestamp = 5; }message sc_10000{required int32 result = 1;required int64 playerId = 2; }message cs_10001{required string matchId = 1; }message sc_10001{required int32 result = 1;required int64 roomId = 2; required string matchId = 3; }message cs_10002{}message sc_10002{required int32 result = 1;}message sc_10003{required int32 readyTime = 1;}message cs_10004{}message cs_10010{required bytes processData = 1;}message sc_10010{required int64 playerId = 1;required bytes processData = 2;}message cs_10011{required bytes resultData = 2;}message sc_10011{required int64 playerId = 1;required bytes resultData = 2; repeated int32 seeds = 3; }message playerInfo{required int64 playerId = 1;required string openId = 2; required string nickname = 3; required string avatarUrl = 4;required int32 isRobot = 5; 	required int32 gender = 6;				optional int32 battleTimes = 7; optional int32 robotLevel = 8;}message cs_11002{}message sc_11002{required int32 result = 1;required int64 playerId = 2;required string openId = 3; repeated int32 seeds =4;}message sc_11003{required int32 readyTime = 1; repeated playerInfo playerInfos = 2;}message cs_11004{}message cs_11010{required bytes processData = 1;}message sc_11010{required int64 playerId = 1;required bytes processData = 2;}message cs_11011{required int32 playerScore = 1; required bytes resultData = 2;optional int32 level = 3; optional int32 score2 = 4;}message sc_11011{required int64 playerId = 1;required int32 playerScore = 2; required bytes resultData = 3;repeated int32 seeds = 4; }message cs_11012{required int64 winPlayerId = 1; }message sc_11012{required int32 result = 1;required int64 winPlayerId = 2; }message cs_11013{}";
    /**
     * ui配置
     */
    ModuleConfig.uiDatas = (_a = {},
        _a[UIName.Game] = new ZJ.UIData(UIName.Game, UILayer.View, GameView),
        _a[UIName.Loading] = new ZJ.UIData(UIName.Loading, UILayer.Pop, LoadingView),
        _a);
    /**
     * 编译条件，全小写。
     */
    ModuleConfig.compile = {
        need_loading: true,
        ali: true,
        danji: true,
    };
    ///////////////// 保留变量 end 
    ///////////////// 以下开始自定义变量 
    ModuleConfig.ip = "192.168.1.134";
    ModuleConfig.port = "8081";
    ModuleConfig.ws = "ws";
    ModuleConfig.singlePort = "8081";
    ModuleConfig.doublePort = "8081";
    return ModuleConfig;
}());
__reflect(ModuleConfig.prototype, "ModuleConfig");
var EventName = (function () {
    function EventName() {
    }
    EventName.SPEED = "Speed";
    EventName.SPEED_READY = "SpeedReady";
    EventName.MOVE_LEFT = "Moveleft";
    EventName.MOVE_RIGHT = "MoveRight";
    EventName.MOVE_DOWN = "MoveDown";
    EventName.MOVE_FAST_DOWN = "MoveFastDown";
    EventName.ROTATE = "Rotate";
    EventName.ADD_OBS_BLOCK = "AddObsBlock";
    EventName.SPECIAL_X = "Special_X";
    EventName.MOVE_END_EVENT = "MoveEndEvent";
    EventName.GAME_OVER = "GameOver";
    return EventName;
}());
__reflect(EventName.prototype, "EventName");
var _a;
//# sourceMappingURL=ModuleConfig.js.map