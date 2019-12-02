import { httpGet, httpPost } from './http'

//获取职位列表
export const getJobsList = (params = {}) => httpGet({ url: '/api/serve/jobs', params })

//获取公司列表
export const getCompanyList = (params = {}) => httpGet({ url: '/api/serve/companyList', params })

//获取宣讲会列表
export const getPreachList = (params = {}) => httpGet({ url: '/api/serve/preach', params })

//获取职位详情
export const getJobDetails = (params = {}) => httpGet ({ url: '/api/serve/jobDetails', params})



export const save = (data) => {
  return httpPost({
    url: 'apps/wechat/api/save_member',
    data
  })
}