var cmdJs = require('cmdjs');
var path = cmdJs.path2;
var fs = cmdJs.fs2;
var xlsx = require("xlsx");


var commonCfg = require("../../config/commonCfg.js");
var clientCfg = require("../../config/clientCfg.js");

var jsonOutDir = path.join(commonCfg.proj_dir, "out/xlsx/json");
var tsOutDir = path.join(commonCfg.proj_dir, "out/xlsx/ts");
jsonOutDir = commonCfg.client_shared;
tsOutDir = commonCfg.client_auto;


var core = require("../core/core.js");

function parse(opt, store){
    var xlsxPath = path.join(commonCfg.config_xlsx, opt.input+".xlsx");

    var workbook = xlsx.readFile(xlsxPath);
    var sheetName = workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    opt.sheet = sheet;
    opt.isUglified = true;
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
    var idKeyConstsContent = "module xlsx{\r\n";
    var jsonResultArr = [];
    var tsResultArr = [];

    for (var name in store) {
        var handlerPath = path.join(__dirname, "client-handler", name+".js");
        var trans = store[name];
        if(fs.existsSync(handlerPath)){
            var handler = require(handlerPath);
            var results = handler.handle(trans);
            for(var i = 0; i < results.length; ++i){
                var result = results[i];
                if(result.type == "json") jsonResultArr.push(result);
                else tsResultArr.push(result);
            }
        }else{
            var result = {};
            result.input = name;
            result.content = JSON.stringify(trans.result);
            result.colMap = trans.colMap;
            jsonResultArr.push(result);
        }

        var idResult = trans.idResult;
        if(Object.keys(idResult).length > 0) {
            idKeyConstsContent += "export var id_" + name + " = " + core.getJsObjContent(idResult, 0, 0) + ";\r\n";
        }
    }
    idKeyConstsContent += "}";

    fs.writeFileSync(path.join(tsOutDir, "idKeyConsts.ts"), idKeyConstsContent);

    saveJsons(jsonResultArr);
    saveTss(tsResultArr);
}

function saveJsons(jsonResultArr){
    var cfgConstsContent = "module xlsx {\r\n";
    for(var i = 0; i < jsonResultArr.length; ++i){
        var result = jsonResultArr[i];
        var inputName = result.input;
        var colMap = result.colMap;
        cfgConstsContent += "//---------------" + inputName + ".json----------------\r\n";
        cfgConstsContent += "export var cfg_" + inputName + ' = "shared/' + inputName + '.json";\r\n';
        for (var key in colMap) {
            cfgConstsContent += "export var " + inputName + "_" + key + ' = "' + colMap[key] + '";\r\n';
        }
        cfgConstsContent +="\r\n";

        fs.writeFileSync(path.join(jsonOutDir, inputName + ".json"), result.content);
    }
    cfgConstsContent += "}";
    fs.writeFileSync(path.join(tsOutDir, "cfgConsts.ts"), cfgConstsContent);
}

function saveTss(tsResultArr){
    for(var i = 0; i < tsResultArr.length; ++i){
        var result = tsResultArr[i];
        var outPath = path.join(tsOutDir, result.out);
        fs.writeFileSync(outPath, result.content);
    }
}


//var xlsxPath = path.join(commonCfg.config_xlsx, "t_monster.xlsx");
//var workbook = xlsx.readFile(xlsxPath);
//var sheetName = workbook.SheetNames[0];
//var sheet = workbook.Sheets[sheetName];
//console.log(sheet["A196"]);

exports.publish = function(){
    fs.mkdirSync2(jsonOutDir);
    fs.mkdirSync2(tsOutDir);
    saveStore(parseList(clientCfg.xlsxList));
};