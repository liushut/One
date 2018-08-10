
class NetLayerUtil extends egret.DisplayObjectContainer {
    private curLayer;
    public constructor() {
        super();
    }
    public addWaitLayer() {
        // ���Ƴ����е�netLayer
        this.removeChildren();
        // �������layer
        var layer = new NetWait();
        this.curLayer = layer;
        this.addChild(layer);
    }
    public addOutLineLayer() {
        // ���Ƴ����е�netLayer
        this.removeChildren();
        // �������layer
        var layer = new NetError("���˺����������ط���¼,�Ƿ����µ�¼?");
        this.curLayer = layer;
        this.addChild(layer);
    }
    public addErrorLayer(){
        // ���Ƴ����е�netLayer
        this.removeChildren();
        // �������layer
        var layer = new NetError();
        this.curLayer = layer;
        this.addChild(layer);
    }
    public cleanLayer() {
        this.removeChildren();
    }
}