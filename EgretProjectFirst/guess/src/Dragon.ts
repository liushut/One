class Dragon extends egret.DisplayObjectContainer {
    public constructor()
    {
        super();
        // this.init();
    }
    private init()
    {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        let egretFctory:dragonBones.EgretFactory  = dragonBones.EgretFactory.factory;
        egretFctory.parseDragonBonesData(dragonbonesData);
        egretFctory.parseTextureAtlasData(textureData,texture);
        let armatureDisplay:dragonBones.EgretArmatureDisplay = egretFctory.buildArmatureDisplay("robot");
        this.addChild(armatureDisplay);
        armatureDisplay.x = 200;
        armatureDisplay.y = 300;
        armatureDisplay.scaleX = 0.5;
        armatureDisplay.scaleX  = 0.5;
        armatureDisplay.animation.play("walk");
    }
}