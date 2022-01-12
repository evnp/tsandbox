describe("template", () => {
  test("run", () => {
    expect(template("palindrome 👯")).toBe("👯 emordnilap");
  });
});

function template(str: string): string {
  return Array.from(str).reverse().join("");
}
