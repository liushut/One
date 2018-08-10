class Monster
{
    public constructor()
    {

    }
    private x =0;
    private y = 0;
    private dx = 0;
    private dy = 0;
    private init()
    {

        this.dx = 100;
        this.dy = 100;
    }
    public judgeHero(hero:Hero)
    {
        if(hero.x > this.x && hero.x <(this.x + this.dx))
        {
            return -1;//游戏结束
        }
    }
}