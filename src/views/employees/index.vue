<template>
  <div class="dashboard-container">
    <div class="app-container">

      <PageTools :show-before="true">
        <span slot="before">{{ pageSetting.total }}条信息</span>
        <span slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </span>
      </PageTools>

      <el-card>
        <el-table :data="list" border label="序号">
          <el-table-column>
            <template slot-scope="{ $index }">{{ (pageSetting.page-1)*pageSetting.size + 1 + $index }}</template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" prop="formOfEmployment" sortable="" :formatter="formatEmployment" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" />
          <el-table-column label="账户状态" prop="enableState" sortable="" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height: 60px;">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageSetting.total"
            :page-size="pageSetting.size"
            :page-sizes="[2,5,10,20,50]"
            @current-change="currentChange"
            @size-change="sizeChange"
          />
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserList } from '@/api/employess'
import EmployeeEnum from '@/api/constant/employees'
export default {
  data() {
    return {
      list: [
        { name: '王大锤' },
        { name: '陈翠花' },
        { name: 'Tom' },
        { name: 'Jerry' }
      ],
      pageSetting: {
        page: 1,
        size: 5,
        total: 0
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { rows, total } = await getUserList(this.pageSetting)
      this.pageSetting.total = total
      this.list = rows
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getUserList()
    },
    sizeChange(newSize) {
      this.pageSetting.size = newSize
      this.getUserList()
    },
    // 格式化聘用显示
    formatEmployment(row, column, cellValue, index) {
      // 调用枚举对应对象，根据编辑的目标对象cellValue进行比较再返回
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      // 防御性编程，如过得到的对象不存在，就显示为不存在。
      return obj ? obj.value : '不存在'
    }
  }

}
</script>

  <style>
</style>
