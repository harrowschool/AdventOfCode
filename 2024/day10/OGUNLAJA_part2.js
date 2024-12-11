function main(inputString) {
  const input = mapStringToArray(inputString);

  const total = input
    .filter((entry) => entry.number === 0)
    .reduce((subTotal, entry) => {
      return subTotal + getTrailHeadRating(input, entry);
    }, 0);

  console.log(total);
}

function getTrailHeadRating(input, trailhead) {
  let rating = 0;
  const locations = [trailhead];

  while (locations.length > 0) {
    const entry = locations.shift();
    if (entry.number === 9) rating++;

    const neighbors = [
      [entry.lineNumber + 1, entry.position],
      [entry.lineNumber - 1, entry.position],
      [entry.lineNumber, entry.position + 1],
      [entry.lineNumber, entry.position - 1],
    ];

    for (const [nextLineNumber, nextPosition] of neighbors) {
      const next = getEntry(input, nextLineNumber, nextPosition);
      if (next && next.number === entry.number + 1) {
        locations.push(next);
      }
    }
  }

  return rating;
}

function getEntry(input, lineNumber, position) {
  return input.find(
    (entry) => entry.lineNumber === lineNumber && entry.position === position
  );
}

function mapStringToArray(inputString) {
  const lines = inputString.split(/\r?\n/);
  const result = [];

  lines.forEach((line, lineIndex) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      result.push({
        number: Number(line[charIndex]),
        lineNumber: lineIndex + 1,
        position: charIndex + 1,
      });
    }
  });

  return result;
}

main();
