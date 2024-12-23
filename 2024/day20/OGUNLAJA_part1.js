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
  let cheats = 0;

  Object.keys(track).forEach((trackKey) => {
    const [x, y] = trackKey.split(",").map(Number);
    const currentTime = track[trackKey];
    directions.forEach(([dx, dy]) => {
      const newX = x + dx * 2;
      const newY = y + dy * 2;
      const newTime = track[`${newX},${newY}`];

      if (newTime - currentTime >= 102) cheats++;
    });
  });

  return cheats;
}

function getTrack(map, start) {
  const track = {};
  const queue = [[start[0], start[1], 0]];

  while (queue.length > 0) {
    const [x, y, steps] = queue.shift();
    const key = `${x},${y}`;

    if (track[key]) continue;
    track[key] = steps;

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;
      const newChar = getChar(map, newX, newY);

      if (newChar === "E") track[`${newX},${newY}`] = steps;
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
