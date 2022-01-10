export function genRandomStrings(n: number): string[] {
  return Array.from({ length: n }, () => {
    return Array.from({ length: Math.floor(Math.random() * n) }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
  });
}
