const numericKeypad = [
  { x: 0, y: 0, char: "7" },
  { x: 1, y: 0, char: "8" },
  { x: 2, y: 0, char: "9" },
  { x: 0, y: 1, char: "4" },
  { x: 1, y: 1, char: "5" },
  { x: 2, y: 1, char: "6" },
  { x: 0, y: 2, char: "1" },
  { x: 1, y: 2, char: "2" },
  { x: 2, y: 2, char: "3" },
  { x: 0, y: 3, char: "" },
  { x: 1, y: 3, char: "0" },
  { x: 2, y: 3, char: "A" },
];

const directionalKeypad = [
  { x: 0, y: 0, char: "" },
  { x: 1, y: 0, char: "^" },
  { x: 2, y: 0, char: "A" },
  { x: 0, y: 1, char: "<" },
  { x: 1, y: 1, char: "v" },
  { x: 2, y: 1, char: ">" },
];

const cache = new Map();
const directions = { "^": [0, -1], v: [0, 1], ">": [1, 0], "<": [-1, 0] };

function main(inputString) {
  let total = 0;
  const codes = inputString.trim().split("\n");

  codes.forEach((code) => {
    const result = solve(code, numericKeypad, 3);
    total += result * Number(code.slice(0, 3));
  });

  console.log(total);
}

function solve(code, keypad, depth) {
  let length = 0;
  let robot = "A";

  const key = `${code}-${depth}`;
  if (cache.has(key)) return cache.get(key);

  for (let i = 0; i < code.length; i++) {
    let instructions = [[]];
    const { x: robotX, y: robotY } = findLocation(keypad, robot);
    const { x, y } = findLocation(keypad, code[i]);

    const xDifference = robotX - x;
    const yDifference = robotY - y;

    let string = "";
    string = string.concat(
      (yDifference > 0 ? "^" : "v").repeat(Math.abs(yDifference))
    );
    string = string.concat(
      (xDifference > 0 ? "<" : ">").repeat(Math.abs(xDifference))
    );

    let possibilities = jumbleString(string).filter((newString) =>
      allowedToMove(newString, keypad, robot)
    );
    instructions = instructions.flatMap((solution) =>
      possibilities.map((newString) => [
        ...solution,
        ...newString.split(""),
        "A",
      ])
    );
    robot = code[i];
    const shortestLength = Math.min(
      ...instructions.map((instruction) => instruction.length)
    );
    if (depth === 1) length += shortestLength;
    else {
      const results = instructions.map((solution) =>
        solve(solution.join(""), directionalKeypad, depth - 1)
      );
      length += Math.min(...results);
    }
  }

  cache.set(key, length);
  return length;
}

function allowedToMove(instructions, keypad, robot) {
  for (let i = 0; i < instructions.length; i++) {
    const [dx, dy] = directions[instructions[i]];
    const { x: robotX, y: robotY } = findLocation(keypad, robot);
    const newX = robotX + dx;
    const newY = robotY + dy;
    const nextLocation = getChar(keypad, newX, newY);
    if (!nextLocation || !nextLocation.char) return false;
    robot = nextLocation.char;
  }

  return true;
}

function jumbleString(str) {
  function generateStrings(arr) {
    if (arr.length <= 1) return [arr];
    const result = [];

    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      if (i > 0 && arr[i] === arr[i - 1]) continue;
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
      const permutations = generateStrings(remaining);

      for (let perm of permutations) {
        result.push([current].concat(perm));
      }
    }
    return result;
  }

  const chars = str.split("");
  return generateStrings(chars).map((perm) => perm.join(""));
}

function getChar(keypad, x, y) {
  return keypad.find((key) => key.x === x && key.y === y);
}

function findLocation(keypad, char) {
  const found = keypad.find((item) => item.char === char);
  if (found) return { x: found.x, y: found.y };
}
