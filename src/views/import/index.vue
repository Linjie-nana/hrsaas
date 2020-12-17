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
        const value = item[key]
        data[newKey] = value
      }
      return data
    }
  }

}
</script>

<style>

</style>
