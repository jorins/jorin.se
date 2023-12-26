/**
 * @module
 * Case conversion library
 */

type CaseConverter = (input: string) => string;

/**
 * Convert to upper case. Wrapper of String.prototype.toLocaleUpperCase.
 */
export const toUppser: CaseConverter = (input) => input.toLocaleUpperCase();

/**
 * Convert to upper case. Wrapper of String.prototype.toLocaleUpperCase.
 */
export const toLower: CaseConverter = (input) => input.toLocaleLowerCase();

/**
 * Convert to title case. Converts to lower case to normalise string first, so
 * mid-word capitals are not kept. All words are capitalised without exception.
 */
export const toTitle: CaseConverter = (input) =>
  input
    .toLocaleLowerCase()
    .replace(/(^|\W)./g, (match) => match.toLocaleUpperCase());
