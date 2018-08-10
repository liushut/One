/**
 * Created by Administrator on 2015/1/31.
 */
var Transer = require("./Transer.js");
//公式转换器
module.exports = function(){
    Transer.apply(this, arguments);
    this._parse = function(){
        var ignores = this.ignores, idKeyKey;
        if(this.idKeyName){
            idKeyKey = this.getKey(this.idKeyName);
            if(!idKeyKey) console.log("不存在idKeyName【%s】对应的key！", this.idKeyName);
        }
        //第3行才是数据开始的行
        for(var i = 1; i <= 1; ++i){
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
    this._doRow = function(rowData, idKeyKey,index){
        console.log(rowData);
        //this.result[idKeyKey][rowData[this.getKey("key")]] = rowData[this.getKey("value")];
        this.colResult = rowData;
    };

};