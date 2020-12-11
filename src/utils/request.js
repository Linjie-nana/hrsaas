
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimesStamp } from './auth'
import router from '@/router'

// 失效时间设置为7200s
const timeout = 7200

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  tiemout: 5000
})
// 拦截器全局注入 token
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (isTimeOut()) {
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token超时'))
    } else {
      // 在请求信息中加入token
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
  }
  return config
})

service.interceptors.response.use(res => {
  // 成功请求后执行
  // 里面的sucess是返回后的函数
  const { message, success, data } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    // 实现真正的报错
    return Promise.reject(new Error(message))
  }
}, err => {
  // 由此得到token错误代码10002
  // 得到数据后，错误拦截，验证token错误码后进行操作
  console.dir(err)
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // 如果不是200的成功状态
  // 弹框
  Message.error(err.message)
  // 返回报错
  return Promise.reject(err.message)
})
export default service

// 设置一个方法，如果时间过了，就返回布尔值
function isTimeOut(params) {
  const now = Date.now()
  const savedTime = getTimesStamp()
  return (now - savedTime) / 1000 >= timeout
}
