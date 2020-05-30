module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
  ],
  env: {
    mocha: true,
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
  },
};
