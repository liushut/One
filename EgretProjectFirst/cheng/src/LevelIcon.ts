class LevelIcon extends eui.Button
{
    private lb_level:eui.Label;
    private gs_select_dis:eui.Image;
    private gs_select_1:eui.Image;
    public constructor()
    {
        super();
        this.skinName = "resource/eui_skins/LevelIconSkin.exml";
    }
    public get Level()
    {
        return parseInt(this.lb_level.text);
    }
    public set Level(text:number)
    {
        this.lb_level.text = text.toString();
    }
    public change(num:number)
    {
        if(num == 1)
        {
            this.gs_select_1.alpha = 1;
            this.gs_select_dis.alpha = 0;
        }
        else 
        {
            this.gs_select_1.alpha = 0;
            this.gs_select_dis.alpha = 1;
        }
    }
}