module.exports = {
    devServer: {
        proxy: {
            '/api': { // 你前端访问时的路径前缀
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                pathRewrite: { '': '' }
            }
        }
    }
}
