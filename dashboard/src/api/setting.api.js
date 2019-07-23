import request from '@/plugin/axios'

export function ApiIndex (params) {
  return request({
    url: '/api/index',
    method: 'get',
    params
  })
}
export function ApiPagination (params) {
  return request({
    url: '/api/pagination',
    method: 'get',
    params
  })
}
export function ApiAdd (params) {
  return request({
    url: '/api/add',
    method: 'post',
    params
  })
}
export function ApiEdit (params) {
  return request({
    url: '/api/edit',
    method: 'post',
    params
  })
}
export function ApiDel (params) {
  return request({
    url: '/api/del',
    method: 'post',
    params
  })
}
