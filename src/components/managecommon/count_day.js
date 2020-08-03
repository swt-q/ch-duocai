//获取差值
function get_count_day(date1, date2) {
    var sdate = new Date(date1);
    var now = new Date(date2);
    var days = now.getTime() - sdate.getTime();
    var day = Math.ceil(days / (1000 * 60 * 60 * 24));
    return day + 1; //包括今天！
};
//获取当前时间
function get_detail_day(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1;
    month = month<10? '0'+month:month;
    var day = nowDate.getDate();
    day = day<10? '0'+day:day;
    return year+'-'+month+'-'+day;
};
//计算还款日   swt---2020/7/14 
function count_pay_day(Format,payTime,num){ //------推算到期时间
    Date.prototype.Format = function (Format) {  
        var o ={
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(Format))
            Format = Format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(Format))
                Format = Format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return Format;
    }
    Date.prototype.addDays = function (d) {   //以天为单位计算  + or -
        this.setDate(this.getDate() + d);
    };

    var count_day = new Date(payTime);
    count_day.addDays(num);
    return count_day.Format(Format);
};

//计算天数封装 swt---2020/7/14 
export default {
    get_count_day,
    get_detail_day,
    count_pay_day,
};