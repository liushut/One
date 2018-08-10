module starlingSwf{
    export class SwfMovieClip extends starlingSwf.SwfSprite implements starlingSwf.ISwfAnimation{

        private _ownerSwf:starlingSwf.Swf;//所属于的Swf

        private _frames:any[];//帧数
        private _labels:any[];//标签
        private _displayObjects:Object;

        private _startFrame:number;//开始帧
        private _currentFrame:number;
        private _endFrame:number;
        private _currentLabel:number;

        private _isPlay:boolean = false;//是否播放
        public loop:boolean = true;

        private _completeFunction:Function = null;//播放完毕的回调
        private _hasCompleteListener:boolean  = false;


        constructor(frames:any[],labels:any[],displayObjects:Object,ownerSwf:starlingSwf.Swf){
            super();

            this._frames = frames;
            this._labels = labels;
            this._displayObjects = displayObjects;

            this._startFrame = 0;
            this._endFrame = this._frames.length - 1;
            this._ownerSwf = ownerSwf;
            
            this.setCurrentFrame(0);
            this.play();

        }
        private setCurrentFrame(frame:number)
        {   


        }
        public update()
        {
            
        }
    }
}