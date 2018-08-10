var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/eui_skins/SceneGameSkin.exml";
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        return _this;
    }
    SceneGame.Shared = function () {
        if (SceneGame.shared == null) {
            SceneGame.shared = new SceneGame();
        }
        return SceneGame.shared;
    };
    // //初始化关卡
    // public InitLevel(level:number)
    // {
    //     this.levelIndex = level;
    //     var levelData = LevelDataManager.Shared().GetLevel(level);//通过关卡号获得这关的数据
    // }
    //改良版的初始化关卡
    SceneGame.prototype.InitLevel = function (level) {
        this.levelIndex = level;
        var leveldata = LevelDataManager.Shared().GetLevel(level);
        //将字段接起来  10个
        var words = leveldata.answer + leveldata.word;
        //随机一个其他题目的字段混合进本题目  凑齐10个
        while (words.length == 10) {
            var i = Math.floor(Math.random() * 400);
            if (i != level) {
                var temp = LevelDataManager.Shared().GetLevel(i);
                words += temp.word + temp.answer; //另外一关的数据也加进来
            }
        }
        //对字段进行重排  将上述的20个字段打乱排列显示
        var wordList = [];
        for (var i = 0; i < words.length; i++) {
            wordList.push(words.charAt(i)); //chatAt()——提取指定字符   有20个
        }
        wordList = this.randomList(wordList); //20个字符打乱
        //赋值  打乱的字符赋值
        for (var i = 0; i < this.group_words.numChildren; i++) {
            var wordrect = this.group_words.getChildAt(i);
            wordrect.setWordText(wordList[i]);
            wordrect.visible = true;
        }
        //重置一些状态   答案字初始化设为没有
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answerrect = this.group_answer.getChildAt(i);
            answerrect.SetSelectWord(null);
            answerrect.visible = true;
            answerrect.SelectWord = null;
        }
        //显示图像
        this.img_question.source = "resource/assets/" + leveldata.img;
    };
    //将一个数列随机  删减旧数组的 添加为新数组
    SceneGame.prototype.randomList = function (arr) {
        var array = [];
        while (arr.length > 0) {
            var i = Math.floor(Math.random() * arr.length);
            array.push(arr[i]); //新数组添加，旧数组删除。
            arr.splice(i, 1); //从数组中删除元素.在它们的位置插入新元素，返回已删除的元素。 删除元素（index, deleteCount）index 删除deleteCount次
        }
        return array;
    };
    SceneGame.prototype.onclick_back = function () {
        this.parent.addChild(SceneLevels.Shared()); //选关
        SceneLevels.Shared().reviewMap();
        this.parent.removeChild(this);
    };
    //当字点击的时候，由word类抛出  在word类中使用
    SceneGame.prototype.onclick_word = function (word) {
        //找到一个合适的位置添加进答案内容
        var sel = null;
        for (var i = 0; i < this.group_answer.numChildren; i++) {
            var answer = this.group_answer.getChildAt(i);
            if (answer.SelectWord == null) {
                sel = answer;
                break;
            }
        }
        //当有一个合适的位置的时候就会将字段填充，并判断是否胜利
        if (sel != null) {
            sel.SetSelectWord(word);
            //判断是否胜利
            var check_str = "";
            for (var i = 0; i < this.group_answer.numChildren; i++) {
                var answer = this.group_answer.getChildAt(i);
                check_str += answer.getWordText();
            }
            if (check_str == LevelDataManager.Shared().GetLevel(this.levelIndex).answer) {
                //胜利
                this.showWin();
                SoundManager.Shared().PlayRight();
            }
            else if (check_str.length == 4) {
                SoundManager.Shared().PlayWord();
            }
        }
    };
    //跳转到下一界面
    SceneGame.prototype.onclick_next = function () {
        this.group_win.visible = false;
        SceneLevels.Shared().OpenLevel(this.levelIndex + 1);
        this.InitLevel(this.levelIndex + 1);
    };
    //显示赢界面
    SceneGame.prototype.showWin = function () {
        this.group_win.visible = true;
        var levelData = LevelDataManager.Shared().GetLevel(this.levelIndex);
        this.lb_explain.text = levelData.tip;
        this.lb_from.text = levelData.content;
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame");
//# sourceMappingURL=SceneGame.js.map