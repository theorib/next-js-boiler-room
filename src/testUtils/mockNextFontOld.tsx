import { vi } from 'vitest';

/**
 * Defines the shape of a font module, which maps font names to objects that provide
 * CSS styles, class names, and CSS variables for that font.
 */
interface FontModule {
  [fontName: string]: () => {
    style: React.CSSProperties;
    className: string;
    variable: string;
  };
}

/**
 * Creates a mock font module for testing purposes.
 *
 * The returned object has a key-value pair where the key is the `fontName` and the value is a function that returns an object with the following properties:
 * - `style`: an object containing the mocked font styles, including the `fontFamily` and `fontStyle`.
 * - `className`: a string representing the mocked class name for the font.
 * - `variable`: a string representing the mocked CSS variable for the font.
 *
 * @param fontName - The name of the font to be mocked.
 * @returns A `FontModule` object with the mocked font information.
 */
function createFontModuleSingle(fontName: string): FontModule {
  const fontNameLowerCase = fontName.toLowerCase();
  return {
    [fontName]: () => ({
      style: {
        fontFamily: `mocked-${fontNameLowerCase}-font-family`,
        fontStyle: 'normal',
      },
      className: `mocked-${fontNameLowerCase}-class-name`,
      variable: `--font-${fontNameLowerCase}`,
    }),
  };
}

/**
 * Creates a set of mocked font modules for testing purposes.
 *
 * This function takes an array of font names and returns a `FontModule` object that maps each font name to a function that returns an object with mocked font styles, class names, and CSS variables.
 *
 * @param fontNames - An array of font names to be mocked.
 * @returns A `FontModule` object containing the mocked font information.
 */
function createFontModuleMultiple(fontNames: string[]): FontModule {
  const fontModules = fontNames.reduce((modules, name) => {
    return { ...modules, ...createFontModuleSingle(name) };
  }, {});

  return fontModules;
}

/**
 * Creates a mock `next/font/google` module for testing purposes.
 *
 * This function returns a function that takes a font name or an array of font names, and returns a mocked `FontModule` object. The mocked `FontModule` object has key-value pairs where the key is the font name and the value is a function that returns an object with the following properties:
 * - `style`: an object containing the mocked font styles, including the `fontFamily` and `fontStyle`.
 * - `className`: a string representing the mocked class name for the font.
 * - `variable`: a string representing the mocked CSS variable for the font.
 *
 * The returned function also mocks the `next/font/google` module using the `vi.doMock` function from the `vitest` library.
 *
 * Usage: mockNextFont('Raleway') or mockNextFont(['Raleway', 'Nunito_Sans']
 *
 * @param fontName - The name of the font to be mocked, or an array of font names.
 * @returns A function that returns a mocked `FontModule` object.
 */
const mockNextFontOld = vi.hoisted(() => {
  const createMockedFontModules = function (fontNames: string | string[]) {
    if (typeof fontNames === 'string') return createFontModuleSingle(fontNames);
    if (Array.isArray(fontNames)) return createFontModuleMultiple(fontNames);
  };

  return createMockedFontModules;
});

export default mockNextFontOld;
