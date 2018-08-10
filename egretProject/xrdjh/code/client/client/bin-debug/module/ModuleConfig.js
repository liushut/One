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
    UIName.Test = "Test";
    UIName.Loading = "Loading";
    /**
     * 开始按钮
     */
    UIName.Game0 = "Game0";
    /**
     * 合作/欺骗
     */
    UIName.Game1 = "Game1";
    /**
     * 合作/欺骗结果
     */
    UIName.Game2 = "Game2";
    /**
     * 角色玩一轮谁赢？
     */
    UIName.Game3 = "Game3";
    /**
     * 进化三部曲准备
     */
    UIName.Game4 = "Game4";
    /**
     * 进化三部曲开始
     */
    UIName.Game5 = "Game5";
    /**
     * 进化三部曲扩展
     */
    UIName.Game6 = "Game6";
    /**
     * 噪音背景
     */
    UIName.Game7 = "Game7";
    /**
     * 噪音描述
     */
    UIName.Game8 = "Game8";
    /**
     * 噪音谁赢？
     */
    UIName.Game9 = "Game9";
    /**
     * 沙盒
     */
    UIName.Game10 = "Game10";
    /**
     * 学到了什么
     */
    UIName.Game11 = "Game11";
    /**
     * 教训
     */
    UIName.Game12 = "Game12";
    /**
     * 致谢
     */
    UIName.Game13 = "Game13";
    UIName.Scratch = "Scratch";
    UIName.Game = "Game";
    UIName.Settle = "Settle";
    /**
     * 留言板
     */
    UIName.Message = "Message";
    /**
     * 具体评论界面
     */
    UIName.Comments = "Comments";
    return UIName;
}());
__reflect(UIName.prototype, "UIName");
var ModuleConfig = (function () {
    function ModuleConfig() {
    }
    /**
     * 胜利的碟子，从1开始。
     */
    ModuleConfig.WIN_INDEX = 6;
    /**
     * 显示层级
     */
    ModuleConfig.uiLayers = [UILayer.View, UILayer.Pop, UILayer.SDK];
    /**
     * ui配置
     */
    ModuleConfig.uiDatas = (_a = {},
        _a[UIName.Test] = new ZJ.UIData(UIName.Test, UILayer.View, TestView),
        _a[UIName.Loading] = new ZJ.UIData(UIName.Loading, UILayer.Pop, LoadingView),
        _a[UIName.Game0] = new ZJ.UIData(UIName.Game0, UILayer.View, GameView0),
        _a[UIName.Game1] = new ZJ.UIData(UIName.Game1, UILayer.View, GameView1),
        _a[UIName.Game2] = new ZJ.UIData(UIName.Game2, UILayer.View, GameView2),
        _a[UIName.Game3] = new ZJ.UIData(UIName.Game3, UILayer.View, GameView3),
        _a[UIName.Game4] = new ZJ.UIData(UIName.Game4, UILayer.View, GameView4),
        _a[UIName.Game5] = new ZJ.UIData(UIName.Game5, UILayer.View, GameView5),
        _a[UIName.Game6] = new ZJ.UIData(UIName.Game6, UILayer.View, GameView6),
        _a[UIName.Game7] = new ZJ.UIData(UIName.Game7, UILayer.View, GameView7),
        _a[UIName.Game8] = new ZJ.UIData(UIName.Game8, UILayer.View, GameView8),
        _a[UIName.Game9] = new ZJ.UIData(UIName.Game9, UILayer.View, GameView9),
        _a[UIName.Game10] = new ZJ.UIData(UIName.Game10, UILayer.View, GameView10),
        _a[UIName.Game11] = new ZJ.UIData(UIName.Game11, UILayer.View, GameView11),
        _a[UIName.Game12] = new ZJ.UIData(UIName.Game12, UILayer.View, GameView12),
        _a[UIName.Game13] = new ZJ.UIData(UIName.Game13, UILayer.View, GameView13),
        _a[UIName.Scratch] = new ZJ.UIData(UIName.Scratch, UILayer.Pop, ScratchView),
        _a[UIName.Message] = new ZJ.UIData(UIName.Message, UILayer.View, MessageView),
        _a[UIName.Comments] = new ZJ.UIData(UIName.Comments, UILayer.View, CommentsView),
        _a);
    /**
     * 编译条件，全小写。
     */
    ModuleConfig.compile = {
        need_loading: false,
        danji: true
    };
    ModuleConfig.FADE_TIME = 500;
    // public static ip = "192.168.1.194";
    // public static port = "12011";
    ModuleConfig.ip = "dev-game.u17games.com";
    ModuleConfig.port = "12011";
    ModuleConfig.protoText = "";
    return ModuleConfig;
}());
__reflect(ModuleConfig.prototype, "ModuleConfig");
var EventName = (function () {
    function EventName() {
    }
    EventName.Test = "Test";
    EventName.GAME_RESTART = "GAME_RESTART";
    EventName.GAME_EXIT = "GAME_EXIT";
    EventName.PLAYER_DIE = "PLAYER_DIE";
    EventName.PLAYER_FUHUO = "PLAYER_FUHUO";
    EventName.PLAYER_WIN = "PLAYER_WIN";
    EventName.PLAYER_JUMP_END = "PLAYER_JUMP_END";
    // ITERATED
    EventName.ITERATED_ROUND_START = "ITERATED_ROUND_START";
    EventName.ITERATED_ROUND_END = "ITERATED_ROUND_END";
    return EventName;
}());
__reflect(EventName.prototype, "EventName");
var _a;
//# sourceMappingURL=ModuleConfig.js.map