// 创建一个全局组件
import PageTools from '@/components/PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import TagsView from '@/components/TagsView'

export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    // 注册导入excel组件
    Vue.component('UploadExcel', UploadExcel)
    // 注册图片上传
    Vue.component('ImageUpload', ImageUpload)
    // tags标签
    Vue.component('TagsView', TagsView)
  }
}
