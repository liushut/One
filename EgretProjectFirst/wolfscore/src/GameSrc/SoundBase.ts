class SoundBase extends egret.DisplayObjectContainer{
    public constructor(url?:string)
    {
        super();
        if(url)
            this._soundURL = url;
    }
    private _sound = new egret.Sound();
    private _soundURL:string = "bgSound";
    private _soundChannel:egret.SoundChannel;

    //默认播放位置，从头开始的
    private _position:number = 0;
    //默认不循环,设置为负数
    private _loop:boolean = true;
    //当前状态  0为空  1为播放   2为暂停 3为加载完成  4  加载失败
    private _status:number = 0;

    //加载音频
    private _loadSound()
    {
        if(RES.getRes(this._soundURL))
        {
            //加载
            this._sound = RES.getRes(this._soundURL);
        }
        else 
        {
            //如果RES中未能加载成功，尝试用绝对路径
            this._sound.once(egret.Event.COMPLETE,this.loadComplete,this);
            this._sound.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        }
    }
    private loadComplete(e:egret.Event)
    {
        this._status = 3;
        var waring = "加载完成"
        egret.log(waring);
        //删除加载失败的监听
        this._sound.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
        this.dispatchEventWith(egret.Event.COMPLETE,false,waring);
    }
    //加载音频失败
    private onLoadErr(e:egret.IOErrorEvent)
    {
        this._status = 4;
        var waring:string ="加载失败" + this._soundURL;
        egret.log(waring);
        //删除加载成功的监听
        this._sound.removeEventListener(egret.Event.COMPLETE,this.loadComplete,this);
        this.dispatchEventWith(egret.IOErrorEvent.IO_ERROR,false,waring);
    }
    //设置url并重新加载
    private setUrl(url:string)
    {
        this._soundURL = url;
        this._loadSound();
    }
    //设置循环
    private looped(e:egret.Event)
    {
        this._soundChannel = null;
        this._position = 0;
        this._status = 0;
        var waring = "播放完成";
        if(this._loop)
        {
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE,false,waring);
        }
        else
        {
            this.play();
        }
  

    }
    //设置音量
    public setVolume(volume:number)
    {
        console.log(this._status + "setVolume");
        if(1 == this._status)
        {
            this._soundChannel.volume = volume / 100;
        }
    }
    //显示播放时间
    public showPosition()
    {
        if(1 == this._status)
        {
            this._position = this._soundChannel.position;
        }
        console.log("播放时间" + this._position);
        return this._position;
        
    }
      //播放音频
    public play()
    {
        if(this._status == 4)
        {
            this._loadSound();
            return;
        }
        this._status = 1;
        if(this._soundChannel)
        {
            this._soundChannel.stop();
        }
        this._soundChannel = this._sound.play(this._position,1);
        this._soundChannel.once(egret.Event.SOUND_COMPLETE,this.looped,this);
        return this._status;
    }
    
       //获取状态
        public getStatus()
        {
            return this._status;
        }
        //设置循环
        public setLoop(loop:boolean = false):boolean
        {
            this._loop = loop;
            return this._loop;
        }
        //设置暂停
        public pause()
        {
            var temp = this._status;
            if(1 == temp)
            {
                this._position = this._soundChannel.position;
                this._soundChannel.stop();
                this._status = 2;
            }
            egret.log(this._position + "暂停");
            return temp;
        }

        //恢复
        public resume()
        {
            var temp = this._status;
            if(2 == temp)
            {
                this.play();
            }
            egret.log(this._position);
            return temp;
        }
        //停止
        public stop()
        {
            this._status = 0;
            this._position = 0;
            this._soundChannel.stop();
            this._soundChannel = null;
        }

}