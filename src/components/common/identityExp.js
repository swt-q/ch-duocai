function identityExp (model){
    /** 
     * 身份证15位编码规则：dddddd yymmdd xx p  
     * dddddd：地区码  
     * yymmdd: 出生年月日  
     * xx: 顺序类编码，无法确定  
     * p: 性别，奇数为男，偶数为女 
     * <p /> 
     * 身份证18位编码规则：dddddd yyyymmdd xxx y  
     * dddddd：地区码  
     * yyyymmdd: 出生年月日  
     * xxx:顺序类编码，无法确定，奇数为男，偶数为女  
     * y: 校验码，该位数值可通过前17位计算获得 
     * <p /> 
     * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ] 
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]  
     * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )  
     * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置 
     *  
     */
    // 因为身份证增加了6,8原则 所以去掉 arg中的空格在进行校验
    var arg = model.replace(/\s/g, '');
    //调用验证方法
    if(arg == "" || checkIdcard(arg) == "验证通过!"){
        return true;
    }else{
        return false;
    }
    function checkIdcard(idcard){
        var Errors=new Array(
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
        );
        var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        var retflag=false;
        var idcard,Y,JYM;
        var S,M;
        var idcard_array = new Array();
        var ereg;
        idcard_array = idcard.split("");
        //地区检验
        if(area[parseInt(idcard.substr(0,2))]==null){
            return Errors[4];
        }
        //身份号码位数及格式检验
        switch(idcard.length){
            case 15:
                if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
                    ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
                } else {
                    ereg=/^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
                }
                if(ereg.test(idcard)){
                    return Errors[0];
                }else {
                    return Errors[2];
                }
                break;
            case 18:
                //18位身份号码检测
                //出生日期的合法性检查 
                //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
                    ereg=/^[1-9][0-9]{5}19|20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
                } else {
                    ereg=/^[1-9][0-9]{5}19|20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
                }
                if(ereg.test(idcard)){//测试出生日期的合法性
                    //计算校验位
                    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                    + parseInt(idcard_array[7]) * 1 
                    + parseInt(idcard_array[8]) * 6
                    + parseInt(idcard_array[9]) * 3 ;
                    Y = S % 11;
                    M = "F";
                    JYM = "10X98765432";
                    M = JYM.substr(Y,1);//判断校验位
                    if(M == idcard_array[17].toUpperCase()){
                        return Errors[0]; //检测ID的校验位
                    }else{
                        return Errors[3];
                    }
                }else {
                    return Errors[2];
                }
                break;
            default:
                return Errors[1];
                break;
        }
    }
}

export{
    identityExp
}