import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langEN from 'element-ui/lib/locale/lang/en'
import langCN from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

const messages = {
  // 对象中是语言的 key
  en: {
    // 里面是句子的key
    hello: 'hello',
    Dashboard: 'Dashboard',
    departments: 'departments',
    settings: 'settings',
    approvals: 'approvals',
    employees: 'employees',
    permissions: 'permission',
    attendances: 'attendances',
    salarys: 'salarys',
    social_securitys: 'social_securitys',
    ...langEN
  },
  cn: {
    hello: '你好',
    Dashboard: '首页',
    departments: '组织架构',
    settings: '公司设置',
    approvals: '审批',
    employees: '员工',
    permissions: '权限控制',
    attendances: '考勤',
    salarys: '工资',
    social_securitys: '社保',
    ...langCN

  }
}

export default new VueI18n({
  // locale 指定当前激活的默认语言
  // messages 指定字典
  locale: localStorage.getItem('i18n'),
  messages
})
