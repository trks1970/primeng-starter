import ngPreset from 'jest-preset-angular/presets/index.js';

globalThis.ngJest = {
  tsconfig: 'tsconfig-esm.spec.json',
};

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
const jestConfig = {
  ...ngPreset.defaultsESM,
  moduleNameMapper: {
    tslib: 'tslib/tslib.es6.js',
    rxjs: '<rootDir>/node_modules/rxjs/dist/bundles/rxjs.umd.js',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest-esm.ts'],
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig-esm.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
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

export default jestConfig;
