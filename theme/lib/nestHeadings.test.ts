import { nest } from "./nestHeadings";

import { succeeding, failing } from "./nestHeadings.cases";

describe("Heading nesting library", () => {
  describe("Nesting", () => {
    test.each(succeeding)(`$name`, ({ headings, expected }) => {
      expect(nest(headings)).toEqual(expected);
    });

    test.failing.each(failing)("$name", ({ headings, expected }) => {
      expect(nest(headings)).toEqual(expected);
    });
  });
});
