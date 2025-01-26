const { defineConfig } = require('@vue/cli-service');


module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
        ignored: /node_modules/,
        interval: 300
      }
    },
    allowedHosts: 'all'  // 모든 호스트에서의 접근 허용
  }
}