function main(inputString) {
  const map = mapStringToArray(inputString.trim());

  const start = map.find((entry) => entry.char === "S");
  const end = map.find((entry) => entry.char === "E");

  const allShortestPaths = findAllShortestPaths(map, start, end);

  if (allShortestPaths.length > 0) {
    const uniquePoints = new Set(
      allShortestPaths.flatMap((path) => path.map(({ x, y }) => `${x},${y}`))
    );
    console.log(uniquePoints.size);
  } else {
    console.log("No paths found.");
  }
}

function findAllShortestPaths(map, start, end) {
  const directions = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
  };

  const applicableDirections = {
    up: ["up", "left", "right"],
    down: ["down", "left", "right"],
    left: ["left", "up", "down"],
    right: ["right", "up", "down"],
  };

  const priorityQueue = new PriorityQueue();
  const distances = new Map();
  const paths = new Map();
  const shortestPaths = [];

  map.forEach((entry) => {
    const key = `${entry.x},${entry.y}`;
    distances.set(key, Infinity);
    paths.set(key, []);
  });

  const startKey = `${start.x},${start.y}`;
  distances.set(startKey, 0);
  paths.set(startKey, [[{ x: start.x, y: start.y }]]);
  priorityQueue.enqueue({ x: start.x, y: start.y, direction: null }, 0);

  function willEqualize(x, y, direction, cost) {
    const possibleDirections = applicableDirections[direction];
    for (const newDirection of possibleDirections) {
      const [dx, dy] = directions[newDirection];
      const newX = x + dx;
      const newY = y + dy;
      const neighborKey = `${newX},${newY}`;
      const newCost = newDirection === direction ? cost + 1 : cost + 1001;
      if (distances.get(neighborKey) === newCost) return true;
    }

    return false;
  }

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue();
    const currentKey = `${current.x},${current.y}`;

    if (current.x === end.x && current.y === end.y) {
      shortestPaths.push(...paths.get(currentKey));
      continue;
    }

    const currentDirection = current.direction;
    const possibleDirections = currentDirection
      ? applicableDirections[currentDirection]
      : Object.keys(directions);

    for (const direction of possibleDirections) {
      const [dx, dy] = directions[direction];
      const newX = current.x + dx;
      const newY = current.y + dy;
      const neighbor = getEntry(map, newX, newY);

      if (!neighbor || neighbor.char === "#") continue;

      const neighborKey = `${newX},${newY}`;
      const moveCost = direction === currentDirection ? 1 : 1001;
      let alt = distances.get(currentKey) + moveCost;

      if (
        alt < distances.get(neighborKey) ||
        (alt - 1001 < distances.get(neighborKey) &&
          willEqualize(newX, newY, direction, alt))
      ) {
        distances.set(neighborKey, alt);
        paths.set(
          neighborKey,
          paths.get(currentKey).map((path) => [...path, { x: newX, y: newY }])
        );
        priorityQueue.enqueue({ x: newX, y: newY, direction }, alt);
      } else if (alt === distances.get(neighborKey)) {
        const newPaths = paths
          .get(currentKey)
          .map((path) => [...path, { x: newX, y: newY }]);
        paths.set(neighborKey, paths.get(neighborKey).concat(newPaths));
      }
    }
  }

  return shortestPaths;
}

class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(node, priority) {
    this.queue.push({ node, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift().node;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

function getEntry(map, x, y) {
  return map.find((entry) => entry.x === x && entry.y === y) || null;
}

function mapStringToArray(input) {
  const rows = input.split("\n");
  const map = [];
  rows.forEach((row, y) => {
    row.split("").forEach((char, x) => {
      map.push({ char, x, y });
    });
  });
  return map;
}
