const directions = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const directionsArray = ["up", "right", "down", "left"];

function main(inputString) {
  const direction = "right";
  const map = mapStringToArray(inputString.trim());

  const start = map.find((entry) => entry.char === "S");

  const result = move(map, start, direction);
  console.log(Math.min(...result));
}

function move(map, start, initialDirection) {
  const queue = [[start.x, start.y, initialDirection, 0]];
  const visited = new Map();
  const points = [];

  while (queue.length > 0) {
    const [x, y, direction, currentPoints] = queue.shift();
    const key = `${x},${y},${direction}`;

    if (visited.has(key) && visited.get(key) <= currentPoints) continue;
    visited.set(key, currentPoints);

    const clockwiseDirection = switchDirection(direction, true);
    const counterClockwiseDirection = switchDirection(direction, false);

    for (const [newDirection, pointsToAdd] of [
      [direction, 1],
      [clockwiseDirection, 1001],
      [counterClockwiseDirection, 1001],
    ]) {
      const [dx, dy] = directions[newDirection];
      const newX = x + dx;
      const newY = y + dy;

      const newChar = getEntry(map, newX, newY).char;

      if (newChar === "E") {
        points.push(currentPoints + pointsToAdd);
      } else if (newChar === ".") {
        queue.push([newX, newY, newDirection, currentPoints + pointsToAdd]);
      }
    }
  }

  return points;
}

function switchDirection(direction, clockwise) {
  const index = directionsArray.indexOf(direction);

  const length = directionsArray.length;
  const newIndex = clockwise
    ? (index + 1) % length
    : (index - 1 + length) % length;

  return directionsArray[newIndex];
}

function getEntry(map, x, y) {
  return map.find((entry) => entry.x === x && entry.y === y);
}

function mapStringToArray(inputString) {
  const lines = inputString.split(/\r?\n/);
  const result = [];

  lines.forEach((line, lineIndex) => {
    for (let charIndex = 0; charIndex < line.length; charIndex++) {
      result.push({
        char: line[charIndex],
        y: lineIndex,
        x: charIndex,
      });
    }
  });

  return result;
}
