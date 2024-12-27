function main(inputString) {
  const binary = {};
  const { wires, gates } = parse(inputString.trim());

  let queue = [...gates];
  while (queue.length > 0) {
    const gate = queue.shift();
    const [wire1, operand, wire2, newWire] = gate.replace(" ->", "").split(" ");

    if (wires[wire1] === undefined || wires[wire2] === undefined) {
      queue.push(gate);
      continue;
    }

    const result = getResult(wires[wire1], wires[wire2], operand);
    wires[newWire] = result ? 1 : 0;
  }

  gates.forEach((gate) => {
    const [wire1, operand, wire2, newWire] = gate.replace(" ->", "").split(" ");
    const result = getResult(wires[wire1], wires[wire2], operand);
    if (newWire[0] === "z") {
      binary[Number(newWire.slice(1, 3))] = result;
    }
  });

  console.log(calculateDecimal(binary));
}

function calculateDecimal(obj) {
  let result = 0;
  for (let key in obj) {
    if (obj[key]) result += Math.pow(2, parseInt(key));
  }

  return result;
}

function getResult(wire1, wire2, operand) {
  switch (operand) {
    case "AND":
      return wire1 === 1 && wire2 === 1;
    case "XOR":
      return wire1 !== wire2;
    case "OR":
      return wire1 === 1 || wire2 === 1;
  }
}

function parse(input) {
  const empty = input.split("\n").indexOf("");
  const gates = input.split("\n").slice(empty + 1);
  const wires = input
    .split("\n")
    .slice(0, empty)
    .reduce((wires, wire) => {
      const [key, value] = wire.split(":").map((val) => val.trim());
      wires[key] = Number(value);
      return wires;
    }, {});

  return { wires, gates };
}
