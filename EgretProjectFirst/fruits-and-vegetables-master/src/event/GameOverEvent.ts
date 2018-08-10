/**
 * Created by jack on 15/7/24.
 */

class GameOverEvent extends egret.Event
{
    private _score:number;

    constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this._score = 0;
        super(type, bubbles, cancelable);
    }

    public get score()
    {
        return this._score;
    }

    public set score(value)
    {
        this._score = value;
    }
}