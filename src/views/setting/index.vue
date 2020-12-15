<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 添加听不切换栏 -->
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane name="role" label="角色管理">
            <!-- 角色管理 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <el-col>
                <el-button size="small" type="primary">新增角色</el-button>
              </el-col>
            </el-row>
            <el-table :data="roleList" style="width: 100%">
              <!-- <el-table-column prop="date" label="序号" /> -->
              <el-table-column label="序号">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <!-- 插槽导入按钮 -->
                <template slot-scope="scope">
                  <!-- {{ scope.row }} -->
                  <el-button type="text" @click="editRole(scope.row.id)">编辑角色</el-button>
                  <el-button type="text" @click="delRole(scope.row.id)">删除角色</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row type="flex" justify="end" align="middle" style="height: 60px;">
              <!-- 翻页面插件 -->
              <!-- total：有多少条数据  -->
              <!-- page-size:每页显示的数量 -->
              <!-- size-change： page-size改变后发送请求重新获取数据 -->
              <!-- current-change改变当前页数量，方法是重新发送一次函数获取新页面 -->
              <el-pagination
                layout="prev, pager,next, sizes,jumper"
                :total="pageSetting.total"
                :page-size="pageSetting.pagesize"
                :page-sizes="[2,5,10]"
                @current-change="currentChange"
                @size-change="sizeChange"
              />
            </el-row>
          </el-tab-pane>
          <!-- 角色管理 -->
          <el-tab-pane name="company" label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :show-icon="true"
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input v-model="companyDetail.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyDetail.companyAddress" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司电话">
                <el-input v-model="companyDetail.companyPhone" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyDetail.mailbox" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyDetail.remarks" disabled style="width: 400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 这里是弹框编辑角色 -->
      <el-dialog title="新增角色" :visible.sync="showDialog" width="50%">
        <el-form ref="roleForm" label-width="80px" :model="roleFormData" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleFormData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleFormData.description" />
          </el-form-item>
        </el-form>

        <template slot="footer">
          <el-button>取消</el-button>
          <el-button type="primary" @click="btnOk">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyDetail,
  delRole,
  getRoleDetail,
  updateRole
} from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 弹框状态
      showDialog: false,
      // 弹框数据
      roleFormData: {
        name: '',
        description: ''
      },
      // 验证规则
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 12, message: '2-12个字符之间', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' },
          { min: 5, max: 100, message: '2-100字符之间', trigger: 'blur' }
        ]
      },

      activeName: 'role',

      // 角色数据列表
      roleList: [],
      // 获取数据时提交的参数
      pageSetting: {
        page: 1,
        pagesize: 2,
        total: 0
      },
      // 公司参数
      companyDetail: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  watch: {
    // 1. 别的页面跳进来 id 不变
    // 2. 当前页面刷新, id 会从五到有
    companyId: {
      handler() {
        // 判断当前的 companyId 是否存在
        // 如果在则发请求
        if (this.companyId) {
          this.getCompanyDetail()
        }
      },
      // 本来watch 是要数据发生变化时才会触发
      // 我希望页面一进来不管数据会不会变都会触发
      immediate: true
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取角色列表的
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageSetting)
      this.roleList = rows
      this.pageSetting.total = total
      console.log(this.roleList)
    },
    currentChange(newPage) {
      this.pageSetting.page = newPage
      this.getRoleList()
    },
    sizeChange(newPagesiez) {
      this.pageSetting.pagesize = newPagesiez
      this.getRoleList()
    },

    // 删除角色
    async delRole(id) {
      try {
        await this.$confirm('删除角色？')
        await delRole(id)
        // 重加载
        this.getRoleList()
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    async editRole(data) {
      const result = await getRoleDetail(data)
      // this.roleFormData.name = name
      // this.roleFormData.description = description
      // console.log(result)
      this.roleFormData = result

      this.showDialog = true
    },

    // 公司请求
    async getCompanyDetail() {
      const data = await getCompanyDetail(this.companyId)
      console.log(data)
      this.companyDetail = data
    },

    async btnOk() {
      try {
        const isValid = await this.$refs.roleForm.validate()
        if (isValid) {
          await updateRole(this.roleFormData)
          this.$message.success('修改成功')
          // 顺便关闭窗口
          this.showDialog = false
          // 重加载数据
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

  <style>
</style>
