<template>
  <!-- 新增部门的弹层 -->
  <!-- 通过visible后面的Booblean值判断是否弹出 -->
  <!-- 这里的叉叉点击关闭动作 -->
  <el-dialog :title="title" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <!-- ref="form" 定位表格,为全局校验做准备 -->
    <el-form ref="form" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <!-- 聚焦调用请求获取员工数据 -->
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option
            v-for="item in people"
            :key=" item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>

    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { department, addDepartments, getDepartmentDetails, editDepartmnets } from '@/api/company'
import { getEmployeeSimple } from '@/api/employess'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 主页传过来的当前点击的数据
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    // 自定义校验规则
    const validateDeptsName = (rule, value, callback) => {
      department().then(data => {
        // 拿到全部的部门数据
        const { depts } = data
        // 如果当前用户输入的名字, 在后台传回的数组中存在,
        // 并且这个存在同名的部门, pid 还要等于父部门的 id (data.id)
        // 应该报错
        if (this.formData.id) {
          depts.some((item) => item.id !== this.formData.id && item.name === value && item.pid === this.data.id)
            ? callback(new Error('同一个部门下不能重名'))
            : callback()
        } else {
          // 新增
          console.log(this.data.name === value)
          depts.some((item) => this.data.name === value || item.name === value && item.pid === this.data.id)
            ? callback(new Error('同一个部门下不能重名'))
            : callback()
        }
      })
    }
    const validateDeptsCode = (rule, value, callback) => {
      department().then(data => {
        const { depts } = data
        if (this.formData.id) {
          depts.some(item => item.id !== this.formData.id && item.code === value)
            ? callback(new Error('不能重复部门序号'))
            : callback()
        } else {
          // 拿到全部的部门数据
          // 如果重复了序号
          // 应该报错
          depts.some(item => item.code === value)
            ? callback(new Error('不能重复部门序号'))
            : callback()
        }
      })
    }
    return {
      // 获取的员工列表
      people: [],
      // 获得要上传的数据
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validateDeptsName }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: validateDeptsCode }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '介绍要求1-300个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  methods: {
    async getEmployeeSimple() {
      this.people = await getEmployeeSimple()
    },
    async btnOk() {
      try {
        console.log('点击了确认')
        const isValid = await this.$refs.form.validate()
        if (isValid) {
          console.log('校验通过, 可以发送请求了')
          // 将最终得到的data数据发送给服务器
          // 这里需要进行判断，如果this.fromData中有id，就是进行编辑，如果没有，则是新增数据
          if (this.formData.id) {
            // 调用修改方法
            const res = await editDepartmnets(this.formData)
            console.log(res)
          } else {
            const data = { ...this.formData, pid: this.data.id }
            console.log(data)
            await addDepartments(data)
            console.log('新结果')
          }
          this.$emit('update:showDialog', false)
          this.$emit('loadPage')
        }
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      //  用饿了么组件封装好的函数对表单进行重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.form.resetFields()
      this.$emit('update:showDialog', false)
    },
    async getDepartmentDetails() {
      const result = await getDepartmentDetails(this.data.id)
      console.log(result, 11111111111)
      this.formData = result
    }
  }
}
</script>

<style>

</style>
