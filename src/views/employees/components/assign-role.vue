<template>
  <el-dialog title="编辑角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary">确认</el-button>
      <el-button>取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/settings'
export default {
  props: {
    //   判断弹出框状态
    showRoleDialog: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      // 渲染的数值
      list: [],
      //   勾选的数组
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      // 结构获得rows，放入list中遍历显示
      const { rows } = await getRoleList()
      this.list = rows
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 8px;
}
</style>
