import request from '@/utils/request'

export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
// 角色列表
export function getUserList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工接口
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 添加员工信息
export function addUser(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 批量导入接口
export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}

// 提交员工相应数据
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}

/** **
 * 获取用户的岗位信息
 *
 * ****/
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息
 * ****/
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
