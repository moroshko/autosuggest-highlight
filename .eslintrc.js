module.exports = {
  env: {
    node: true,
    browser: true,
    mocha: true
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  rules: {
    'array-callback-return': 2,
    'brace-style': [2, '1tbs'],
    camelcase: [2, { properties: 'always' }],
    'comma-dangle': [2, 'never'],
    'comma-style': [2, 'last'],
    'eol-last': 2,
    'func-call-spacing': 2,
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'keyword-spacing': 2,
    'linebreak-style': [2, 'unix'],
    'no-cond-assign': [2, 'always'],
    'no-console': 2,
    'no-global-assign': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-param-reassign': 0,
    'no-restricted-properties': [
      2,
      {
        object: 'describe',
        property: 'only',
        message: 'Please run all tests!'
      },
      {
        object: 'describe',
        property: 'skip',
        message: 'Please run all tests!'
      },
      {
        object: 'it',
        property: 'only',
        message: 'Please run all tests!'
      },
      {
        object: 'it',
        property: 'skip',
        message: 'Please run all tests!'
      }
    ],
    'no-template-curly-in-string': 2,
    'no-trailing-spaces': 2,
    'no-unused-vars': 2,
    'no-whitespace-before-property': 2,
    'newline-after-var': [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    'prefer-rest-params': 2,
    'quote-props': [2, 'as-needed'],
    semi: [2, 'always'],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'template-curly-spacing': [2, 'never']
  }
};
