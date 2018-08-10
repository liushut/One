class Peep extends ZJ.ComponentBase {
    private EYE_DAIJI = "daiji"
    private EYE_YUN = "yun"
    private Y_WALK = -20
    private COIN_BORN = [135, 280]
    private COIN_SHOW = [this.COIN_BORN[0] + 90, this.COIN_BORN[1] - 90]
    private COIN_PUT_COOPERATE = [this.COIN_SHOW[0] + 45, this.COIN_SHOW[1] + 80]
    private COIN_PUT_CHEAT = [this.COIN_SHOW[0] + 30, this.COIN_SHOW[1] + 50]
    public TIME_COIN_SHOW = 100
    public TIME_COIN_WAIT = 200
    public TIME_COIN_PUT = 200

    public constructor() {
        super();
        this.skinName = "PeepSkin"
    }

    // ui控件
    private gRotate: eui.Group
    private gVertical: eui.Group
    private gEye: eui.Group
    private gMcEye: eui.Group
    private p0: eui.Image
    private hat: eui.Image
    private guocheng: eui.Image
    private eye: eui.Image
    private coin: eui.Image
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    private mcEye: egret.MovieClip;
    private daijiInterval = 0;
    private isDaiji = true;
    protected childrenCreated(): void {
        super.childrenCreated();

        ZJ.ResManager.instance.loadMovieClip("peep", "peep", (mc: egret.MovieClip) => {
            this.mcEye = mc;
            this.gMcEye.addChild(this.mcEye)
            let ranTime = Math.random() * 1000 + 1500
            this.daijiInterval = egret.setInterval(() => {
                if (this.isDaiji) {
                    let ran = Math.random()
                    if (ran > 0.4) {
                        this.mcEye.gotoAndPlay(this.EYE_DAIJI, 1)
                    }
                }
            }, this, ranTime)
        })

        this.guocheng.visible = false;
        this.coin.visible = false;
    }

    public setResult(guocheng: string) {
        this.setDaiji(false)
        this.guocheng.visible = true;
        this.gEye.visible = false;

        this.guocheng.source = guocheng
    }

    public setEye(eye: string) {
        this.setDaiji(true)
        this.guocheng.visible = false;
        this.gEye.visible = true;

        this.eye.source = eye
    }

    private setDaiji(isDaiji: boolean) {
        this.isDaiji = isDaiji;
    }

    public playWalk(time: number) {
        egret.Tween.get(this.gVertical).to({ y: this.Y_WALK }, time).to({ y: 0 }, time)
            .to({ y: this.Y_WALK }, time).to({ y: 0 }, time)
            .to({ y: this.Y_WALK }, time).to({ y: 0 }, time)
    }

    public playShowCoin() {
        this.coin.visible = true
        egret.Tween.get(this.coin).to({ x: this.COIN_SHOW[0], y: this.COIN_SHOW[1] }, this.TIME_COIN_SHOW, egret.Ease.circOut)
    }

    public playPutCoin(answer: string) {
        let put: number[] = null
        if (answer == GlobalData.ANSWER_COOPERATE) {
            put = this.COIN_PUT_COOPERATE;
            egret.Tween.get(this.coin).to({ x: put[0], y: put[1] }, this.TIME_COIN_PUT).call(() => {
                this.coin.visible = false
            })
        } else if (answer == GlobalData.ANSWER_CHEAT) {
            put = this.COIN_PUT_CHEAT;
            egret.Tween.get(this.coin).to({ x: put[0], y: put[1] }, this.TIME_COIN_PUT, egret.Ease.circInOut)
                .to({ x: this.COIN_SHOW[0], y: this.COIN_SHOW[1] }, 100)
        }
    }

    public playTakeBackCoin() {
        egret.Tween.get(this.coin).to({ x: this.COIN_BORN[0], y: this.COIN_BORN[1] }, 100, egret.Ease.circOut).call(
            () => {
                this.coin.visible = false
            }
        )
    }

    /**
     * 正常处理返回0
     */
    public onDestroy(): number {
        egret.clearInterval(this.daijiInterval)
        return 0;
    }
}