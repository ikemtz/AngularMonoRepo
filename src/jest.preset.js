const nxPreset = require('@nrwl/jest/preset');
module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'cobertura'],
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
  moduleNameMapper: {
    'imng-(.*)': '<rootDir>/../../dist/libs/imng-$1',
  },
};
