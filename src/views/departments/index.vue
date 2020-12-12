<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        组织架构
      </h2>
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->

        <!-- 如果是is-root是true,则就是判断是头部，就不显示删除等操作 -->
        <TreeTools :data="company" :is-root="true" />
        <hr>
        <!-- 以下是树形结构 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 这里是插槽, 每个树形节点都会渲染出一行 -->
          <!-- 利用作用域插槽的方式, 获取内部的每个节点数据 -->
          <!-- 拿到了 scope 以后,当前节点的数据就在 scope.data 当中 -->
          <TreeTools slot-scope="{data}" :data="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      // 本来组织结构的数据应该从服务器获取,
      // 但是现在先不管, 写死数据作为测试
      departs: [
        {
          name: '总裁办',
          manager: '临街77',
          children: [
            {
              name: '董事会',
              manager: '林'
            }
          ]
        },
        {
          name: '行政部',
          manager: '林'
        },
        {
          name: '人事部',
          manager: '林'
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      company: {
        name: '临街77科技股份有限公司',
        manager: '负责人'
      }
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
