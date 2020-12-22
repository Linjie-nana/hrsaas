<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template slot="after">
          <el-button type="primary">新增权限</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table border :data="permissionList" row-key="id" :default-expand-all="true">
          <el-table-column label="权限名称" prop="name" width="160px" />
          <el-table-column align="center" label="权限标识" prop="code" />
          <el-table-column align="center" label="权限描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template>
              <el-button type="text">添加</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </div>
  </div>
</template>

<script>
import { converTree } from '@/utils/auth'
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      console.log(res)
      this.permissionList = converTree(res, '0')
    }
  }
}
</script>

  <style>

  </style>
