function main(inputString) {
  const connections = inputString.trim().split("\n");
  const triplets = getTriplets(connections);
  console.log(triplets);
}

function getTriplets(connections) {
  const pairs = new Set();
  connections.forEach((connection) => {
    const [computer1, computer2] = connection.split("-");
    if (computer1[0] !== "t" && computer2[0] !== "t") {
      const connectedTo = [
        ...findConnections(computer1, computer2, connections),
        ...findConnections(computer2, computer1, connections),
      ].filter((computer) => computer[0] === "t");
      connectedTo.forEach((computer) => {
        if (isTriplet([computer1, computer2, computer], connections)) {
          pairs.add([computer1, computer2, computer].sort().join(","));
        }
      });
    } else {
      const connectedTo = [
        ...findConnections(computer1, computer2, connections),
        ...findConnections(computer2, computer1, connections),
      ];
      connectedTo.forEach((computer) => {
        if (isTriplet([computer1, computer2, computer], connections)) {
          pairs.add([computer1, computer2, computer].sort().join(","));
        }
      });
    }
  });

  return pairs.size;
}

function isTriplet(triplet, connections) {
  if (
    findConnections(triplet[0], triplet[1], connections).includes(triplet[2]) &&
    findConnections(triplet[0], triplet[2], connections).includes(triplet[1]) &&
    findConnections(triplet[1], triplet[0], connections).includes(triplet[2])
  ) {
    return true;
  }

  return false;
}

function findConnections(computer, ignore, connections) {
  return connections
    .filter((connection) => connection.includes(computer))
    .map((connection) => connection.replace(computer, "").replace("-", ""))
    .filter((pairedComputer) => pairedComputer !== ignore);
}
