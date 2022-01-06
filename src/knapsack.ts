export function knapsack(
  profits: number[],
  weights: number[],
  capacity: number,
  idx = 0,
  memo: null | Map<string, number> = null
): number {
  memo = memo ?? new Map();

  if (profits.length !== weights.length) {
    throw new Error("invalid input");
  }
  if (idx >= profits.length) {
    return 0;
  }
  if (weights[idx] > capacity) {
    return 0;
  }

  const key = [capacity, idx].toString();
  let result = memo.get(key);

  if (!Number.isInteger(result)) {
    result = Math.max(
      // try WITHOUT current item:
      knapsack(profits, weights, capacity, idx + 1, memo),
      // try WITH current item:
      knapsack(profits, weights, capacity - weights[idx], idx + 1, memo) +
        profits[idx]
    );
    memo.set(key, result);
  }

  return result as number;
}
