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
  },


    // Webpack 설정 커스터마이징 네이버 지도용 env활용 기본으로 vue에 있어서 도커 수정불필요
    chainWebpack: (config) => {
      config.plugin('html').tap((args) => {
        // HtmlWebpackPlugin에 templateParameters 지정
        args[0].templateParameters = {
          BASE_URL: './',
          VUE_APP_NAVER_CLIENT_ID: process.env.VUE_APP_NAVER_CLIENT_ID,
          // 필요한 다른 환경 변수도 추가 가능
        };
        return args;
      });
    },
};