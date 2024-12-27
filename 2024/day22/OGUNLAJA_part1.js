function main(inputString) {
  let total = 0;
  const secrets = inputString.trim().split("\n");

  secrets.forEach((secret) => {
    const result = solve(Number(secret), 2000);
    total += result;
  });

  console.log(total);
}

function solve(secret, index) {
  if (index === 0) return secret;

  secret = (secret ^ (secret * 64)) % 16777216;
  secret = Math.floor(secret / 32) ^ secret;
  secret = (secret ^ (secret * 2048)) % 16777216;
  if (secret < 0) secret += 16777216;

  return solve(secret, index - 1);
}
