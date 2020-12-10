import { setToken, getToken } from '@/utils/auth'
import { login } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    // 每次刷新后获取存在cookies中的数值
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
  actions: {
    // data是从login/index页面传值过来的。context是这个域里面的内容
    async login(context, data) {
      // then被拦截器解析后，token直接返回的是data
      const result = await login(data)
      Message.success('登录成功')
      // 通过context,调用mutations中的setToken
      context.commit('setToken', result)
    }
  }
}
