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
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="角色名" />
              <el-table-column prop="description" label="描述" />
              <el-table-column label="操作">
                <!-- 插槽导入按钮 -->
                <template slot-scope="scope">
                  <el-button type="text">
                    编辑角色
                  </el-button>
                  <el-button type="text" @click="delRole(scope.row.id)">
                    删除角色
                  </el-button>
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
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyDetail, delRole } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      activeName: 'role',
      roleList: [],
      pageSetting: {
        page: 1,
        pagesize: 2,
        total: 0
      },
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
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageSetting)
      this.roleList = rows
      this.pageSetting.total = total
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
    // 公司请求
    async getCompanyDetail() {
      const data = await getCompanyDetail(this.companyId)
      console.log(data)
      this.companyDetail = data
    }
  }
}
</script>

  <style>

  </style>
