module.exports = {
  env: {
    node: true,
  },
  // parserOptions: {
  //   parser: 'babel-eslint',
  //   sourceType: 'module',
  // },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
