function main(inputString) {
  const connections = inputString.trim().split("\n");
  for (let i = 10; i < 20; i++) {
    const groups = findGroups(connections, i);
    if (groups.size === 1) {
      console.log(groups.values().next().value);
      break;
    }
  }
}

function findGroups(connections, groupSize) {
  const groups = new Set();
  const connectionMap = new Map();
  const memo = new Map();
  const computers = Array.from(
    new Set(connections.flatMap((connection) => connection.split("-")))
  );

  for (const connection of connections) {
    const [a, b] = connection.split("-");
    if (!connectionMap.has(a)) connectionMap.set(a, new Set());
    if (!connectionMap.has(b)) connectionMap.set(b, new Set());
    connectionMap.get(a).add(b);
    connectionMap.get(b).add(a);
  }

  function setGroups(group = [], start = 0) {
    if (group.length === groupSize) {
      if (isFullyConnected(group)) {
        groups.add(group.sort().join(","));
      }
      return;
    }

    for (let i = start; i < computers.length; i++) {
      const computer = computers[i];
      if (group.every((c) => areConnected(c, computer))) {
        setGroups([...group, computer], i + 1);
      }
    }
  }

  function isFullyConnected(group) {
    const key = group.sort().join(",");
    if (memo.has(key)) return memo.get(key);

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        if (!areConnected(group[i], group[j])) {
          memo.set(key, false);
          return false;
        }
      }
    }
    memo.set(key, true);
    return true;
  }

  function areConnected(computer1, computer2) {
    return connectionMap.get(computer1)?.has(computer2);
  }

  setGroups();
  return groups;
}
