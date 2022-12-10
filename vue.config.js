const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       plugins: [
  //         require("postcss-px2rem")({
  //           remUnit: 170///设计图宽度/10
  //         })
  //       ]
  //     }
  //   }
  // },
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://101.37.246.72:9090',//服务器
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''//将url中起始的'/api'替换成''，比如将/api/getDeptList替换成/getDeptList
        }
      }
    }
  }

})
