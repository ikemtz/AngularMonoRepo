export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "node_modules/(?!(ora)/)"
  ],
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': ['ts-jest', { useESM: true }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  collectCoverage: true,
  coverageReporters: ['html', 'lcov', 'cobertura'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: '.',
        outputName: './junit.schematics.xml',
      },
    ],
  ],
  moduleNameMapper: {},
};
