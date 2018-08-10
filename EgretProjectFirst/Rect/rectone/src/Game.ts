class Game 
{
    private _root:egret.DisplayObjectContainer;//容器对象
    private _rootRect:egret.Sprite;//所有GourpRect根节点  显示根节点高和宽是所有子节点中之和  显示容器宽高默认为0
    private _groupRects:Array<GroupRect>;//GroupRect数组，管理
    private _row:number;//当前行数
    private _timerPanel:TimerPanel;//计时器对象
    public constructor(root:egret.DisplayObjectContainer)
    {
        this._root = root;
        this.createGroupRect();
        this.createTimer();
        this.startGame();
    }
    

    private createGroupRect()//创建方块组
    {
        this._rootRect = new egret.Sprite();
        this._root.addChild(this._rootRect);
        this._groupRects = [];
        this._row = Data.getRectRow();
        
        let groupRect:GroupRect;//创建地图
        for(let i = 0;i<this._row;i++)
        {
            groupRect = new GroupRect();··
            groupRect.addEventListener("gameOver",this.gameOver,this);
            groupRect.addEventListener("clickRight",this.MoveNextRow,this);
            this._groupRects.push(groupRect);
            groupRect.y = Data.getRectWidth() * i;
            this._rootRect.addChild(groupRect);
        }
        this._rootRect.y = Data.getStageHeight() - this._rootRect.height;//舞台高度 - 当前rectroot高度   显示最下面的就ok了
    }
    private gameOverPanel:GameOverPanel;
    private gameOver()
    {
        this._timerPanel.stop();
        if(!this.gameOverPanel)
        {
            this.gameOverPanel = new GameOverPanel();
            this.gameOverPanel.addEventListener("startGame",this.startGame,this);
        }
        this._root.addChild(this.gameOverPanel);
    }
    private MoveNextRow()
    {
        for(let i = 0;i < this._row;i++)
        {
            this._groupRects[i].move();
        }
        Data._score++;
    }
    private createTimer()
    {
        this._timerPanel = new TimerPanel();
        this._timerPanel.addEventListener("gameOver",this.gameOver,this);
        this._root.addChild(this._timerPanel);
    }

    private startGame()//开始 初始化工作
    {
        Data._score = 0;
        for(var i = 0; i<this._row;i++)
        {
            this._groupRects[i].init();//初始化状态
            this._groupRects[i].y = Data.getRectWidth() * i;//Y轴排列
            this._groupRects[i]._currentRow = i;
            //判断i的值
            if(i != (this._row - 1))
            {
                this._groupRects[i].createBlackRect();
            }
        }
        this._timerPanel.start();

    }

}