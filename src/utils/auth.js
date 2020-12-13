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

export function converTree(list, pid) {
  const arr = []
  list.forEach(item => {
    if (item.pid === pid) {
      //  嵌套循环
      const children = converTree(list, item.id)
      // 如果嵌套训话出来的里面还有内容，就将其加入到item
      if (children.length > 0) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
