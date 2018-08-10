class CommentsView extends GameViewBase{
    public constructor()
    {
        super();
        this.skinName = "CommentsViewSkin";
    }

    //UI控件
    private back_button:eui.Button;//后退键
    private head_button:eui.Button;//头像按钮
    private comments_label:eui.Label;//楼主评论的内容
    private name_label:eui.Label;//楼主的名字
    private share_button:eui.Button;//分享按钮
    private good_button:eui.Button;//点赞按钮
    private reply_button:eui.Button;//回复按钮


    private replyhead_button:eui.Button;//回复楼主的人的头像按钮
    private replyname_label:eui.Label;//回复楼主的人的名字
    private reply_label:eui.Label;//回复楼主的人的回复内容


    private send_button:eui.Label;//点击发送按钮
    private input_textinput;//输入框

    protected childrenCreated()
    {
        super.childrenCreated();

        this.back_button.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            ZJ.UIManager.instance.destroyView(UIName.Comments);
        },this);

    }
}