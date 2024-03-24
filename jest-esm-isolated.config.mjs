import jestCfg from './jest-esm.config.mjs';

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestIsolatedCfg = {
  ...jestCfg,
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig-esm.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
        isolatedModules: true,
        useESM: true,
      },
    ],
  },
  testEnvironment: "@happy-dom/jest-environment",
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura', 'lcov'],
  reporters: ["default",
    [
      "jest-junit", {
      outputDirectory: "reports",
      outputName: "TEST.xml"
    }
    ]
  ],
  testResultsProcessor: "jest-junit"
};

export default jestIsolatedCfg;
