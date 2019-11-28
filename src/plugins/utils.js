import { Notify, Toast} from "vant"


// toast轻提示
export function toast(message, duration = 3000){
    Toast({
        message: message,
        duration: duration,
    })
}
// 对vant组件 Notify消息提示封装
export let notify = {
    success: function(message, duration = 3500){
        Notify({
            message: message,
            duration: duration,
            background: "#07C121",
            color: "#fff"
        })
    },
    error: function(message, duration = 3500){
        Notify({
            message: message,
            duration: duration,
            background: "#f44",
            color: "#fff"
        })
    },
    warn: function(message, duration = 3500){
        Notify({
            message: message,
            duration: duration,
            background: "#fa8c16",
            color: "#fff"
        })
    },
    special: function(message, bgColor = "#f44", duration = 3500, color = "#fff"){
        Notify({
            message: message,
            duration: duration,
            background: bgColor,
            color: "#fff",
        })
    }
}

// 手机号*号处理
export function phoneEncrypt (val) {
    return val.substring(0, 3) + "****" + val.substring(7, 11);
}

// 验证手机号
export function isPhone(val){
    var phoneReg = /^1\d{10}$/
    var flag = phoneReg.test(val)
    return flag
}

// 验证是否为六位数字 - 验证码
export function isCode(val){
    var reg = /^\d{6}$/
    return reg.test(val)
}

// 验证email
export function isEmail(val){
    var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return reg.test(val)
}

// 验证是否为中文、字母、数字，即不包含特殊字符
export function isNormal(val){
    var reg = /^[\w\u4e00-\u9fa5]+$/
    return reg.test(val)
}


export const forEach = (arr, fn) => {
    if (!arr.length || !fn) {return}
    let i = -1
    let len = arr.length
    while (++i < len) {
        let item = arr[i]
        fn(item, i, arr)
    }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent("on" + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent("on" + event, handler)
            }
        }
    }
})()


// id加密
export function encrypt(number){
    let num = parseInt(number)
    const chars = "0Yq6Qw7fWXgTjkco4U5e8ZMOPluhJm2AFGHaiNxVyzrdI1bpCEKLvBstRSD3n9"; //加密映射
    const scale = 62
    const salt = 13579
    let remainder = 0, sb = "";
    num += salt
    while(num > scale - 1){
        // 对 scale 进行求余，然后将余数追加至 sb 中，由于是从末位开始追加的，因此最后需要反转（reverse）字符串
        remainder = Number.parseInt(num % scale)
        sb += chars.charAt(remainder)
        num = num / scale
    }
    sb += chars.charAt(Number.parseInt(num))
    sb = sb.split("").reverse()
        .join("")
    return addPreZero(sb)
}
function addPreZero(num){
    var len = (num + "").length,
        str = "";
     
    for(var i = 0; i < 6 - len; i++){
        str += "0";
    }
    return str + num
}

// 获取n天前日期
export function getDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear(); 
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d; 
}

// 将科学计数法转化为字符串，如1.2e-7 转化为 0.00000012
export function scientificString(param) {
    let strParam = String(param)
    let flag = /e/.test(strParam)
    if (!flag) return param
  
    // 指数符号 true: 正，false: 负
    let sysbol = true
    if (/e-/.test(strParam)) {
        sysbol = false
    }
    // 指数
    let index = Number(strParam.match(/\d+$/)[0])
    // 基数
    let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '')
  
    if (sysbol) {
        return basis.padEnd(index + 1, 0)
    } else {
        return basis.padStart(index + basis.length, 0).replace(/^0/, '0.')
    }
}

// toFixed 银行家舍入法
function toFixed(data, digits=0){
    let num = Number(data)
    if (digits < 0 || digits > 20) throw RangeError('toFixed() digits argument must be between 0 and 20')
    if (isNaN(num)) return NaN

    let stringNumber = scientificString(num) + ""
    if (!stringNumber.includes('.')) {
        //判断是否有小数点
        stringNumber += '.'
    }

    let integerDigit = stringNumber.split('.')[0], //取出整数位
    decimal = stringNumber.split('.')[1] //取出小数位
    decimal = decimal.split('')

    if (decimal.length < digits) {
        //计算差值并补零
        let difference = digits - decimal.length
        decimal = decimal.concat(Array(difference).fill('0'))
    } 
    if (decimal.length > digits) {

        // 保留位数的后一位 > 5/5后面有数字/ 5的前一位为奇数
        if (decimal[digits] > 5 || (decimal[digits] == 5 && (decimal.length - digits >= 2 || decimal[digits - 1]%2 != 0))){

            // 取出要保留的位数
            decimal = decimal.slice(0, digits)

            //循环找9
            for (let i = decimal.length - 1; i - 1>= 0; i--) {
                // == 9
                if (decimal[i] == 9) {
                    decimal[i] = 0 + ''
                    //前一个不是9得退出
                    if (decimal[i - 1] != 9) {
                        decimal[i - 1] = + decimal[i - 1] + 1 + ''
                        decimal[i] = 0 + ''
                        break;
                    }
                }else{
                    decimal[i] = + decimal[i] + 1 + ''
                    break;
                }
                //都为9
                if (i == 1) {
                    integerDigit = +integerDigit + 1 + ''
                    decimal[i - 1] = 0 + ''
                }
            }
        }else{
            //保留指定位数
            decimal = decimal.slice(0, digits)
        }
    }
    //拼接整数位和小数位并返回字符串
    return stringNumber = integerDigit.concat('.').concat(decimal.join(''))
}

//获取小数位数
export function decNum(a){
    var r=0;
    a=a.toString();
    if(a.indexOf(".")!== -1) r=a.split(".")[1].length;
    return r;
}

//去除小数点并转成数值
export function int(a){
    return parseInt(a.toString().replace(".", ""));
}

// js精度丢失解决
export function calc(n1, n2, type, decimal = 2){ //加减乘除
    let num1 = parseFloat(n1) || 0  // 容错处理，参数n1，n2如果不是数字，则赋值为0
    let num2 = parseFloat(n2) || 0

    let a = scientificString(num1)
    let b = scientificString(num2)
    var r,
        da=decNum(a),
        db=decNum(b),
        dsum=da+db,
        dmin=Math.min(da,db),
        dmax=Math.max(da,db);
    dsum+=dmax-dmin;
    dsum=Math.pow(10,dsum);
    dmax=Math.pow(10,dmax);
    a=int(a);
    b=int(b);
    if(da>db){
        b*=Math.pow(10,da-db);
    }else{
        a*=Math.pow(10,db-da);
    }
    switch(type){
        case "+":
            r=(a+b)/dmax;
            break;
        case "-":
            r=(a-b)/dmax;
            break;
        case "*":
            r=(a*b)/dsum;
            break;
        case "/":
            r=a/b;
            break;
    }
    let result = scientificString(toFixed(r, decimal))
    return result;
}

// 路由拼接跳转
function toUrl(url){
    // 连接异常直接退出
    if(!url) {return;}
    // 默认标题 后续企多福出来需要做判断不能写死
    var defTitle = "企盈福-企业财税的贴心管家";
    // 分离锚点
    var maodian = "";
    var arr = url.split("#");
    if(arr.length >= 2) {
        maodian = "#" + arr[1];
        url = arr[0];
    }
    // 补充连接参数
    if(url.indexOf("?") < 0) {
        url = url + "?block=true";
    }
    // if(window.page_title && window.page_title != defTitle) {
    //     url = url + "&page_title=" + page_title;
    // }
    // 跳转连接
    window.location.href = url + maodian;
    return true;
}
