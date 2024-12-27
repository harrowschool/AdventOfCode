function main(inputString) {
  let total = 0;
  const { keys, locks } = parse(inputString.trim());
  keys.forEach((key) => {
    locks.forEach((lock) => {
      for (let i = 0; i < lock.length; i++) {
        if (lock[i] + key[i] >= 6) break;
        if (i === lock.length - 1) total += 1;
      }
    });
  });

  console.log(total);
}

function parse(inputString) {
  const lines = splitArrayIntoChunks(
    inputString
      .split("\n")
      .map((val) => val.replace("\r", ""))
      .filter((val) => val !== "")
  );
  let { locks, keys } = lines.reduce(
    (result, line) => {
      if (line[0] === "#####") result.locks.push(line);
      else result.keys.push(line);
      return result;
    },
    { locks: [], keys: [] }
  );

  locks = locks.map((lock) => {
    const totalHeight = [];
    for (let i = 0; i < 5; i++) {
      let height = 0;
      for (let j = 1; j < 7; j++) {
        if (lock[j][i] !== "#") break;
        height += 1;
      }
      totalHeight.push(height);
    }
    return totalHeight;
  });

  keys = keys.map((key) => {
    const totalHeight = [];
    for (let i = 0; i < 5; i++) {
      let height = 0;
      for (let j = 5; j > 0; j--) {
        if (key[j][i] !== "#") break;
        height += 1;
      }
      totalHeight.push(height);
    }
    return totalHeight;
  });

  return { keys, locks };
}

function splitArrayIntoChunks(arr) {
  const result = [];
  for (let i = 0; i < arr.length; i += 7) {
    result.push(arr.slice(i, i + 7));
  }
  return result;
}
