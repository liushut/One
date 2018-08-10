var core = require("../../core/core.js");

exports.handle = function(trans){
    var results = [];
    var transResult = trans.result;

    var content = "module xlsx.c_prop {\r\n";
    for (var key in transResult) {
        content += "export var " + key + " = " + core.getJsObjContent(transResult[key], 0, 0) + ";\r\n";
    }
    content += "}";
    results.push({
        content : content,
        type : "ts",
        out : "c_prop.ts"
    });
    return results;
};