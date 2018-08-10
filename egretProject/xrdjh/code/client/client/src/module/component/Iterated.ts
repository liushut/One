class Iterated extends ZJ.ComponentBase {
    public constructor() {
        super();
        this.skinName = "IteratedSkin"
    }

    private P1_BORN = [-20, 100]
    private P2_BORN = [1100, 100]
    private TIME_WALK = 600
    private TIME_WALK_ONCE = this.TIME_WALK / 6
    private X_WALK = 110

    // ui控件
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    private p1: Peep;
    private p2: Peep;
    protected childrenCreated(): void {
        super.childrenCreated();

        let p1 = new Peep()
        this.addChild(p1)
        p1.scaleX = 0.8
        p1.scaleY = 0.8
        p1.x = this.P1_BORN[0]
        p1.y = this.P1_BORN[1]
        this.p1 = p1

        let p2 = new Peep()
        this.addChild(p2)
        p2.scaleX = -0.8
        p2.scaleY = 0.8
        p2.x = this.P2_BORN[0]
        p2.y = this.P2_BORN[1]
        this.p2 = p2

        let payoff = new Payoff()
        this.addChild(payoff)
        payoff.showMachine(true);
        payoff.horizontalCenter = 0
        payoff.y = 50
    }

    private isPlaying = false;
    public startGame(p1Answer: string, p2Answer: string) {
        if (this.allowCall()) {
            this.isPlaying = true
            let result = this.getResult(p1Answer, p2Answer)
            this.goForward(result)
            ZJ.EventManager.instance.dispatchEvent(new ZJ.CommonEvent(EventName.ITERATED_ROUND_START))
        }
    }

    /**
     * @returns [result1,result2,eye1,eye2]
     */
    private getResult(p1Answer: string, p2Answer: string): { result: string, eye: string, answer?: string }[] {
        let result: { result: string, eye: string, answer?: string }[] = []
        let hezuo = ""
        let shengfu = ""
        if (p1Answer == GlobalData.ANSWER_COOPERATE) {
            if (p2Answer == GlobalData.ANSWER_COOPERATE) {
                result.push({ result: GlobalData.RESULT_HEZUO_PING, eye: GlobalData.EYE_HEZUO_PING }
                    , { result: GlobalData.RESULT_HEZUO_PING, eye: GlobalData.EYE_HEZUO_PING })
            } else if (p2Answer == GlobalData.ANSWER_CHEAT) {
                result.push({ result: GlobalData.RESULT_HEZUO_FU, eye: GlobalData.EYE_HEZUO_FU }
                    , { result: GlobalData.RESULT_QIPIAN_SHENG, eye: GlobalData.EYE_QIPIAN_SHENG })
            }
        } else if (p1Answer == GlobalData.ANSWER_CHEAT) {
            if (p2Answer == GlobalData.ANSWER_COOPERATE) {
                result.push({ result: GlobalData.RESULT_QIPIAN_SHENG, eye: GlobalData.EYE_QIPIAN_SHENG }
                    , { result: GlobalData.RESULT_HEZUO_FU, eye: GlobalData.EYE_HEZUO_FU })
            } else if (p2Answer == GlobalData.ANSWER_CHEAT) {
                result.push({ result: GlobalData.RESULT_QIPIAN_PING, eye: GlobalData.EYE_QIPIAN_PING }
                    , { result: GlobalData.RESULT_QIPIAN_PING, eye: GlobalData.EYE_QIPIAN_PING })
            }
        }

        result[0].answer = p1Answer
        result[1].answer = p2Answer

        return result
    }

    private goForward(result: { result: string, eye: string, answer?: string }[]) {
        egret.Tween.get(this.p1, { loop: true }).call(() => {
            // 拿出coin
            this.p1.playShowCoin();
            this.p2.playShowCoin();
        })
            .wait(this.p1.TIME_COIN_SHOW + this.p1.TIME_COIN_WAIT).call(() => {
                // 走过去
                this.p1.playWalk(this.TIME_WALK_ONCE)
                this.p2.playWalk(this.TIME_WALK_ONCE)
            }).to({ x: this.P1_BORN[0] + this.X_WALK }, this.TIME_WALK).call(() => {
                // 放入coin
                this.p1.playPutCoin(result[0].answer);
                this.p2.playPutCoin(result[1].answer);
            }).wait(this.p1.TIME_COIN_PUT).call(() => {
                // 出结果
                this.p1.setResult(result[0].result)
                this.p2.setResult(result[1].result)
            }).wait(500).call(() => {
                // 走回去
                this.p1.playWalk(this.TIME_WALK_ONCE)
                this.p2.playWalk(this.TIME_WALK_ONCE)
            }).to({ x: this.P1_BORN[0] }, this.TIME_WALK).call(() => {
                // 拿回coin
                this.p1.playTakeBackCoin()
                this.p2.playTakeBackCoin()
                // 更新眼睛
                this.p1.setEye(result[0].eye)
                this.p2.setEye(result[1].eye)

                ZJ.EventManager.instance.dispatchEvent(new ZJ.CommonEvent(EventName.ITERATED_ROUND_END))
            }).wait(1000)

        egret.Tween.get(this.p2, { loop: true }).wait(this.p1.TIME_COIN_SHOW + this.p1.TIME_COIN_WAIT)
            .to({ x: this.P2_BORN[0] - this.X_WALK }, this.TIME_WALK)
            .wait(this.p1.TIME_COIN_PUT)
            .wait(500).to({ x: this.P2_BORN[0] }, this.TIME_WALK).wait(1000)

    }

    /**
     * 是否允许调用。在public方法中应加入该判断，防止被打乱节奏。
     */
    public allowCall(): boolean {
        return !this.isPlaying
    }


    /**
     * 正常处理返回0
     */
    public onDestroy(): number {
        return 0;
    }
}