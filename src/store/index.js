import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import routers from "../router/router"
import { getMenuByRouter } from "../page/main/util"
import Api from "../plugins/api"
import { notify } from "../plugins/utils";

Vue.use(Vuex)

const state = {
    isLoading: false, // 全局加载
    companyInfo: "", // 公司信息
    breadCrumbList: [], // 导航展开列表
    homeRoute: {}, // 首页导航信息
}

const getters = {
    menuList: () => getMenuByRouter(routers),
}

const actions = {
    // 全局loading
    showLoading(context, flag){
        context.commit("showLoading", flag)
    },
    // 用户信息
    getCompanyInfo(context){
        Api.getCompanyInfo().then(res => {
            if(res.status === "1001"){
                context.commit("setCompanyInfo", res.extData)
            }else{
                notify.error(res.message)
            }
        })
    }
}

export default new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    actions,
})
