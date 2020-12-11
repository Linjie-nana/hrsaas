import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 设置一个时间key
const timekey = 'timestamp-key'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimesStamp() {
  return Cookies.get(timekey)
}

// 将当前时间加入到timeKey中
export function setTimeStamp() {
  Cookies.set(timekey, Date.now())
}

