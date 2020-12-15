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
// 删除角色
export function delRole(roleId) {
  return request({
    url: '/sys/role/' + roleId,
    method: 'delete'
  })
}
// 获取角色详细数据
export function getRoleDetail(id) {
  return request({
    url: '/sys/role/' + id
  })
}
// 提交角色数据
export function updateRole(data) {
  return request({
    method: 'put',
    url: '/sys/role/' + data.id,
    data
  })
}
