function main(input) {
  let antinodes = new Set();

  const input = mapStringToArray(input.trim()).filter(
    (val) => val.character !== " "
  );

  const antennas = input.filter((entry) => entry.character !== ".");
  antennas.forEach((currentAntenna) => {
    const { character, lineNumber, position } = currentAntenna;

    const otherAntennasOfSameType = antennas.filter(
      (antenna) =>
        antenna.character === character &&
        (antenna.lineNumber !== lineNumber || antenna.position !== position)
    );

    otherAntennasOfSameType.forEach((differentAntenna) => {
      const lineNumberDifference = lineNumber - differentAntenna.lineNumber;
      const positionDifference = position - differentAntenna.position;

      const antinode = [
        position + positionDifference,
        lineNumber + lineNumberDifference,
      ];

      if (getEntry(input, antinode[0], antinode[1])) {
        antinodes.add(`${antinode[0]},${antinode[1]}`);
      }
    });
  });

  console.log(antinodes.size);
}

function getEntry(input, position, lineNumber) {
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
        character: line[charIndex],
        lineNumber: lineIndex + 1,
        position: charIndex + 1,
      });
    }
  });

  return result;
}

main();
