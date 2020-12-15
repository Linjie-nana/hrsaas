<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加听不切换栏 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane name="role" label="角色管理">
            <!-- 角色管理 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-col>
                <el-button size="small" type="primary">新增角色</el-button>
              </el-col>
            </el-row>
            <el-table :data="roleList" style="width: 100%">
              <!-- <el-table-column prop="date" label="序号" /> -->
              <el-table-column label="序号">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                编辑角色 | 删除角色
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px;">
              <!-- 页面插件 -->
              <el-pagination
                layout="prev, pager, next"
                :total="pageSetting.total"
              />
            </el-row>
          </el-tab-pane>
          <!-- 角色管理 -->
          <el-tab-pane name="company" label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 2,
        total: 0
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageSetting)
      this.roleList = rows
      this.pageSetting.total = total
    }
  }
}
</script>

  <style>

  </style>
