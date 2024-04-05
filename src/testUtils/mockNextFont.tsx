import { vi } from 'vitest';

interface FontModule {
  [fontName: string]: () => {
    style: React.CSSProperties;
    className: string;
    variable: string;
  };
}

/**
 * Mocks the `next/font` component for use in test environments.
 * Usage:
 * vi.mock(`next/font/google`, () => mockNextFont('Inter'));
 */
const mockNextFont = vi.hoisted(() => {
  return (fontName: string): FontModule => {
    const fontNameLowerCase = fontName.toLowerCase();
    const capitalizedFontName =
      fontNameLowerCase.charAt(0).toUpperCase() + fontNameLowerCase.slice(1);
    return {
      [capitalizedFontName]: () => ({
        style: {
          fontFamily: `mocked-${fontNameLowerCase}-font-family`,
          fontStyle: 'normal',
        },
        className: `mocked-${fontNameLowerCase}-class-name`,
        variable: `--font-${fontNameLowerCase}`,
      }),
    };
  };
});

export default mockNextFont;
