<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disable: disableUpload}"
      class="uploader"
      :on-remove="handleRemove"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 进度条 -->
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
// 这里开始需要使用腾讯云上传图片
// 1. 引入腾讯云的 api 库
import COS from 'cos-js-sdk-v5'
// 封装一个私有的配置文件, 让 git 忽略
import { cloudConfig } from '@/privateConfig'
// 2. 创建腾讯云的实例
const cos = new COS({ ...cloudConfig })
export default {
  data() {
    return {
      showDialog: false,
      // 图片数组里面的每个对象都是一张图片, 最重要的属性就是 url
      fileList: [],
      imgUrl: '',
      currentUid: '',
      percent: 0,
      showPercent: false
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
    },
    // 删除
    handleRemove(file, fileList) {
      // 第二个参数其实就是删除后的文件列表
      // 直接覆盖当前数组即可
      this.fileList = [...fileList]
    },
    // 改变的时候的动作
    handleChange(file, fileList) {
      this.fileList = [...fileList]
    },
    // 在上传图片前需要校验图片的大小和文件种类
    beforeUpload(file) {
      // 在这个地方可以在上传前验证图片
      // 1. 格式
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (types.indexOf(file.type) === -1) {
        this.$message.error('图片只接受 jpeg, png, gif 和 bmp 类型')
        return false
      }
      // 2. 大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过 2M')
        return false
      }
      // 最后如果没有任何问题, 请记得 return true 放行

      // 上传之前, 记录当前被上传的图片 uid
      // 准备上传后替换 url
      this.currentUid = file.uid
      // 显示进度条
      this.showPercent = true

      return true
    },
    // 拦截上传，查看上传的图片数据
    upload(params) {
      // 这里是说覆盖默认上传逻辑的地方
      // 可以接受一个参数, 就是上传配置对象
      // 其中最重要其实是 params.file 文件本身
      console.log(params.file)

      // 腾讯云上传操作
      cos.putObject({
        Bucket: 'linjie77-1304560103', /* 必须 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: params.file.name, /* 必须 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象

        // 获得进度条百分比
        onProgress: (progressData) => {
          // 正在进行中的回调, 每次都可以拿到当前的进度
          console.log(JSON.stringify(progressData))
          this.percent = Math.ceil(progressData.percent * 100)
        }
      }, (err, data) => {
        // 判断上传成功
        if (!err && data.statusCode === 200) {
          // 将返回的图片地址, 覆盖到当前显示的本地图片中
          this.fileList = this.fileList.map(item => {
            // 查找当前上传的图片, 将它的 url 改掉
            if (item.uid === this.currentUid) {
              item.url = 'http://' + data.Location
            }
            return item
          })
          // 关闭进度条
          this.showPercent = false
          console.log(this.fileList)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.uploader {
  ::v-deep img {
    object-fit: cover;
  }
}
.disable {
  // /deep/ .el-upload--picture-card {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>

