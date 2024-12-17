function main(inputString) {
  const input = inputString.trim().split("\n");

  const width = 100;
  const height = 102;

  const map = [];

  input.forEach((robot) => {
    const location = getLocation(robot);
    const velocity = getVelocity(robot);
    for (let i = 0; i < 100; i++) {
      let newX = location[0] + velocity[0];
      let newY = location[1] + velocity[1];

      if (newX < 0) newX = width + newX + 1;
      if (newX > width) newX = newX - width - 1;

      if (newY < 0) newY = height + newY + 1;
      if (newY > height) newY = newY - height - 1;

      location[0] = newX;
      location[1] = newY;
    }
    map.push(location);
  });

  let topLeftQuadrant = 0;
  let topRightQuadrant = 0;
  let bottomLeftQuadrant = 0;
  let bottomRightQuadrant = 0;
  map.forEach(([x, y]) => {
    const widthMiddle = width / 2;
    const heightMiddle = height / 2;
    if (x === widthMiddle || y === heightMiddle) return;

    if (x < widthMiddle && y < heightMiddle) topLeftQuadrant++;
    if (x > widthMiddle && y < heightMiddle) topRightQuadrant++;
    if (x < widthMiddle && y > heightMiddle) bottomLeftQuadrant++;
    if (x > widthMiddle && y > heightMiddle) bottomRightQuadrant++;
  });
  console.log(
    topLeftQuadrant *
      topRightQuadrant *
      bottomLeftQuadrant *
      bottomRightQuadrant
  );
}

function getLocation(robot) {
  return robot.split(" ")[0].split("=")[1].split(",").map(Number);
}

function getVelocity(robot) {
  return robot.split("=")[2].trim().split(",").map(Number);
}
