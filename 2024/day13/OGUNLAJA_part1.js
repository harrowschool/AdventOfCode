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

    const aMax = Math.min(
      ...[Math.floor(prizeX / aButton[0]), Math.floor(prizeY / aButton[1])]
    );
    const bMax = Math.min(
      ...[Math.floor(prizeX / bButton[0]), Math.floor(prizeY / bButton[1])]
    );

    let aTotals = [];
    let bTotals = [];

    for (let i = 0; i <= aMax; i++) {
      aTotals.push([aButton[0] * i, aButton[1] * i]);
    }

    for (let i = 0; i <= bMax; i++) {
      bTotals.push([bButton[0] * i, bButton[1] * i]);
    }

    for (let i = bTotals.length - 1; i > -1; i--) {
      const [x, y] = bTotals[i];
      const remaining = JSON.stringify([prizeX - x, prizeY - y]);
      const index = aTotals.findIndex(
        (total) => JSON.stringify(total) === remaining
      );
      if (index !== -1) {
        total += index * 3 + i;
        break;
      }
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
