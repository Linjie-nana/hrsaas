import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

import i18n from '@/i18n'
Vue.use(ElementUI, {
  // i18n 是一个属性, 可以传入一个函数, 自动获取到当前饿了么想要翻译的key
  // 只需要在这个函数中返回, 对应的文字即可
  i18n: (key) => i18n.t(key)
})

// 导入自定义指令
import { imageerror } from './directive'
Vue.directive('imageerror', imageerror)

// 用Vue.use架构实现第三方组件的引入模式
// 员工页的头部信息卡组件封装
import Components from '@/components'
Vue.use(Components)

// 引入打印工具
import Print from 'vue-print-nb'
Vue.use(Print)

// 导入全局过滤器 时间过滤
// import { formatDate } from '@/filters'
// Vue.filter('formatDate', formatDate)
// 导入全局过滤器，遍历全部过滤器
import * as filter from '@/filters'
for (var key in filter) {
  const filterName = key
  const filterFunction = filter[key]
  Vue.filter(filterName, filterFunction)
}

// 全局混入
import { checkPermissionMixin } from '@/mixin'
Vue.mixin(checkPermissionMixin)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
