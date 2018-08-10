class UILayer {
	public static View = 0;
	public static Pop = 1;
	public static SDK = 2;
}

class UIName {
	public static Test = "Test";
	public static Game = "Game";
	public static Settle = "Settle";
	public static Loading = "Loading";
}

class ModuleConfig {
	public constructor() {
	}

	/**
	 * 胜利的碟子，从1开始。
	 */
	public static WIN_INDEX = 31;

	/**
	 * 显示层级
	 */
	public static uiLayers = [UILayer.View, UILayer.Pop, UILayer.SDK];

	/**
	 * ui配置
	 */
	public static uiDatas: { [key: string]: ZJ.UIData } = {
		[UIName.Game]: new ZJ.UIData(UIName.Game, UILayer.View, GameView),
		[UIName.Settle]: new ZJ.UIData(UIName.Settle, UILayer.View, SettleView),
		[UIName.Loading]: new ZJ.UIData(UIName.Loading, UILayer.View, LoadingView)
	};

	/**
	 * 编译条件，全小写。
	 */
	public static compile: any = {
		need_loading: true,
		chushou: true,
		danji: true,
		single: true,
	}

	public static ip = "dev-game.u17games.com";
	public static singlePort = "12061";
	public static doublePort = "12062";
	public static ws = "ws";
	// public static ip = "hsdailyshot.kascendgame.com";
	 public static port = "20301";
	// public static ws = "wss";
	public static protoFiles = ["p10_proto", "p11_proto"];
}

class EventName {
	public static Test = "Test";
	public static GAME_RESTART = "GAME_RESTART";
	public static PLAYER_DIE = "PLAYER_DIE";
	public static PLAYER_FUHUO = "PLAYER_FUHUO";
	public static PLAYER_WIN = "PLAYER_WIN";
	public static PLAYER_JUMP_END = "PLAYER_JUMP_END";
}

