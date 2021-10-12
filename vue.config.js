module.exports = {
  devServer: {
    disableHostCheck: true
  },
  parallel: false,
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    }
  },
}

