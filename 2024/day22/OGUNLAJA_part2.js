function main(inputString) {
  const sequences = {};
  const secrets = inputString.trim().split("\n");

  secrets.forEach((secret) => {
    const prices = solve(Number(secret), 2000, []).map(Number);
    prices.unshift(String(secret).at(-1));

    const visited = new Set();
    for (let i = 0; i < prices.length - 4; i++) {
      const [a, b, c, d, e] = prices.slice(i, i + 5);
      const sequence = [b - a, c - b, d - c, e - d];
      const key = sequence.join(",");

      if (visited.has(key)) continue;
      visited.add(key);

      if (!sequences[key]) sequences[key] = 0;
      sequences[key] += e;
    }
  });

  console.log(Math.max(...Object.values(sequences)));
}

function solve(secret, index, prices) {
  if (index === 0) return prices;

  secret = (secret ^ (secret * 64)) % 16777216;
  secret = Math.floor(secret / 32) ^ secret;
  secret = (secret ^ (secret * 2048)) % 16777216;
  if (secret < 0) secret += 16777216;

  prices.push(String(secret).at(-1));
  return solve(secret, index - 1, prices);
}
