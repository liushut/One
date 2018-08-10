class Cannon extends eui.Component {
    private cannon:eui.Image;

    public constructor() {
        super();
        this.skinName = "";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addStage, this);

    }

    private addStage() {

    }

    public shoot(x, y) {
        // Ҫת������������
        // ��������֮��ĽǶ�


        var rotation = 90;
        var tw = egret.Tween.get(this.cannon);
        tw.to({rotation: rotation}, 200).call(function () {



        }, this);
    }

    private changeCannon() {
        this.cannon.source = "";
        var texture = RES.getRes("");
        this.cannon.anchorOffsetX = texture.textureWidth / 2;
        this.cannon.anchorOffsetY = texture.textureHeight / 2;


    }
}