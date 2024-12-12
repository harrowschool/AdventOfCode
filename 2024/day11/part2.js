const cache = new Map();

function main(input) {
  const stones = input.trim().split(" ").map(Number);
  const result = stones
    .map((stone) => blink(stone, 75))
    .reduce((a, b) => a + b, 0);

  console.log(result);
}

function blink(stone, blinks) {
  const cacheKey = `${stone}-${blinks}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);
  if (blinks === 0) return 1;
  if (stone === 0) {
    const result = blink(1, blinks - 1);
    cache.set(cacheKey, result);
    return result;
  }

  const stoneString = stone.toString();
  const length = stoneString.length;

  let result;
  if (length % 2 === 0) {
    const left = parseInt(stoneString.slice(0, length / 2));
    const right = parseInt(stoneString.slice(length / 2));
    result = blink(left, blinks - 1) + blink(right, blinks - 1);
  } else {
    result = blink(stone * 2024, blinks - 1);
  }
  cache.set(cacheKey, result);
  return result;
}
