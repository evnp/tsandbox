import { genRandomStrings } from "./util";

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

// O(n^3) brute force
// O(n^2) memoized time complexity
// O(n^2) memoized space complexity

function longestPalindromeBrute(str: string, log = ""): [string, string] {
  let subStrA = "";
  let subStrB = "";
  let subStrC = "";
  log += "\n" + str;
  if (str.length <= 1) {
    // BASE CASE 1: empty string or 1-character string
    return [str, log];
  } else if (str.length <= 3) {
    // BASE CASE 2: 2-3 -character string
    // this is an optimization; cuts recursive stack size by ~30%
    if (str[0] === str[str.length - 1]) {
      return [str, log];
    } else if (str[0] === str[str.length - 2]) {
      return [str.slice(0, str.length - 1), log];
    } else if (str[1] === str[str.length - 1]) {
      return [str.slice(1, str.length), log];
    } else {
      return [str.slice(1, str.length - 1), log];
    }
  }
  subStrA = "";
  if (str[0] === str[str.length - 1]) {
    [subStrA, log] = longestPalindromeBrute(str.slice(1, str.length - 1), log);
    if (str === str[0] + subStrA + str[0]) {
      subStrA = str;
    }
  }
  [subStrB, log] = longestPalindromeBrute(str.slice(0, str.length - 1), log);
  [subStrC, log] = longestPalindromeBrute(str.slice(1, str.length), log);
  if (subStrA.length >= subStrB.length && subStrA.length >= subStrC.length) {
    return [subStrA, log];
  } else if (subStrB.length >= subStrC.length) {
    return [subStrB, log];
  } else {
    return [subStrC, log];
  }
}

function longestPalindromeMemo(str: string): string {
  const memo: Array<Array<[number, number]>> = [];
  //let stackSize = 0;

  // ARGUMENTS
  // start: index of FIRST char of substring being evaluated
  // end: index of LAST char of substring being evaluated
  function longest(start: number, end: number): [number, number] {
    //stackSize++;
    memo[start] = memo[start] || [];
    let result = memo[start][end];

    if (!result) {
      if (end - start <= 0) {
        // BASE CASE 1: empty string or 1-character string
        result = [start, end];
      } else if (end - start <= 2) {
        // BASE CASE 2: 2-3 -character string
        // this is an optimization; cuts recursive stack size by ~30%
        if (str[start] === str[end]) {
          result = [start, end];
        } else if (str[start] === str[end - 1]) {
          result = [start, end - 1];
        } else if (str[start + 1] === str[end]) {
          result = [start + 1, end];
        } else {
          result = [start, start];
        }
      } else {
        let [subStartA, subEndA] = [0, 0];
        if (str[start] === str[end]) {
          [subStartA, subEndA] = longest(start + 1, end - 1);
          if (subStartA - start === 1 && end - subEndA === 1) {
            [subStartA, subEndA] = [start, end];
          }
        }
        const [subStartB, subEndB] = longest(start, end - 1);
        const [subStartC, subEndC] = longest(start + 1, end);
        if (
          (subEndA - subStartA > subEndB - subStartB &&
            subEndA - subStartA > subEndC - subStartC) ||
          (subEndA - subStartA === subEndB - subStartB &&
            subEndA - subStartA === subEndC - subStartC &&
            subStartA <= subStartB &&
            subStartA <= subStartC)
        ) {
          result = [subStartA, subEndA];
        } else if (subEndB - subStartB > subEndC - subStartC) {
          result = [subStartB, subEndB];
        } else if (
          subEndB - subStartB === subEndC - subStartC &&
          subStartB <= subStartC
        ) {
          result = [subStartB, subEndB];
        } else {
          result = [subStartC, subEndC];
        }
      }

      // MEMOIZE RESULT:
      memo[start][end] = result;
    }

    return result;
  }

  const [start, end] = longest(0, str.length - 1);
  //console.log("STACK SIZE", stackSize);
  return str.slice(start, end + 1);
}

// O(n^2) time complexity
// O(1)   space complexity
function longestPalindromeIter(str: string): string {
  // lsi : longest start idx
  // lei : longest end idx
  let [lsi, lei] = [0, 0];
  let initialIndices;

  for (let i = 0; i < str.length; i++) {
    // case 1: start with a single char and check each pair of chars
    // increasing outward (eg. "a", "bab", "cbabc", etc.)
    initialIndices = [[i, i]];

    // case 2: IF a pair of chars are equal, start with these chars and check each
    // pair of chars increasing outward (eg. "aa", "baab", "cbaabc", etc.)
    if (str[i] === str[i + 1]) {
      initialIndices.push([i, i + 1]);
    }

    // csi : current start idx
    // cei : current end idx
    for (let [csi, cei] of initialIndices) {
      while (csi > 0 && cei < str.length - 1 && str[csi - 1] === str[cei + 1]) {
        csi--;
        cei++;
      }

      // the current substring is still a palindrome -- if it's longer than the
      // longest palindrome we've encountered yet, [lsi, lei], set it as [lsi, lei]:
      if (cei - csi > lei - lsi) {
        [lsi, lei] = [csi, cei];
      }
    }
  }

  return str.slice(lsi, lei + 1);
}
