var NUM_EXP = /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/


module.exports = {
    toStr : function(value){
        return value+"";
    },
    strToArr : function(value){
        value = (value+"").replace(/，/g, ",");//为了防止策划误填，先进行转换
        value = value.trim();
        if(value === "") return null;
        var tempArr = value.split(",");
        var arr = [];
        for (var i = 0, li = tempArr.length; i < li; i++) {
            var v = tempArr[i].trim();
            if((v+"").search(NUM_EXP) == 0){
                v = v.indexOf(".") > 0 ? parseFloat(v) : parseInt(v);
            }
            arr.push(v);
        }
        return arr;
    },
    strToObj : function(value){
        value = (value+"").replace(/，/g, ",").replace(/：/g, ":");//为了防止策划误填，先进行转换
        value = value.trim();
        if(value === "") return null;
        var obj = {};
        var tempArr0 = value.split(",");
        for(var i = 0, li = tempArr0.length; i < li; ++i){
            var strI = tempArr0[i].trim();
            if(strI === ""){
                continue;
            }
            var tempArr1 = strI.split(":");
            var v = tempArr1[1];
            if((v+"").search(NUM_EXP) == 0){
                v = v.indexOf(".") > 0 ? parseFloat(v) : parseInt(v);
            }
            obj[tempArr1[0]] = v;
        }
        return obj;
    },
    strToArrInArr : function(value){
        value = (value+"").replace(/，/g, ",").replace(/；/g, ";");//为了防止策划误填，先进行转换
        value = value.trim();
        if(value === "") return null;
        var arr = [];
        var tempArr0 = value.split(";");
        for(var i = 0, li = tempArr0.length; i < li; ++i){
            var strI = tempArr0[i].trim();
            if(strI === ""){
                continue;
            }
            var tempArr1 = strI.split(",");
            var arr1 = [];
            for (var j = 0, lj = tempArr1.length; j < lj; j++) {
                var v = tempArr1[j].trim();
                if((v+"").search(NUM_EXP) == 0){
                    v = v.indexOf(".") > 0 ? parseFloat(v) : parseInt(v);
                }
                arr1.push(v);
            }
            arr.push(arr1);
        }
        return arr;
    }
};