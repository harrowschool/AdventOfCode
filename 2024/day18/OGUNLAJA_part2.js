const directions = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };

function main(inputString) {
  for (let i = 0; i < 3500; i++) {
    console.log(i);
    const map = formMap(70, i, inputString.trim());
    const start = findStart(map);
    const result = getResult(map, start);
    if (result.length === 0) {
      console.log(inputString.trim().split("\n")[i]);
      break;
    }
    i += result.length - 1;
  }
}

function getResult(map, start) {
  const queue = [[start[0], start[1], 0]];
  const visited = new Map();
  const points = [];

  while (queue.length > 0) {
    const [x, y, currentPoints] = queue.shift();
    const key = `${x},${y}`;

    if (visited.has(key) && visited.get(key) <= currentPoints) continue;
    visited.set(key, currentPoints);

    for (const [dx, dy] of Object.values(directions)) {
      const newX = x + dx;
      const newY = y + dy;

      const newChar = getChar(map, newX, newY);

      if (newChar === "E") {
        points.push(currentPoints + 1);
      } else if (newChar === ".") {
        queue.push([newX, newY, currentPoints + 1]);
      }
    }
  }

  return points;
}

function formMap(sideLength, filter, input) {
  const map = Array(sideLength + 1)
    .fill()
    .map(() => Array(sideLength + 1).fill("."));

  map[0][0] = "S";
  map[sideLength][sideLength] = "E";

  input
    .split("\n")
    .filter((_, index) => index <= filter)
    .forEach((obstacle) => {
      const [x, y] = obstacle.split(",").map(Number);
      if (x <= sideLength && y <= sideLength) {
        map[y][x] = "#";
      }
    });

  return map;
}

function getChar(map, x, y) {
  return map[y] && map[y][x];
}

function findStart(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "S") {
        return [x, y];
      }
    }
  }
}
