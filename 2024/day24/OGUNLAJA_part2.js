function main(inputString) {
  const { gates } = parse(inputString.trim());
  const incorrectGates = new Set();

  const inputXORGates = gates.filter(
    (gate) =>
      (gate.wire1[0] === "x" || gate.wire2[0] === "x") && gate.operand === "XOR"
  );
  inputXORGates.forEach((gate) => {
    if (gate.wire1 === "x00" || gate.wire2 === "x00") {
      if (gate.output !== "z00") incorrectGates.add(gate.output);
    } else if (gate.output === "z00" || gate.output[0] === "z") {
      incorrectGates.add(gate.output);
    }
  });

  const internalXORGates = gates.filter(
    (gate) =>
      gate.wire1[0] !== "x" && gate.wire2[0] !== "x" && gate.operand === "XOR"
  );
  internalXORGates.forEach((gate) => {
    if (gate.output[0] !== "z") incorrectGates.add(gate.output);
  });

  const outputGates = gates.filter((gate) => gate.output[0] === "z");
  outputGates.forEach((gate) => {
    if (gate.output === "z45") {
      if (gate.operand !== "OR") incorrectGates.add(gate.output);
    } else if (gate.operand !== "XOR") {
      incorrectGates.add(gate.output);
    }
  });

  let gatesToCheck = [];
  inputXORGates.forEach((gate) => {
    if (incorrectGates.has(gate.output) || gate.output === "z00") return;

    const connectedInternalGates = internalXORGates.filter(
      (g) => g.wire1 === gate.output || g.wire2 === gate.output
    );
    if (connectedInternalGates.length === 0) {
      gatesToCheck.push(gate);
      incorrectGates.add(gate.output);
    }
  });

  for (const gate of gatesToCheck) {
    const expectedOutput = `z${gate.wire1.slice(1)}`;
    const matchingGates = internalXORGates.filter(
      (g) => g.output === expectedOutput
    );

    if (matchingGates.length !== 1) break;

    const matchingGate = matchingGates[0];
    const wiresToCheck = [matchingGate.wire1, matchingGate.wire2];
    const connectedORGates = gates.filter(
      (g) => g.operand === "OR" && wiresToCheck.includes(g.output)
    );

    if (connectedORGates.length !== 1) break;

    const orGateOutput = connectedORGates[0].output;
    const actualCorrectOutput = wiresToCheck.find(
      (wire) => wire !== orGateOutput
    );
    incorrectGates.add(actualCorrectOutput);
  }

  console.log(Array.from(incorrectGates).sort().join(","));
}

function parse(input) {
  const [wiresInput, gatesInput] = input.split("\n\n");

  const wires = Object.fromEntries(
    wiresInput.split("\n").map((line) => {
      const [key, value] = line.split(":").map((s) => s.trim());
      return [key, Number(value)];
    })
  );

  const gates = gatesInput.split("\n").map((gate) => {
    const [inputs, output] = gate.split("->").map((s) => s.trim());
    const [wire1, operand, wire2] = inputs.split(" ");
    return { wire1, wire2, operand, output };
  });

  return { wires, gates };
}
