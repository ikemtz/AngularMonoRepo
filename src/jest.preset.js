const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.',
        outputName: './junit.xml',
      },
    ],
  ],
};
