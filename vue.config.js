module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/blockchain-mid/'
    : '/',
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Shop online';
      return args;
    })
  }
}