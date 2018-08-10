class MatchView extends ZJ.ViewBase{

	public idInput:eui.TextInput;
	public matchInput:eui.TextInput;
	public match:eui.Button;
	public login:eui.Button;
	public ready:eui.Button;
	public a10010:eui.Button;
	public a10011:eui.Button;

	private log:eui.Label;

	public constructor() {
		super();
		this.skinName = "MatchViewSkin";
	}

	public childrenCreated(){
		super.childrenCreated();

		this.idInput.textDisplay.size = 80;
		this.idInput.textDisplay.textAlign = "center";
		this.idInput.textDisplay.verticalAlign = "middle";
		this.idInput.textDisplay.left = 0;
		this.idInput.textDisplay.right = 0;
		this.idInput.textDisplay.top = 0;
		this.idInput.textDisplay.bottom = 0;

		this.matchInput.textDisplay.size = 80;
		this.matchInput.textDisplay.textAlign = "center";
		this.matchInput.textDisplay.verticalAlign = "middle";
		this.matchInput.textDisplay.left = 0;
		this.matchInput.textDisplay.right = 0;
		this.matchInput.textDisplay.top = 0;
		this.matchInput.textDisplay.bottom = 0;
		this.login.addEventListener("touchTap", ()=>{
			this.sendLogin();
			this.log.text = "已点击登录";
		}, this);
		this.match.addEventListener("touchTap", ()=>{
			let inputText = this.matchInput.text;
			this.matchRoom(inputText);
			this.log.text = "已点击匹配";
		}, this);
		this.ready.addEventListener("touchTap", ()=>{
			this.readyGame();
			this.log.text = "已点击准备";
		}, this);
		this.a10010.addEventListener("touchTap", ()=>{
			ZJ.SocketManager.instance.send(11010, {
            	processData: ZJ.Util.objToByteArray("11010的数据").bytes
        	});
			this.log.text = "已点击发送11010";
		}, this);
		this.a10011.addEventListener("touchTap", ()=>{
			ZJ.SocketManager.instance.send(11011, {
            	resultData: ZJ.Util.objToByteArray("11011的数据").bytes
        	});
			this.log.text = "已点击发送11011";
		}, this);

		this.log = new eui.Label();
		this.log.horizontalCenter = 450;
		this.log.verticalCenter = -200;
		this.log.textAlign = "center";
		this.log.verticalAlign = "middle";
		this.addChild(this.log);
	}


	private sendLogin() {
        // if (!ModuleConfig.compile.danji) {
        //     ZJ.SocketManager.instance.send(11000, {
        //         openId: this.idInput.text,
        //         nickname: yyGameConfig.nickname,
        //         avatarUrl: yyGameConfig.avatarUrl,
        //         timestamp: yyGameConfig.timestamp,
        //         sign: yyGameConfig.sign,
        //     })
        // }
    }


	/** 申请进入匹配房间 */
    private matchRoom(matchId){
        ZJ.SocketManager.instance.send(11001, {
            matchId:matchId
        });
    }


	/** 准备游戏 */
    private readyGame(){
        ZJ.SocketManager.instance.send(11002, {
        });
    }
}