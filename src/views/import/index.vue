<template>
  <div>
    <UploadExcel :on-success="onSuccess" />
  </div>
</template>

<script>
export default {
  methods: {
    onSuccess({ header, results }) {
      // 这个函数是excel文件解析完毕之后触发的
      // 可以获取到表头, 可以获取到数据行
      console.log(header)
      console.log(results)
    }
  }
}
</script>

<style>

</style>
