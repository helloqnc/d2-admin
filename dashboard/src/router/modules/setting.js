// 引入侧边栏
import layoutHeaderAside from '@/layout/header-aside'
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = {
  auth: true
}

export default {
  path: '/setting',
  name: 'setting',
  meta,
  redirect: { name: 'index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'employeeGroup',
      name: `${pre}employeeGroup`,
      component: _import('setting/employeeGroup/index'),
      meta: {
        ...meta,
        title: '管理员组'
      }
    },
    {
      path: 'api',
      name: `${pre}api`,
      component: _import('setting/api/index'),
      meta: {
        ...meta,
        title: '接口管理'
      }
    }
  ])('setting-')
}
