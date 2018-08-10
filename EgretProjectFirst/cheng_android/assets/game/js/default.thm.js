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
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","SceneLevels":"resource/eui_skins/SceneLevelsSkin.exml","LevelIcon":"resource/eui_skins/LevelIconSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/GameSettingSkin.exml'] = window.$exmlClass1 = (function (_super) {
	__extends($exmlClass1, _super);
	var $exmlClass1$Skin2 = 	(function (_super) {
		__extends($exmlClass1$Skin2, _super);
		function $exmlClass1$Skin2() {
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
		var _proto = $exmlClass1$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_music_png";
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
		return $exmlClass1$Skin2;
	})(eui.Skin);

	var $exmlClass1$Skin3 = 	(function (_super) {
		__extends($exmlClass1$Skin3, _super);
		function $exmlClass1$Skin3() {
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
						new eui.SetProperty("_Image1","source","YesBtn1_jpg")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = $exmlClass1$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "YesBtn_jpg";
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
		return $exmlClass1$Skin3;
	})(eui.Skin);

	var $exmlClass1$Skin4 = 	(function (_super) {
		__extends($exmlClass1$Skin4, _super);
		function $exmlClass1$Skin4() {
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
		var _proto = $exmlClass1$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_sound_png";
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
		return $exmlClass1$Skin4;
	})(eui.Skin);

	function $exmlClass1() {
		_super.call(this);
		this.skinParts = ["MoneyBG","btnmusic","btnagree","btnSound","imgsounddisable","imgmusicdisable"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = $exmlClass1.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.MoneyBG_i(),this.btnmusic_i(),this.btnagree_i(),this.btnSound_i(),this.imgsounddisable_i(),this.imgmusicdisable_i()];
		return t;
	};
	_proto.MoneyBG_i = function () {
		var t = new eui.Image();
		this.MoneyBG = t;
		t.anchorOffsetY = 0;
		t.height = 255;
		t.scale9Grid = new egret.Rectangle(87,22,116,30);
		t.source = "MoneyBG_png";
		t.width = 400;
		t.x = 0;
		t.y = 22.5;
		return t;
	};
	_proto.btnmusic_i = function () {
		var t = new eui.Button();
		this.btnmusic = t;
		t.horizontalCenter = -89.5;
		t.label = "";
		t.y = 94;
		t.skinName = $exmlClass1$Skin2;
		return t;
	};
	_proto.btnagree_i = function () {
		var t = new eui.Button();
		this.btnagree = t;
		t.horizontalCenter = 0.5;
		t.label = "";
		t.y = 204;
		t.skinName = $exmlClass1$Skin3;
		return t;
	};
	_proto.btnSound_i = function () {
		var t = new eui.Button();
		this.btnSound = t;
		t.horizontalCenter = 91;
		t.label = "";
		t.y = 94;
		t.skinName = $exmlClass1$Skin4;
		return t;
	};
	_proto.imgsounddisable_i = function () {
		var t = new eui.Image();
		this.imgsounddisable = t;
		t.alpha = 0.8;
		t.height = 65;
		t.source = "btn_disable_png";
		t.width = 64;
		t.x = 259;
		t.y = 97.5;
		return t;
	};
	_proto.imgmusicdisable_i = function () {
		var t = new eui.Image();
		this.imgmusicdisable = t;
		t.alpha = 0.8;
		t.height = 65;
		t.source = "btn_disable_png";
		t.width = 64;
		t.x = 79;
		t.y = 97.5;
		return t;
	};
	return $exmlClass1;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/LevelIconSkin.exml'] = window.LevelIconSkin = (function (_super) {
	__extends(LevelIconSkin, _super);
	function LevelIconSkin() {
		_super.call(this);
		this.skinParts = ["gs_select_dis","gs_select_1","lb_level"];
		
		this.height = 77;
		this.width = 77;
		this.elementsContent = [this.gs_select_dis_i(),this.gs_select_1_i(),this.lb_level_i()];
	}
	var _proto = LevelIconSkin.prototype;

	_proto.gs_select_dis_i = function () {
		var t = new eui.Image();
		this.gs_select_dis = t;
		t.fillMode = "scale";
		t.height = 77;
		t.source = "gs_select_dis_png";
		t.width = 77;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gs_select_1_i = function () {
		var t = new eui.Image();
		this.gs_select_1 = t;
		t.height = 77;
		t.source = "gs_select_1_png";
		t.width = 77;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lb_level_i = function () {
		var t = new eui.Label();
		this.lb_level = t;
		t.anchorOffsetX = 0;
		t.text = "1";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 45;
		t.x = 14;
		t.y = 19;
		return t;
	};
	return LevelIconSkin;
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/Rect.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 40;
		this.minHeight = 30;
		this.minWidth = 25;
		this.width = 40;
		this.elementsContent = [this._Rect1_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 0;
		t.ellipseWidth = 0;
		t.fillColor = 0xFFFFFF;
		t.height = 40;
		t.strokeColor = 0x0276D0;
		t.strokeWeight = 2;
		t.width = 40;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/SceneBeginSkin.exml'] = window.SceneBeginSkin = (function (_super) {
	__extends(SceneBeginSkin, _super);
	var SceneBeginSkin$Skin5 = 	(function (_super) {
		__extends(SceneBeginSkin$Skin5, _super);
		function SceneBeginSkin$Skin5() {
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
						new eui.SetProperty("_Image1","source","StartBtn1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SceneBeginSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "StartBtn_png";
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
		return SceneBeginSkin$Skin5;
	})(eui.Skin);

	var SceneBeginSkin$Skin6 = 	(function (_super) {
		__extends(SceneBeginSkin$Skin6, _super);
		function SceneBeginSkin$Skin6() {
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
		var _proto = SceneBeginSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "MoneyBG_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.size = 50;
			t.text = "设置";
			t.verticalCenter = 0;
			return t;
		};
		return SceneBeginSkin$Skin6;
	})(eui.Skin);

	function SceneBeginSkin() {
		_super.call(this);
		this.skinParts = ["GameBG1","StartBtn","btn_setting"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = SceneBeginSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.height = 1920;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.width = 1080;
		t.elementsContent = [this.GameBG1_i(),this.StartBtn_i(),this.btn_setting_i()];
		return t;
	};
	_proto.GameBG1_i = function () {
		var t = new eui.Image();
		this.GameBG1 = t;
		t.bottom = 0;
		t.height = 1920;
		t.left = 0;
		t.right = 0;
		t.source = "GameBG1_jpg";
		t.top = 0;
		t.width = 1080;
		return t;
	};
	_proto.StartBtn_i = function () {
		var t = new eui.Button();
		this.StartBtn = t;
		t.enabled = true;
		t.height = 112;
		t.label = "";
		t.width = 355;
		t.x = 362.5;
		t.y = 1696;
		t.skinName = SceneBeginSkin$Skin5;
		return t;
	};
	_proto.btn_setting_i = function () {
		var t = new eui.Button();
		this.btn_setting = t;
		t.label = "设置";
		t.x = 762.66;
		t.y = 40.66;
		t.skinName = SceneBeginSkin$Skin6;
		return t;
	};
	return SceneBeginSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/WordSkin.exml'] = window.WordSkin = (function (_super) {
	__extends(WordSkin, _super);
	function WordSkin() {
		_super.call(this);
		this.skinParts = ["lb_text"];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this._Rect1_i(),this.lb_text_i()];
	}
	var _proto = WordSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillColor = 0xFFFFFF;
		t.left = 0;
		t.right = 0;
		t.strokeColor = 0x0276D0;
		t.strokeWeight = 4;
		t.top = 0;
		return t;
	};
	_proto.lb_text_i = function () {
		var t = new eui.Label();
		this.lb_text = t;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "字";
		t.textColor = 0x000000;
		t.verticalCenter = 0;
		return t;
	};
	return WordSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/SceneGameSkin.exml'] = window.$exmlClass7 = (function (_super) {
	__extends($exmlClass7, _super);
	var $exmlClass7$Skin8 = 	(function (_super) {
		__extends($exmlClass7$Skin8, _super);
		function $exmlClass7$Skin8() {
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
						new eui.SetProperty("_Image1","source","BackBtn1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = $exmlClass7$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BackBtn_png";
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
		return $exmlClass7$Skin8;
	})(eui.Skin);

	var $exmlClass7$Skin9 = 	(function (_super) {
		__extends($exmlClass7$Skin9, _super);
		function $exmlClass7$Skin9() {
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
						new eui.SetProperty("_Image1","source","ResultBtn1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = $exmlClass7$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "ResultBtn_png";
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
		return $exmlClass7$Skin9;
	})(eui.Skin);

	function $exmlClass7() {
		_super.call(this);
		this.skinParts = ["GameBG3","WordFrame","btn_back","group_answer","group_words","img_question","Result","lb_explain","lb_from","btn_next","group_win"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = $exmlClass7.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.GameBG3_i(),this.WordFrame_i(),this.btn_back_i(),this.group_answer_i(),this.group_words_i(),this.img_question_i(),this.group_win_i()];
		return t;
	};
	_proto.GameBG3_i = function () {
		var t = new eui.Image();
		this.GameBG3 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "GameBG3_jpg";
		t.top = 0;
		return t;
	};
	_proto.WordFrame_i = function () {
		var t = new eui.Image();
		this.WordFrame = t;
		t.height = 807;
		t.horizontalCenter = 0;
		t.source = "WordFrame_png";
		t.verticalCenter = 0;
		t.width = 645;
		return t;
	};
	_proto.btn_back_i = function () {
		var t = new eui.Button();
		this.btn_back = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = $exmlClass7$Skin8;
		return t;
	};
	_proto.group_answer_i = function () {
		var t = new eui.Group();
		this.group_answer = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 92;
		t.horizontalCenter = 0;
		t.width = 361.09;
		t.y = 910;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this._AnswerWord1_i(),this._AnswerWord2_i(),this._AnswerWord3_i(),this._AnswerWord4_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnWidth = 5;
		t.horizontalAlign = "left";
		t.horizontalGap = 90;
		t.orientation = "columns";
		t.requestedColumnCount = 1;
		t.requestedRowCount = 1;
		t.rowHeight = 80;
		t.verticalGap = 38;
		return t;
	};
	_proto._AnswerWord1_i = function () {
		var t = new AnswerWord();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 102;
		t.y = 41;
		return t;
	};
	_proto._AnswerWord2_i = function () {
		var t = new AnswerWord();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 112;
		t.y = 51;
		return t;
	};
	_proto._AnswerWord3_i = function () {
		var t = new AnswerWord();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 132;
		t.y = 71;
		return t;
	};
	_proto._AnswerWord4_i = function () {
		var t = new AnswerWord();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 122;
		t.y = 61;
		return t;
	};
	_proto.group_words_i = function () {
		var t = new eui.Group();
		this.group_words = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 420.3;
		t.horizontalCenter = 0;
		t.width = 544.24;
		t.y = 1181;
		t.layout = this._TileLayout2_i();
		t.elementsContent = [this._Word1_i(),this._Word2_i(),this._Word3_i(),this._Word4_i(),this._Word5_i(),this._Word6_i(),this._Word7_i(),this._Word8_i(),this._Word9_i(),this._Word10_i(),this._Word11_i(),this._Word12_i(),this._Word13_i(),this._Word14_i(),this._Word15_i(),this._Word16_i(),this._Word17_i(),this._Word18_i(),this._Word19_i(),this._Word20_i()];
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 32;
		t.orientation = "columns";
		t.paddingLeft = 0;
		t.verticalGap = 32;
		return t;
	};
	_proto._Word1_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Word2_i = function () {
		var t = new Word();
		t.height = 80;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = -239;
		t.y = -267;
		return t;
	};
	_proto._Word3_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Word4_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto._Word5_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto._Word6_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._Word7_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto._Word8_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._Word9_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._Word10_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 70;
		t.y = 70;
		return t;
	};
	_proto._Word11_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 80;
		t.y = 80;
		return t;
	};
	_proto._Word12_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 90;
		t.y = 90;
		return t;
	};
	_proto._Word13_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 100;
		t.y = 100;
		return t;
	};
	_proto._Word14_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 110;
		t.y = 110;
		return t;
	};
	_proto._Word15_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 120;
		t.y = 120;
		return t;
	};
	_proto._Word16_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 130;
		t.y = 130;
		return t;
	};
	_proto._Word17_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 140;
		t.y = 140;
		return t;
	};
	_proto._Word18_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 150;
		t.y = 150;
		return t;
	};
	_proto._Word19_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 160;
		t.y = 160;
		return t;
	};
	_proto._Word20_i = function () {
		var t = new Word();
		t.height = 80;
		t.skinName = "WordSkin";
		t.width = 80;
		t.x = 170;
		t.y = 170;
		return t;
	};
	_proto.img_question_i = function () {
		var t = new eui.Image();
		this.img_question = t;
		t.height = 260;
		t.horizontalCenter = 0;
		t.width = 390;
		t.y = 588;
		return t;
	};
	_proto.group_win_i = function () {
		var t = new eui.Group();
		this.group_win = t;
		t.height = 200;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 200;
		t.y = 1208;
		t.elementsContent = [this.Result_i(),this.lb_explain_i(),this.lb_from_i(),this.btn_next_i()];
		return t;
	};
	_proto.Result_i = function () {
		var t = new eui.Image();
		this.Result = t;
		t.height = 474;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "Result_png";
		t.width = 632;
		t.x = -179;
		t.y = -63;
		return t;
	};
	_proto.lb_explain_i = function () {
		var t = new eui.Label();
		this.lb_explain = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "NSimSun";
		t.height = 65.4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 30;
		t.text = "Label";
		t.textColor = 0xf20959;
		t.width = 500.67;
		t.x = -118;
		t.y = 46.27;
		return t;
	};
	_proto.lb_from_i = function () {
		var t = new eui.Label();
		this.lb_from = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bold = true;
		t.fontFamily = "DFKai-SB";
		t.height = 144.67;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 35;
		t.text = "Label";
		t.textColor = 0x0c0c0c;
		t.width = 530;
		t.x = -118;
		t.y = 161;
		return t;
	};
	_proto.btn_next_i = function () {
		var t = new eui.Button();
		this.btn_next = t;
		t.enabled = true;
		t.label = "";
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 198;
		t.y = 292;
		t.skinName = $exmlClass7$Skin9;
		return t;
	};
	return $exmlClass7;
})(eui.Skin);generateEUI.paths['resource/eui_skins/SceneLeveslSkin.exml'] = window.SceneLevelsSkin = (function (_super) {
	__extends(SceneLevelsSkin, _super);
	var SceneLevelsSkin$Skin10 = 	(function (_super) {
		__extends(SceneLevelsSkin$Skin10, _super);
		function SceneLevelsSkin$Skin10() {
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
						new eui.SetProperty("_Image1","source","BackBtn1_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SceneLevelsSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "BackBtn_png";
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
		return SceneLevelsSkin$Skin10;
	})(eui.Skin);

	function SceneLevelsSkin() {
		_super.call(this);
		this.skinParts = ["group_levels","BackBtn"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this._Scroller1_i(),this.BackBtn_i()];
	}
	var _proto = SceneLevelsSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 8;
		t.height = 1920;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.viewport = this.group_levels_i();
		return t;
	};
	_proto.group_levels_i = function () {
		var t = new eui.Group();
		this.group_levels = t;
		return t;
	};
	_proto.BackBtn_i = function () {
		var t = new eui.Button();
		this.BackBtn = t;
		t.bottom = 0;
		t.enabled = true;
		t.height = 73;
		t.label = "";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 94;
		t.skinName = SceneLevelsSkin$Skin10;
		return t;
	};
	return SceneLevelsSkin;
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
})(eui.Skin);