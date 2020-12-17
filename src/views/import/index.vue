<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { importEmployees } from '@/api/employess'
export default {
  methods: {
    async onSuccess({ header, results }) {
      // 这个函数是excel文件解析完毕之后触发的
      // 可以获取到表头, 可以获取到数据行
      console.log(header)
      console.log(results)

      // 创建模版
      const dictionary = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }

      const data = results.map(item => {
        return this.cnToEn(item, dictionary)
      })
      await importEmployees(data)
      console.log(data)
    },

    // 封装一个函数，将中文字段通过模版转换为英文
    cnToEn(item, dictionary) {
      const data = {}
      for (const key in item) {
        const newKey = dictionary[key]
        let value = item[key]
        // 正常的数据直接拿 value 即可,
        // 但是针对时间也就是入职和转正日期, 必须通过函数转换数据
        if (newKey === 'timeOfEntry' || newKey === 'correctionTime') {
          // 注意需要变为日期对象 才能入库
          const formatedDateStr = this.formatDate(value, '/')
          value = new Date(formatedDateStr)
        }
        data[newKey] = value
      }
      return data
    },
    // 专用于导入excel后时间处理
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }

}
</script>

<style>

</style>
