class UILayer {
	public static View = 0;
	public static Pop = 1;
	public static SDK = 2;
}

class UIName {
	public static Test = "Test";
	public static Loading = "Loading";
	/**
	 * 开始按钮
	 */
	public static Game0 = "Game0";
	/**
	 * 合作/欺骗
	 */
	public static Game1 = "Game1";
	/**
	 * 合作/欺骗结果
	 */
	public static Game2 = "Game2";
	/**
	 * 角色玩一轮谁赢？
	 */
	public static Game3 = "Game3";
	/**
	 * 进化三部曲准备
	 */
	public static Game4 = "Game4";
	/**
	 * 进化三部曲开始
	 */
	public static Game5 = "Game5";
	/**
	 * 进化三部曲扩展
	 */
	public static Game6 = "Game6";
	/**
	 * 噪音背景
	 */
	public static Game7 = "Game7";
	/**
	 * 噪音描述
	 */
	public static Game8 = "Game8";
	/**
	 * 噪音谁赢？
	 */
	public static Game9 = "Game9";
	/**
	 * 沙盒
	 */
	public static Game10 = "Game10";
	/**
	 * 学到了什么
	 */
	public static Game11 = "Game11";
	/**
	 * 教训
	 */
	public static Game12 = "Game12";
	/**
	 * 致谢
	 */
	public static Game13 = "Game13";
	public static Scratch = "Scratch";
	public static Game = "Game";
	public static Settle = "Settle";


	/**
	 * 留言板
	 */
	public 	static Message = "Message";
	
	/**
	 * 具体评论界面
	 */
	public static Comments = "Comments";
}

class ModuleConfig {
	public constructor() {
	}

	/**
	 * 胜利的碟子，从1开始。
	 */
	public static WIN_INDEX = 6;

	/**
	 * 显示层级
	 */
	public static uiLayers = [UILayer.View, UILayer.Pop, UILayer.SDK];

	/**
	 * ui配置
	 */
	public static uiDatas: { [key: string]: ZJ.UIData } = {
		[UIName.Test]: new ZJ.UIData(UIName.Test, UILayer.View, TestView),
		[UIName.Loading]: new ZJ.UIData(UIName.Loading, UILayer.Pop, LoadingView),
		[UIName.Game0]: new ZJ.UIData(UIName.Game0, UILayer.View, GameView0),
		[UIName.Game1]: new ZJ.UIData(UIName.Game1, UILayer.View, GameView1),
		[UIName.Game2]: new ZJ.UIData(UIName.Game2, UILayer.View, GameView2),
		[UIName.Game3]: new ZJ.UIData(UIName.Game3, UILayer.View, GameView3),
		[UIName.Game4]: new ZJ.UIData(UIName.Game4, UILayer.View, GameView4),
		[UIName.Game5]: new ZJ.UIData(UIName.Game5, UILayer.View, GameView5),
		[UIName.Game6]: new ZJ.UIData(UIName.Game6, UILayer.View, GameView6),
		[UIName.Game7]: new ZJ.UIData(UIName.Game7, UILayer.View, GameView7),
		[UIName.Game8]: new ZJ.UIData(UIName.Game8, UILayer.View, GameView8),
		[UIName.Game9]: new ZJ.UIData(UIName.Game9, UILayer.View, GameView9),
		[UIName.Game10]: new ZJ.UIData(UIName.Game10, UILayer.View, GameView10),
		[UIName.Game11]: new ZJ.UIData(UIName.Game11, UILayer.View, GameView11),
		[UIName.Game12]: new ZJ.UIData(UIName.Game12, UILayer.View, GameView12),
		[UIName.Game13]: new ZJ.UIData(UIName.Game13, UILayer.View, GameView13),
		[UIName.Scratch]: new ZJ.UIData(UIName.Scratch, UILayer.Pop, ScratchView),
		[UIName.Message]:new ZJ.UIData(UIName.Message,UILayer.View,MessageView),
		[UIName.Comments]:new ZJ.UIData(UIName.Comments,UILayer.View,CommentsView),
	};

	/**
	 * 编译条件，全小写。
	 */
	public static compile: any = {
		need_loading: false,
		danji: true
	}

	public static FADE_TIME = 500;

	// public static ip = "192.168.1.194";
	// public static port = "12011";
	public static ip = "dev-game.u17games.com";
	public static port = "12011";
	public static protoText = "";
}

class EventName {
	public static Test = "Test";
	public static GAME_RESTART = "GAME_RESTART";
	public static GAME_EXIT = "GAME_EXIT";
	public static PLAYER_DIE = "PLAYER_DIE";
	public static PLAYER_FUHUO = "PLAYER_FUHUO";
	public static PLAYER_WIN = "PLAYER_WIN";
	public static PLAYER_JUMP_END = "PLAYER_JUMP_END";

	// ITERATED
	public static ITERATED_ROUND_START = "ITERATED_ROUND_START";
	public static ITERATED_ROUND_END = "ITERATED_ROUND_END";
}

