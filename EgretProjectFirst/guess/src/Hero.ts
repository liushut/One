class Hero
{
    public constructor()
    {
        this.init();
    }
    public x = 0;
    public y = 0;
    private speed:number  = 0;
    private jump:number =  0;

    private init()
    {
        this.speed  = 2;
        this.jump = 100;
    }
}