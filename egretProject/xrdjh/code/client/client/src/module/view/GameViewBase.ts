class GameViewBase extends ZJ.ViewBase {
    // 常量 
    private FADEIN_TIME = 500;
    public constructor() {
        super();
    }

    // ui控件
    protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
    }

    // 变量
    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected fadeIn(component: egret.DisplayObject, delay: number = 100, cb: () => void = null) {
        component.visible = true;
        component.alpha = 0;
        let tw = egret.Tween.get(component).wait(delay).to({ alpha: 1 }, this.FADEIN_TIME)
        if (cb) {
            tw.call(cb, this)
        }
    }

    protected step = -1;
    /**
     * 主要用于同一按钮的下一步，其他情况建议指定参数，提高可读性。
     */
    public nextStep(forceStep: number = -1) {
        if (forceStep != -1) {
            this.step = forceStep
        }
        else {
            ++this.step
        }
        let str = "step" + this.step
        if (this[str]) {
            console.log(str)
            this[str]();
        }
    }

    protected setHtmlText(label: eui.Label, textID: string) {
        label.textFlow = ZJ.LangUtil.getHtmlText(textID)
    }

    protected setLabelText(label: eui.Label, textID: string) {
        label.text = ZJ.LangUtil.getText(textID)
    }

    protected setBtnHtmlText(btn: eui.Button, textID: string) {
        this.setHtmlText((btn.labelDisplay as eui.Label), textID);
    }

    protected setBtnText(btn: eui.Button, textID: string) {
        btn.label = ZJ.LangUtil.getText(textID)
    }

    public onDestroy(): number {
        super.onDestroy()
        return 0;
    }
}
