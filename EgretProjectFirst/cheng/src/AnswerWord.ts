//继承 问题字  答案字放在上面回答区域
//---答案字  点击到 还原
//下面字点击 换到对应答案字
//由于当答案字点击的时候，答案字会消失并将对应的问题字还原
class AnswerWord extends Word{
    public SelectWord:Word = null;
    public constructor()
    {
        super();

    }
    protected onclick_tap()//点击到 则还原“”
    {
        if(this.SelectWord != null)
        {
            this.SelectWord.visible = true;
            this.SelectWord = null;
            this.setWordText("");
        }
        console.log("AnswerWord");
    }
    //当一个问题字被选择添加到回答时，设置不可见，并保存到本对象中以后使用
    //这个方法的作用就是，下面的问题字操作的时候，将其保存在回答字中，将来再操作时将其还原显示。
    public SetSelectWord(word:Word)
    {
        if(word != null)
        {
            this.setWordText(word.getWordText());
            this.SelectWord = word;
            word.visible = false;
        }
        else
        {
            this.setWordText("");
            this.SelectWord = null;
        }
       
    }
}