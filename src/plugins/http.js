// http.js
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { notify } from "./utils";
import { Toast } from 'vant';

Vue.use(VueAxios, axios, Toast)

// 环境的切换
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'proxyApi'
} else if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://yapi.demo.qunar.com/mock/48066'
}


axios.defaults.timeout = 10000

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'


//http request 拦截器
axios.interceptors.request.use(
    config => {
      // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
      config.data = JSON.stringify(config.data);
      config.headers = {
        /*'Content-Type':'application/x-www-form-urlencoded'*/
        'Content-Type':'application/json;charset=UTF-8'
      }
    //   if(token){
    //     config.params = {'token':token}
    //   }
      return config;
    },
    error => {
      return Promise.reject(err);
    }
  );
   
   
  //http response 拦截器
   
  axios.interceptors.response.use(
    response => {
      if(response.data.errCode ==2){
        router.push({
          path:"/login",
          querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
        })
      }
      return response;
    },
    error => {
    //   Message({
    //     Message:error.message,
    //     type:'error',
    //     duration:5*1000
    //   });
      Toast.fail(error.message);
      return Promise.reject(error)
    }
  )

// get 请求
export function httpGet({
    url,
    params = {}
}) {
    console.log('this is ',url,params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

// post请求
export function httpPost({
    url,
    data = {},
    params = {}
}) {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: 'post',
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            // 发送的数据
            data,
            // url参数
            params

        }).then(res => {
            resolve(res.data)
        })
    })
}