function main(inputString) {
  let total = 0;
  const input = splitIntoChunks(
    inputString
      .trim()
      .split("\n")
      .filter((val) => val !== "")
  );

  input.forEach((machine) => {
    const aButton = [getX(machine[0]), getY(machine[0])];
    const bButton = [getX(machine[1]), getY(machine[1])];

    const prizeX = getX(machine[2], true) + 10000000000000;
    const prizeY = getY(machine[2], true) + 10000000000000;

    const aX = aButton[0];
    const aY = aButton[1];

    const bX = bButton[0];
    const bY = bButton[1];

    let xExpression = aX + bX;
    let yExpression = aY + bY;

    xExpression *= bY;
    yExpression *= bX;

    xExpression -= yExpression;

    const aButtonPresses = (prizeX * bY - prizeY * bX) / xExpression;
    const bButtonPresses = (prizeX - aX * aButtonPresses) / bX;

    if (Number.isInteger(aButtonPresses) && Number.isInteger(bButtonPresses)) {
      total += aButtonPresses * 3 + bButtonPresses;
    }
  });

  console.log(total);
}

function getX(button, prize) {
  return Number(
    button
      .split(":")[1]
      .trim()
      .split(" ")[0]
      .split(prize ? "=" : "+")[1]
      .replace(",", "")
  );
}

function getY(button, prize) {
  return Number(
    button
      .split(":")[1]
      .trim()
      .split(" ")[1]
      .split(prize ? "=" : "+")[1]
      .replace(",", "")
  );
}

function splitIntoChunks(arr, chunkSize = 3) {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (_, index) =>
    arr.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}
