const jestCfg = require('./jest.config')
const { defaultTransformerOptions } = require('jest-preset-angular/presets')

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  ...jestCfg,
  transform: {
    '^.+\\.(ts|js|mjs|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        isolatedModules: true
      }
    ]
  },
  testEnvironment: '@happy-dom/jest-environment',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'TEST.xml'
      }
    ]
  ]
}
