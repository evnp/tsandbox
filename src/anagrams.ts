export function anagrams(words: string[]): string[] {
  let charIdxMax = 0;
  const charMap = new Map();

  const hash = (word: string): string => {
    const counts: number[] = [];
    // use for-of to account for multi-byte unicode chars:
    for (const char of word) {
      let charIdx = charMap.get(char) ?? null;
      if (charIdx === null) {
        charIdx = charIdxMax;
        charMap.set(char, charIdxMax);
        charIdxMax++;
      }
      counts[charIdx] = (counts[charIdx] ?? 0) + 1;
    }
    return counts.toString();
  };

  const anagrams = new Map();

  for (const word of words) {
    const hashed = hash(word);
    const existing = anagrams.get(hashed);
    anagrams.set(hashed, existing ? [...existing, word] : [word]);
  }

  return Array.from(anagrams.values(), (words) =>
    words.length > 1 ? words : []
  ).flat();
}
