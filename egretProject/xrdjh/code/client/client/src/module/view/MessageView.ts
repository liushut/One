class MessageView extends GameViewBase{
    public constructor()
    {
        super();
        this.skinName = "MessageViewSkin";
    }
    private share_button:eui.Button;
    private sound_button:eui.Button;
    private back_button:eui.Button;//后退键
    private recent_button:eui.Button;//最新按钮
    private hot_button:eui.Button;//最热按钮
    private mybox_button:eui.Button;//查看我的留言板 按钮


    //Scoller中元素
    private head_button:eui.Button;
    private name_label:eui.Label;
    private time_label:eui.Label;
    private message_label:eui.Label;//具体留言
    private good_button:eui.Button;
    private reply_button:eui.Button;
    private goodnumber_label:eui.Label;
    private replynumber_label:eui.Label;
    private comPlayer_label:eui.Label;//第一个评论人的名字
    private comment_label:eui.Label;//第一个评论人的内容
    private replyPlayer_label:eui.Label;//回复第一个评论人的人的名字
    private comreply_label:eui.Label;//回复第一个评论人的内容
    private showAllContent_button:eui.Button;//"显示全部内容"按钮
    private showAllReply_button:eui.Button;//显示"全部评论"按钮
    private TextWhite_img:eui.Image;//文本泛白  超出4行才显示
  


    //Scoller中元素对应的数据
    private time:number = 0;


    //自己写评论发送的
    private textInput:eui.TextInput;
    private send_button:eui.Button;

    protected childrenCreated()
    {
        super.childrenCreated();

        //点击发送功能
        this.send_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.send,this);
        this.back_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.back,this);

        this.showAllContent_button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showAllContent,this);

        this.message_label.touchEnabled = true;
        this.message_label.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            ZJ.UIManager.instance.openView(UIName.Comments);
        },this)

        
    }
    //显示全部内容
    private showAllContent()
    {
        ZJ.UIManager.instance.openView(UIName.Comments);
    }
    //后退
    private back()
    {
         ZJ.UIManager.instance.destroyView(UIName.Message);
    }

    //发送评论功能
    private send()
    {
        this.message_label.text = this.textInput.text;
        this.textInput.text = "";
    }

     public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}