const memo = new Map();

function main(inputString) {
  let total = 0;
  const { plainDesigns, towels } = parse(inputString);

  towels.forEach((towel) => {
    const result = checkTowel(towel, plainDesigns);
    if (result) total += result;
  });

  console.log(total);
}

function checkTowel(towel, plainDesigns, designsUsed = []) {
  const key = towel;
  if (memo.has(key)) return memo.get(key);

  let possibleDesigns = 0;
  for (let i = 1; i <= towel.length; i++) {
    const remainingTowel = towel.slice(0, i);
    if (plainDesigns.includes(remainingTowel)) {
      if (i === towel.length) {
        possibleDesigns += 1;
      } else {
        const result = checkTowel(towel.slice(i), plainDesigns, [
          ...designsUsed,
          remainingTowel,
        ]);
        possibleDesigns += result;
      }
    }
  }

  memo.set(key, possibleDesigns);
  return possibleDesigns;
}

function parse(inputString) {
  const lines = inputString.split("\n");
  const plainDesigns = lines[0].split(", ");
  const towels = lines.slice(2);
  return { plainDesigns, towels };
}
