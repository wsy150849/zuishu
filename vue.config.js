module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: 'http://api.zhuishushenqi.com',
                changeOrigin: true,
                pathRewrite: { "^/api": "" }
            },
            '/chapter': {
                target: 'http://chapter2.zhuishushenqi.com/chapter',//设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/chapter': ''
                }
            }
        }
    }
}
