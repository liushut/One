module starlingSwf{
    /**
     * swf资源管理器
     */
    export class SwfAssetManager{
        public static hrefValue = "";
        private  _sheet:Object;
        private _texture:Object;

        constructor(){
            this._sheet = {};
            this._texture = {};
        }

        public addSpriteSheet(name:string,spriteSheet:egret.SpriteSheet)
        {
            this._sheet[name] = spriteSheet;
        }
        public addTexture(name:string,texture:egret.Texture):void{
            this._texture[name] = texture;
        }
        public createBitMap(name:string):egret.Bitmap{
            var texture: egret.Texture = this.getTexture(name);
            if(texture == null)
            {
                return null;
            }
            var bitmap:egret.Bitmap =new egret.Bitmap();
            bitmap.texture = texture;
            return bitmap;
        }
        public getTexture(name:string):egret.Texture
        {
            var texture: egret.Texture;
            var sheet:egret.SpriteSheet;
            var key:string;
            for(key in this._sheet)
            {
                sheet = this._sheet[key];
                texture = sheet.getTexture(name);
                if(texture != null)
                {
                    break;
                }
            }
                if(texture == null)
                {
                    texture = this._texture[name];
                }
                return texture;
        }
    }
}