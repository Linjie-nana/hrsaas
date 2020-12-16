import request from '@/utils/request'
// 获取公司信息
export function department() {
  return request({
    url: '/company/department'
  })
}
export function delDepartments(id) {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
export function addDepartments(data) {
  return request({
    method: 'post',
    url: '/company/department',
    data
  })
}

export function getDepartmentDetails(id) {
  return request({
    url: '/company/department/' + id
  })
}
// 这个提交修改请求
export function editDepartmnets(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}
