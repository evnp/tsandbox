import { anagrams } from "../src/anagrams";

describe("anagrams", () => {
  test("find", () => {
    expect(
      anagrams([
        "anagram",
        "gramana",
        "nothing",
        "palindrome 👯",
        "👯 emordnilap",
      ])
    ).toStrictEqual(["anagram", "gramana", "palindrome 👯", "👯 emordnilap"]);
  });
});
