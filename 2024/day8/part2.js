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
      const allAntinodes = getAllAntinodes(
        currentAntenna,
        differentAntenna,
        [],
        input,
        0
      );

      allAntinodes.forEach((newAntinode) => {
        antinodes.add(newAntinode);
      });
    });
  });

  console.log(antinodes.size);
}

function getAllAntinodes(
  antenna,
  differentAntenna,
  antinodes,
  input,
  multiplier
) {
  const { position, lineNumber, character } = antenna;
  const lineNumberDifference = lineNumber - differentAntenna.lineNumber;
  const positionDifference = position - differentAntenna.position;
  const antinode = [
    position + positionDifference * multiplier,
    lineNumber + lineNumberDifference * multiplier,
  ];

  const result = input.find(
    (entry) =>
      entry.lineNumber === antinode[1] && entry.position === antinode[0]
  );

  if (!result) return antinodes;

  antinodes.push(`${antinode[0]},${antinode[1]}`);

  multiplier++;

  return getAllAntinodes(
    antenna,
    differentAntenna,
    antinodes,
    input,
    multiplier
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
