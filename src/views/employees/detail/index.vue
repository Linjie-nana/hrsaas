<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="account">
            <el-row type="flex" justify="center" style="padding-right: 300px">
              <el-form label-width="100px">
                <el-form-item label="姓名">
                  <el-input />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">更新</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </el-row>
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
