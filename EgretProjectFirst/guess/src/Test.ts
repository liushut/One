class Test extends eui.Component{
    private testScorller:eui.Scroller;
    private viewGroup:eui.Group;
    public constructor()
    {
        super();
        this.skinName = "resource/eui_skins/TestSkin.exml";
        this.init();
        this.animator();
         console.log(this.x + "1")
    }
   protected createChildren(): void {
        super.createChildren();
         this.testScorller.viewport.validateNow();
        this.testScorller.viewport.scrollV = 40;
   }

private init()
{
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5]);
        var scroller = new eui.Scroller();
        scroller.height = 160;
        scroller.viewport = list;
        this.addChild(scroller);
        this.testScorller = scroller;
          var btn = new eui.Button();
        btn.x = 200;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moveScroller,this);
}
private moveScroller()
{
      //点击按钮后改变滚动的位置
        var sc = this.testScorller;
        sc.viewport.scrollV += 10;
        if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
          console.log("滚动到底部了");
        }
    }
    private animator()
    {
      egret.Tween.get(this,{onChange:this.on,onChangeObj:this}).to({x:1000},10000);
  
   
    
    }
    private on()
    {
      console.log(this.x);
    }
}
