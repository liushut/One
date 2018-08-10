var Transer = require("./Transer.js");

//公式转换器
module.exports = function(){
    Transer.apply(this, arguments);

    this._doRow = function(rowData, idKeyKey, row){
        var idKey = this.getKey(this.idName);
        var id = rowData[idKey];
        if(id == null) return;
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

        var colMap = this.colMap;

        var paramCount = 0;
        var newRowData = [];
        for (var name in colMap) {
            if(name.match(/^param\d+$/)) paramCount++;
        }
        for(var i = 0; i < paramCount; ++i){
            var value = rowData[this.getKey("param"+i)];
            if(value == null) break;
            newRowData.push(value);
        }

        this.result[id] = newRowData;
    };

};