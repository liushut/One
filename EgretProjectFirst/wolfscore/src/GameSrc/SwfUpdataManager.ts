module starlingSwf{
    /**
     * 动画更新器
     */
    export class SwfUpdataManager
    {
        private _animations:starlingSwf.ISwfAnimation[];
        private _addQueue:starlingSwf.ISwfAnimation[];//添加队列。
        private _removeQueue:starlingSwf.ISwfAnimation[];//移除队列

        private _fps:number;
        private _fpsTime:number;
        private _currentTime:number;//当前时间

        public static createSwfUpdateManager(fps:number):SwfUpdataManager{
            var updateManager:SwfUpdataManager = new SwfUpdataManager();
            updateManager._addQueue = [];
            updateManager._removeQueue = [];
            updateManager._animations = [];
            updateManager._currentTime = 0;
            updateManager.setFps(fps);
            egret.Ticker.getInstance().register(updateManager.update,updateManager);
            return updateManager;
        }
        private clear():void{
            this._addQueue.splice(0);
            this._removeQueue.splice(0);
            this._animations.splice(0);
        }
        public stop():void{
            this.clear();
            egret.Ticker.getInstance().unregister(this.update,this);
        }
        public play():void{
            egret.Ticker.getInstance().register(this.update,this);
        }
        public setFps(fps:number)
        {
            this._fps = fps;
            this._fpsTime = 1000 / fps;
        }
        public addSwfAnimation(animation:starlingSwf.ISwfAnimation):void{
            this._addQueue.push(animation);
        }
        public removeSwfAnimation(animation:starlingSwf.ISwfAnimation):void{
            this._removeQueue.push(animation);
            var addIndex:number = this._addQueue.indexOf(animation);
            if(addIndex != -1)
            {
                this._addQueue.splice(addIndex,1);
            }
        }
        private updataAdd():void{
            var len:number = this._addQueue.length;
            var index:number;
            var animation:starlingSwf.ISwfAnimation;
            for(var i = 0;i < len;i++)
            {
                animation = this._addQueue.pop();
                index = this._animations.indexOf(animation);
                if(index == -1)
                {
                    this._animations.push(animation);
                }
            }
        }
        private updataRemove():void
        {
            var len:number = this._removeQueue.length;
            var index:number;
            var animation:ISwfAnimation;
            for(var i:number = 0; i < len; i++){
                animation = this._removeQueue.pop();
                index = this._animations.indexOf(animation);
                if(index != -1){
                    this._animations.splice(index,1);
                }
            }
        }
    private update(time:number):void{
        this._currentTime += time;
        if (this._currentTime < this._fpsTime) {
            return;
        }
        this._currentTime -= this._fpsTime;
        this._update();

        var jumpFlag: number = 0;
        while (this._currentTime > this._fpsTime) {
            this._currentTime -= this._fpsTime;
            jumpFlag++;
            if (jumpFlag < 4) {
                this._update();
            }
        }
    }
    private _update():void
    {
        this.updataRemove();
        this.updataAdd();
        var len:number = this._animations.length;
        for(var i:number = 0;i <len;i++)
        {
            this._animations[i].update();
        }
    }

    }
}