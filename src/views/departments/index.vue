<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->

        <!-- 如果是is-root是true,则就是判断是头部，就不显示删除等操作 -->
        <TreeTools :data="company" :is-root="true" @addDepts="addDepts" />
        <hr>
        <!-- 以下是树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 这里是插槽, 每个树形节点都会渲染出一行 -->
          <!-- 利用作用域插槽的方式, 获取内部的每个节点数据 -->
          <!-- 拿到了 scope 以后,当前节点的数据就在 scope.data 当中 -->
          <TreeTools slot-scope="{data}" :data="data" @addDepts="addDepts" />
        </el-tree>
      </el-card>
    </div>

    <!-- 将showDialog的状态传到弹框子件中 -->
    <AddDepts
      :show-dialog="showDialog"
    />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { department } from '@/api/company'
import { converTree } from '@/utils/auth'
import AddDepts from './components/add-dept'
export default {
  components: {
    TreeTools,
    AddDepts
  },

  data() {
    return {
      // 本来组织结构的数据应该从服务器获取,
      // 但是现在先不管, 写死数据作为测试
      departs: [

      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        // name: '临街77科技股份有限公司',
        manager: '负责人'
      },

      // 这里存储当前点击到的对应栏目的信息
      // 因为是在子组件中点击的，通过emit传到了组件
      node: null,

      // 控制新增弹框弹出的控制变量
      showDialog: false
    }
  },
  async created() {
    const result = await department()
    this.departs = converTree(result.depts, '')
    this.company = {
      name: result.companyName
    }
  },

  methods: {
    addDepts(node) {
      this.node = node
      console.log(node)
      this.showDialog = true
    }
  }

}
</script>

  <style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
  </style>
