<template>
  <div>
    <el-upload action="#" list-type="picture-card" :on-preview="preview" :file-list="fileList" :class="{disable: disableUpload}">
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      // 图片数组里面的每个对象都是一张图片, 最重要的属性就是 url
      fileList: [
        {
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608375246691&di=a35d6a6212159f60d18a8396d1ec8e20&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F36%2F15%2F5b8dd7ac4164e_610.jpg'
        }
      ],
      imgUrl: ''
    }
  },
  computed: {
    disableUpload() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.showDialog = true
      console.log(file)
      // 这里绑定了点击放大镜的事件,
      // 我们需要主动弹出一个窗口
      this.imgUrl = file.url
    }
  }
}
</script>

<style lang="scss" scoped>
.disable {
  // /deep/ .el-upload--picture-card {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>

