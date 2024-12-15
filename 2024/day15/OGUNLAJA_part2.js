const directions = { "<": [-1, 0], ">": [1, 0], "^": [0, -1], v: [0, 1] };

function main(inputString) {
  let total = 0;
  let [map, directions] = parseInput(inputString);
  map = map
    .replaceAll("#", "##")
    .replaceAll("O", "[]")
    .replaceAll(".", "..")
    .replaceAll("@", "@.");
  map = mapStringToArray(map);

  directions
    .split("")
    .filter((val) => val !== "\n")
    .forEach((direction, index) => {
      const robot = map.find((entry) => entry.char === "@");
      move(robot, direction, map);
    });

  map.forEach((entry) => {
    if (entry.char !== "[") return;
    total += 100 * entry.y + entry.x;
  });

  console.log(total);
}

function move({ x, y }, direction, map) {
  let newX = x + directions[direction][0];
  let newY = y + directions[direction][1];
  let newLocation = getEntry(map, newX, newY);

  if (newLocation.char === "#") return;
  if (newLocation.char === "[" || newLocation.char === "]") {
    const increment = newLocation.char === "[" ? 1 : -1;
    if (
      canPushObstacles(newX, newY, direction, map) &&
      canPushObstacles(newX + increment, newY, direction, map)
    ) {
      if (directions[direction][1] !== 0) {
        pushObstacles(newX, newY, direction, map);
        pushObstacles(newX + increment, newY, direction, map);
      } else {
        pushObstacles(newX + increment, newY, direction, map);
        pushObstacles(newX, newY, direction, map);
      }
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
  const increment = nextLocation.char === "[" ? 1 : -1;

  if (nextLocation.char === ".") return true;
  if (nextLocation.char === "[" || nextLocation.char === "]") {
    return (
      canPushObstacles(nextX, nextY, direction, map) &&
      (directions[direction][1] === 0 ||
        canPushObstacles(nextX + increment, nextY, direction, map))
    );
  }
  return false;
}

function pushObstacles(x, y, direction, map) {
  const nextX = x + directions[direction][0];
  const nextY = y + directions[direction][1];
  const currentLocation = getEntry(map, x, y);
  const nextLocation = getEntry(map, nextX, nextY);

  if (nextLocation.char === ".") {
    const newIndex = getEntryIndex(map, nextX, nextY);
    const currentIndex = getEntryIndex(map, x, y);
    map[newIndex].char = currentLocation.char;
    map[currentIndex].char = ".";
  } else if (nextLocation.char === "[" || nextLocation.char === "]") {
    if (directions[direction][1] !== 0) {
      const increment = nextLocation.char === "[" ? 1 : -1;
      pushObstacles(nextX + increment, nextY, direction, map);
    }
    pushObstacles(nextX, nextY, direction, map);
    const newIndex = getEntryIndex(map, nextX, nextY);
    const currentIndex = getEntryIndex(map, x, y);
    map[newIndex].char = currentLocation.char;
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
      .join("\n")
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
