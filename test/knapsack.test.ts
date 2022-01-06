import { knapsack } from "../src/knapsack";

describe("knapsack", () => {
  test("find", () => {
    expect(knapsack([1, 6, 10, 16], [1, 2, 3, 5], 7)).toBe(22);
    expect(knapsack([1, 6, 10, 16], [1, 2, 3, 5], 6)).toBe(17);
  });
});
