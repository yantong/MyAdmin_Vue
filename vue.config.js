module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://169.254.11.83:8080",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
