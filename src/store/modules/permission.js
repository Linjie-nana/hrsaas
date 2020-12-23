import { asyncRoutes } from '@/router'
const state = {}
const mutations = {}
const actions = {
  filterRoutes(context, roles) {
    const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > 1)
    console.log(myRoutes)
    myRoutes.push(
      // 在动态路由后面放入404判定
      { path: '*', redirect: '/404', hidden: true }
    )
    return myRoutes
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

