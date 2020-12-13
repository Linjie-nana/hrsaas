import request from '@/utils/request'
export function department() {
  return request({
    url: '/company/department'
  })
}
