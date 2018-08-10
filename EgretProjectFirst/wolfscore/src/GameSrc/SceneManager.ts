//场景管理器
class SceneManager{
    public static currentScene:egret.DisplayObjectContainer;
    public static root:egret.DisplayObjectContainer;//本身类不是容器，采用根节点容器
    public static isAnimation : boolean = false;
    public static sceneStack : egret.DisplayObjectContainer[] = [];//场景队列
    public static init(root:egret.DisplayObjectContainer)
    {
        this.root = root;
    }
    //显示场景
    public static showScene(scene: any,par?):egret.DisplayObject{
        if(!this.root){console.error("SceneManager not be init()");return ;}
        if(!scene){console.error("scene is null");return;}
        if(this.root.numChildren > 0)
        {
            var top: any = this.root.getChildAt(this.root.numChildren - 1);
            top.onHide && top.onHide();
        }
        scene = new scene(par);
        scene.name = scene.constructor.name;
        scene.onShow && scene.onShow(par);
        //表示当前场景
        this.root.addChild(scene);

        if(SceneManager.isAnimation)
        {
            scene.x = 480;
            egret.Tween.get(scene,{loop:false}).to({x:0,y:0},300,egret.Ease.circInOut);
        }
         console.log("[SceneManager] show  scene:" + scene.constructor.name + "@" + scene.hashCode);
    }

    public static back(): boolean {
        if (this.root.numChildren > 0) {
            var perScene: any = this.root.getChildAt(this.root.numChildren - 1);
            if (perScene) {
                perScene.onHide && perScene.onHide();
                if (!SceneManager.isAnimation) {
                    if (this.root.numChildren > 1) {
                        var top: any = this.root.getChildAt(this.root.numChildren - 1);
                        console.log("[SceneManager]  Back,  from scene:" + perScene.constructor.name + "@" + perScene.hashCode + " to " + top.constructor.name + "@" + top.hashCode);
                        top.onShow && top.onShow();
                    }
                    this.root.removeChild(perScene);
                }
                else {
                    perScene.x = 0;
                    egret.Tween.get(perScene, { loop: false }).to({ x: 800, y: 0 }, 600, egret.Ease.quadIn).call(function () {
                        perScene.x = 0;
                        this.root.removeChild(perScene);
                    }.bind(this));
                    if (this.root.numChildren > 1) {
                        var top: any = this.root.getChildAt(this.root.numChildren - 2);
                        top.onShow && top.onShow();
                        top.x = -480;
                        egret.Tween.get(top, { loop: false }).to({ x: 0, y: 0 }, 400, egret.Ease.backIn);
                    }
                }
                return true;
            }
            else {
                console.warn('[WARN] preScene is undefine');
                return false;
            }

        }
        else {
            console.warn("[SceneManager] Do`t Back!");
            return false;
        }

    }
}
