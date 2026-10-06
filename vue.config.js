const { defineConfig } = require('@vue/cli-service')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    // Importa automáticamente solo los componentes de Vuetify que se usan (tree-shaking)
    plugins: [new VuetifyPlugin()]
  }
})
module.exports = {
publicPath:
process.env.NODE_ENV === 'production'
? '/proyecto7/'
: '/'
}