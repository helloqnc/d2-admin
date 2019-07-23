import request from '@/plugin/axios'

export function EmployeeGroupList (params) {
  return request({
    url: '/employee_group/index',
    method: 'get',
    params
  })
}
export function EmployeeGroupAdd (params) {
  return request({
    url: '/employee_group/add',
    method: 'post',
    params
  })
}
export function EmployeeGroupEdit (params) {
  return request({
    url: '/employee_group/edit',
    method: 'post',
    params
  })
}
export function EmployeeGroupDel (params) {
  return request({
    url: '/employee_group/del',
    method: 'post',
    params
  })
}
