module.exports = {
  recursive: true,
  require: [
    '@babel/register',
    'test/utils/dom.js',
    'test/utils/enzyme.js'
  ]
}