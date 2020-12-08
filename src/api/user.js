import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/api/sys/login',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}

