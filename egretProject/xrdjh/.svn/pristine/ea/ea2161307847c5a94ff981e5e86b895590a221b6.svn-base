exports.handle = function(trans){
    var content = 'var max = function(num1, num2){return Math.max.apply(Math, arguments)};\r\n';
    content += 'var min = function(num1, num2){return Math.min.apply(Math, arguments)};\r\n';
    content += 'var pow = function(num1, num2){return Math.pow.apply(Math, arguments)};\r\n';
    content += 'var floor = function(num1){return Math.floor.apply(Math, arguments)};\r\n\r\n';
    content += 'var exp = function(num1){return Math.exp.apply(Math, arguments)};\r\n\r\n';
    content += 'var abs = function(num1){return Math.abs.apply(Math, arguments)};\r\n\r\n';
    content += 'var random = function(num1,num2){return (0|(Math.random()*(num2-num1+1))+num1)};\r\n\r\n';
    content += 'var int = function(n){return parseInt(n);}\r\n\r\n';
    content += 'var log = function(num1){return Math.log.apply(Math, arguments)};\r\n\r\n';
    var transResult = trans.result;
    for (var key in transResult) {
        var value = transResult[key];
        content += "/**\r\n" + " * " + value[trans.getKey("desc")] + "\r\n";
        var regex = value[trans.getKey("regex")];
        var args = value[trans.getKey("args")];
        args = args.replace(/：/g, ":");
        args = args.replace(/；/g, ";");
        var argsArr = args.split(";");

        for(var i = 0; i < argsArr.length; ++i){
            content += " * @param " + argsArr[i].replace(/:/, " ") + "\r\n";
        }

        content += " */\r\n";
        content += "exports." + key + " = function(";
        for(var i = 0; i < argsArr.length; ++i){
            var argStr = argsArr[i];
            var arg = argStr.split(":")[0];
            arg = arg.trim();
            content += arg;
            if(i < argsArr.length - 1) content += ", ";
        }
        content += "){return " +  regex + ";};\r\n";
    }
    return [{
        content : content,
        moduleName : "uw-formula",
        out : "index.js"
    }]
};