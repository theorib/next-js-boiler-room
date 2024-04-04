import { vi } from 'vitest';
// If you are using next-fonts in your project you will need to mock your font file functions like this
// You will also need to run this function either in your setupTests.ts file or in your test file using beforeEach or beforeAll:
// Make sure to import this function in your test file before importing the element you want to test
//  beforeAll(() => {
//   mockedNextFonts();
// });
const mockedNextFonts = () => {
  vi.mock('next/font/google', () => ({
    Inter: () => ({
      style: {
        fontFamily: 'mocked-inter-font-family',
        fontStyle: 'normal',
      },
      className: 'mocked-inter-class-name',
      variable: '--font-inter',
    }),
  }));
};

export default mockedNextFonts;
