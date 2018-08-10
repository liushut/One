var cmdJs = require('cmdjs');
var path = cmdJs.path2;
var fs = cmdJs.fs2;
var xlsx = require("xlsx");

var commonCfg = require("../../config/commonCfg.js");
var serverCfg = require("../../config/serverCfg.js");

var serverNodeModules = path.join(commonCfg.proj_dir, "out/xlsx/node_modules");
serverNodeModules = commonCfg.server_nodeModules;

var core = require("../core/core.js");

function parse(opt, store){
    var xlsxPath = path.join(commonCfg.config_xlsx, opt.input+".xlsx");

    var workbook = xlsx.readFile(xlsxPath);
    var sheetName = workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    opt.sheet = sheet;
    opt.isUglified = false;//服务端不需要混淆
    var transerName = opt.transer || "Transer";
    var TranserClass = require("./transer/" + transerName);
    var trans = new TranserClass(opt);
    trans.parse();
    store[opt.out] = trans;

}
function parseList(xlsxList){
    var store = {};
    for(var i = 0; i < xlsxList.length; ++i){
        parse(xlsxList[i], store);
    }
    return store;
}

function saveStore(store){
    var jsResultArr = [];

    //先清空部分目录
    fs.rmdirSync2(path.join(serverNodeModules, "uw-data/temp"));

    for (var name in store) {
        var handlerPath = path.join(__dirname, "server-handler", name+".js");
        var trans = store[name];
        if(fs.existsSync(handlerPath)){
            var handler = require(handlerPath);
            var results = handler.handle(trans);
            for(var i = 0; i < results.length; ++i){
                jsResultArr.push(results[i]);
            }
        }else{
            var result = {};
            result.out = path.join("temp", name + ".js");
            result.moduleName = "uw-data";
            result.content = core.getModuleJsContent(trans.result);
            jsResultArr.push(result);
        }

    }

    saveJss(jsResultArr);
    core.genIndex(path.join(serverNodeModules, "uw-data"));
}

function saveJsResult(jsResult){
    var outPath = path.join(serverNodeModules, jsResult.moduleName, jsResult.out);

    //如果不存在则先创建目录
    var dir = path.dirname(outPath);
    fs.mkdirSync2(dir);

    fs.writeFileSync(outPath, jsResult.content);
}

function saveJss(jsonResultArr){
    for(var i = 0; i < jsonResultArr.length; ++i){
        var result = jsonResultArr[i];
        saveJsResult(result);
    }
}


exports.publish = function(){
    fs.mkdirSync2(serverNodeModules);
    saveStore(parseList(serverCfg.xlsxList));
};
