import store from "../store"
import env from "./env"
import { encrypt } from "./utils"
import router from "../router"
import config from "./config"

const defaultOptions = {
    timeout: 30000,
    jsonpCallback: "callback",
    jsonpCallbackFunction: null,
};

function generateCallbackFunction() {
    return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`;
}

function clearFunction(functionName) {
    try {
        delete window[functionName];
    } catch (e) {
        window[functionName] = undefined;
    }
}

function removeScript(scriptId) {
    const script = document.getElementById(scriptId);
    if (script) {
        document.getElementsByTagName("head")[0].removeChild(script);
    }
}
// get跨域请求
export function fetchJsonp(_url, data = {}, options = {}) {
    let defDomain = config.deployUrl || env.host || "company.kingmogu.com";
    // to avoid param reassign
    const timeout = options.timeout || data.timeout || defaultOptions.timeout;
    const jsonpCallback = options.jsonpCallback || defaultOptions.jsonpCallback;
    let showLoading = !!data.showLoading; // 判断是否需要显示正在加载图标
    let isEncrypt = data.encrypt; // 是否需要对id进行加密

    // 只有线下环境才能生效domain替换
    if (options.mockDomain && window.isDev === 1) {
        defDomain = options.mockDomain;
    }

    // wms强制切线上
    if (_url.indexOf("/wms") >= 0) {
        defDomain = "www.qiyingfu.com";
    }

    // 生成请求路径
    let url = "//" + defDomain + _url;

    // 上传数据拼接字符串
    let dataStr = "";
    Object.keys(data).forEach(key => {
        if(isEncrypt && key.toLowerCase().indexOf("id") !== -1){
            if(Array.isArray(data[key])){ // 数组
                let arr = []
                data[key].map(item => {
                    arr.push(encrypt(item))
                })
                data[key] = arr
            }else{ // 非数组
                data[key] = encrypt(data[key])
            }
        }
        // encrypt、isLoading不加入参数
        if(key !== "encrypt" && key !== "showLoading")
        {dataStr += key + "=" + data[key] + "&";}
    })

    if (dataStr !== "") {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
        // 连接拼接参数
        if (url.indexOf("?") > 0) {
            url = url + "&" + dataStr;
        } else {
            url = url + "?" + dataStr;
        }
    }

    let timeoutId;

    return new Promise((resolve, reject) => {
        const callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();
        const scriptId = `${jsonpCallback}_${callbackFunction}`;

        if(showLoading){
            store.dispatch("showLoading",true) // 加载中
        }
        window[callbackFunction] = (response) => {

            // 未登录或登录超时跳转到登录页
            if(response.status === "1002"){
                if (window.location.pathname !== "/login") {
                    // window.location.href = '/login'
                    router.push({
                        path: "/login",
                        query: { redirect: router.currentRoute.path }, // 如果你使用钩子函数，your path 可以替换成to.fullPath
                    })
                }
                if (timeoutId) {clearTimeout(timeoutId);}
                return
            }
            
            // 输出返回结果
            resolve(response);

            store.dispatch("showLoading", false) // 停止加载
            
            if (timeoutId) {clearTimeout(timeoutId);}

            removeScript(scriptId);

            clearFunction(callbackFunction);
        };

        // Check if the user set their own params, and if not add a ? to start a list of params
        url += (url.indexOf("?") === -1) ? "?" : "&";

        const jsonpScript = document.createElement("script");
        jsonpScript.setAttribute("src", `${url}${jsonpCallback}=${callbackFunction}`);
        if (options.charset) {
            jsonpScript.setAttribute("charset", options.charset);
        }
        jsonpScript.id = scriptId;
        document.getElementsByTagName("head")[0].appendChild(jsonpScript);

        timeoutId = setTimeout(() => {

            resolve({
                message: "[6000]网络繁忙，请稍后在试~",
                status: "6000",
                success: true,
                extData: {}
            });

            store.dispatch("showLoading", false) // 停止加载

            clearFunction(callbackFunction);
            removeScript(scriptId);
            window[callbackFunction] = () => {
                clearFunction(callbackFunction);
            };
        }, timeout);

        // Caught if got 404/500
        jsonpScript.onerror = () => {
            resolve({
                message: "[6001]网络繁忙，请稍后在试~",
                status: "6001",
                success: true,
                extData: {}
            });

            store.dispatch("showLoading", false) // 停止加载

            clearFunction(callbackFunction);
            removeScript(scriptId);
            if (timeoutId) {clearTimeout(timeoutId);}
        };
    });
}

export function fetchPost(url, options, callback) {
    let host = "//" + (config.deployUrl || env.host || "company.kingmogu.com");
    fetch(host + url, {
        method: "POST",
        body: options,
        credentials: "include",
        header: {
            "Cache-Control": "no-cache"
        }
    }).then((response) => {
        if (response.status === "1002") {
            if (window.location.pathname !== "/login") {
                window.location.href = "/login"
            }
            return
        }
        return response.json()
    }).then((responseData) => {
        callback(responseData)
    }).catch((err)=> {
        callback(err)
    });
}
