class GameSceneView extends egret.Sprite
{
    public static _gameScene:GameSceneView;
    private thisContainer:egret.Sprite;
    constructor()
    {
        super();
        GameSceneView._gameScene = this;
        this.initView();
    }
    public static errorResponse(errCode:number, errMsg:string){
        console.log("错误回调：errCode=" + errCode + " errMsg="+errMsg);
        GameSceneView._gameScene.errorView(0,"错误回调：errCode=" + errCode + " errMsg="+errMsg);
    }
    private errorResponses(event:egret.Event){
        //mvs.MsResponse.getInstance.removeEventListener(mvs.MsEvent.EVENT_ERROR_RSP, this.errorResponse, this);
        let errcode:number = event.data.errCode;
        let errmsg:string = event.data.errMsg;
        if(errcode == 1001){
            if(errmsg != "" && errmsg.indexOf("hotel") >= 0){
                GameSceneView._gameScene.errorView(1,"错误回调：errCode=" + errcode + " errMsg="+errmsg);
            }else{
                 GameSceneView._gameScene.errorView(0,"错误回调：errCode=" + errcode + " errMsg="+errmsg);
            }
        }
    }
    private initView():void
    {
         mvs.MsResponse.getInstance.addEventListener(mvs.MsEvent.EVENT_ERROR_RSP, this.errorResponses, this);
        this.thisContainer = new egret.Sprite();
        this.addChild(this.thisContainer);
        this.login();
        // this.startModel();
    }

    public startModel(){
        this.removeAll();
        let starting:StartModelUI = new StartModelUI();
        this.thisContainer.addChild(starting);
    }

    public login():void
    {
        this.removeAll();
        var loginview:LoginView = new LoginView();
        loginview.width = this.width;
        loginview.height = this.height;
        this.thisContainer.addChild(loginview);
    }
    public lobby():void
    {
        this.removeAll();
        var lobbyView:LobbyView = new LobbyView();
        this.thisContainer.addChild(lobbyView);
    }
    public match(tags ? :any):void{
        this.removeAll();
        if(tags){
            var matchView:MatchView = new MatchView(tags);
            this.thisContainer.addChild(matchView);
        }else{
            var matchView:MatchView = new MatchView();
            this.thisContainer.addChild(matchView);
        }
        
    }
	public play():void{
		this.removeAll();
        var gamePlay:GamePlayView = new GamePlayView();
        this.thisContainer.addChild(gamePlay);
	}

	public showResult():void{
		this.removeAll();
        var resultView:ResultView = new ResultView();
        this.thisContainer.addChild(resultView);
	}    

    public showRoomList(){
        this.removeAll();
        let roomlist:RoomListView = new RoomListView(this);
        this.thisContainer.addChild(roomlist);
        
    }

    public tagsMatchView(){
        this.removeAll();
        let tagsmatchvs = new TagsMatchView(this);
        this.thisContainer.addChild(tagsmatchvs);
        
    }

    /**
     * 创建房间
     */
    public createRoom(roomID ? :string, userPropery ?:string){
        this.removeAll();
        let containt:CreateRoomView = new CreateRoomView(this);
        if(!roomID){
            //创建房间
            containt.doCreateRoom();
        }else{
            //加入指定房间
            containt.doJoinRoomSpecial(roomID,userPropery);
        }
        this.thisContainer.addChild(containt);
    }

    /**
     * 通过房间号加入指定房间
     */
    public joinRoomSpecial(){
        this.removeAll();
        let joinroom = new JoinRoomSpecialView(this);
        this.thisContainer.addChild(joinroom);
    }

    public reconnectView(){
        this.removeAll();
        let reconnect = new ReconnectView(this);
        this.thisContainer.addChild(reconnect);
    }

    public errorView(pageNo:number,msg:string):void{
        this.removeAll();
        let errorView = new ErrorView(this);
        errorView.SetErrorMsg(msg);
        errorView.showReconnect();
        //登录界面
        if(pageNo === 0){
            errorView.ReturnCallback = ()=>{
               this.login();
            };
        }else if (pageNo === 2){//登录界面游戏大厅界面
            errorView.ReturnCallback = ()=>{
                GameSceneView._gameScene.lobby();
            };
        }
        
        this.thisContainer.addChild(errorView);
    }


    private removeAll():void
    {
        this.thisContainer.removeChildren();
    }

    
}