class SoundManager
{

    private static share:SoundManager;

    private _click:egret.Sound;//点击声音
    private _word:egret.Sound;//点击字块的声音
    private _right:egret.Sound;//胜利的声音
    private _wrong:egret.Sound;//错误
    private _bgm:egret.Sound;//背景
    private _bgm_channel:egret.SoundChannel;//用来控制
    public constructor()
    {
        this._click = new egret.Sound();
        this._click.load("resource/assets/sound/buttonclick.mp3");
        this._word = new egret.Sound();
        this._word.load("resource/assets/sound/type_word.mp3");
        this._right = new egret.Sound();
        this._right.load("resource/assets/sound/right.mp3");
        this._wrong = new egret.Sound();
        this._wrong.load("resource/assets/sound/wrong.mp3");
        this._bgm = new egret.Sound();
        this._bgm.load("resource/assets/sound/Music.mp3");
        

    }
    public static Shared()
    {
        if(SoundManager.share == null)
        {
            SoundManager.share = new SoundManager();
        }
        return SoundManager.share;

    }
  //音乐是否播放，保存设置
  public set IsMusic(value)
  {
      if(!value)//为 0
      {
          egret.localStorage.setItem("ismusic","0");
          this.StopBGM();
      }
      else//1
      {
          egret.localStorage.setItem("ismusic","1");
          this.PlyaBGM();
      }
  }
  public get IsMusic()
  {
      var b = egret.localStorage.getItem("ismusic");
      if(b == null || b == "")
      {
          return true;
      }
      else{
          return b=="1";
      }
  }
  //音效是否播放，保存设置
  public set IsSound(value)
  {
      if(value)
      {
          egret.localStorage.setItem("isSound","1");
      }
      else{
          egret.localStorage.setItem("isSound","0");
      }
  }
  public get IsSound()
  {
      var b = egret.localStorage.getItem("isSound");
      if(b == null || b == "")
      {
          return true;
      }
      else 
      {
          return b == "1";
      }
  }
  public PlyaBGM()
  {
     if(this.IsMusic)
     {
         this._bgm_channel = this._bgm.play(0,0);
     }
  }
   public StopBGM() {
        if(this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    }
    public PlayClick() {
        if(this.IsSound) {
            this._click.play(0,1);
        }
    }
    public PlayRight() {
        if(this.IsSound) {
            this._right.play(0,1);
        }
    }
    public PlayWrong() {
        if(this.IsSound) {
            this._wrong.play(0,1);
        }
    }
    public PlayWord() {
        if(this.IsSound) {
            this._word.play(0,1);
        }
    }
}