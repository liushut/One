class Toast extends egret.DisplayObjectContainer{

    private static _txtrToastBg: egret.Texture;
    private static _cont: egret.DisplayObjectContainer;
    public static init(cont:egret.DisplayObjectContainer,txtrToastBg:egret.Texture):void{
        console.log("Toast.init",txtrToastBg);
        this._cont = cont;
        this._txtrToastBg = txtrToastBg;
    }
    //初始化资源
    public static initRes(cont:egret.DisplayObjectContainer,img:string):void{
        console.log("Toast.init",img);
        this._cont = cont;

        var loader:egret.ImageLoader = new egret.ImageLoader();
        //添加加载完成资源加载监听
        loader.addEventListener(egret.Event.COMPLETE,function(event:egret.Event){
            var loader : egret.ImageLoader = <egret.ImageLoader>event.target;
            //获取加载到的纹理对象
            var bitmapData : egret.BitmapData = loader.data;
            //创建纹理对象
            var texture : egret.Texture = new egret.Texture;
            texture.bitmapData = bitmapData;
            this._txtrToastBg = texture;
            //创建BitMap进行显示
            // this.addChild(new egret.Bitmap(texture))     如果函数是箭头函数 则不能addchild  原因：箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this。继承的是这个类的this.  addchild是继承父类的，所以没有。 
        },this)
        //开始加载
        loader.load(img);
    }
    
    public static show(msg:string)
    {
        if(this._cont)
        {
            var toast:Toast = new Toast(msg,this._cont.stage.stageWidth,this._cont.stage.stageHeight);
            this._cont.addChild(toast);
        }
    }
    constructor(msg:string,w:number,h:number)
    {
        super();
        var bg:egret.Bitmap = new egret.Bitmap(Toast._txtrToastBg);
        this.x = w * 5;
        this.y = h * .85;
        this.addChild(bg);
        bg.anchorOffsetX = bg.width / 2;

        var tx:egret.TextField = new egret.TextField;
        tx.multiline = true;//是否为多行文本、
        tx.size = 30;
        tx.bold = true;//是否显示粗体
        tx.textColor = 0XFFFFFF;
        tx.stroke = 6;//描边宽度
        tx.strokeColor = 0;
        tx.text = msg;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;//居中
        tx.width = w * 1;
        tx.x = bg.x;
        tx.y = bg.y+tx.size/10;
        tx.anchorOffsetX = tx.width/2;
        this.addChild(tx);
        bg.height = 12 + tx.height;

        this.alpha = 0;

        egret.Tween.get(this).to({alpha:1},200,egret.Ease.quintOut).wait(600).to(
            {alpha : 0},
            200,
            egret.Ease.quintIn
        ).call(()=>{
            if(this.parent)
            {
                this.parent.removeChild(this);
            }
        });
        


        

    }
}