function main(inputString) {
  const input = inputString.trim().split("\n");

  const width = 100;
  const height = 102;

  const maps = [];

  for (let j = 0; j < 7000; j++) {
    const map = [];
    input.forEach((robot) => {
      const location = getLocation(robot);
      const velocity = getVelocity(robot);
      for (let i = 0; i < j; i++) {
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
    maps.push({ map, index: j });
  }

  maps.forEach((map) => {
    const hasConsecutiveRobots = checkConsecutiveRobots(map.map, 10);
    if (hasConsecutiveRobots) console.log(map.index);
  });
}

function checkConsecutiveRobots(map, count) {
  const sortedMap = map.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

  for (let i = 0; i < sortedMap.length - count + 1; i++) {
    let consecutive = 1;
    for (let j = 1; j < count; j++) {
      if (
        sortedMap[i + j][1] === sortedMap[i + j - 1][1] &&
        sortedMap[i + j][0] === sortedMap[i + j - 1][0] + 1
      ) {
        consecutive++;
      } else {
        break;
      }
    }
    if (consecutive === count) {
      return true;
    }
  }
  return false;
}

function getLocation(robot) {
  return robot.split(" ")[0].split("=")[1].split(",").map(Number);
}

function getVelocity(robot) {
  return robot.split("=")[2].trim().split(",").map(Number);
}
