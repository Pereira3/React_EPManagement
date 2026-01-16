import { expect } from '@jest/globals';
import { normalizedString } from "./utils";

test("normalizedString trims and converts to uppercase", () => {
  expect(normalizedString("hello world")).toBe("HELLO WORLD");
  expect(normalizedString("HELLO WORLD")).toBe("HELLO WORLD");
  expect(normalizedString("Hello World")).toBe("HELLO WORLD");
  expect(normalizedString("  hello world ")).toBe("HELLO WORLD");
  expect(normalizedString("    HELLO WORLD   ")).toBe("HELLO WORLD");
  expect(normalizedString("     Hello World     ")).toBe("HELLO WORLD");
  expect(normalizedString("  hello    world ")).toBe("HELLO WORLD");
  expect(normalizedString("    HELLO      WORLD   ")).toBe("HELLO WORLD");
  expect(normalizedString("     Hello  World     ")).toBe("HELLO WORLD");
});
