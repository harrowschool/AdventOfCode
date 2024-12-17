const directions = { "<": [-1, 0], ">": [1, 0], "^": [0, -1], v: [0, 1] };

function main(inputString) {
  let total = 0;
  let [map, directions] = parseInput(inputString);
  map = mapStringToArray(map);

  directions
    .split("")
    .filter((val) => val !== "\n")
    .forEach((direction) => {
      const robot = map.find((entry) => entry.char === "@");
      move(robot, direction, map);
    });

  map.forEach((entry) => {
    if (entry.char !== "O") return;
    total += 100 * entry.y + entry.x;
  });

  console.log(total);
}

function move({ x, y }, direction, map) {
  let newX = x + directions[direction][0];
  let newY = y + directions[direction][1];
  let newLocation = getEntry(map, newX, newY);
  if (newLocation.char === "#") return;
  if (newLocation.char === "O") {
    if (canPushObstacles(newX, newY, direction, map)) {
      pushObstacles(newX, newY, direction, map);
      const oldRobotIndex = getEntryIndex(map, x, y);
      const newRobotIndex = getEntryIndex(map, newX, newY);
      map[oldRobotIndex].char = ".";
      map[newRobotIndex].char = "@";
    }
    return;
  }

  const oldRobotIndex = getEntryIndex(map, x, y);
  const newRobotIndex = getEntryIndex(map, newX, newY);
  map[oldRobotIndex].char = ".";
  map[newRobotIndex].char = "@";
}

function canPushObstacles(x, y, direction, map) {
  const nextX = x + directions[direction][0];
  const nextY = y + directions[direction][1];
  const nextLocation = getEntry(map, nextX, nextY);

  if (nextLocation.char === ".") return true;
  if (nextLocation.char === "O")
    return canPushObstacles(nextX, nextY, direction, map);
  return false;
}

function pushObstacles(x, y, direction, map) {
  const nextX = x + directions[direction][0];
  const nextY = y + directions[direction][1];
  const nextLocation = getEntry(map, nextX, nextY);

  if (nextLocation.char === ".") {
    const currentIndex = getEntryIndex(map, x, y);
    const nextIndex = getEntryIndex(map, nextX, nextY);
    map[nextIndex].char = "O";
    map[currentIndex].char = ".";
  } else if (nextLocation.char === "O") {
    pushObstacles(nextX, nextY, direction, map);
    const currentIndex = getEntryIndex(map, x, y);
    const nextIndex = getEntryIndex(map, nextX, nextY);
    map[nextIndex].char = "O";
    map[currentIndex].char = ".";
  }
}

function getEntryIndex(map, x, y) {
  return map.findIndex((entry) => entry.y === y && entry.x === x);
}

function getEntry(map, x, y) {
  return map.find((entry) => entry.y === y && entry.x === x);
}

function parseInput(str) {
  const arr = str.split("\n");
  const emptyIndex = arr.findIndex((item) => item === "");
  return [
    arr.slice(0, emptyIndex).join("\n").trim(),
    arr
      .slice(emptyIndex + 1)
      .join("")
      .trim(),
  ];
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
