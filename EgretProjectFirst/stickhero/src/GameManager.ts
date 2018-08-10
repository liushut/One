//游戏管理类
class GameManager {
    private static heroIndex:number = 1;//英雄索引
    private static curScore:number = 0;//当前分数
    public static setHeroIndex(val:number)//设置英雄索引
    {
        this.heroIndex = val;
    }

    public static getHeroIndex(){
        return this.heroIndex;
    }
    public static setCurScore(val:number)
    {
        this.curScore = val;
    }
    public static getCurScore()
    {
        return this.curScore;
    }
} 