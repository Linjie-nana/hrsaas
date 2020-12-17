<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="cloesBtn">
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in employees.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @focus="getDepartments"
        />
        <div v-if="treeData.length>0" class="bigbox">
          <el-tree
            :data="treeData"
            :props="{label: 'name'}"
            :default-expand-all="true"
            class="treeData"
            @node-click="selectNode"
          />
        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>

    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="cloesBtn">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
// 获取的公司部门数据
import { department } from '@/api/company'
// 导入数据后的构建树
import { converTree } from '@/utils/auth'
// 引入枚举以便遍历入职形式
import employees from '@/api/constant/employees'
// 引入新增用户方法
import { addUser } from '@/api/employess'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 部门树结构选项
      treeData: [],
      employees,
      // 提交的数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getDepartments() {
      const { depts } = await department()
      // 这里拿到的数据是扁平的, 需要递归处理成属性组件
      this.treeData = converTree(depts, '')
      this.loading = false
    },
    selectNode(data) {
      console.log(data)
      this.formData.departmentName = data.name
      this.treeData = []
    },
    cloesBtn() {
      this.$parent.showDialog = false
    },
    async btnOk() {
      try {
        const gogogo = await this.$refs.addEmployee.validate()
        if (gogogo) {
          await addUser(this.formData)
          this.$message.success('✌')
          this.$parent.getUserList()
          this.$parent.showDialog = false
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bigbox{
  position: absolute;
  z-index: 999;
   width: 300px;
   height: 200px;
   overflow: hidden;
   border: 1px solid #ccc;
   .treeData {
    overflow: scroll;
    width: 315px;
    height: 220px;
    }
}

</style>
