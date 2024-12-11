function main(input) {
  const input = input.split("").map(Number);
  let map = [];

  let id = 0;
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 1) {
      id++;
      continue;
    }

    map = map.concat(
      Array(input[i]).fill(id.toString()),
      Array(input[i + 1] || 0).fill(".")
    );
  }

  for (let i = map.length - 1; i > 0; i--) {
    const character = map[i];
    if (character === ".") continue;

    const leftMostSpace = map.indexOf(".");
    map[leftMostSpace] = character;
    map[i] = ".";
  }

  map = map.filter((char) => char !== ".");

  const total = map.map(Number).reduce((subTotal, increment, index) => {
    return subTotal + increment * index;
  }, 0);

  console.log(total);
}
