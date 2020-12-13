import request from '@/utils/request'
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
