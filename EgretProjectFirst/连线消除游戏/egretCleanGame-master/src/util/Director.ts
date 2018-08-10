class Director {
    public static instance:Director = null;
    private stackLayer = [];
    //��Ϸ��,��ʵ����Main��
    private gameLayer:Main = null;
    // ��ʵӦ�ó������һ�������,���ܽ����ͨ��֤�ָ���ʱ��,����������д򿪵�ui����,�ᵼ�¸ý��汻popScene��û�п��ǵ��ؿ����������
    private netLayer:NetLayerUtil = null;
    // ������
    private guidLayer:GuidLayerUtil = null;

    public static getInstance() {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public initWithMain(m:Main) {
        if (this.gameLayer == null) {
            this.gameLayer = m;
        }
        this.netLayer = new NetLayerUtil();
        Display.stage.addChildAt(this.netLayer, 9);
        this.guidLayer = new GuidLayerUtil();
        Display.stage.addChildAt(this.guidLayer, 10);
    }

    // ====================ǣ����Ϸ�߼��Ĳ����====================================
    public repleaceScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.removeChildren();
            this.gameLayer.addChild(layer);
        }
    }

    public pushScene(layer:egret.DisplayObject) {
        if (this.gameLayer != null && layer != null) {
            this.gameLayer.addChild(layer);
            this.stackLayer.push(layer);
        }
    }

    public popScene() {
        if (this.gameLayer != null) {
            var len = this.stackLayer.length;
            if (len > 0) {
                var layer = this.stackLayer[len - 1];
                if (layer.parent == this.gameLayer) {
                    this.gameLayer.removeChild(layer)
                    Util.removeByElements(this.stackLayer, layer);
                }
            }
        }
    }

    ///////////////////////////������/////////////////////////////////////////////////
    public addGuidLayer() {
        this.guidLayer.addGuidLayer();
    }

    public getCurGuidLayer() {
        return this.guidLayer.curLayer;
    }

    public cleanGuidLayer() {
        this.guidLayer.cleanGuidLayer();
    }

    // ====================ǣ�������߼������====================================
    // ����ȴ�
    public addNetWaitLayer() {
        this.netLayer.addWaitLayer();
    }

    //ǿ������
    public addNetOutLineLayer() {
        this.netLayer.addOutLineLayer();
    }

    //�������
    public addNetErrorLayer() {
        this.netLayer.addErrorLayer();
    }

    // �����������н���
    public cleanNetLayer() {
        this.netLayer.cleanLayer();
    }
}
