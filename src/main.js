import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import config from "./plugins/config"
import "./style/iconfont/iconfont.css"

Vue.config.productionTip = false
// 全局注册应用配置
Vue.prototype.$config = config

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
