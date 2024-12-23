function main(inputString) {
  let total = 0;
  const { plainDesigns, towels } = parse(inputString);

  towels.forEach((towel) => {
    const result = checkTowel(towel, plainDesigns, []);
    if (result) total += 1;
  });

  console.log(total);
}

function checkTowel(towel, plainDesigns, designsUsed) {
  for (let i = towel.length; i > 0; i--) {
    const remainingTowel = towel.slice(0, i);
    if (plainDesigns.includes(remainingTowel)) {
      if (i === towel.length) return [...designsUsed, remainingTowel];

      const result = checkTowel(towel.slice(i, towel.length), plainDesigns, [
        ...designsUsed,
        remainingTowel,
      ]);
      if (result) return designsUsed;
    }
  }
}

function parse(inputString) {
  const lines = String(inputString).split("\n");
  const plainDesigns = lines[0].split(", ");
  const towels = lines.slice(2, lines.length);
  return { plainDesigns, towels };
}
