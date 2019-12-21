const {override, fixBabelImports, addLessLoader,addWebpackAlias} = require('customize-cra');
const path = require('path')

module.exports = override(
    // 配置路径别名
    addWebpackAlias({
        components: path.resolve(__dirname, 'src/components'),
        api: path.resolve(__dirname, 'src/api'),
        containers: path.resolve(__dirname, 'src/containers'),
        assets: path.resolve(__dirname, 'src/assets'),
        utils: path.resolve(__dirname, 'src/utils'),
    }),
    fixBabelImports('import', {
        libraryName: "antd-mobile", style: true // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,//支持css文件中写入js
        modifyVars: {"@primary-color": "#1DA57A"}

    })
);