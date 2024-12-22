const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function main(inputString) {
  const map = parse(inputString.trim());
  const start = findStart(map);

  const track = getTrack(map, start);
  const cheats = getCheats(track);

  console.log(cheats);
}

function getCheats(track) {
  const cheats = new Set();

  for (let i = 0; i < track.length; i++) {
    const { key, steps } = track[i];
    const [x, y] = key.split(",").map(Number);

    for (let j = i + 1; j < track.length; j++) {
      const { key: newKey, steps: newSteps } = track[j];
      const [newX, newY] = newKey.split(",").map(Number);

      const cheatSteps = Math.abs(newX - x) + Math.abs(newY - y);
      if (cheatSteps > 20) continue;

      const stepsSaved = newSteps - steps;

      if (stepsSaved >= 100 + cheatSteps) {
        cheats.add(`${x},${y},${newX},${newY}`);
      }
    }
  }

  return cheats.size;
}

function getTrack(map, start) {
  const track = [];
  const queue = [[start[0], start[1], 0]];

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();

    if (track.find((spot) => spot.key === `${x},${y}`)) continue;
    track.push({ key: `${x},${y}`, steps });

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newChar = getChar(map, newX, newY);

      if (newChar === "E") track.push({ key: `${newX},${newY}`, steps });
      else if (newChar === ".") queue.push([newX, newY, steps + 1]);
    }
  }

  return track;
}

function getChar(map, x, y) {
  return map[y] && map[y][x];
}

function parse(input) {
  const rows = input.trim().split("\n");
  const map = rows.map((row) => row.split(""));

  return map;
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
