import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 角色列表
export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工接口
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
