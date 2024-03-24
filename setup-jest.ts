import 'jest-preset-angular/setup-jest.mjs'
import { jest } from '@jest/globals'

window.crypto.randomUUID = function () {
  return 'f9c23ca1-e987-4074-997f-7dade18176d7'
}

global.jest = jest
