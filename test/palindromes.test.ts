import { genRandomStrings } from "./util";

import {
  longestPalindromeBrute,
  longestPalindromeMemo,
  longestPalindromeIter,
} from "../src/palindromes";

describe("longest palindromic substring", () => {
  let randomStringInputs: string[];
  const randomStringOutputs: Record<string, string> = {};
  beforeAll(() => (randomStringInputs = genRandomStrings(500)));

  test("recursive brute force", () => {
    expect(longestPalindromeBrute("")[0]).toBe("");
    expect(longestPalindromeBrute("a")[0]).toBe("a");
    expect(longestPalindromeBrute("ab")[0]).toBe("a");
    expect(longestPalindromeBrute("aa")[0]).toBe("aa");
    expect(longestPalindromeBrute("aba")[0]).toBe("aba");
    expect(longestPalindromeBrute("abba")[0]).toBe("abba");
    expect(longestPalindromeBrute("aaaa")[0]).toBe("aaaa");
    expect(longestPalindromeBrute("forgeeksskeegfor")[0]).toBe("geeksskeeg");
    expect(longestPalindromeBrute("abacdabadacbcda")[0]).toBe("dabad");
  });

  test("recursive memoized", () => {
    expect(longestPalindromeMemo("")).toBe("");
    expect(longestPalindromeMemo("a")).toBe("a");
    expect(longestPalindromeMemo("ab")).toBe("a");
    expect(longestPalindromeMemo("aa")).toBe("aa");
    expect(longestPalindromeMemo("aba")).toBe("aba");
    expect(longestPalindromeMemo("abba")).toBe("abba");
    expect(longestPalindromeMemo("aaaa")).toBe("aaaa");
    expect(longestPalindromeMemo("forgeeksskeegfor")).toBe("geeksskeeg");
    expect(longestPalindromeMemo("abacdabadacbcda")).toBe("dabad");
    for (const str of randomStringInputs) {
      const res = longestPalindromeMemo(str);
      expect(res).toBe(Array.from(res).reverse().join(""));
      randomStringOutputs[str] = res;
    }
  });

  test("iterative", () => {
    expect(longestPalindromeIter("")).toBe("");
    expect(longestPalindromeIter("a")).toBe("a");
    expect(longestPalindromeIter("ab")).toBe("a");
    expect(longestPalindromeIter("aa")).toBe("aa");
    expect(longestPalindromeIter("aba")).toBe("aba");
    expect(longestPalindromeIter("abba")).toBe("abba");
    expect(longestPalindromeIter("aaaa")).toBe("aaaa");
    expect(longestPalindromeIter("a2aa11a")).toBe("a11a");
    expect(longestPalindromeIter("forgeeksskeegfor")).toBe("geeksskeeg");
    expect(longestPalindromeIter("abacdabadacbcda")).toBe("dabad");
    for (const str of randomStringInputs) {
      const res = longestPalindromeIter(str);
      expect(res).toBe(Array.from(res).reverse().join(""));
      expect(str + " : " + res).toBe(str + " : " + randomStringOutputs[str]);
    }
  });
});
