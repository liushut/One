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
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
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
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Arrow.exml'] = window.ArrowSkin = (function (_super) {
	__extends(ArrowSkin, _super);
	function ArrowSkin() {
		_super.call(this);
		this.skinParts = ["arrow"];
		
		this.height = 208;
		this.width = 51;
		this.elementsContent = [this.arrow_i()];
	}
	var _proto = ArrowSkin.prototype;

	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.height = 208;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zhongdian_png";
		t.touchEnabled = false;
		t.width = 51;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return ArrowSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/ArrowHui.exml'] = window.ArrowHuiSkin = (function (_super) {
	__extends(ArrowHuiSkin, _super);
	function ArrowHuiSkin() {
		_super.call(this);
		this.skinParts = ["arrowHui"];
		
		this.height = 208;
		this.width = 51;
		this.elementsContent = [this.arrowHui_i()];
	}
	var _proto = ArrowHuiSkin.prototype;

	_proto.arrowHui_i = function () {
		var t = new eui.Image();
		this.arrowHui = t;
		t.height = 208;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zhongdian_png";
		t.touchEnabled = false;
		t.width = 51;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return ArrowHuiSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/BarBlack.exml'] = window.BarBlackSkin = (function (_super) {
	__extends(BarBlackSkin, _super);
	function BarBlackSkin() {
		_super.call(this);
		this.skinParts = ["barblack"];
		
		this.elementsContent = [this.barblack_i()];
	}
	var _proto = BarBlackSkin.prototype;

	_proto.barblack_i = function () {
		var t = new eui.Image();
		this.barblack = t;
		t.anchorOffsetX = 0;
		t.height = 39;
		t.source = "barblack_png";
		t.width = 529;
		t.x = 0;
		return t;
	};
	return BarBlackSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/BarRed.exml'] = window.BarRedSkin = (function (_super) {
	__extends(BarRedSkin, _super);
	function BarRedSkin() {
		_super.call(this);
		this.skinParts = ["barred"];
		
		this.elementsContent = [this.barred_i()];
	}
	var _proto = BarRedSkin.prototype;

	_proto.barred_i = function () {
		var t = new eui.Image();
		this.barred = t;
		t.source = "barred_png";
		return t;
	};
	return BarRedSkin;
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
		
		this.elementsContent = [this.img_i()];
	}
	var _proto = PlateSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 45;
		t.scaleX = 1;
		t.source = "w3_png";
		t.width = 32;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return PlateSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Player.exml'] = window.PlayerSkin = (function (_super) {
	__extends(PlayerSkin, _super);
	function PlayerSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 136;
		this.width = 63;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = PlayerSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "zhongdian_png";
		return t;
	};
	return PlayerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/QiuB.exml'] = window.QiuBSkin = (function (_super) {
	__extends(QiuBSkin, _super);
	function QiuBSkin() {
		_super.call(this);
		this.skinParts = ["qiuB"];
		
		this.height = 181;
		this.width = 181;
		this.elementsContent = [this.qiuB_i()];
	}
	var _proto = QiuBSkin.prototype;

	_proto.qiuB_i = function () {
		var t = new eui.Image();
		this.qiuB = t;
		t.anchorOffsetX = 0;
		t.height = 181;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "daqiu_png";
		t.width = 181;
		t.x = 0;
		return t;
	};
	return QiuBSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/QiuS.exml'] = window.QiuSSkin = (function (_super) {
	__extends(QiuSSkin, _super);
	function QiuSSkin() {
		_super.call(this);
		this.skinParts = ["qiuS"];
		
		this.height = 134;
		this.width = 134;
		this.elementsContent = [this.qiuS_i()];
	}
	var _proto = QiuSSkin.prototype;

	_proto.qiuS_i = function () {
		var t = new eui.Image();
		this.qiuS = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 134;
		t.source = "xiaoqiu_png";
		t.width = 134;
		t.x = 0;
		t.y = 1;
		return t;
	};
	return QiuSSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/testbtn.exml'] = window.testbtnSkin = (function (_super) {
	__extends(testbtnSkin, _super);
	function testbtnSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Button1_i()];
	}
	var _proto = testbtnSkin.prototype;

	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "Button";
		t.x = 133;
		t.y = 101;
		return t;
	};
	return testbtnSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/YuanJiao.exml'] = window.YuanJiaoSkin = (function (_super) {
	__extends(YuanJiaoSkin, _super);
	function YuanJiaoSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 192;
		this.width = 192;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = YuanJiaoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 192;
		t.anchorOffsetY = 192;
		t.height = 192;
		t.source = "yuanjiao_png";
		t.width = 192;
		t.x = 192;
		t.y = 192;
		return t;
	};
	return YuanJiaoSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/YYLoadingPB.exml'] = window.YYLoadingPBSkin = (function (_super) {
	__extends(YYLoadingPBSkin, _super);
	function YYLoadingPBSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = YYLoadingPBSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "barred_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "barblack_png";
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/GameView.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["juzhong","quanping","bg1","bg2","topFather","nickNameID","nickName","healthLabel","scoreBitLabel","backFather","perfectImg","pts","start","add","five","startGroup","perfectImg0","pts0","hit","add0","three","hitGroup","perfectImg1","pts1","hit0","cheng","add1","four","comboNum","comboGroups","perfectGroup","bgAll","game"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.juzhong_i(),this.quanping_i(),this.bg1_i(),this.bg2_i(),this.topFather_i(),this.game_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto.juzhong_i = function () {
		var t = new eui.Group();
		this.juzhong = t;
		t.height = 1920;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		return t;
	};
	_proto.quanping_i = function () {
		var t = new eui.Group();
		this.quanping = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.bg1_i = function () {
		var t = new eui.Image();
		this.bg1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 2340;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.source = "bg_jpg";
		t.width = 1440;
		t.y = 960;
		return t;
	};
	_proto.bg2_i = function () {
		var t = new eui.Image();
		this.bg2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 2340;
		t.horizontalCenter = 1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bg_jpg";
		t.width = 1440;
		t.y = -1370;
		return t;
	};
	_proto.topFather_i = function () {
		var t = new eui.Group();
		this.topFather = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 200;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.game_i = function () {
		var t = new eui.Group();
		this.game = t;
		t.bottom = 0;
		t.height = 1920;
		t.horizontalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this.bgAll_i()];
		return t;
	};
	_proto.bgAll_i = function () {
		var t = new eui.Group();
		this.bgAll = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1680;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 1080;
		t.x = 0;
		t.y = 90;
		t.elementsContent = [this.nickNameID_i(),this.nickName_i(),this.healthLabel_i(),this.scoreBitLabel_i(),this.backFather_i(),this.perfectGroup_i()];
		return t;
	};
	_proto.nickNameID_i = function () {
		var t = new eui.Label();
		this.nickNameID = t;
		t.anchorOffsetX = -25;
		t.anchorOffsetY = -8.33;
		t.height = 114;
		t.size = 50;
		t.text = "用户名称：";
		t.verticalAlign = "middle";
		t.width = 326;
		t.x = 582;
		t.y = 103.67;
		return t;
	};
	_proto.nickName_i = function () {
		var t = new eui.Label();
		this.nickName = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 106;
		t.size = 50;
		t.text = "小燕子";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 254;
		t.x = 806;
		t.y = 120;
		return t;
	};
	_proto.healthLabel_i = function () {
		var t = new eui.Label();
		this.healthLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Georgia";
		t.height = 106;
		t.size = 70;
		t.text = "3";
		t.textColor = 0xb21c49;
		t.verticalAlign = "middle";
		t.width = 250;
		t.x = 0;
		t.y = 120;
		return t;
	};
	_proto.scoreBitLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.scoreBitLabel = t;
		t.font = "jishu_fnt";
		t.height = 210;
		t.horizontalCenter = 120;
		t.text = "5";
		t.width = 447;
		t.y = 173;
		return t;
	};
	_proto.backFather_i = function () {
		var t = new eui.Group();
		this.backFather = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 123;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 180;
		t.x = 0;
		t.y = 1707;
		return t;
	};
	_proto.perfectGroup_i = function () {
		var t = new eui.Group();
		this.perfectGroup = t;
		t.height = 200;
		t.width = 200;
		t.x = 440;
		t.y = 740;
		t.elementsContent = [this.startGroup_i(),this.hitGroup_i(),this.comboGroups_i()];
		return t;
	};
	_proto.startGroup_i = function () {
		var t = new eui.Group();
		this.startGroup = t;
		t.alpha = 0;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.perfectImg_i(),this.pts_i(),this.start_i(),this.add_i(),this.five_i()];
		return t;
	};
	_proto.perfectImg_i = function () {
		var t = new eui.Image();
		this.perfectImg = t;
		t.height = 79;
		t.source = "perfect_png";
		t.width = 413;
		t.x = -286;
		t.y = 61;
		return t;
	};
	_proto.pts_i = function () {
		var t = new eui.Image();
		this.pts = t;
		t.height = 68;
		t.source = "pts_png";
		t.width = 161;
		t.x = 76;
		t.y = 168;
		return t;
	};
	_proto.start_i = function () {
		var t = new eui.Image();
		this.start = t;
		t.height = 79;
		t.source = "start_png";
		t.width = 312;
		t.x = 159;
		t.y = 61;
		return t;
	};
	_proto.add_i = function () {
		var t = new eui.Image();
		this.add = t;
		t.height = 68;
		t.source = "+_png";
		t.width = 54;
		t.x = -61;
		t.y = 162.5;
		return t;
	};
	_proto.five_i = function () {
		var t = new eui.Image();
		this.five = t;
		t.height = 68;
		t.source = "52_png";
		t.width = 50;
		t.x = -3;
		t.y = 168;
		return t;
	};
	_proto.hitGroup_i = function () {
		var t = new eui.Group();
		this.hitGroup = t;
		t.alpha = 0;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.perfectImg0_i(),this.pts0_i(),this.hit_i(),this.add0_i(),this.three_i()];
		return t;
	};
	_proto.perfectImg0_i = function () {
		var t = new eui.Image();
		this.perfectImg0 = t;
		t.height = 79;
		t.source = "perfect_png";
		t.width = 413;
		t.x = -218;
		t.y = 61;
		return t;
	};
	_proto.pts0_i = function () {
		var t = new eui.Image();
		this.pts0 = t;
		t.height = 68;
		t.source = "pts_png";
		t.width = 161;
		t.x = 76;
		t.y = 168;
		return t;
	};
	_proto.hit_i = function () {
		var t = new eui.Image();
		this.hit = t;
		t.height = 79;
		t.source = "hit_png";
		t.width = 159;
		t.x = 227;
		t.y = 61;
		return t;
	};
	_proto.add0_i = function () {
		var t = new eui.Image();
		this.add0 = t;
		t.height = 68;
		t.source = "+_png";
		t.width = 54;
		t.x = -61;
		t.y = 162.5;
		return t;
	};
	_proto.three_i = function () {
		var t = new eui.Image();
		this.three = t;
		t.height = 68;
		t.source = "32_png";
		t.width = 50;
		t.x = -3;
		t.y = 168;
		return t;
	};
	_proto.comboGroups_i = function () {
		var t = new eui.Group();
		this.comboGroups = t;
		t.alpha = 0;
		t.height = 200;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.perfectImg1_i(),this.pts1_i(),this.hit0_i(),this.cheng_i(),this.add1_i(),this.four_i(),this.comboNum_i()];
		return t;
	};
	_proto.perfectImg1_i = function () {
		var t = new eui.Image();
		this.perfectImg1 = t;
		t.height = 79;
		t.source = "perfect_png";
		t.width = 413;
		t.x = -302;
		t.y = 61;
		return t;
	};
	_proto.pts1_i = function () {
		var t = new eui.Image();
		this.pts1 = t;
		t.height = 68;
		t.source = "pts_png";
		t.width = 161;
		t.x = 76;
		t.y = 168;
		return t;
	};
	_proto.hit0_i = function () {
		var t = new eui.Image();
		this.hit0 = t;
		t.height = 79;
		t.source = "hit_png";
		t.width = 159;
		t.x = 143;
		t.y = 61;
		return t;
	};
	_proto.cheng_i = function () {
		var t = new eui.Image();
		this.cheng = t;
		t.height = 79;
		t.source = "x_png";
		t.width = 44;
		t.x = 335;
		t.y = 61;
		return t;
	};
	_proto.add1_i = function () {
		var t = new eui.Image();
		this.add1 = t;
		t.height = 68;
		t.source = "+_png";
		t.width = 54;
		t.x = -61;
		t.y = 162.5;
		return t;
	};
	_proto.four_i = function () {
		var t = new eui.Image();
		this.four = t;
		t.height = 68;
		t.source = "42_png";
		t.width = 50;
		t.x = -3;
		t.y = 168;
		return t;
	};
	_proto.comboNum_i = function () {
		var t = new eui.BitmapLabel();
		this.comboNum = t;
		t.font = "zise_fnt";
		t.height = 95;
		t.text = "2";
		t.width = 185;
		t.x = 385.12;
		t.y = 67.06;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/LoadingView.exml'] = window.LoadingViewSkin = (function (_super) {
	__extends(LoadingViewSkin, _super);
	function LoadingViewSkin() {
		_super.call(this);
		this.skinParts = ["black","load1"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.black_i(),this._Group1_i()];
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
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettleViewSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "paihangbang_png";
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

	var SettleViewSkin$Skin2 = 	(function (_super) {
		__extends(SettleViewSkin$Skin2, _super);
		function SettleViewSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this._Image2_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SettleViewSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "anniu_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "zaiwanyiju_png";
			t.verticalCenter = 0;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SettleViewSkin$Skin2;
	})(eui.Skin);

	function SettleViewSkin() {
		_super.call(this);
		this.skinParts = ["gBg","dikuan","icon3","smallWeekScore","smallWeekScoreImg","icon","icon2","phb","restart","weekScoreImg","weekScore","scoreImg","scoreBit","rank","fengxian","friend","big"];
		
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
		t.anchorOffsetY = 0;
		t.height = 1500;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 940;
		t.elementsContent = [this.dikuan_i(),this.icon3_i(),this.smallWeekScore_i(),this.smallWeekScoreImg_i(),this.icon_i(),this.icon2_i(),this.phb_i(),this.restart_i(),this.weekScoreImg_i(),this.weekScore_i(),this.scoreImg_i(),this.scoreBit_i(),this.rank_i(),this.fengxian_i(),this.friend_i()];
		return t;
	};
	_proto.dikuan_i = function () {
		var t = new eui.Image();
		this.dikuan = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 932;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(15,11,19,20);
		t.source = "dikuang2_png";
		t.verticalCenter = 0;
		t.width = 868;
		return t;
	};
	_proto.icon3_i = function () {
		var t = new eui.Image();
		this.icon3 = t;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.horizontalCenter = -210;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hypm2_png";
		t.touchEnabled = false;
		t.y = 830;
		return t;
	};
	_proto.smallWeekScore_i = function () {
		var t = new eui.BitmapLabel();
		this.smallWeekScore = t;
		t.alpha = 1;
		t.anchorOffsetX = .5;
		t.anchorOffsetY = 0.5;
		t.font = "jishu_fnt";
		t.height = 126;
		t.scaleX = 0.22;
		t.scaleY = 0.22;
		t.text = "123456";
		t.textAlign = "left";
		t.width = 760;
		t.x = 675.76;
		t.y = 734;
		return t;
	};
	_proto.smallWeekScoreImg_i = function () {
		var t = new eui.Image();
		this.smallWeekScoreImg = t;
		t.alpha = 1;
		t.anchorOffsetX = 0.5;
		t.anchorOffsetY = 0.5;
		t.height = 87;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "zuijia_png";
		t.touchEnabled = false;
		t.width = 376;
		t.x = 470;
		t.y = 738;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 150;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "jieshu_png";
		t.touchEnabled = false;
		t.width = 622;
		t.y = 330;
		return t;
	};
	_proto.icon2_i = function () {
		var t = new eui.Image();
		this.icon2 = t;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.horizontalCenter = 210;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "youxipaiming_png";
		t.touchEnabled = false;
		t.y = 830;
		return t;
	};
	_proto.phb_i = function () {
		var t = new eui.Button();
		this.phb = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 357;
		t.y = 1099;
		t.skinName = SettleViewSkin$Skin1;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Button();
		this.restart = t;
		t.height = 135;
		t.horizontalCenter = 0;
		t.icon = "dengdai_png";
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 519;
		t.y = 1264;
		t.skinName = SettleViewSkin$Skin2;
		return t;
	};
	_proto.weekScoreImg_i = function () {
		var t = new eui.Image();
		this.weekScoreImg = t;
		t.alpha = 0;
		t.anchorOffsetX = 0.5;
		t.anchorOffsetY = 0.5;
		t.height = 87;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zuijia_png";
		t.touchEnabled = false;
		t.width = 376;
		t.y = 550;
		return t;
	};
	_proto.weekScore_i = function () {
		var t = new eui.BitmapLabel();
		this.weekScore = t;
		t.alpha = 0;
		t.anchorOffsetX = .5;
		t.anchorOffsetY = 0.5;
		t.font = "jishu_fnt";
		t.height = 126;
		t.horizontalCenter = 3.5;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.text = "123";
		t.textAlign = "center";
		t.width = 458;
		t.y = 675;
		return t;
	};
	_proto.scoreImg_i = function () {
		var t = new eui.Image();
		this.scoreImg = t;
		t.alpha = 1;
		t.anchorOffsetX = .5;
		t.anchorOffsetY = 0.5;
		t.height = 64;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bencidefen_png";
		t.touchEnabled = false;
		t.width = 289;
		t.y = 530;
		return t;
	};
	_proto.scoreBit_i = function () {
		var t = new eui.BitmapLabel();
		this.scoreBit = t;
		t.alpha = 1;
		t.anchorOffsetX = .5;
		t.anchorOffsetY = 0.5;
		t.font = "jishu_fnt";
		t.height = 126;
		t.horizontalCenter = 0.5;
		t.scaleX = 0.25;
		t.scaleY = 0.25;
		t.text = "123";
		t.textAlign = "center";
		t.width = 458;
		t.y = 634;
		return t;
	};
	_proto.rank_i = function () {
		var t = new eui.BitmapLabel();
		this.rank = t;
		t.anchorOffsetX = .5;
		t.anchorOffsetY = 0.5;
		t.font = "jishu_fnt";
		t.height = 126;
		t.horizontalCenter = 210;
		t.scaleX = 0.25;
		t.scaleY = 0.25;
		t.text = "11";
		t.textAlign = "center";
		t.width = 458;
		t.y = 930;
		return t;
	};
	_proto.fengxian_i = function () {
		var t = new eui.Image();
		this.fengxian = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.horizontalCenter = 0;
		t.source = "fengexian2_png";
		t.y = 1047;
		return t;
	};
	_proto.friend_i = function () {
		var t = new eui.BitmapLabel();
		this.friend = t;
		t.anchorOffsetY = 0;
		t.font = "jishu_fnt";
		t.height = 126;
		t.horizontalCenter = -210;
		t.scaleX = 0.25;
		t.scaleY = 0.25;
		t.text = "11";
		t.textAlign = "center";
		t.width = 458;
		t.y = 930;
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
	}
	var _proto = TestViewSkin.prototype;

	return TestViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/TestForSkin.exml'] = window.$exmlClass3 = (function (_super) {
	__extends($exmlClass3, _super);
	function $exmlClass3() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Panel1_i()];
	}
	var _proto = $exmlClass3.prototype;

	_proto._Panel1_i = function () {
		var t = new eui.Panel();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1891.97;
		t.skinName = "TestViewSkin";
		t.x = 0;
		t.y = 28.03;
		t.elementsContent = [this._Image1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1920;
		t.source = "bg2_png";
		t.width = 1080;
		t.x = 0;
		t.y = -28.03;
		return t;
	};
	return $exmlClass3;
})(eui.Skin);