class Game
{
    private monster:Monster;
    private hero:Hero;
    public constructor()
    {
        this.hero = new Hero();
        this.monster = new Monster();
    }
    private init()
    {
         var i = this.monster.judgeHero(this.hero);
         if(i<0)
         {
             console.log("game over");
         }
    }
}