//只能输入数字和小数点后两位
export function checkInput(num) {
    num = num.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
    num = num.replace(/^\./g,"0."); //验证第一个字符是数字
    num = num.replace(/\.{2,}/g,"."); //只保留第一个, 清除多余的
    num = num.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    return num
}
//加法
export function  add(a,b){
    var str1,str2,temp,decimals1,decimals2,decimals;
    var addFlag = 0;
    var max = [],min = [],res = [];
    str1 = a.toString().split("").reverse();//分割字符串，并且反转
    str2 = b.toString().split("").reverse();
    if(str1.indexOf('.')!==-1){
        decimals1=str1.indexOf('.');
        str1.splice(str1.indexOf('.'),1)
    }
    if(str2.indexOf('.')!==-1){
        decimals2=str2.indexOf('.');
        str2.splice(str2.indexOf('.'),1)
    }
    if(decimals1&&decimals2){
        decimals=Math.max(decimals1,decimals2);
        if(decimals1<decimals){
            for(let i=decimals1;i<decimals;i++){
                str2.unshift(0)
            }
        }else if(decimals2<decimals){
            for(let i=decimals2;i<decimals;i++){
                str1.unshift(0)
            }
        }
    }else if(decimals1){
        decimals=decimals1;
        for(let i=0;i<decimals1;i++){
            str2.unshift(0)
        }
    }else if(decimals2){
        decimals=decimals2;
        for(let i=0;i<decimals2;i++){
            str1.unshift(0)
        }
    }
    if (parseInt(a) >= parseInt(b)) {
        max = str1;
        min = str2;
    }
    else{
        max = str2;
        min = str1;
    }
    for (var i = 0; i <= max.length - 1; i++) {
        if (i <= min.length - 1) {
            temp = parseInt(max[i]) + parseInt(min[i]) + addFlag;
        }
        else{
            temp = parseInt(max[i]) + addFlag;
        }

        if (temp > 9) {
            res[i] = temp - 10;
            addFlag = 1;
            if (i == max.length - 1) {
                res[max.length] = 1;//如果是最后一位，要进位
            }
        }
        else{
            res.push(temp);
            addFlag = 0;
        }
    }
    if(decimals&&res.length!==0){
        res.splice(decimals, 0, ".");
        if(decimals==1){
            if(res[0]==0){res.splice(0,2)}
        }else if(decimals==2){
            if(res[0]==0){
                if(res[1]==0){
                    res.splice(0,3)
                }else{
                    res.splice(0,1)
                }
            }
        }
    }
    return res.reverse().join("");
}
//减法
export function subtract(a,b) {
    var str1,str2,temp,des,r,decimals1,decimals2,decimals;
    var addFlag = 0;
    var max = [],min = [],res = [];
    str1 = a.toString().split("").reverse();//依然分割字符串，并且翻转
    str2 = b.toString().split("").reverse();
    if(str1.indexOf('.')!==-1){
        decimals1=str1.indexOf('.');
        str1.splice(str1.indexOf('.'),1)
    }
    if(str2.indexOf('.')!==-1){
        decimals2=str2.indexOf('.');
        str2.splice(str2.indexOf('.'),1)
    }
    if(decimals1&&decimals2){
        decimals=Math.max(decimals1,decimals2);
        if(decimals1<decimals){
            for(let i=decimals1;i<decimals;i++){
                str2.unshift(0)
            }
        }else if(decimals2<decimals){
            for(let i=decimals2;i<decimals;i++){
                str1.unshift(0)
            }
        }
    }else if(decimals1){
        decimals=decimals1;
        for(let i=0;i<decimals1;i++){
            str2.unshift(0)
        }
    }else if(decimals2){
        decimals=decimals2;
        for(let i=0;i<decimals2;i++){
            str1.unshift(0)
        }
    }
    if (parseInt(a) >= parseInt(b)) {//比较大小
        max = str1;
        min = str2;
    }
    else{
        max = str2;
        min = str1;
        des = -1;//意味着结果是负数
    }
    for (var i = 0; i <= max.length - 1; i++) {
        if (i <= min.length - 1) {
            temp = parseInt(max[i]) - parseInt(min[i]) + addFlag;
        }
        else{
            temp = parseInt(max[i]) + addFlag;
        }

        if (temp <= 0) {
            res[i] = temp + 10;
            addFlag = -1;
            if (i == max.length - 1) {
                res[max.length - 1] = "";//如果是最后一位，退位
            }
        }
        else{
            res.push(temp);
            addFlag = 0;
        }
    }
    if(decimals&&res.length!==0){
        res.splice(decimals, 0, ".");
        if(decimals==1){
            if(res[0]==0){res.splice(0,2)}
        }else if(decimals==2){
            if(res[0]==0){
                if(res[1]==0){
                    res.splice(0,3)
                }else{
                    res.splice(0,1)
                }
            }
        }
    }
    r = res.reverse().join("");
    if (des == -1) {//最后再来判断符号，这是负数
        return -r;
    }
    else{
        return r;
    }
}
// 乘法
export function accMul(a,b) {
    var str1,str2,temp,n,decimals1,decimals2,decimals;
    var max = [],min = [],res = [];
    str1 = a.toString().split("").reverse();
    str2 = b.toString().split("").reverse();
    if(str1.indexOf('.')!==-1){
        decimals1=str1.indexOf('.');
        str1.splice(str1.indexOf('.'),1)
    }
    if(str2.indexOf('.')!==-1){
        decimals2=str2.indexOf('.');
        str2.splice(str2.indexOf('.'),1)
    }
    if(decimals1&&decimals2){
        decimals=Math.max(decimals1,decimals2);
    }else if(decimals1){
        decimals=decimals1
    }else if(decimals2){
        decimals=decimals2
    }
    if (str1.length > str2.length) {
        max = str1;
        min = str2;
    }
    else{
        max = str2;
        min = str1;
    }

    for (var i = 0; i <= min.length - 1; i++) {
        for (var j = 0; j <= max.length - 1; j++) {
            res[i + j] = 0;//下面要进行递归，这里必须声明，否则是NaN
        }
    }

    for (var i = 0; i <= min.length - 1; i++) {
        for (var j = 0; j <= max.length - 1; j++) {
            res[i + j] += parseInt(max[j]) * parseInt(min[i]);
        }
    }
    var m = res.length;//这个声明不可以放在前面，否则为null
    for (var n = 0; n < m; n++) {
        if (res[n] >= 10) {
            if (n == m - 1) {
                res[n + 1] = 0;
            }
            res[n + 1] += Math.floor(res[n]/10);
            res[n] = res[n] % 10;
        }
    }
    if(decimals&&res.length!==0){
        res.splice(decimals, 0, ".");
        if(decimals==1){
            if(res[0]==0){res.splice(0,2)}
        }else if(decimals==2){
            if(res[0]==0){
                if(res[1]==0){
                    res.splice(0,3)
                }else{
                    res.splice(0,1)
                }
            }
        }
    }
    return res.reverse().join("");
}
//除法
export function accDiv(num1,num2){
    if(num1 == '' || num2 == '' || escape(num1).indexOf("%u")!=-1 || escape(num2).indexOf("%u")!=-1){
        console.error('num1='+num1+' num2='+num2);
        return;
    }
    let _num1 = new Number(num1);
    let _num2 = new Number(num2);
    let _num3 = new Number(_num1 / _num2).toLocaleString();
    let _num4 = _num3.replace(/,/g,'');
        let _num5 = _num4.split('.');
    if(_num5.length==1){
        return _num5[0];
    }else {
        if(_num5[1].length<3){
            return _num5[0]+'.'+_num5[1]
        }else{
            let num6=_num5[1].split('');
            let num7=num6[0]+num6[1];
            return _num5[0]+'.'+num7.replace(/(0+)$/g,"")
        }
    }
}
//生成uuid
export function getUUId() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid
}