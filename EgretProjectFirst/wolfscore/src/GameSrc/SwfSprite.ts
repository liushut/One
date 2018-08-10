module starlingSwf{
    /**
     * Sprite
     */
    export class SwfSprite extends egret.DisplayObjectContainer{
        public getTextField(name:string):egret.TextField{
            return <egret.TextField>this.getChildByName(name);
        }
        public getMoive(name:string):starlingSwf.SwfMovieClip{
                return <starlingSwf.SwfMovieClip>this.getChildByName(name);
        }
        public getSprite(name:string):starlingSwf.SwfSprite{
            return <starlingSwf.SwfSprite>this.getChildByName(name);
        }
        public getImage(name:string):egret.Bitmap{
            return <egret.Bitmap>this.getChildByName(name);
        }
    }
}