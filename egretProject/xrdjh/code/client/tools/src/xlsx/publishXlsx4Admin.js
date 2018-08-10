var path = require("path");
var fs = require("fs");
var xlsx = require("xlsx");

var moUtils = require("mo-utils");

var commonCfg = require("../../config/commonCfg.js");
var serverCfg = require("../../config/adminCfg.js");

var uwAdmin = commonCfg.uwAdmin;

var splitArr = "<,>";

var core = require("../core/core.js");

function parseModel(opt, store){
    var xlsxPath = path.join(commonCfg.config_xlsx, opt.input+".xlsx");

    var workbook = xlsx.readFile(xlsxPath);
    var sheetName = workbook.SheetNames[0];
    var sheet = workbook.Sheets[sheetName];
    opt.sheet = sheet;
    opt.isUglified = false;//服务端不需要混淆
    var TranserClass = require("./transer/C#Model.js");
    var trans = new TranserClass(opt);
    trans.parse();
    store[opt.input] = trans;

}
function parseListModel(xlsxList){
    var store = {};
    for(var i = 0; i < xlsxList.length; ++i){
        parseModel(xlsxList[i], store);
    }
    return store;
}


function saveStoreModel(store){
    var jsResultArr = [];

    for (var name in store) {
        var trans = store[name];
        var result = {};
        result.className = name.slice(0,1).toUpperCase()+name.slice(1,name.length);
        result.fileName = name;
        result.out = result.className + ".cs";
        result.content = trans.colResult;
        jsResultArr.push(result);

    }

    saveJssModel(jsResultArr);
}



function saveJsResultModel(jsResult){
    var outPath = path.join(uwAdmin, "Model/temp");
    //如果不存在则先创建目录
    var dir = path.dirname(outPath);
    moUtils.mkdirSync(dir);
    //moUtils.rmdirSync(outPath);
    var content = "";

    content +="namespace UW.Model.temp\n";
    content +="{\n";
    content +="    public  class "+jsResult.className+"\n";
    content +="    {\n";
    var strProp = "",strParams ="",strSetValue ="";
    //属性
    for(var key in jsResult.content){
        strProp +="         /// <summary>\n";
        strProp +="        /// "+jsResult.content[key]+" \n";
        strProp +="         /// </summary>\n";
        strProp +="        public string "+key+";\n";

        strParams+=" string "+key+",";

        strSetValue +="            this."+key+" = "+key+";\n";
    }
    if(strParams.indexOf(",")>-1){
        strParams = strParams.substring(0,strParams.length-1);
    }
    //构造函数参数
    content+=strProp;
    content +="        public "+jsResult.className+"()\n";
    content +="        {\n";
    content +="        }\n";

    content +="        public "+jsResult.className+"("+strParams+")\n";
    content +="        {\n";
    //赋值
    content+=strSetValue;

    content +="        }\n";
    content +="    }\n";
    content +="}\n";

    fs.writeFileSync(path.join(outPath,jsResult.out), content);
}

function saveJsResultFactory(jsResult){
    var outPath = path.join(uwAdmin, "BLL/temp");
    //如果不存在则先创建目录
    var dir = path.dirname(outPath);
    moUtils.mkdirSync(dir);
    //moUtils.rmdirSync(outPath);
    var content = "";

    content+="using System.Web.Script.Serialization;\n";
    content+="using System.Collections.Generic;\n";
    content+="using System.Text.RegularExpressions;\n";
    content+="namespace UW.BLL.temp\n";
    content+="{\n";
    content+="    public static class Factory"+jsResult.className+"\n";
    content+="    {\n";
    content+="        public static UW.Model.temp."+jsResult.className+" getData(string key, string basePath)\n";
    content+="        {\n";
    content+="            if (FactoryBase.isRefresh || dic == null)\n";
    content+="            {\n";
    content+="                initData(basePath);\n";
    content+="            }\n";
    content+="            if (dic.ContainsKey(key))\n";
    content+="            {\n";
    content+="                UW.Model.temp."+jsResult.className+" ret = dic[key];\n";
    content+="                return ret;\n";
    content+="            }\n";
    content+="            else {\n";
    content+="                return new Model.temp."+jsResult.className+"();\n";
    content+="            }\n";
    content+="        }\n";

    content+="        private static Dictionary<string, UW.Model.temp."+jsResult.className+"> dic;\n";
    content+="        private static string fileName = \""+jsResult.fileName+"\";\n";

    content+="        private static void initData(string basePath)\n";
    content+="        {\n";
    content+="            if (dic != null) dic.Clear();\n";
    content+="            dic = new Dictionary<string, UW.Model.temp."+jsResult.className+">();\n";

    content+="            string strContent =  FactoryBase.readData(fileName,basePath);\n";
    content+="            JavaScriptSerializer jss = new JavaScriptSerializer();\n";
    content+="            Dictionary<string, object> jsonContent = (Dictionary<string, object>)jss.DeserializeObject(strContent);\n";
    content+="            foreach (string key in jsonContent.Keys)\n";
    content+="            {\n";
    content+="                Dictionary<string, object> jsonLineContent = (Dictionary<string, object>)jsonContent[key];\n";

    //属性
    var strParams = "";
    var i = 0;
    for(var key in jsResult.content){
        strParams+="jsonLineContent[\""+key+"\"].ToString(),";
        i++;
    }
    if(strParams.indexOf(",")>-1){
        strParams = strParams.substring(0,strParams.length-1);
    }
    content+="                dic.Add(key, new Model.temp."+jsResult.className+"("+strParams+"));\n";
    content+="            }\n";

    content+="        }\n";
    content+="    }\n";
    content+="}\n";

    fs.writeFileSync(path.join(outPath,"Factory"+jsResult.out), content);
}

function saveJssModel(jsonResultArr){
    for(var i = 0; i < jsonResultArr.length; ++i){
        var result = jsonResultArr[i];
        saveJsResultModel(result);
        saveJsResultFactory(result);
    }
}

/**********************************************************Model***********************************************************************/

function parseRes(opt, store){
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
    store[opt.input] = trans;

}
function parseListRes(xlsxList){
    var store = {};
    for(var i = 0; i < xlsxList.length; ++i){
        parseRes(xlsxList[i], store);
    }
    return store;
}


function saveStoreRes(store){
    var jsResultArr = [];

    for (var name in store) {
        var trans = store[name];
        var result = {};
        result.out = name + ".json";
        result.content = trans.result;
        result.colMap = trans.colMap;
        jsResultArr.push(result);

    }

    saveJssRes(jsResultArr);
}


function saveJsResultRes(jsResult){
    var outPath = path.join(uwAdmin, "Web/res/temp");
    //如果不存在则先创建目录
    var dir = path.dirname(outPath);
    moUtils.mkdirSync(dir);
    var content = "";

   /* for(var key in jsResult.content){
        var locObj = jsResult.content[key];
        var locStrContent = "";
        for(var key2 in jsResult.colMap){
            var locValue = locObj[key2];
            if(locValue){
                if(typeof locValue=="object"){
                    locValue = JSON.stringify(locValue);
                }
                locStrContent+= locValue+splitArr;
            }
            else
                locStrContent+= splitArr;
        }
        if(locStrContent.indexOf(splitArr)>-1){
            locStrContent = locStrContent.substring(0,locStrContent.length-splitArr.length);
        }
        content+=locStrContent+"\n";
    }*/

    var objContent = jsResult.content;

    for(var key in objContent){
        var locObj = objContent[key];
        for(var key2 in jsResult.colMap){
            var locValue = locObj[key2];
            if(locValue){
                if(typeof locValue=="object"){
                    locValue = JSON.stringify(locValue);
                }
            }else{
                locValue = "";
            }
            locObj[key2] = locValue;
        }
    }
    fs.writeFileSync(path.join(outPath,jsResult.out), JSON.stringify(objContent));
}



function saveJssRes(jsonResultArr){
    for(var i = 0; i < jsonResultArr.length; ++i){
        var result = jsonResultArr[i];
        saveJsResultRes(result);
    }
}
/**********************************************************res***********************************************************************/

var store = parseListModel(serverCfg.xlsxList);
saveStoreModel(store);
var storeRes = parseListRes(serverCfg.xlsxList);
saveStoreRes(storeRes);
