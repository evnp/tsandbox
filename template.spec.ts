test("template", () => {
  expect(template("palindrome 🐍")).toBe("🐍 emordnilap");
});

function template(str: string): string {
  return Array.from(str).reverse().join("");
}
