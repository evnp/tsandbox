export function anagrams(words) {
    const hash = (word) => {
        const res = new Array(26).fill(0);
        for (const char of word) {
            const charIdx = (char.codePointAt(0) ?? 0) - 97;
            res[charIdx]++;
        }
        return res.toString();
    };
    const anagrams = new Map();
    for (const word of words) {
        const hashed = hash(word);
        const existing = anagrams.get(hashed);
        anagrams.set(hashed, existing ? [...existing, word] : [word]);
    }
    return Array.from(anagrams.values(), (words) => words.length > 1 ? words : []).flat();
}
