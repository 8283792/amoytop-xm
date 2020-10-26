module.exports = {
  devServer: {
    open: true
  },
  baseUrl: './',
  outputDir: undefined,
  assetsDir: './',
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'text-color': '#111',
          'border-color': '#eee',
          'button-default-background-color': '#4197d5',
          'nav-bar-background-color': '#4197d5',
          'nav-bar-text-color': '#fff',
          'button-default-color': '#fff',
          'dialog-confirm-button-text-color': '#fff',
          'tabbar-background-color': '#fff',
          'tabbar-item-active-color': '#4197d5'
        }
      }
    }
  }
}
