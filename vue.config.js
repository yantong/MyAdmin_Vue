module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://169.254.69.197:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
