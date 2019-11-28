import {
    getBreadCrumbList,
    getHomeRoute,
} from "../page/main/util"
import config from "../plugins/config"
const { homeName } = config

export default {
    showLoading(state, flag){
        state.isLoading = flag
    },
    setCompanyInfo(state, info){
        state.companyInfo = info
    },
    setBreadCrumb (state, route) {
        state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
        state.homeRoute = getHomeRoute(routes, homeName)
    }
}
