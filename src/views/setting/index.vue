<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加听不切换栏 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane name="role" label="角色管理">
            角色管理内容
          </el-tab-pane>
          <el-tab-pane name="company" label="公司信息">
            公司信息内容
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
      activeName: 'role'
    }
  }
}
</script>

  <style>

  </style>
