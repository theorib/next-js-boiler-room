// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import mockNextImage from './mockNextImage';
import mockNextFont from './mockNextFont';
import mockNextFontOld from './mockNextFontOld';
// import mockServerOnly from './mockServerOnly';
// mockNextFont(['Rubik_Scribble']);
// mockNextFont(['Inter', 'Rubik_Scribble']);
beforeAll(() => {
  mockNextImage();
});

beforeEach(() => {
  // All your beforeEach code here
});

afterEach(() => {
  // All your afterEach code here
});

afterAll(() => {
  // All your afterAll code here
});
