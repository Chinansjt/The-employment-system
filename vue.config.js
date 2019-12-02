const path = require("path")

const resolve = dir => {
    return path.join(__dirname, dir)
}

// 项目部署基础
const BASE_URL = (process.env.VUE_APP_ENV === "pro" || process.env.VUE_APP_ENV === "pre") ? process.env.VUE_APP_BASE_URL : "/"

module.exports = {
    publicPath: BASE_URL,
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("_c", resolve("src/components"))
        config.module
            .rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/)
            .use("url-loader")
            .loader("url-loader")
            .options({
                limit: 100000,
                name: "fonts/[name].[hash:7].[ext]",
                publicPath: '../../'
            })
            .end()
    },
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: false, // 开启 CSS source maps?
		modules: false, // 启用 CSS modules for all css / pre-processor files.
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },

    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    outputDir: process.env.VUE_APP_ENV === "pro" ? "dist/vue-company-kmg/vue-dist": "dist/vue-company-kmg-pre/vue-dist", // 输出文件目录
    // webpack-dev-server 相关配置
	devServer: {
		open: false,
		host: "0.0.0.0",
		port: 9090,
		https: false,
		hotOnly: false,
        before: app => { },
        proxy: {
            '/proxyApi': {
              target: 'http://yapi.demo.qunar.com/mock/48066',
              changeOrigin: true,
              pathRewrite: {
                '/proxyApi': '/'
              }
            }
          }
      
    
    },
}
