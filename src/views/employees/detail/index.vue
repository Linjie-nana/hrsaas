<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="account">
            666
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="detail">
            777
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job">
            888
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'account'
    }
  }
}
</script>

<style>
</style>
