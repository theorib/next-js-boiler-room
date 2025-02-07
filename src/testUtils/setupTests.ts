// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/vitest';

import mockNextFontGoogle from '@/testUtils/mockNextFontGoogle'
import mockNextImage from '@/testUtils/mockNextImage'

mockNextFontGoogle(['Rubik_Scribble', 'Inter'])

beforeAll(() => {
  vi.mock('next/image', () => mockNextImage)
  vi.mock('next/font/google', () => ({
    __esModule: true, // This property is required for the module to be recognized as an ES module when there is a default export.
    default: () => mockNextFontGoogle(['Raleway']),
  }))
})

beforeEach(() => {
  // All your beforeEach code here
})

afterEach(() => {
  // All your afterEach code here
})

afterAll(() => {
  // All your afterAll code here
})
