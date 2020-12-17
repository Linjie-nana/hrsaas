// 创建一个全局组件
import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    // 注册导入excel组件
    Vue.component('UploadExcel', UploadExcel)
  }
}
