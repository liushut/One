class ModuleStartUp {
	public constructor() {
	}

	public static init():number
	{
		ZJ.SocketManager.instance.setCompany(1);
		// open
        ZJ.UIManager.instance.openView(UIName.Game);

		return 0;
	}
}

