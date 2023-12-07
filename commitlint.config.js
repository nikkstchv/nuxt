module.exports = {
  extends: [
    '@commitlint/config-conventional',
    '@commitlint/parse',
  ],
  rules: {
    'type-empty': [0, 'always'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(fix|feature)\(ECOM-\d+\):\s.+/,
      headerCorrespondence: ['subject'],
    },
  },
}
