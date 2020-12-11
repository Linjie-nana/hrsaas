import { setToken, getToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
import { Message } from 'element-ui'
export default {
  namespaced: true,
  state: {
    // 每次刷新后获取存在cookies中的数值
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      // 放入store中，但是不能持久
      state.token = data
      // 调用上面引入的setToken方法
      setToken(data)
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    removeToken(state) {
      removeToken()
      state.token = ''
    },
    removeUserInfo(state) {
      state.userInfo = ''
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
      // 登录将时间加入
      setTimeStamp()
    },
    // async getUserInfo(context, data) {
    //   // 与我上面自定义的getUserInfo异步方法一样了,注意不要搞混
    //   const result = await getUserInfo()
    //   context.commit('setUserInfo', result)
    // }

    async getUserInfo(context) {
      // 先发送请求得到用户id
      const dataUserInfo = await getUserInfo()
      // 将id放入请求获取用户详情
      const getUserDetail = await getUserDetailById(dataUserInfo.userId)
      // 将获取到的用户详情, 加入到userInfo中
      const userInfo = {
        ...dataUserInfo, ...getUserDetail
      }
      context.commit('setUserInfo', userInfo)
    },

    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    }
  }
}
