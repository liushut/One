var path = require("path");
var fs = require("fs");
var xlsx = require("xlsx");
var valHandler = require("../valHandler.js");
var NUM_EXP = /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/;


module.exports = function(opt){
    this.input = opt.input;
    this.sheet = opt.sheet;
    this.idName = opt.idName || "id";//id名字，默认为id
    this.ignores = opt.ignores || [];//要忽略的列
    this.valHandler = opt.valHandler || {};

    this.result = {};
    this.idResult = {};
    this.idKeyName = opt.idKeyName;

    this.colMap = {};
    this.rows = 0;

    this.isUglified = opt.isUglified;

    this.getKey = function(name){
        if(this.isUglified) return this.colMap[name];
        return name;
    };

    this._getRows = function(){
        var keys = Object.keys(this.sheet);//先获取到所有的key列表
        var indexCount = keys.length - 1;
        this.rows = 0;
        while(indexCount>=0){
            indexCount--;
            var lastKey = keys[indexCount];
            if(lastKey == null) break;
            if(lastKey[0] === "!"){
                continue;
            }else{
                try{
                    var num = parseInt(lastKey.match(/\d+$/)[0]);
                    if(this.rows < num) this.rows = num;
                }catch(e){
                    debugger;
                }
            }
        }
        return this.rows;
    };
    this._initColMap = function(){
        var sheet = this.sheet;
        var keys = Object.keys(sheet);//先获取到所有的key列表
        for(var i = 0; i < keys.length; ++i){
            var key = keys[i];
            if(key == "!ref" || key == "!merges" || key == "!margins" || key == "!autofilter") continue;
            var row = parseInt(key.match(/\d+$/)[0]);
            if(row == 2){
                var colChar = key.match(/^[A-Za-z]+/)[0];
                if(sheet[key]){
                    var name = sheet[key].v;
                    if(name) this.colMap[name] = colChar;
                }
            }
        }
    };

    this._parse = function(){
        var ignores = this.ignores, idKeyKey;
        if(this.idKeyName){
            idKeyKey = this.getKey(this.idKeyName);
            if(!idKeyKey) console.log("不存在idKeyName【%s】对应的key！", this.idKeyName);
        }
        //第3行才是数据开始的行
        for(var i = 3; i <= this.rows; ++i){
            var rowData = {};
            for (var name in this.colMap) {
                var char = this.colMap[name];
                var key = char+i;
                var cellValue = this._doCell(this.sheet[key], i, name);
                if(cellValue != null) rowData[this.getKey(name)] = cellValue;
            }
            this._doRow(rowData, idKeyKey, i);

            for(var j = 0; j < ignores.length; ++j){
                var key = this.getKey(ignores[j]);
                if(key){
                    delete rowData[key];
                }
            }
        }
    };

    this._doCell = function(cell, row, name){
        if(!cell) return null;
        var value = cell.v;
        if(value == null) return null;
        for (var funcName in this.valHandler) {
            var arr = this.valHandler[funcName];
//            console.log(arr, colName);
            if(arr.indexOf(name) >= 0){
                return valHandler[funcName](value);
            }
        }
        if((value+"").search(NUM_EXP) == 0){
            if(typeof value == "string"){
                value = value.indexOf(".") > 0 ? parseFloat(value) : parseInt(value);
            }
            var numStr = value + "";
            var index = numStr.indexOf(".");
            if(index>=0 && numStr.length - index > 5){//处理到小数点后5位
                var num1 = Math.round(value*100000)/100000;
                var num2 = Math.round(value);
                if(num1 == num2){
                    value = num2;
                }else{
                    value = num1;
                }
            }
        }else if(typeof value == "string"){
            value = value.replace(/[\r\n]/g, "");
        }
        return value;
    };

    this._doRow = function(rowData, idKeyKey, row){
        var idKey = this.getKey(this.idName);
        var id = rowData[idKey];
        if(id == null || id === "") return;
        if(this.result[id] != null) {
            console.warn("%s ： 数据结果中已经存在id为【%s】的数据，将会进行覆盖！【第%d行数据】", this.input, id, row);
        }
        if(idKeyKey){
            var k = rowData[idKeyKey];
            if(k == null){
                console.warn("%s ： idKeyKey【%s - %s】不存在，请检查！【第%d行数据】", this.input, this.idKeyName, id, row);
            }else{
                this.idResult[k] = id;
            }
        }
        this.result[id] = rowData;
    };

    this.parse = function(){
        this._getRows();
        this._initColMap();
        this._parse();
    }
};
