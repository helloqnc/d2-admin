const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VueFilenameInjector = require('./tools/vue-filename-injector')

// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  lintOnSave: true,
  outputDir: 'dist', // build的路径
  devServer: {
    publicPath: process.env.VUE_APP_PUBLIC_PATH, // 和 publicPath 保持一致
    port: 5000,
    proxy: {
      '/': {
        target: process.env.VUE_APP_SERVER,
        ws: false,
        changeOrigin: true
        // pathRewrite: {
        //   '^/': ''
        // }
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`
      }
    }
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    config
    // 开发环境
      .when(process.env.NODE_ENV === 'development',
      // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
    // TRAVIS 构建 vue-loader 添加 filename
      .when(process.env.VUE_APP_BUILD_MODE === 'TRAVIS' || process.env.NODE_ENV === 'development',
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // 非开发环境
      .when(process.env.NODE_ENV !== 'development', config => {
        config.optimization
          .minimizer([
            new UglifyJsPlugin({
              uglifyOptions: {
                // 移除 console
                // 其它优化选项 https://segmentfault.com/a/1190000010874406
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ['console.log']
                }
              }
            })
          ])
      })
    // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@api', resolve('src/api'))
    // 判断环境加入模拟数据
    const entry = config.entry('app')
    if (process.env.VUE_APP_BUILD_MODE !== 'nomock') {
      entry
        .add('@/mock')
        .end()
    }
  }
}
