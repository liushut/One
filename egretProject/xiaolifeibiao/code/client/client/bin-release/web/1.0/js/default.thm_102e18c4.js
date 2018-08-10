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
		t.height = 39;
		t.source = "barblack_png";
		t.width = 529;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/GameView.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["bgdb","guidao","tarImg","guidao1","guidao2","guidao3","guidao4","yuanImg","bgDi","bardi","bar","life1","life2","life3","life","jifen1","jifen2","jifen3","jifen","dituo","bg","arrow","arrImg","arrHuiImg","bgAll"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 1920;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 1080;
		t.elementsContent = [this.bgAll_i(),this._Label1_i()];
		return t;
	};
	_proto.bgAll_i = function () {
		var t = new eui.Group();
		this.bgAll = t;
		t.anchorOffsetY = 0;
		t.height = 1440;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 965;
		t.elementsContent = [this.bgdb_i(),this.guidao_i(),this.tarImg_i(),this.guidao1_i(),this.guidao2_i(),this.guidao3_i(),this.guidao4_i(),this.yuanImg_i(),this.bgDi_i(),this.bardi_i(),this.bar_i(),this.life_i(),this.jifen_i(),this.dituo_i(),this.bg_i(),this.arrImg_i(),this.arrHuiImg_i()];
		return t;
	};
	_proto.bgdb_i = function () {
		var t = new eui.Image();
		this.bgdb = t;
		t.height = 2340;
		t.horizontalCenter = 0;
		t.source = "bg04_png";
		t.verticalCenter = 0;
		t.width = 1440;
		return t;
	};
	_proto.guidao_i = function () {
		var t = new eui.Image();
		this.guidao = t;
		t.anchorOffsetY = 0;
		t.height = 1550;
		t.source = "timg_png";
		t.width = 1050;
		t.x = -50;
		t.y = -50;
		return t;
	};
	_proto.tarImg_i = function () {
		var t = new eui.Group();
		this.tarImg = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.guidao1_i = function () {
		var t = new eui.Image();
		this.guidao1 = t;
		t.height = 150;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanjiaobai_png";
		t.width = 150;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.guidao2_i = function () {
		var t = new eui.Image();
		this.guidao2 = t;
		t.height = 150;
		t.rotation = 90;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanjiaobai_png";
		t.width = 150;
		t.x = 962;
		t.y = 4;
		return t;
	};
	_proto.guidao3_i = function () {
		var t = new eui.Image();
		this.guidao3 = t;
		t.height = 150;
		t.rotation = 270.;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanjiaobai_png";
		t.width = 150;
		t.x = 4;
		t.y = 1433;
		return t;
	};
	_proto.guidao4_i = function () {
		var t = new eui.Image();
		this.guidao4 = t;
		t.height = 150;
		t.rotation = 180;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yuanjiaobai_png";
		t.width = 150;
		t.x = 958;
		t.y = 1431;
		return t;
	};
	_proto.yuanImg_i = function () {
		var t = new eui.Group();
		this.yuanImg = t;
		return t;
	};
	_proto.bgDi_i = function () {
		var t = new eui.Image();
		this.bgDi = t;
		t.height = 2340;
		t.horizontalCenter = 4.5;
		t.source = "bgbg_png";
		t.verticalCenter = 4;
		t.width = 1440;
		return t;
	};
	_proto.bardi_i = function () {
		var t = new eui.Image();
		this.bardi = t;
		t.height = 45;
		t.source = "bardi_png";
		t.width = 535;
		t.x = 216;
		t.y = -80;
		return t;
	};
	_proto.bar_i = function () {
		var t = new eui.Group();
		this.bar = t;
		t.height = 45;
		t.width = 535;
		t.x = 220;
		t.y = -76;
		return t;
	};
	_proto.life_i = function () {
		var t = new eui.Group();
		this.life = t;
		t.x = -40;
		t.y = -222;
		t.elementsContent = [this.life1_i(),this.life2_i(),this.life3_i()];
		return t;
	};
	_proto.life1_i = function () {
		var t = new eui.Image();
		this.life1 = t;
		t.source = "lifeRed_png";
		t.verticalCenter = 0;
		t.x = 21.28;
		return t;
	};
	_proto.life2_i = function () {
		var t = new eui.Image();
		this.life2 = t;
		t.source = "lifeRed_png";
		t.verticalCenter = 0;
		t.x = 101.32;
		return t;
	};
	_proto.life3_i = function () {
		var t = new eui.Image();
		this.life3 = t;
		t.source = "lifeRed_png";
		t.verticalCenter = 0;
		t.x = 182.65;
		return t;
	};
	_proto.jifen_i = function () {
		var t = new eui.Group();
		this.jifen = t;
		t.x = 370;
		t.y = -170;
		t.elementsContent = [this.jifen1_i(),this.jifen2_i(),this.jifen3_i()];
		return t;
	};
	_proto.jifen1_i = function () {
		var t = new eui.Image();
		this.jifen1 = t;
		t.x = 0;
		return t;
	};
	_proto.jifen2_i = function () {
		var t = new eui.Image();
		this.jifen2 = t;
		t.x = 50;
		return t;
	};
	_proto.jifen3_i = function () {
		var t = new eui.Image();
		this.jifen3 = t;
		t.x = 100;
		return t;
	};
	_proto.dituo_i = function () {
		var t = new eui.Image();
		this.dituo = t;
		t.horizontalCenter = 0;
		t.source = "dituo_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1350;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 875;
		t.x = 45;
		t.y = 45;
		return t;
	};
	_proto.arrImg_i = function () {
		var t = new eui.Group();
		this.arrImg = t;
		t.elementsContent = [this.arrow_i()];
		return t;
	};
	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.height = 108;
		t.rotation = 179.69;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 66.4;
		t.x = 447;
		t.y = 783;
		return t;
	};
	_proto.arrHuiImg_i = function () {
		var t = new eui.Group();
		this.arrHuiImg = t;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.text = "v1.0.1";
		t.x = 911;
		t.y = 1793;
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
			t.source = "phb_png";
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
			t.source = "anniuLiang_png";
			t.percentWidth = 100;
			return t;
		};
		_proto._Image2_i = function () {
			var t = new eui.Image();
			t.horizontalCenter = 0;
			t.source = "zwyj_png";
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
		this.skinParts = ["gBg","bg","icon","icon0","icon1","icon2","icon3","phb","bzzj","paiming","friend","score","restart","big"];
		
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
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.touchEnabled = false;
		t.elementsContent = [this.bg_i(),this.icon_i(),this.icon0_i(),this.icon1_i(),this.icon2_i(),this.icon3_i(),this.phb_i(),this.bzzj_i(),this.paiming_i(),this.friend_i(),this.score_i(),this.restart_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 829;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bgShengli_png";
		t.touchEnabled = false;
		t.verticalCenter = -115;
		t.width = 845;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yxjs_png";
		t.touchEnabled = false;
		t.verticalCenter = -382;
		return t;
	};
	_proto.icon0_i = function () {
		var t = new eui.Image();
		this.icon0 = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bcdf_png";
		t.touchEnabled = false;
		t.verticalCenter = -279;
		return t;
	};
	_proto.icon1_i = function () {
		var t = new eui.Image();
		this.icon1 = t;
		t.horizontalCenter = -168;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hypm_png";
		t.touchEnabled = false;
		t.verticalCenter = -8;
		return t;
	};
	_proto.icon2_i = function () {
		var t = new eui.Image();
		this.icon2 = t;
		t.horizontalCenter = 168;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "yxpm_png";
		t.touchEnabled = false;
		t.verticalCenter = -8;
		return t;
	};
	_proto.icon3_i = function () {
		var t = new eui.Image();
		this.icon3 = t;
		t.height = 42;
		t.horizontalCenter = 72.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "bzzj_png";
		t.touchEnabled = false;
		t.verticalCenter = -73;
		t.width = 175;
		return t;
	};
	_proto.phb_i = function () {
		var t = new eui.Button();
		this.phb = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 200.833333;
		t.skinName = SettleViewSkin$Skin1;
		return t;
	};
	_proto.bzzj_i = function () {
		var t = new eui.BitmapLabel();
		this.bzzj = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "scorefnt_fnt";
		t.height = 105.75;
		t.text = "";
		t.textAlign = "center";
		t.width = 198.15;
		t.x = 716;
		t.y = 801.96;
		return t;
	};
	_proto.paiming_i = function () {
		var t = new eui.BitmapLabel();
		this.paiming = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "scorefnt_fnt";
		t.height = 117;
		t.text = "";
		t.textAlign = "center";
		t.width = 224;
		t.x = 602;
		t.y = 988;
		return t;
	};
	_proto.friend_i = function () {
		var t = new eui.BitmapLabel();
		this.friend = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.font = "scorefnt_fnt";
		t.height = 117;
		t.text = "";
		t.textAlign = "center";
		t.width = 248;
		t.x = 244;
		t.y = 988;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.BitmapLabel();
		this.score = t;
		t.font = "scorefnt_fnt";
		t.height = 130;
		t.left = 0;
		t.right = 0;
		t.text = "";
		t.textAlign = "center";
		t.y = 724;
		return t;
	};
	_proto.restart_i = function () {
		var t = new eui.Button();
		this.restart = t;
		t.horizontalCenter = 0;
		t.icon = "dengdai_png";
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 488;
		t.skinName = SettleViewSkin$Skin2;
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