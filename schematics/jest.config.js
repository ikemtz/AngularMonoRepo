export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testMatch: ["**/+(*.)+(spec|test).+(ts)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": ["ts-jest", { useESM: true }],
  }, // Allow Jest to transform specific ESM packages
  transformIgnorePatterns: [
    "node_modules/(?!(ora|chalk|restore-cursor|mimic-function|onetime|is-interactive|get-east-asian-width|cli-cursor|log-symbols|cli-spinners|stdin-discarder|strip-ansi|string-width|ansi-regex|yoctocolors|is-unicode-supported)/)",
  ],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "js", "html"],
  collectCoverage: true,
  coverageReporters: ["html", "lcov", "cobertura"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: ".",
        outputName: "./junit.schematics.xml",
      },
    ],
  ],
  moduleNameMapper: {},
};
