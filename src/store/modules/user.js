import { setToken, getToken } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, data) {
      // 放入store中，但是不能持久
      state.token = data
      // 调用上面引入的setToken方法
      setToken(data)
    }
  },
  actions: {}
}
