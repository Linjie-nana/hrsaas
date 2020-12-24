import store from '@/store'
export const checkPermissionMixin = {
  methods: {
    checkPermission(pointName) {
      // 拿到当前用户的信息(vuex)判断权限返回布尔值
      return store.state.user.userInfo.roles.points.indexOf(pointName) > -1
    }
  }
}
