var Transer = require("./Transer.js");

//公式转换器
module.exports = function(){
    Transer.apply(this, arguments);

    this._doRow = function(rowData, idKeyKey){
        var idKey = this.getKey(this.idName);
        var id = rowData[idKey];
        if(id == null) return;
        this.result[id + "_" + rowData[this.getKey("cmdIndex")]] = rowData;
    };
};