class UILayer {
	public static View = 0;
	public static Pop = 1;
	public static SDK = 2;
}

class UIName {
	public static Game = "Game";
	public static Loading = "Loading";
}

class ModuleConfig {
	public constructor() {
	}

	///////////////// 保留变量
	/**
	 * 显示层级
	 */
	public static uiLayers = [UILayer.View, UILayer.Pop, UILayer.SDK];

	// public static protoFiles = ["p11_proto"]; // 旧
	public static protoText = "message cs_10000{required string openId = 1;required string nickname = 2; required string avatarUrl = 3; required string sign = 4; required int32 timestamp = 5; }message sc_10000{required int32 result = 1;required int64 playerId = 2; }message cs_10001{required string matchId = 1; }message sc_10001{required int32 result = 1;required int64 roomId = 2; required string matchId = 3; }message cs_10002{}message sc_10002{required int32 result = 1;}message sc_10003{required int32 readyTime = 1;}message cs_10004{}message cs_10010{required bytes processData = 1;}message sc_10010{required int64 playerId = 1;required bytes processData = 2;}message cs_10011{required bytes resultData = 2;}message sc_10011{required int64 playerId = 1;required bytes resultData = 2; repeated int32 seeds = 3; }message playerInfo{required int64 playerId = 1;required string openId = 2; required string nickname = 3; required string avatarUrl = 4;required int32 isRobot = 5; 	required int32 gender = 6;				optional int32 battleTimes = 7; optional int32 robotLevel = 8;}message cs_11002{}message sc_11002{required int32 result = 1;required int64 playerId = 2;required string openId = 3; repeated int32 seeds =4;}message sc_11003{required int32 readyTime = 1; repeated playerInfo playerInfos = 2;}message cs_11004{}message cs_11010{required bytes processData = 1;}message sc_11010{required int64 playerId = 1;required bytes processData = 2;}message cs_11011{required int32 playerScore = 1; required bytes resultData = 2;optional int32 level = 3; optional int32 score2 = 4;}message sc_11011{required int64 playerId = 1;required int32 playerScore = 2; required bytes resultData = 3;repeated int32 seeds = 4; }message cs_11012{required int64 winPlayerId = 1; }message sc_11012{required int32 result = 1;required int64 winPlayerId = 2; }message cs_11013{}";

	/**
	 * ui配置
	 */
	public static uiDatas: { [key: string]: ZJ.UIData } = {
		[UIName.Game]: new ZJ.UIData(UIName.Game, UILayer.View, GameView),
		[UIName.Loading]: new ZJ.UIData(UIName.Loading, UILayer.Pop, LoadingView),
	};

	/**
	 * 编译条件，全小写。
	 */
	public static compile: any = {
		need_loading: true,
		ali: true,
		danji: true,
	}
	///////////////// 保留变量 end 
	///////////////// 以下开始自定义变量 

	public static ip = "192.168.1.134";
	public static port = "8081";
	public static ws = "ws";
	public static singlePort = "8081";
	public static doublePort = "8081";
	

}

class EventName {
	public static SPEED = "Speed";
	public static SPEED_READY = "SpeedReady";
	public static MOVE_LEFT = "Moveleft";
	public static MOVE_RIGHT = "MoveRight";
	public static MOVE_DOWN = "MoveDown";
	public static MOVE_FAST_DOWN = "MoveFastDown";
	public static ROTATE = "Rotate";
	public static ADD_OBS_BLOCK = "AddObsBlock";
	public static SPECIAL_X = "Special_X";
	public static MOVE_END_EVENT = "MoveEndEvent";
	public static GAME_OVER = "GameOver";
}

