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
export function createFontModule(fontName: string): FontModule {
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
export function createFontModules(fontNames: string[]): FontModule {
  const fontModules = fontNames.reduce((modules, name) => {
    return { ...modules, ...createFontModule(name) };
  }, {});

  return fontModules;
}
