var moUtils = require("mo-utils");
var cmdJs = require('cmdjs');
var cmd = cmdJs.cmd;
var fs = cmdJs.fs2;
var path = cmdJs.path2;

function getJsObjContent(data, blank, preBlank){
    if(data == null) return 'null';
    else if(typeof data == "number" || typeof data == "boolean") return data;
    else if(typeof data == "string") return "'" + data + "'";
    else if(data instanceof Array){
        var result = '[';
        for(var i = 0; i < data.length; ++i){
            result += getJsObjContent(data[i], blank, preBlank + blank);
            if(i < data.length - 1) result += ",";
        }
        result += ']';
        return result;
    }
    else{
        var result = '{';
        var l = Object.keys(data).length;
        var i = 0;
        for (var key in data) {
            var value = data[key];
            if(value == null) continue;
            var key1 = key;
            if(key.match(/^\d+$/)){
                key1 = '"' + key1 + '"';
            }
            result += key1 + ":" + getJsObjContent(value, blank, preBlank+blank);
            if(i < l - 1) result += ",";
            i++;
        }
        result += '}';
        return result;
    }
}
exports.getJsObjContent = getJsObjContent;


function getModuleJsContent(data){
    var content = "module.exports = {\r\n";
    var length = Object.keys(data).length, count = 0;
    for (var key in data) {
        var keyStr = key;
        if(key.match(/^\d+$/)) keyStr = '"' + key + '"';
        content += '    ' + keyStr + ' : ' + getJsObjContent(data[key]);
        if(count < length - 1) content += ",\r\n";
        count++;
    }
    content += "\r\n};";
    return content;
}
exports.getModuleJsContent = getModuleJsContent;

exports.genIndex = function(modulePath){
    var content = "";
    fs.walkDirSync(modulePath, ".js", function(filePath){
        var relativePath = path.relative(modulePath, filePath);
        if(relativePath == "index.js") return;
        relativePath = relativePath.replace(/\\/g, "/");

        content += "exports." + path.basename(relativePath, ".js") + " = require('./" + relativePath + "');\r\n";
    });
    fs.writeFileSync(path.join(modulePath, "index.js"), content);
};

/**
 * 最多保留小数点后4位。
 * @param obj
 * @returns {*}  q
 */
exports.handleNum = function(obj){
    var content = typeof obj == "string" ? obj : JSON.stringify(obj, null, 0);
    content = content.replace(/"[^"]+"[ ]*:[ ]*[\-]?\d+\.\d{4,}/gi, function(value){
        var index = value.lastIndexOf(":");
        var num = parseFloat(value.substring(index+1));
        var num1 = Math.round(num*10000)/10000;
        var num2 = Math.round(num);
        if(num1 == num2){
            num = num2;
        }else{
            num = num1;
        }
//        console.log(value, "--->", value.substring(0, index+1) + num);
        return  value.substring(0, index+1) + num;
    });
    content = content.replace(/"egret_/gi, '"');
    return content;
}