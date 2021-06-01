module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://172.21.53.113:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
