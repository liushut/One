exports.handle = function(trans){
    var content = 'module xlsx {\r\n';
    content += '    var max = function(num1:number, num2:number):number{return Math.max.apply(Math, arguments)};\r\n';
    content += '    var min = function(num1:number, num2:number):number{return Math.min.apply(Math, arguments)};\r\n';
    content += '    var pow = function(num1:number, num2:number):number{return Math.pow.apply(Math, arguments)};\r\n';
    content += '    var floor = function(num1:number):number{return Math.floor.apply(Math, arguments)};\r\n\r\n';
    content += '    var exp = function(num1:number):number{return Math.exp.apply(Math, arguments)};\r\n\r\n';
    content += '    var abs = function(num1:number):number{return Math.abs.apply(Math, arguments)};\r\n\r\n';
    content += '    var random = function(num1:number,num2:number):number{return (0|(Math.random()*(num2-num1+1))+num1)};\r\n\r\n';
    content += '    var int = function(n){return parseInt(n);};\r\n\r\n';
    content += '    var log = function(num1){return Math.log.apply(Math, arguments)};\r\n\r\n';
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
        content += "export function " + key + "(";
        var flag = false;
        for(var i = 0; i < argsArr.length; ++i){
            var argStr = argsArr[i];
            var arg = argStr.split(":")[0];
            arg = arg.trim();
            var reg=new RegExp("[^\\d\\w]" + arg + "[^\\d\\w]", "g");
            if(flag){
                content += arg + "?:number";
            }else{
                if(regex.match(reg)){
                    content += arg + ":number";
                }else{
                    flag = true;
                    content += arg + "?:number";
                }
            }
            if(i < argsArr.length - 1) content += ", ";
        }
        content += "){return " +  regex + ";}\r\n";
    }
    content += "}";
    return [{
        content : content,
        type : "ts",
        out : "c_formula.ts"
    }]
};