// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import mockNextImage from './mockNextImage';
import mockNextFont from './mockNextFont';

// import mockServerOnly from './mockServerOnly';

beforeAll(() => {
  vi.mock('next/image', () => mockNextImage);
  vi.mock(`next/font/google`, async () => {
    const actual =
      await vi.importActual<typeof import('next/font/google')>(
        'next/font/google',
      );
    console.log('actual', actual);

    return mockNextFont('Inter');
  });

  // mockServerOnly();
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
