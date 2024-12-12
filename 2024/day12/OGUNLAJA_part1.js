function main(inputString) {
  const input = mapStringToArray(inputString.trim());
  const regions = findRegions(input);

  const total = regions.reduce((subTotal, region) => {
    return subTotal + region.area * region.perimeter;
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
    locations.push([x + 1, y + 1]); // +1 to match original indexing

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

  function calculatePerimeter(locations) {
    let perimeter = 0;
    const regionSet = new Set(locations.map(([x, y]) => `${x},${y}`));

    for (let [x, y] of locations) {
      const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      for (let [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (
          newX < 1 ||
          newX > maxLineNumber ||
          newY < 1 ||
          newY > maxPosition ||
          !regionSet.has(`${newX},${newY}`)
        ) {
          perimeter++;
        }
      }
    }

    return perimeter;
  }

  for (let i = 0; i < maxLineNumber; i++) {
    for (let j = 0; j < maxPosition; j++) {
      if (!visited.has(`${i},${j}`) && grid[i][j]) {
        const locations = getRegionArea(i, j, grid[i][j], []);
        const perimeter = calculatePerimeter(locations);
        regions.push({
          perimeter,
          area: locations.length,
        });
      }
    }
  }

  return regions;
}

main();
