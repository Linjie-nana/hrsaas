import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取公司信息
export function getCompanyDetail(campanyId) {
  return request({
    url: '/company/' + campanyId
  })
}
