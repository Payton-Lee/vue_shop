// 这里是项目发布阶段才能用到的 Babel 插件
const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 发布产品时候的插件 ...是展开运算符，将一个数组展开到另外一个数组中
    ...prodPlugins,
    "@babel/plugin-syntax-dynamic-import"
  ]
}