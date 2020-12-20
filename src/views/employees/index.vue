<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-before="true">
        <span slot="before">{{ pageSetting.total }}条信息</span>
        <span slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import?type=employee')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = !showDialog">新增员工</el-button>
        </span>
      </PageTools>

      <el-card>
        <el-table :data="list" border label="序号">
          <el-table-column>
            <template
              slot-scope="{ $index }"
            >{{ (pageSetting.page-1)*pageSetting.size + 1 + $index }}</template>
          </el-table-column>
          <el-table-column label="姓名" prop="username" sortable />
          <el-table-column label="姓名" prop="username" sortable>
            <template slot-scope="{row}">
              <!-- 判断如果有图片存在就触发点击事件，如果没有就一直关闭弹窗 -->
              <img v-imageerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" alt="" style="border-radius: 50%; width: 100px; height: 100px; padding: 10px" @click="row.staffPhoto?popCode(row.staffPhoto):showCodeDialog=false">
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable
            :formatter="formatEmployment"
          />
          <el-table-column label="部门" prop="departmentName" sortable />
          <el-table-column label="入职时间" sortable>
            <template slot-scope="{row}">{{ row.timeOfEntry | formatDate }}</template>
          </el-table-column>

          <el-table-column label="账户状态" sortable align="center">
            <template slot-scope="{row}">
              <el-switch :value="row.enableState===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
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
    <addEmployee :show-dialog="showDialog" />
    <el-dialog title="二维码" :visible.sync="showCodeDialog" @opened="showQRcode">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, delEmployee } from '@/api/employess'
import addEmployee from './components/add-employee'
import EmployeeEnum from '@/api/constant/employees'
// 导入管道方法和枚举
import { formatDate } from '@/filters'
import employeesEnum from '@/api/constant/employees'
import QRcode from 'qrcode'
export default {
  components: {
    addEmployee
  },
  data() {
    return {
      showCodeDialog: false,
      list: [],
      pageSetting: {
        page: 1,
        size: 5,
        total: 0
      },
      showDialog: false,
      imgUrl: ''
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 点击图片操作弹出二维码
    popCode(url) {
      this.imgUrl = url
      this.showCodeDialog = true
    },
    async exportData() {
      // 准备导出 excel 文件
      const excel = await import('@/vendor/Export2Excel')
      // excel.export_json_to_excel({
      //   header: tHeader, // 表头 必填
      //   data, // 具体数据 必填
      //   filename: 'excel-list', // 非必填
      //   autoWidth: true, // 非必填
      //   bookType: 'xlsx' // 非必填
      // })
      console.log(excel)
      // 导出枚举
      const headersEnum = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }

      // 导出的数据需要header表头和data数据
      const header = Object.keys(headersEnum)
      // ["姓名", "手机号", "入职日期", "聘用形式", "转正日期", "工号", "部门"]
      console.log(header)

      // 这个是获取全部数据的操作
      const pageSetting = {
        page: 1,
        size: this.pageSetting.total
      }

      // 用引入的原 api 接口发送请求
      const { rows } = await getUserList(pageSetting)
      console.log(rows)

      // 获取到header和rows后像结合
      const data = rows.map((item) => {
        // 这里是遍历拿到的所有数据, 每个员工都是对象
        // 需要转换为数组
        const newItem = this.obj2Array(item, headersEnum)
        return newItem
      })
      console.log(data)

      excel.export_json_to_excel({
        header,
        data
      })
    },
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
      const obj = EmployeeEnum.hireType.find((item) => item.id === cellValue)
      // 防御性编程，如过得到的对象不存在，就显示为不存在。
      return obj ? obj.value : '不存在'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除')
        await delEmployee(id)
        await this.getUserList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 导出：获得原数据后进行和表头结合的方法
    obj2Array(item, dictionary) {
      // console.log('原数据')
      // console.log(item)

      const array = []
      // console.log(item)
      for (const key in dictionary) {
        // console.log(key)
        const enKey = dictionary[key]
        let value = item[enKey]
        // 之前的转换, 直接将 value 放了出去
        // 如果数据处理的是事件或者聘用形式, 需要额外处理
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          value = formatDate(value)
        }
        // 如果是聘用形式的数据. 去全局枚举中找到对应的值替换回来
        if (enKey === 'formOfEmployment') {
          const obj = employeesEnum.hireType.find((item) => item.id === value)
          value = obj ? obj.value : '不确定的临时工'
        }
        array.push(value)
      }

      // console.log('转换后')
      // console.log(array)
      return array
    },

    // 二维码转换
    showQRcode() {
      // 转换并显示二维码
      QRcode.toCanvas(this.$refs.myCanvas, this.imgUrl)
    }
  }
}
</script>

  <style>
</style>
