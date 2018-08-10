class BgAutoScorller  {
    constructor(v1, v2) {
        this.bg1 = v1;
        this.bg2 = v2;
    }
    private bg1: egret.DisplayObject;
    private bg2: egret.DisplayObject;
    private bg1Height: number = 0;
    private bg2Height: number = 0;
    public update(): void {
        if (this.bg1.y >= 0) {
            this.bg1.y = -this.bg1.height;
        }
        if (this.bg2.y >= this.bg2.height) {
            this.bg2.y = 0;
        }

        this.bg1.y += GameData.bgSpeed;
        this.bg2.y += GameData.bgSpeed;
    }

    public dispose(): void {
        this.bg1 = null;
        this.bg2 = null;
    }
}