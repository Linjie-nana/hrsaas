import { asyncRoutes, constantRoutes } from '@/router'
const state = {
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}
const actions = {
  filterRoutes(context, roles) {
    const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > 1)
    console.log(myRoutes)
    myRoutes.push(
      // 在动态路由后面放入404判定
      { path: '*', redirect: '/404', hidden: true })
    // 调用mutattion 处理筛选后的动态路由
    context.commit('setRoutes', myRoutes)
    return myRoutes
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

