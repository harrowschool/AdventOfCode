function main(inputString) {
  const input = mapStringToArray(inputString.trim());
  const regions = findRegions(input);

  const total = regions.reduce((subTotal, region) => {
    return subTotal + region.area * region.sides;
  }, 0);

  console.log(total);
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

function findRegions(input) {
  const maxLineNumber = Math.max(...input.map((item) => item.lineNumber));
  const maxPosition = Math.max(...input.map((item) => item.position));
  const grid = Array(maxLineNumber)
    .fill()
    .map(() => Array(maxPosition).fill(null));
  const regions = [];
  const visited = new Set();

  input.forEach((item) => {
    grid[item.lineNumber - 1][item.position - 1] = item.character;
  });

  function getRegionArea(x, y, char, locations) {
    if (
      x < 0 ||
      x >= maxLineNumber ||
      y < 0 ||
      y >= maxPosition ||
      grid[x][y] !== char ||
      visited.has(`${x},${y}`)
    ) {
      return;
    }

    visited.add(`${x},${y}`);
    locations.push([x + 1, y + 1]);

    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (let [dx, dy] of directions) {
      getRegionArea(x + dx, y + dy, char, locations);
    }

    return locations;
  }

  function getSides(locations) {
    const regionSet = new Set(locations.map(([x, y]) => `${x},${y}`));
    let corners = 0;

    for (let [x, y] of locations) {
      const hasNorth = regionSet.has(`${x - 1},${y}`);
      const hasSouth = regionSet.has(`${x + 1},${y}`);
      const hasEast = regionSet.has(`${x},${y + 1}`);
      const hasWest = regionSet.has(`${x},${y - 1}`);
      const hasNorthWest = regionSet.has(`${x - 1},${y - 1}`);
      const hasNorthEast = regionSet.has(`${x - 1},${y + 1}`);
      const hasSouthWest = regionSet.has(`${x + 1},${y - 1}`);
      const hasSouthEast = regionSet.has(`${x + 1},${y + 1}`);

      if (!hasNorth && !hasEast) corners++;
      if (!hasNorth && !hasWest) corners++;
      if (!hasSouth && !hasEast) corners++;
      if (!hasSouth && !hasWest) corners++;
      if (hasNorth && hasEast && !hasNorthEast) corners++;
      if (hasNorth && hasWest && !hasNorthWest) corners++;
      if (hasSouth && hasEast && !hasSouthEast) corners++;
      if (hasSouth && hasWest && !hasSouthWest) corners++;
    }

    return corners;
  }

  for (let i = 0; i < maxLineNumber; i++) {
    for (let j = 0; j < maxPosition; j++) {
      if (!visited.has(`${i},${j}`) && grid[i][j]) {
        const locations = getRegionArea(i, j, grid[i][j], []);
        const sides = getSides(locations);
        regions.push({
          sides,
          area: locations.length,
        });
      }
    }
  }

  return regions;
}

main()
