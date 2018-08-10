var core = require("../../core/core.js");

exports.handle = function(trans){
    var results = [];
    var transResult = trans.result;

    var content = "module.exports = {\r\n";
    var length = Object.keys(transResult).length, count = 0;
    for (var key in transResult) {
        content += "    " + key + " : " + core.getJsObjContent(transResult[key], 0, 0);
        if(count < length - 1) content += ",";
        content += "\r\n";
        count++;
    }
    content += "}";
    results.push({
        content : content,
        moduleName : "uw-data",
        out : "temp/c_prop.js"
    });
    return results;
};