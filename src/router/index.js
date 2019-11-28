import Vue from "vue"
import Router from "vue-router"
import routes from "./router"
import MtaH5 from "../plugins/mta"
import config from "../plugins/config"
import { setTitle } from "../page/main/util"

Vue.use(Router)
const router = new Router({
    routes,
    mode: "history"
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 腾讯移动分析埋点-初始化
MtaH5.init({
    "sid": config.mtaParams.sid, //必填，统计用的appid
    "cid": config.mtaParams.cid, //如果开启自定义事件，此项目为必填，否则不填
    "autoReport": 0,//是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
    "senseHash": 0, //hash锚点是否进入url统计
    "senseQuery": 1, //url参数是否进入url统计
    "performanceMonitor": 0,//是否开启性能监控
    "ignoreParams": [], //开启url参数上报时，可忽略部分参数拼接
})

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        MtaH5.pgv() // 页面上报
    })
    setTitle(to, router.app)
    window.scrollTo(0, 0)
})

export default router
