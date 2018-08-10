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
					new eui.SetProperty("_Image1","source","")
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
		t.source = "";
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
		this.skinParts = ["label"];
		
		this.elementsContent = [this.label_i()];
	}
	var _proto = CountDownSkin.prototype;

	_proto.label_i = function () {
		var t = new eui.Label();
		this.label = t;
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "00:00";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		return t;
	};
	return CountDownSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/common/MyButtonSkin.exml'] = window.MyButtonSkin = (function (_super) {
	__extends(MyButtonSkin, _super);
	function MyButtonSkin() {
		_super.call(this);
		this.skinParts = ["img","labelDisplay","iconDisplay"];
		
		this.currentState = "disabled";
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
					new eui.SetProperty("img","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("img","alpha",1)
				])
		];
	}
	var _proto = MyButtonSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "common_white_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 40;
		t.text = "3333";
		t.textAlign = "center";
		t.textColor = 0x000000;
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
	return MyButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Block.exml'] = window.BlockSkin = (function (_super) {
	__extends(BlockSkin, _super);
	function BlockSkin() {
		_super.call(this);
		this.skinParts = ["img"];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this.img_i()];
	}
	var _proto = BlockSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_white_png";
		t.top = 0;
		t.verticalCenter = 0;
		return t;
	};
	return BlockSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/Combo.exml'] = window.ComboSkin = (function (_super) {
	__extends(ComboSkin, _super);
	function ComboSkin() {
		_super.call(this);
		this.skinParts = ["comboLabel"];
		
		this.height = 130;
		this.width = 450;
		this.elementsContent = [this._Image1_i(),this.comboLabel_i()];
	}
	var _proto = ComboSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "combo_png";
		return t;
	};
	_proto.comboLabel_i = function () {
		var t = new eui.BitmapLabel();
		this.comboLabel = t;
		t.font = "comboFont_fnt";
		t.left = 250;
		t.letterSpacing = -60;
		t.smoothing = false;
		t.text = "X1";
		t.verticalAlign = "middle";
		t.y = -30;
		return t;
	};
	return ComboSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/FlyBlock.exml'] = window.FlyBlockSkin = (function (_super) {
	__extends(FlyBlockSkin, _super);
	function FlyBlockSkin() {
		_super.call(this);
		this.skinParts = ["tail","light_point","ball_block","ball"];
		
		this.elementsContent = [this.ball_i()];
	}
	var _proto = FlyBlockSkin.prototype;

	_proto.ball_i = function () {
		var t = new eui.Group();
		this.ball = t;
		t.anchorOffsetX = 95;
		t.anchorOffsetY = 92;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.tail_i(),this.light_point_i(),this.ball_block_i()];
		return t;
	};
	_proto.tail_i = function () {
		var t = new eui.Image();
		this.tail = t;
		t.anchorOffsetY = 0;
		t.height = 442;
		t.rotation = 90;
		t.scaleY = 0.1;
		t.source = "tail_png";
		t.verticalCenter = 0;
		t.width = 141;
		t.x = 118;
		return t;
	};
	_proto.light_point_i = function () {
		var t = new eui.Image();
		this.light_point = t;
		t.horizontalCenter = 0;
		t.scaleY = 1;
		t.source = "point_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.ball_block_i = function () {
		var t = new eui.Image();
		this.ball_block = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return FlyBlockSkin;
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
		t.width = 150;
		t.y = 0;
		return t;
	};
	return MyCountDownSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/component/NumCountDown.exml'] = window.NumCountDownSkin = (function (_super) {
	__extends(NumCountDownSkin, _super);
	function NumCountDownSkin() {
		_super.call(this);
		this.skinParts = ["label"];
		
		this.elementsContent = [this.label_i()];
	}
	var _proto = NumCountDownSkin.prototype;

	_proto.label_i = function () {
		var t = new eui.Label();
		this.label = t;
		t.horizontalCenter = 0;
		t.size = 140;
		t.text = "3";
		t.touchEnabled = false;
		t.verticalCenter = 0;
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
		this.skinParts = ["img","gMC","gUp"];
		
		this.height = 150;
		this.width = 150;
		this.elementsContent = [this.gUp_i()];
	}
	var _proto = PlayerSkin.prototype;

	_proto.gUp_i = function () {
		var t = new eui.Group();
		this.gUp = t;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.img_i(),this.gMC_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 75;
		t.anchorOffsetY = 150;
		t.height = 150;
		t.scaleY = 1;
		t.source = "p1_png";
		t.width = 150;
		t.x = 75;
		t.y = 150;
		return t;
	};
	_proto.gMC_i = function () {
		var t = new eui.Group();
		this.gMC = t;
		t.anchorOffsetX = 75;
		t.anchorOffsetY = 150;
		t.height = 150;
		t.width = 150;
		t.x = 75;
		t.y = 150;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/GameView.exml'] = window.GameViewSkin = (function (_super) {
	__extends(GameViewSkin, _super);
	function GameViewSkin() {
		_super.call(this);
		this.skinParts = ["bg","headShape1","head1","sex1","name1","voice1","headShape2","head2","sex2","name2","voice2","gTop","nextGroup","doubleNextGroup","tetris1Group","tetris2Group","fallBtn","downBtn","leftBtn","rightBtn","rotateBtn","replay","speedGroup","speedTip","speedTipGroup","guideMask","guideBg","daojishiGroup","gCenter","texiaoPosGroup","texiaoGroup"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Group1_i(),this.gTop_i(),this.gCenter_i(),this.texiaoGroup_i()];
	}
	var _proto = GameViewSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 10;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 10;
		t.elementsContent = [this.bg_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.scaleX = 1.4;
		t.scaleY = 1.4;
		t.source = "bg_jpg";
		t.touchEnabled = false;
		t.verticalCenter = -2.5;
		return t;
	};
	_proto.gTop_i = function () {
		var t = new eui.Group();
		this.gTop = t;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.touchEnabled = false;
		t.y = 0;
		t.elementsContent = [this._Group2_i(),this._Group5_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentWidth = 100;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.top = 156;
		t.percentWidth = 100;
		t.elementsContent = [this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -283;
		t.elementsContent = [this._Image1_i(),this.headShape1_i(),this.head1_i(),this._Image2_i(),this.sex1_i(),this.name1_i(),this.voice1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 50;
		t.source = "";
		t.visible = false;
		return t;
	};
	_proto.headShape1_i = function () {
		var t = new eui.Image();
		this.headShape1 = t;
		t.height = 99;
		t.left = 5;
		t.source = "head2_png";
		t.top = 5;
		t.width = 99;
		return t;
	};
	_proto.head1_i = function () {
		var t = new eui.Image();
		this.head1 = t;
		t.height = 99;
		t.left = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "boy_png";
		t.top = 5;
		t.width = 99;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "head_png";
		t.x = 0;
		return t;
	};
	_proto.sex1_i = function () {
		var t = new eui.Image();
		this.sex1 = t;
		t.horizontalCenter = -164;
		t.source = "boy_png";
		t.top = 0;
		return t;
	};
	_proto.name1_i = function () {
		var t = new eui.Label();
		this.name1 = t;
		t.horizontalCenter = 40.5;
		t.size = 37;
		t.text = "";
		t.textAlign = "left";
		t.top = 10;
		t.width = 211.36;
		return t;
	};
	_proto.voice1_i = function () {
		var t = new eui.Image();
		this.voice1 = t;
		t.horizontalCenter = -52.5;
		t.source = "voice_close_png";
		t.top = 60;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 283;
		t.elementsContent = [this._Image3_i(),this.headShape2_i(),this.head2_i(),this._Image4_i(),this.sex2_i(),this.name2_i(),this.voice2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.right = 50;
		t.scaleX = -1;
		t.source = "";
		t.visible = false;
		return t;
	};
	_proto.headShape2_i = function () {
		var t = new eui.Image();
		this.headShape2 = t;
		t.height = 99;
		t.right = 5;
		t.source = "head2_png";
		t.top = 5;
		t.width = 99;
		return t;
	};
	_proto.head2_i = function () {
		var t = new eui.Image();
		this.head2 = t;
		t.height = 99;
		t.right = 5;
		t.source = "girl_png";
		t.top = 5;
		t.width = 99;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.source = "head_png";
		return t;
	};
	_proto.sex2_i = function () {
		var t = new eui.Image();
		this.sex2 = t;
		t.horizontalCenter = 164;
		t.source = "girl_png";
		t.top = 0;
		return t;
	};
	_proto.name2_i = function () {
		var t = new eui.Label();
		this.name2 = t;
		t.horizontalCenter = -40.5;
		t.size = 37;
		t.text = "";
		t.textAlign = "right";
		t.top = 10;
		t.width = 211.36;
		return t;
	};
	_proto.voice2_i = function () {
		var t = new eui.Image();
		this.voice2 = t;
		t.horizontalCenter = 52.5;
		t.source = "voice_close_png";
		t.top = 60;
		return t;
	};
	_proto.gCenter_i = function () {
		var t = new eui.Group();
		this.gCenter = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this.tetris1Group_i(),this.tetris2Group_i(),this._Group6_i(),this._Group7_i(),this.replay_i(),this.speedGroup_i(),this.speedTipGroup_i(),this.guideMask_i(),this.guideBg_i(),this.daojishiGroup_i()];
		return t;
	};
	_proto.tetris1Group_i = function () {
		var t = new eui.Group();
		this.tetris1Group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 1217;
		t.horizontalCenter = 0;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.verticalCenter = -158;
		t.width = 618;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this.nextGroup_i(),this.doubleNextGroup_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "tetris_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 140;
		t.anchorOffsetY = 50;
		t.height = 46;
		t.horizontalCenter = 413;
		t.source = "next_png";
		t.verticalCenter = -541;
		t.width = 143;
		return t;
	};
	_proto.nextGroup_i = function () {
		var t = new eui.Group();
		this.nextGroup = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 80;
		t.height = 162;
		t.horizontalCenter = 413;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.verticalCenter = -405.5;
		t.width = 162;
		t.elementsContent = [this._Image7_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "review_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.doubleNextGroup_i = function () {
		var t = new eui.Group();
		this.doubleNextGroup = t;
		t.anchorOffsetX = 81;
		t.anchorOffsetY = 81;
		t.height = 162;
		t.horizontalCenter = 413;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.verticalCenter = -112.5;
		t.width = 162;
		t.elementsContent = [this._Image8_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "review_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tetris2Group_i = function () {
		var t = new eui.Group();
		this.tetris2Group = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 431;
		t.horizontalCenter = -413;
		t.verticalCenter = -405;
		t.width = 218;
		t.elementsContent = [this._Image9_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "tetris_small_bg_png";
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.bottom = 23;
		t.horizontalCenter = -170;
		t.width = 467;
		t.elementsContent = [this.fallBtn_i(),this.downBtn_i(),this.leftBtn_i(),this.rightBtn_i(),this._Image10_i()];
		return t;
	};
	_proto.fallBtn_i = function () {
		var t = new eui.Button();
		this.fallBtn = t;
		t.height = 190;
		t.horizontalCenter = -3.5;
		t.icon = "fall_png";
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.top = -99;
		t.width = 240;
		return t;
	};
	_proto.downBtn_i = function () {
		var t = new eui.Button();
		this.downBtn = t;
		t.height = 200;
		t.horizontalCenter = -3.5;
		t.icon = "down_png";
		t.rotation = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.top = 226;
		t.width = 240;
		return t;
	};
	_proto.leftBtn_i = function () {
		var t = new eui.Button();
		this.leftBtn = t;
		t.height = 161;
		t.horizontalCenter = -192;
		t.icon = "left_png";
		t.rotation = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.top = 72;
		t.width = 285;
		return t;
	};
	_proto.rightBtn_i = function () {
		var t = new eui.Button();
		this.rightBtn = t;
		t.height = 161;
		t.horizontalCenter = 180;
		t.icon = "right_png";
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.top = 72;
		t.width = 268;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.right = 51;
		t.source = "fallTip_png";
		t.top = -39;
		t.touchEnabled = false;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 337;
		t.elementsContent = [this._Image11_i(),this.rotateBtn_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.height = 265;
		t.left = 0;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.source = "rotate_bg_png";
		t.top = 65;
		return t;
	};
	_proto.rotateBtn_i = function () {
		var t = new eui.Button();
		this.rotateBtn = t;
		t.bottom = 96;
		t.height = 369;
		t.icon = "rotate_png";
		t.left = -20;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.width = 318;
		return t;
	};
	_proto.replay_i = function () {
		var t = new eui.Group();
		this.replay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image12_i(),this._Label1_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "win_png";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "重新开始";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.speedGroup_i = function () {
		var t = new eui.Group();
		this.speedGroup = t;
		t.horizontalCenter = 369;
		t.verticalCenter = -74;
		return t;
	};
	_proto.speedTipGroup_i = function () {
		var t = new eui.Group();
		this.speedTipGroup = t;
		t.height = 64;
		t.horizontalCenter = 0;
		t.verticalCenter = -737;
		t.elementsContent = [this._Image13_i(),this.speedTip_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -36;
		t.source = "suduzi_png";
		return t;
	};
	_proto.speedTip_i = function () {
		var t = new eui.Image();
		this.speedTip = t;
		t.horizontalCenter = 84;
		t.source = "speed1_png";
		t.top = 8;
		return t;
	};
	_proto.guideMask_i = function () {
		var t = new eui.Image();
		this.guideMask = t;
		t.alpha = 0.5;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "common_black_png";
		t.top = 0;
		t.touchEnabled = true;
		return t;
	};
	_proto.guideBg_i = function () {
		var t = new eui.Image();
		this.guideBg = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "guideBg_png";
		t.verticalCenter = -84;
		return t;
	};
	_proto.daojishiGroup_i = function () {
		var t = new eui.Group();
		this.daojishiGroup = t;
		t.horizontalCenter = 0;
		t.verticalCenter = -550;
		return t;
	};
	_proto.texiaoGroup_i = function () {
		var t = new eui.Group();
		this.texiaoGroup = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.elementsContent = [this.texiaoPosGroup_i()];
		return t;
	};
	_proto.texiaoPosGroup_i = function () {
		var t = new eui.Group();
		this.texiaoPosGroup = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.elementsContent = [this._Group8_i(),this._Group9_i()];
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -222;
		t.verticalCenter = 365;
		return t;
	};
	_proto._Group9_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -414;
		t.verticalCenter = -413;
		return t;
	};
	return GameViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/MatchView.exml'] = window.MatchViewSkin = (function (_super) {
	__extends(MatchViewSkin, _super);
	function MatchViewSkin() {
		_super.call(this);
		this.skinParts = ["idInput","matchInput","login","match","ready","a10010","a10011"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this._Label2_i(),this.idInput_i(),this.matchInput_i(),this.login_i(),this.match_i(),this.ready_i(),this.a10010_i(),this.a10011_i()];
	}
	var _proto = MatchViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 2280;
		t.horizontalCenter = 0;
		t.source = "bg_png";
		t.verticalCenter = 0;
		t.width = 1710;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = -322;
		t.size = 60;
		t.text = "id";
		t.verticalCenter = -227;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = -322;
		t.size = 60;
		t.text = "房间号";
		t.verticalCenter = 4;
		return t;
	};
	_proto.idInput_i = function () {
		var t = new eui.TextInput();
		this.idInput = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = -233;
		t.width = 400;
		return t;
	};
	_proto.matchInput_i = function () {
		var t = new eui.TextInput();
		this.matchInput = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 400;
		return t;
	};
	_proto.login_i = function () {
		var t = new eui.Button();
		this.login = t;
		t.height = 68;
		t.horizontalCenter = 0;
		t.label = "login";
		t.skinName = "MyButtonSkin";
		t.verticalCenter = 200;
		t.width = 175;
		return t;
	};
	_proto.match_i = function () {
		var t = new eui.Button();
		this.match = t;
		t.height = 68;
		t.horizontalCenter = 0;
		t.label = "match";
		t.skinName = "MyButtonSkin";
		t.verticalCenter = 300;
		t.width = 175;
		return t;
	};
	_proto.ready_i = function () {
		var t = new eui.Button();
		this.ready = t;
		t.height = 68;
		t.horizontalCenter = 0;
		t.label = "ready";
		t.skinName = "MyButtonSkin";
		t.verticalCenter = 420;
		t.width = 175;
		return t;
	};
	_proto.a10010_i = function () {
		var t = new eui.Button();
		this.a10010 = t;
		t.height = 68;
		t.horizontalCenter = 0;
		t.label = "10010";
		t.skinName = "MyButtonSkin";
		t.verticalCenter = 528;
		t.width = 175;
		return t;
	};
	_proto.a10011_i = function () {
		var t = new eui.Button();
		this.a10011 = t;
		t.height = 68;
		t.horizontalCenter = 0;
		t.label = "10011";
		t.skinName = "MyButtonSkin";
		t.verticalCenter = 632;
		t.width = 175;
		return t;
	};
	return MatchViewSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/view/SettleView.exml'] = window.SettleViewSkin = (function (_super) {
	__extends(SettleViewSkin, _super);
	function SettleViewSkin() {
		_super.call(this);
		this.skinParts = ["gBg","bg","icon","score1","score2","big"];
		
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
		t.height = 1077;
		t.horizontalCenter = 0;
		t.scaleX = 1.44;
		t.scaleY = 1.44;
		t.width = 1077;
		t.y = 0;
		t.elementsContent = [this.bg_i(),this.icon_i(),this._Image1_i(),this._Image2_i(),this.score1_i(),this.score2_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 538;
		t.anchorOffsetY = 538;
		t.source = "shenglidi_png";
		t.touchEnabled = false;
		t.x = 538;
		t.y = 538;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "shengli_png";
		t.touchEnabled = false;
		t.x = 251;
		t.y = 399;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "wode_png";
		t.visible = false;
		t.x = 380;
		t.y = 785;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "duifang_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 600;
		t.y = 785;
		return t;
	};
	_proto.score1_i = function () {
		var t = new eui.Label();
		this.score1 = t;
		t.size = 60;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 200;
		t.x = 336;
		t.y = 882;
		return t;
	};
	_proto.score2_i = function () {
		var t = new eui.Label();
		this.score2 = t;
		t.size = 60;
		t.text = "0";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		t.width = 200;
		t.x = 555;
		t.y = 882;
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
	return SettleViewSkin;
})(eui.Skin);