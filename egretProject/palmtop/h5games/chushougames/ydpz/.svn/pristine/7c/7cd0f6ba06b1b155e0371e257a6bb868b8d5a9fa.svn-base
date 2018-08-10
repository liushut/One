/**
 * Created by SmallAiTT on 2015/6/18.
 */
var commonCfg = require('../config/commonCfg.js');
var cmdJs = require('cmdjs');
var path = cmdJs.path2;
var fs = cmdJs.fs2;
var resourceDir = path.join(__dirname, "../../client/resource");
var extNameArr = [".json"];
var flag = false;
var resultContent;
var firstTime = true;

function getJsonContent(filePath){
    if(!fs.existsSync(filePath)) return;
    if(fs.statSync(filePath).isFile()){
        var extname = path.extname(filePath);
        if(!extname || extNameArr.indexOf(extname.toLowerCase()) < 0) return;
        var content = fs.readFileSync(filePath).toString();
        content = JSON.stringify(JSON.parse(content));
        var key = path.relative(resourceDir, filePath).replace(/\\/g, "/");
        if(flag) resultContent += ",";
        resultContent += '"' + key + '":' + content + "\r\n";
        flag = true;
    }else{
        var files = fs.readdirSync(filePath);
        for (var i = 0, l_i = files.length; i < l_i; i++) {
            var file = files[i];
            getJsonContent(path.join(filePath, file));
        }
    }
}

function publish(){
    resultContent = "var res = res || {};\r\n";
    resultContent += 'res["_jsDataTypeArr"]=["json", "ui"];res.jsDataModeEnabled = true;\r\n';
    resultContent += 'res["_jsData"] = {\r\n';
    flag = false;

    fs.rmdirSync2(commonCfg.client_shared, [path.join(commonCfg.client_shared,"dc_mc.json")]);

    require('./xlsx/publishXlsx4Client.js').publish();
    // require('./xlsx/publishXlsx4Server.js').publish();
    // require('./ds/publishDs.js').publish();
    // require('./iface/publishIface.js').publish();
    //getJsonContent(path.join(resourceDir, "dynamic2"));
    getJsonContent(commonCfg.client_shared);
    resultContent += "}";
    //var gJsDataDir = path.join(resourceDir, "../modules/g-base/src/consts/auto");
    //var gJsDataDir2 = path.join(resourceDir, "../libs/modules/g-base/consts/auto");
    //fs.mkdirSync2(gJsDataDir);
    //fs.mkdirSync2(gJsDataDir2);
    //fs.writeFileSync(path.join(gJsDataDir, "jsData.js"), resultContent);
    //fs.writeFileSync(path.join(gJsDataDir2, "jsData.js"), resultContent);
    //生成zip json
    require("./publish/publishZipJson.js").createJsonZip();
}
exports.publish = function(){
    if(firstTime) firstTime = false;
    else publish();
};
if(firstTime) publish();