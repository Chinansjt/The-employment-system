// 此文件运营后台用不到
let node_env = process.env.VUE_APP_ENV
let deployUrl = "", sid = "", cid = ""

switch(node_env){
    case "pro":
        deployUrl = "company.kingmogu.com"
        sid = "500699151"
        cid = "500699152"
        break
    case "pre":
        deployUrl = "precompany.kingmogu.com"
        sid = "500674343"
        cid = "500674348"
        break
    default:
        deployUrl = ""
        sid = "500674343"
        cid = "500674348"
        break
}

export default {
    title: "金蘑菇",
    deployUrl: deployUrl,
    // 腾讯埋点参数
    mtaParams: {
        sid: sid,
        cid: cid
    },
    // 默认打开的首页的路由name值，默认为home
    homeName: "home",
}
