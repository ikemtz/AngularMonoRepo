module.exports = {
  testMatch: ["**/+(*.)+(spec|test).+(ts)?(x)"],
  transform: {
    "^.+\\.(ts|js|html)$": "ts-jest",
  },
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
