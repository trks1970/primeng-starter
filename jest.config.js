const { pathsToModuleNameMapper } = require('ts-jest')
const { paths } = require('./tsconfig.json').compilerOptions

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  tsconfig: 'tsconfig.spec.json'
}

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest-preset-angular',
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  collectCoverage: true,
  coverageReporters: ['cobertura', 'lcov'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'TEST.xml'
      }
    ]
  ],
  testResultsProcessor: 'jest-junit'
}
