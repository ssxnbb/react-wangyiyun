const path = require('path')
const CracoLessPlugin = require('craco-less')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [{
    plugin: CracoLessPlugin,
    //这个options选项是antd这个css的配置
    options: {
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true
    }
  }
}

   }],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
