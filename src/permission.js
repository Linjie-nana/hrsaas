import router from '@/router'
import store from '@/store'
// 白名单
const whiteList = ['/login', '/404']
// 逻辑 设置白名单，如果store中有token ,而且去的是登录页，则将登录页直接转跳到主页
// 有token去别的地方，则直接放行
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      return next('/')
    } else {
      return next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      return next()
    } else {
      return next('/login')
    }
  }
})
// 如果没有token,则判断有没有白名单，如果有白名单就放行
// 如果没有白名单，就转跳到登录页
