module.exports = {
  suites: [
    'test',
  ],
  expanded: true,
  plugins: {
    local: {
      browsers: ['chrome'],
      browserOptions: {
        chrome: [
          'headless',
          'disable-gpu',
          'no-sandbox',
        ],
      },
    },
    istanbul: {
      dir: './coverage',
      reporters: [
        'text',
        'text-summary',
        'lcov',
        'json',
      ],
      include: [
        '**/sample-lit-element.js',
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 80,
          branches: 80,
          functions: 70,
          lines: 80,
        },
      },
    },
  },
};
