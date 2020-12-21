<template>
  <el-dialog title="编辑角色" :visible="showRoleDialog" @close="btnCancel">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-button type="primary" @click="btnOk">确认</el-button>
      <el-button @click="btnCancel">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
// 引入获取角色详细数据
import { getUserDetailById } from '@/api/user'
// 映入发送编辑角色请求
import { assignRoles } from '@/api/employess'
export default {
  props: {
    //   判断弹出框状态
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
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
    },

    // 读取角色详细数据方法方法
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      //   被选择的角色权限直接赋值回显
      this.roleIds = roleIds
    },
    // 确定发送按钮
    async btnOk() {
      await assignRoles({ roleIds: this.roleIds, id: this.userId })
      this.$message.success('修改成功')
      // update 子项父传递后直接改变其变量，和sync配合
      this.$emit('update:showRoleDialog', false)
    },
    // 取消按钮
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin: 8px;
}
</style>
