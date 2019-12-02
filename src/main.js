import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
// import config from "./plugins/config"
import "./style/iconfont/iconfont.css"
import axios from 'axios' // 1、在这里引入axios

Vue.prototype.$ajax = axios; // 2、在vue中使用axios Vue.config.productionTip = false /* eslint-disable no-new */ new Vue({ el: '#app', 
// Vue.config.productionTip = false
// 全局注册应用配置
// Vue.prototype.$config = config
// import axios from 'axios';//引入文件
// Vue.prototype.$http = axios;//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$http使用
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
