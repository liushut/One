class ModuleStartUp {
	public constructor() {
	}

	public static init(): number {
		ZJ.SocketManager.instance.setCompany(1);

		ZJ.AudioManager.Instance.bgm = "bgm";

		// open
		ZJ.UIManager.instance.openView(UIName.Game0);

		return 0;
	}
}

