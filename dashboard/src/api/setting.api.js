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
export function ApiEditById (params) {
  return request({
    url: '/api/editById',
    method: 'post',
    params
  })
}
export function ApiDelById (params) {
  return request({
    url: '/api/delById',
    method: 'post',
    params
  })
}
