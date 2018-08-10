class SceneLevels extends eui.Component
{
    public constructor()
    {
        super();
        this.skinName = "resource/eui_skins/SceneLevelsSkin.exml";
        this.Back_Btn.addEventListener(egret.TouchEvent.TOUCH_TAP,
        this.onClick,this);
        // this.initMap();
    }
    private img_arrow:eui.Image;
    private Back_Btn:eui.Button;
    private group_levels:eui.Group;
    private onClick()
    {

    }
    private initMap()
    {
     
        let row = 20;
        let col = 10;
        let spanX = this.stage.stageHeight / col;
        let spanY = this.stage.stageHeight / row;
        var group = new eui.Group();//地图背景
        group.width = 720;
        group.height = (spanY * 400);//算出最大尺寸
        //初始箭头
        this.img_arrow = new eui.Image();
        this.img_arrow.source = RES.getRes("PageDownBtn_png");
        this.img_arrow.anchorOffsetX = 124 /2 - group.getChildAt(0).width/2;
        this.img_arrow.anchorOffsetY = 76;
        this.img_arrow.touchEnabled = false;
        this.img_arrow.x = group.getChildAt(0).x;
        this.img_arrow.y = group.getChildAt(0).y;
        group.addChild(this.img_arrow);


        //填充背景
        for(var i = 0;i < (group.height / 1138) ;i++)
        {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            this.group_levels.addChildAt(img,0);//全部在一个层级

        }
        //以正弦曲线绘制关卡图标
        for(var i = 0;i < 400;i++)
        {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spanY * i / 2;
            icon.x = Math.sin(icon.y/180*Math.PI)*200 + group.width / 2;
            icon.y += spanY * i /2;
            icon.y = group.height - icon.y - spanY;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP,
            this.onClick_level,this);

        }
        //开启位图缓存
        group.cacheAsBitmap = true;
        this.group_levels.addChild(group);
        //卷动到最底层
        this.group_levels.scrollV = group.height - 1100;
    }
    private onClick_level(e:egret.TouchEvent)
    {
        var icon = <LevelIcon>e.currentTarget;
        console.log(icon.Level);
        this.img_arrow.x = icon.x;
        this.img_arrow.y = icon.y;
    }
}