//这个类用来做问题的字使用
class Word extends eui.Component{
    protected lb_text:eui.Label;
    public constructor()
    {
        super();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,
        this.onclick_tap,this);
    } 
    protected onclick_tap()
    {
        SoundManager.Shared().PlayClick();
        SceneGame.Shared().onclick_word(this);
    }
    public setWordText(value:string)
    {
        this.lb_text.text = value;
    }
    public getWordText()
    {
        return this.lb_text.text;
    }

}