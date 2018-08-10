class ImgAnim extends eui.Image{
	private imgArray:string[];
	/**
	 * 间隔时间(毫秒)
	 */
	public interval = 0;
	/**
	 * 重复播放
	 */
	public loop = true;
	/**
	 * 当前播放下标位置
	 */
	public index = 0;
	private id;

	public constructor(array:string[]) {
		super();
		this.imgArray = array;
		this.source = array[0];
	}

	public play(){
		let self = this;
		this.id = setInterval(function(){
			self.index++;
			if(self.index >= self.imgArray.length){
				if(self.loop){
					self.index = 0;
				}else{
					self.stop();
				}
			}
			self.source = self.imgArray[self.index];
		}, this.interval, this);
	}


	public replay(){
		this.index = 0;
		clearInterval(this.id);
		this.play();
	}


	public pause(){
		clearInterval(this.id);
	}


	public stop(){
		this.index = 0;
		clearInterval(this.id);
	}
}