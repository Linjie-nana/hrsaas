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
          <TreeTools
            slot-scope="{data}"
            :data="data"
            @addDepts="addDepts"
            @delDepts="loadPage"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>

    <!-- 将showDialog的状态传到弹框子件中 -->
    <!-- 从弹窗组件传入到主页中的loadpage动作，使页面重新加载 -->
    <AddDepts
      ref="edit"
      :show-dialog.sync="showDialog"
      :data="node"
      @loadPage="loadPage"
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
        name: '临街77科技股份有限公司',
        manager: '负责人',
        id: ''
      },

      // 这里存储当前点击到的对应栏目的信息
      // 因为是在子组件中点击的，通过emit传到了组件
      node: {},

      // 控制新增弹框弹出的控制变量
      showDialog: false
    }
  },
  created() {
    this.loadPage()
  },

  methods: {
    loadPage() {
      department().then((res) => {
        const result = res
        this.departs = converTree(result.depts, '')
      })
    // this.company = {
    //   name: result.companyName
    // }
    },
    addDepts(node) {
      this.node = node
      this.showDialog = true
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      // 如果改变了showDialog，那么就直接弹出框了，这样数据就来不及渲染出来，所以需要nextTick
      this.$nextTick(() => {
        this.$refs.edit.getDepartmentDetails()
      })
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
