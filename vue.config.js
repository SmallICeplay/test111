module.exports = {
    devServer: {
        proxy: {
            '/api': { // 你前端访问时的路径前缀
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                pathRewrite: { '': '' }
            }
        },
        port: 8081, // 你想要的端口号
        host: '0.0.0.0', // 如果需要外部访问
        open: true // 启动后自动打开浏览器
    }
}
