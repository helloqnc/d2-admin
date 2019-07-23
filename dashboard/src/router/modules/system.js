// 引入侧边栏
import layoutHeaderAside from '@/layout/header-aside'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/',
  name: 'system',
  meta,
  redirect: { name: 'index' },
  component: layoutHeaderAside,
  children: (pre => [
    // 首页
    {
      path: 'index',
      name: 'index',
      meta: {
        auth: true
      },
      component: _import('system/index')
    },
    // 系统 前端日志
    {
      path: 'log',
      name: 'log',
      meta: {
        title: '前端日志',
        auth: true
      },
      component: _import('system/log')
    }, // 刷新页面 必须保留
    {
      path: 'refresh',
      name: 'refresh',
      hidden: true,
      component: _import('system/function/refresh')
    },
    // 页面重定向 必须保留
    {
      path: 'redirect/:route*',
      name: 'redirect',
      hidden: true,
      component: _import('system/function/redirect')
    }
  ])('system-')
}
