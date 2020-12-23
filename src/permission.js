import router from '@/router'
import store from '@/store'
// 引入动态路由列表
import { asyncRoutes } from '@/router'
// 添加进度条
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式
// 白名单
const whiteList = ['/login', '/404']
// 逻辑 设置白名单，如果store中有token ,而且去的是登录页，则将登录页直接转跳到主页
// 有token去别的地方，则直接放行
router.beforeEach(async(to, from, next) => {
  // 进度条开启
  NProgress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 如果没有userId则不会发送数据请求
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        console.log('菜单权限：', roles.menus)
        console.log('所有配置路由', asyncRoutes)
        const myRoutes = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > 1)
        console.log(myRoutes)
        myRoutes.push(
          // 在动态路由后面放入404判定
          { path: '*', redirect: '/404', hidden: true }
        )
        router.addRoutes(myRoutes)
        next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 如果没有token,则判断有没有白名单，如果有白名单就放行
    // 如果没有白名单，就转跳到登录页
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  // 解决手动切换地址，进度条不关闭的问题
  NProgress.done()
})
// 后置守卫
router.afterEach(function() {
  // 关闭进度条
  NProgress.done()
})
