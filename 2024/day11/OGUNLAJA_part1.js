function main(input) {
  let stones = input.trim().split(" ").map(Number);
  stones = blink(stones, 25);

  console.log(stones.length);
}

function blink(stones, blinks) {
  for (let i = 0; i < blinks; i++) {
    const newStones = stones.reduce((currentStones, stone) => {
      if (stone === 0) {
        currentStones.push(1);
      } else if (stone.toString().length % 2 === 0) {
        const stoneString = stone.toString();
        const halfLength = stoneString.length / 2;
        currentStones.push(parseInt(stoneString.slice(0, halfLength)));
        currentStones.push(parseInt(stoneString.slice(halfLength)));
      } else {
        currentStones.push(stone * 2024);
      }
      return currentStones;
    }, []);
    stones = newStones;
  }
  return stones;
}
main();
