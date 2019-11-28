import { fetchJsonp, fetchPost } from "./jsonpFetch"

export default {
    // get-示例
    testGet: data => fetchJsonp("/get/test", data, {
        timeout: 1000,
        mockDomain: "yapi.qiyingfu.com/mock/153",
    }),
    // post-示例
    testPost: (data, cb) => fetchPost("/post/test", data, cb),

    // wms
    getWms: data => fetchJsonp("/wmsGet/jsonp", data, {}),

    // WmsMulti
    getWmsMulti: data => fetchJsonp("/wmsMutli/jsonp", data, {}),

    // 获取验证码
    getVerifyCode: data => fetchJsonp("/api/company/getVerifyCode", data, {}),

    // 登录
    login: data => fetchJsonp("/api/company/login", data, {}),

    // 注销登录
    logout: data => fetchJsonp("/api/company/logout", data, {}),

    // 获取企业基本信息
    getCompanyInfo: data => fetchJsonp("/api/company/info", data, {}),

    // 获取项目列表
    getProjectList: data => fetchJsonp("/api/project/list", data, {}),

    // 获取项目详情
    getProjectDetail: data => fetchJsonp("/api/project/detail", data, {}),

    // 获取项目名称列表
    getProjectNames: data => fetchJsonp("/api/project/nameList", data, {}),

    // 项目成员列表
    getMemberList: data => fetchJsonp("/api/member/list", data, {}),

    // 项目开工状态
    getWorkStatus: data => fetchJsonp("/api/member/workStatus", data, {}),

    // 成员导入开工
    memberImport: (data, cb) => fetchPost("/api/member/import", data, cb),

    // 成员数据导出
    memberExport: data => fetchJsonp("/api/member/download", data, {}),

    // 取消签约、解除协议
    memberSetStatus: data => fetchJsonp("/api/member/setWorkStatus", data, {}),

    // 重发短信
    sendMsg: data => fetchJsonp("/api/member/sendMsg", data, {}),

    // 获取佣金列表
    getTaskList: data => fetchJsonp("/api/task/list", data, {}),

    // 获取佣金批次记录
    getTaskRecord: data => fetchJsonp("/api/task/recordList", data, {}),

    // 获取佣金统计
    getCommissionStat: data => fetchJsonp("/api/project/statistics", data, {}),

    // 佣金任务作废
    taskCancel: data => fetchJsonp("/api/task/cancel", data, {}),

    // 创建佣金任务
    taskCreate: (data, cb) => fetchPost("/api/task/completeCheck", data, cb),

    // 检查佣金发放文件数据是否有异常或存在风险
    taskDataCheck: data => fetchJsonp("/api/task/dataCheck", data, {}),

    // 验证佣金发放文件中人员身份
    taskIdentityCheck: data => fetchJsonp("/api/task/identityCheck", data, {}),

    // 获取发佣进度信息
    getTaskDetail: data => fetchJsonp("/api/task/detail", data, {}),

    // 发佣电签
    taskESign: data => fetchJsonp("/api/task/eSign", data, {}),

    // 获取账户资金流水列表
    getAccountList: data => fetchJsonp("/api/company/accountList", data, {}),
}
