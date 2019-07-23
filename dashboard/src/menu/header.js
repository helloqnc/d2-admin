// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '系统设置',
    icon: 'gear',
    children: [
      { path: '/setting/employeeGroup', title: '管理员组' },
      { path: '/employee', title: '管理员' }
    ]
  }
]
