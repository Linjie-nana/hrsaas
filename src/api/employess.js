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
// 添加员工信息
export function addUser(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 批量导入接口
export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

// 获取用户相应数据
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
