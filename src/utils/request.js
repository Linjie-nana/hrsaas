
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  tiemout: 5000
})
// 拦截器全局注入 token
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 在请求信息中加入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
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
  // 如果不是200的成功状态
  Message.error(err.message)
  return Promise.reject(err.message)
})
export default service
