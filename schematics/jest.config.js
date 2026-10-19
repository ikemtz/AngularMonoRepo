export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/+(*.)+(spec|test).+(ts)?(x)"],
  transform: {
    "^.+\\.(ts|tsx|html)$": ["ts-jest"],
    "^.+\\.(js|mjs)$": [
      "babel-jest",
      {
        presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(ora|chalk|restore-cursor|mimic-function|onetime|is-interactive|get-east-asian-width|cli-cursor|log-symbols|cli-spinners|stdin-discarder|strip-ansi|string-width|ansi-regex|yoctocolors|is-unicode-supported|magic-string|@jridgewell/sourcemap-codec|@angular-devkit)/)",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "js", "mjs", "html"],
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
  moduleNameMapper: {
    "^magic-string$": "<rootDir>/jest-shims/magic-string.js",
    "^ora$": "<rootDir>/jest-shims/ora.js",
  },
};
