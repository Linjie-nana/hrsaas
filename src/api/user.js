import request from '@/utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getUserInfo() {
  return request({
    method: 'post',
    url: 'sys/profile'
  })
}

// 获取用户详情数据,得到头像照片
export function getUserDetailById(id) {
  return request({
    url: 'sys/user/' + id
  })
}

export function logout() {

}

