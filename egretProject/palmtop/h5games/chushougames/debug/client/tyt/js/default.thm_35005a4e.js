window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"}
generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text")
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/common/CountDown.exml'] = window.CountDownSkin = (function (_super) {
	__extends(CountDownSkin, _super);
	function CountDownSkin() {
		_super.call(this);
		this.skinParts = ["labelold","label"];
		
		this.elementsContent = [this.labelold_i(),this.label_i()];
	}
	var _proto = CountDownSkin.prototype;

	_proto.labelold_i = function () {
		var t = new eui.Label();
		this.labelold = t;
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "00:00";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.label_i = function () {
		var t = new eui.BitmapLabel();
		this.label = t;
		t.font = "time2fnt_fnt";
		t.height = 90;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "11:22";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 300;
		return t;
	};
	return CountDownSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/MyCountDown.exml'] = window.MyCountDownSkin = (function (_super) {
	__extends(MyCountDownSkin, _super);
	function MyCountDownSkin() {
		_super.call(this);
		this.skinParts = ["label"];
		
		this.elementsContent = [this.label_i()];
	}
	var _proto = MyCountDownSkin.prototype;

	_proto.label_i = function () {
		var t = new eui.BitmapLabel();
		this.label = t;
		t.font = "time2fnt_fnt";
		t.height = 50;
		t.horizontalCenter = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.text = "00:00";
		t.textAlign = "center";
		t.width = 350;
		t.y = 50;
		return t;
	};
	return MyCountDownSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/NumCountDown.exml'] = window.NumCountDownSkin = (function (_super) {
	__extends(NumCountDownSkin, _super);
	function NumCountDownSkin() {
		_super.call(this);
		this.skinParts = ["labelold","label"];
		
		this.elementsContent = [this.labelold_i(),this.label_i()];
	}
	var _proto = NumCountDownSkin.prototype;

	_proto.labelold_i = function () {
		var t = new eui.Label();
		this.labelold = t;
		t.horizontalCenter = 0;
		t.size = 140;
		t.text = "3";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.label_i = function () {
		var t = new eui.BitmapLabel();
		this.label = t;
		t.font = "time1fnt_fnt";
		t.height = 140;
		t.text = "0";
		t.width = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return NumCountDownSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Plate.exml'] = window.PlateSkin = (function (_super) {
	__extends(PlateSkin, _super);
	function PlateSkin() {
		_super.call(this);
		this.skinParts = ["img"];
		
		this.width = 168;
		this.elementsContent = [this.img_i()];
	}
	var _proto = PlateSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.height = 63;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.source = "w3_png";
		t.verticalCenter = 0;
		return t;
	};
	return PlateSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Player.exml'] = window.PlayerSkin = (function (_super) {
	__extends(PlayerSkin, _super);
	function PlayerSkin() {
		_super.call(this);
		this.skinParts = ["img","dbScaler","gMC","gUp"];
		
		this.height = 126;
		this.width = 98;
		this.elementsContent = [this.gUp_i()];
	}
	var _proto = PlayerSkin.prototype;

	_proto.gUp_i = function () {
		var t = new eui.Group();
		this.gUp = t;
		t.height = 126;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.img_i(),this.gMC_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 49;
		t.anchorOffsetY = 126;
		t.height = 126;
		t.scaleY = 1;
		t.source = "";
		t.width = 98;
		t.x = 49;
		t.y = 126;
		return t;
	};
	_proto.gMC_i = function () {
		var t = new eui.Group();
		this.gMC = t;
		t.anchorOffsetX = 49;
		t.anchorOffsetY = 126;
		t.height = 126;
		t.width = 98;
		t.x = 49;
		t.y = 126;
		t.elementsContent = [this.dbScaler_i()];
		return t;
	};
	_proto.dbScaler_i = function () {
		var t = new eui.Image();
		this.dbScaler = t;
		t.height = 126;
		t.source = "";
		t.width = 98;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return PlayerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/ReadyGo.exml'] = window.ReadyGoSkin = (function (_super) {
	__extends(ReadyGoSkin, _super);
	function ReadyGoSkin() {
		_super.call(this);
		this.skinParts = ["ready","go"];
		
		this.height = 109;
		this.width = 369;
		this.elementsContent = [this.ready_i(),this.go_i()];
	}
	var _proto = ReadyGoSkin.prototype;

	_proto.ready_i = function () {
		var t = new eui.Image();
		this.ready = t;
		t.anchorOffsetX = 185;
		t.anchorOffsetY = 39;
		t.horizontalCenter = 0;
		t.source = "ready_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.go_i = function () {
		var t = new eui.Image();
		this.go = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 55;
		t.horizontalCenter = 0;
		t.source = "go_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return ReadyGoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/TransparentBtn.exml'] = window.TransparentBtnSkin = (function (_super) {
	__extends(TransparentBtnSkin, _super);
	function TransparentBtnSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 100;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 100;
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","horizontalCenter",0),
					new eui.SetProperty("_Image1","verticalCenter",0),
					new eui.SetProperty("_Image1","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = TransparentBtnSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return TransparentBtnSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/YYLoadingPB.exml'] = window.YYLoadingPBSkin = (function (_super) {
	__extends(YYLoadingPBSkin, _super);
	function YYLoadingPBSkin() {
		_super.call(this);
		this.skinParts = ["trace","thumb","labelDisplay"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.trace_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = YYLoadingPBSkin.prototype;

	_proto.trace_i = function () {
		var t = new eui.Image();
		this.trace = t;
		t.percentHeight = 100;
		t.source = "logo_prg_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "logo_prg_bar_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.horizontalCenter = 0;
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		return t;
	};
	return YYLoadingPBSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/ZJButton.exml'] = window.ZJButtonSkin = (function (_super) {
	__extends(ZJButtonSkin, _super);
	function ZJButtonSkin() {
		_super.call(this);
		this.skinParts = ["img","labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this.img_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("img","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("img","alpha",0.5)
				])
		];
	}
	var _proto = ZJButtonSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ZJButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/GameView.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["bg7","bg8","bg77","bg3","bg4","bg33","bg5","bg6","bg55","gPlate","zhongdian","gZhongdian","gZhongdianceng","gPlayer","bg1","bg2","bg","bgAll","scoreLabel1","scoreLabel2","nameLabel1","nameLabel2","danji","restart","log","prograssLabel","compare2","compare0","compare1","jinduTou2","jindu2","jinduTou1","jindu1","gTop","big"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.bgAll_i(),this.gTop_i(),this.big_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto.bgAll_i = function () {
		var t = new eui.Group();
		this.bgAll = t;
		t.height = 10;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg77_i(),this.bg33_i(),this.bg55_i(),this.bg_i()];
		return t;
	};
	_proto.bg77_i = function () {
		var t = new eui.Group();
		this.bg77 = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg7_i(),this.bg8_i()];
		return t;
	};
	_proto.bg7_i = function () {
		var t = new eui.Group();
		this.bg7 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 1920;
		t.source = "bg0_png";
		t.top = 0;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 1920;
		t.source = "bg0_png";
		t.top = 0;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		return t;
	};
	_proto.bg8_i = function () {
		var t = new eui.Group();
		this.bg8 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 2160;
		t.y = 0;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 1920;
		t.source = "bg0_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 1920;
		t.source = "bg0_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bg33_i = function () {
		var t = new eui.Group();
		this.bg33 = t;
		t.height = 10;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg3_i(),this.bg4_i()];
		return t;
	};
	_proto.bg3_i = function () {
		var t = new eui.Group();
		this.bg3 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 572;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 572;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		return t;
	};
	_proto.bg4_i = function () {
		var t = new eui.Group();
		this.bg4 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 2160;
		t.y = 0;
		t.elementsContent = [this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 572;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 572;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		return t;
	};
	_proto.bg55_i = function () {
		var t = new eui.Group();
		this.bg55 = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg5_i(),this.bg6_i()];
		return t;
	};
	_proto.bg5_i = function () {
		var t = new eui.Group();
		this.bg5 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 290;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 290;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		return t;
	};
	_proto.bg6_i = function () {
		var t = new eui.Group();
		this.bg6 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 2160;
		t.y = 0;
		t.elementsContent = [this._Image11_i(),this._Image12_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 290;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 290;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Group();
		this.bg = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.gPlate_i(),this.gZhongdianceng_i(),this.gPlayer_i(),this.bg1_i(),this.bg2_i()];
		return t;
	};
	_proto.gPlate_i = function () {
		var t = new eui.Group();
		this.gPlate = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gZhongdianceng_i = function () {
		var t = new eui.Group();
		this.gZhongdianceng = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.zhongdian_i(),this.gZhongdian_i()];
		return t;
	};
	_proto.zhongdian_i = function () {
		var t = new eui.Image();
		this.zhongdian = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 246;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zhongdian_png";
		t.visible = false;
		t.x = 826.0000000000001;
		t.y = 800;
		return t;
	};
	_proto.gZhongdian_i = function () {
		var t = new eui.Group();
		this.gZhongdian = t;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 10;
		t.x = 770;
		t.y = 188;
		t.elementsContent = [this._Image13_i(),this._Image14_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "zd1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "zd2_png";
		t.verticalCenter = 92;
		return t;
	};
	_proto.gPlayer_i = function () {
		var t = new eui.Group();
		this.gPlayer = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bg1_i = function () {
		var t = new eui.Group();
		this.bg1 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image15_i(),this._Image16_i()];
		return t;
	};
	_proto._Image15_i = function () {
		var t = new eui.Image();
		t.bottom = 147;
		t.height = 288;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1074;
		t.x = 1086;
		return t;
	};
	_proto._Image16_i = function () {
		var t = new eui.Image();
		t.bottom = 147;
		t.height = 288;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1074;
		t.x = 3;
		return t;
	};
	_proto.bg2_i = function () {
		var t = new eui.Group();
		this.bg2 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 2160;
		t.y = 0;
		t.elementsContent = [this._Image17_i(),this._Image18_i()];
		return t;
	};
	_proto._Image17_i = function () {
		var t = new eui.Image();
		t.bottom = 147;
		t.height = 288;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1074;
		t.x = 1086;
		return t;
	};
	_proto._Image18_i = function () {
		var t = new eui.Image();
		t.bottom = 147;
		t.height = 288;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1074;
		t.x = 3;
		return t;
	};
	_proto.gTop_i = function () {
		var t = new eui.Group();
		this.gTop = t;
		t.touchEnabled = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image19_i(),this._Image20_i(),this.scoreLabel1_i(),this.scoreLabel2_i(),this.nameLabel1_i(),this.nameLabel2_i(),this.danji_i(),this.restart_i(),this.log_i(),this.prograssLabel_i(),this.compare2_i(),this.compare0_i(),this.compare1_i(),this._Group1_i()];
		return t;
	};
	_proto._Image19_i = function () {
		var t = new eui.Image();
		t.fillMode = "clip";
		t.scale9Grid = new egret.Rectangle(65,0,3,50);
		t.scaleX = 2.2;
		t.scaleY = 2.2;
		t.source = "di1_png";
		t.touchEnabled = false;
		t.visible = false;
		t.width = 180;
		t.x = 30;
		t.y = 239;
		return t;
	};
	_proto._Image20_i = function () {
		var t = new eui.Image();
		t.fillMode = "clip";
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(65,0,2,50);
		t.scaleX = 2.2;
		t.scaleY = 2.2;
		t.source = "di1_png";
		t.touchEnabled = false;
		t.visible = false;
		t.width = 180;
		t.y = 239;
		return t;
	};
	_proto.scoreLabel1_i = function () {
		var t = new eui.Label();
		this.scoreLabel1 = t;
		t.height = 50;
		t.scaleX = 2.2;
		t.scaleY = 2.2;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 180;
		t.x = 30;
		t.y = 239;
		return t;
	};
	_proto.scoreLabel2_i = function () {
		var t = new eui.Label();
		this.scoreLabel2 = t;
		t.height = 50;
		t.right = 30;
		t.scaleX = 2.2;
		t.scaleY = 2.2;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 180;
		t.y = 239;
		return t;
	};
	_proto.nameLabel1_i = function () {
		var t = new eui.Label();
		this.nameLabel1 = t;
		t.height = 55;
		t.text = "";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 200;
		t.x = 160;
		t.y = 75;
		return t;
	};
	_proto.nameLabel2_i = function () {
		var t = new eui.Label();
		this.nameLabel2 = t;
		t.height = 55;
		t.text = "";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 200;
		t.x = 700;
		t.y = 75;
		return t;
	};
	_proto.danji_i = function () {
		var t = new eui.Button();
		this.danji = t;
		t.height = 100;
		t.label = "单机";
		t.visible = false;
		t.width = 200;
		t.x = 291;
		t.y = 27.5;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Button();
		this.restart = t;
		t.height = 100;
		t.label = "重新开始";
		t.visible = false;
		t.width = 200;
		t.x = 45;
		t.y = 27;
		return t;
	};
	_proto.log_i = function () {
		var t = new eui.Label();
		this.log = t;
		t.horizontalCenter = 0;
		t.text = "";
		t.textAlign = "center";
		t.top = 460;
		t.touchEnabled = false;
		t.width = 1000;
		return t;
	};
	_proto.prograssLabel_i = function () {
		var t = new eui.Label();
		this.prograssLabel = t;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x0cff2a;
		t.visible = false;
		t.width = 1000;
		t.y = 480;
		return t;
	};
	_proto.compare2_i = function () {
		var t = new eui.BitmapLabel();
		this.compare2 = t;
		t.anchorOffsetY = 0;
		t.font = "num2fnt_fnt";
		t.height = 4;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.text = "ab222c";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.y = 530;
		return t;
	};
	_proto.compare0_i = function () {
		var t = new eui.BitmapLabel();
		this.compare0 = t;
		t.anchorOffsetY = 0;
		t.font = "num0fnt_fnt";
		t.height = 4;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.text = "ab222c";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.y = 530;
		return t;
	};
	_proto.compare1_i = function () {
		var t = new eui.BitmapLabel();
		this.compare1 = t;
		t.anchorOffsetY = 0;
		t.font = "num1fnt_fnt";
		t.height = 4;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.text = "abcd";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.y = 530;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.y = 230;
		t.elementsContent = [this._Image21_i(),this.jindu2_i(),this.jindu1_i()];
		return t;
	};
	_proto._Image21_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.source = "jindu_png";
		t.y = -17;
		return t;
	};
	_proto.jindu2_i = function () {
		var t = new eui.Group();
		this.jindu2 = t;
		t.touchEnabled = false;
		t.x = 50;
		t.y = -10;
		t.elementsContent = [this._Image22_i(),this.jinduTou2_i()];
		return t;
	};
	_proto._Image22_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 27;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.source = "jindu2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.jinduTou2_i = function () {
		var t = new eui.Image();
		this.jinduTou2 = t;
		t.anchorOffsetX = 27;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.source = "jindu11_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.jindu1_i = function () {
		var t = new eui.Group();
		this.jindu1 = t;
		t.touchEnabled = false;
		t.x = 50;
		t.y = -10;
		t.elementsContent = [this._Image23_i(),this.jinduTou1_i()];
		return t;
	};
	_proto._Image23_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 27;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.source = "jindu1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.jinduTou1_i = function () {
		var t = new eui.Image();
		this.jinduTou1 = t;
		t.anchorOffsetX = 27;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.source = "jindu11_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.big_i = function () {
		var t = new eui.Button();
		this.big = t;
		t.bottom = 0;
		t.label = "";
		t.left = 0;
		t.right = 0;
		t.skinName = "TransparentBtnSkin";
		t.top = 0;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/LoadingView.exml'] = window.LoadingViewSkin = (function (_super) {
	__extends(LoadingViewSkin, _super);
	function LoadingViewSkin() {
		_super.call(this);
		this.skinParts = ["black","bg7","bg77","bg1","bg","bg5","bg55","bg3","bg33","bgAll","load1"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.black_i(),this.bgAll_i(),this._Group1_i()];
	}
	var _proto = LoadingViewSkin.prototype;

	_proto.black_i = function () {
		var t = new eui.Group();
		this.black = t;
		t.height = 10;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.y = 0;
		return t;
	};
	_proto.bgAll_i = function () {
		var t = new eui.Group();
		this.bgAll = t;
		t.height = 10;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg77_i(),this.bg_i(),this.bg55_i(),this.bg33_i()];
		return t;
	};
	_proto.bg77_i = function () {
		var t = new eui.Group();
		this.bg77 = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg7_i()];
		return t;
	};
	_proto.bg7_i = function () {
		var t = new eui.Group();
		this.bg7 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 1920;
		t.source = "bg0_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 1920;
		t.source = "bg0_png";
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 1080;
		t.y = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Group();
		this.bg = t;
		t.height = 10;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg1_i()];
		return t;
	};
	_proto.bg1_i = function () {
		var t = new eui.Group();
		this.bg1 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 419;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = -10;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 419;
		t.source = "bg1_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = 1070;
		return t;
	};
	_proto.bg55_i = function () {
		var t = new eui.Group();
		this.bg55 = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg5_i()];
		return t;
	};
	_proto.bg5_i = function () {
		var t = new eui.Group();
		this.bg5 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 150;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = -10;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 150;
		t.source = "bg3_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = 1070;
		return t;
	};
	_proto.bg33_i = function () {
		var t = new eui.Group();
		this.bg33 = t;
		t.height = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 10;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.bg3_i()];
		return t;
	};
	_proto.bg3_i = function () {
		var t = new eui.Group();
		this.bg3 = t;
		t.height = 1920;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.width = 1080;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.bottom = 126;
		t.height = 230;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = -10;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.bottom = 126;
		t.height = 230;
		t.source = "bg2_png";
		t.touchEnabled = false;
		t.width = 1100;
		t.x = 1070;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchEnabled = false;
		t.y = 0;
		t.elementsContent = [this.load1_i()];
		return t;
	};
	_proto.load1_i = function () {
		var t = new eui.Label();
		this.load1 = t;
		t.horizontalCenter = 0;
		t.size = 80;
		t.text = "0%";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 500;
		return t;
	};
	return LoadingViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/SettleView.exml'] = window.SettleViewSkin = (function (_super) {
	__extends(SettleViewSkin, _super);
	var SettleViewSkin$Skin1 = 	(function (_super) {
		__extends(SettleViewSkin$Skin1, _super);
		function SettleViewSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["img","labelDisplay"];
			
			this.elementsContent = [this.img_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("img","source","zailai_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("img","source","zailai_png")
					])
			];
		}
		var _proto = SettleViewSkin$Skin1.prototype;

		_proto.img_i = function () {
			var t = new eui.Image();
			this.img = t;
			t.percentHeight = 100;
			t.source = "zailai_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettleViewSkin$Skin1;
	})(eui.Skin);

	function SettleViewSkin() {
		_super.call(this);
		this.skinParts = ["gBg","bg","icon","score1","score2","score1old","score2old","restart","big"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.gBg_i(),this._Group1_i(),this.big_i()];
	}
	var _proto = SettleViewSkin.prototype;

	_proto.gBg_i = function () {
		var t = new eui.Group();
		this.gBg = t;
		t.alpha = 1.18;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scrollEnabled = false;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.top = 0;
		t.touchEnabled = false;
		t.elementsContent = [this.bg_i(),this.icon_i(),this._Image1_i(),this._Image2_i(),this.score1_i(),this.score2_i(),this.score1old_i(),this.score2old_i(),this.restart_i(),this._Button1_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 375;
		t.anchorOffsetY = 355;
		t.height = 710;
		t.horizontalCenter = 0;
		t.source = "shenglidi_png";
		t.touchEnabled = false;
		t.verticalCenter = -115;
		t.width = 750;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "shengli_png";
		t.touchEnabled = false;
		t.verticalCenter = -97;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "clip";
		t.height = 52;
		t.scale9Grid = new egret.Rectangle(65,0,3,50);
		t.scaleX = 1.53;
		t.scaleY = 1.53;
		t.source = "di1_png";
		t.touchEnabled = false;
		t.visible = false;
		t.width = 180;
		t.x = 30;
		t.y = 166;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.fillMode = "clip";
		t.height = 52;
		t.right = 30;
		t.scale9Grid = new egret.Rectangle(65,0,2,50);
		t.scaleX = 1.53;
		t.scaleY = 1.53;
		t.source = "di1_png";
		t.touchEnabled = false;
		t.visible = false;
		t.width = 180;
		t.y = 166;
		return t;
	};
	_proto.score1_i = function () {
		var t = new eui.BitmapLabel();
		this.score1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "scorefnt_fnt";
		t.height = 77;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 280;
		t.x = 30;
		t.y = 166;
		return t;
	};
	_proto.score2_i = function () {
		var t = new eui.BitmapLabel();
		this.score2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "scorefnt_fnt";
		t.height = 77;
		t.right = 30;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 280;
		t.y = 166;
		return t;
	};
	_proto.score1old_i = function () {
		var t = new eui.Label();
		this.score1old = t;
		t.height = 50;
		t.scaleX = 1.53;
		t.scaleY = 1.53;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 180;
		t.x = 30;
		t.y = 166;
		return t;
	};
	_proto.score2old_i = function () {
		var t = new eui.Label();
		this.score2old = t;
		t.height = 50;
		t.right = 30;
		t.scaleX = 1.53;
		t.scaleY = 1.53;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 180;
		t.y = 166;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Button();
		this.restart = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.verticalCenter = 485.83333333333326;
		t.skinName = SettleViewSkin$Skin1;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new ZJ.Button();
		t.label = "Button";
		t.visible = false;
		t.x = 171;
		t.y = 950.11;
		return t;
	};
	_proto.big_i = function () {
		var t = new eui.Button();
		this.big = t;
		t.bottom = 0;
		t.label = "";
		t.left = 0;
		t.right = 0;
		t.skinName = "TransparentBtnSkin";
		t.top = 0;
		t.visible = false;
		return t;
	};
	return SettleViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/TestView.exml'] = window.TestViewSkin = (function (_super) {
	__extends(TestViewSkin, _super);
	function TestViewSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = TestViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "w3_png";
		t.x = 608;
		t.y = 650;
		return t;
	};
	return TestViewSkin;
})(eui.Skin);