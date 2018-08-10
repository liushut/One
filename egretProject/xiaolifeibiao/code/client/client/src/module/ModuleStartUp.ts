class ModuleStartUp {
	public constructor() {
	}

	public static init():number
	{
		ZJ.SocketManager.instance.setCompany(1);

		ZJ.AudioManager.Instance.bgm = "bg";
		ZJ.AudioManager.Instance.playBgm();

		// 装载不同界面
		if (ModuleConfig.compile.single) {
            ModuleConfig.uiDatas[UIName.Settle].viewClass = SettleView
        }
		 
		// open
        ZJ.UIManager.instance.openView(UIName.Game);
		

		return 0;
	}
}

