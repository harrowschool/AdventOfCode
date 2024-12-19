function main(inputString) {
  const output = [];
  let { regA, regB, regC, instructions } = parse(inputString.trim());

  for (let i = 0; i < instructions.length; i += 2) {
    const instruction = instructions[i];
    const literalOperand = instructions[i + 1];
    const comboOperand = calculateOperand(literalOperand, regA, regB, regC);

    switch (instruction) {
      case 0:
        regA = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case 1:
        regB = literalOperand ^ regB;
        break;
      case 2:
        regB = comboOperand % 8;
        break;
      case 3:
        if (regA !== 0) i = literalOperand - 2;
        break;
      case 4:
        regB = regB ^ regC;
        break;
      case 5:
        output.push(comboOperand % 8);
      case 6:
        regB = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case 7:
        regC = Math.floor(regA / Math.pow(2, comboOperand));
        break;
    }
  }

  console.log(output.join(","));
}

function calculateOperand(operand, regA, regB, regC) {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return regA;
    case 5:
      return regB;
    case 6:
      return regC;
    case 7:
      return null;
  }
}

function parse(input) {
  const inputLines = input.split("\n");
  const regA = Number(inputLines[0].split(":")[1].trim());
  const regB = Number(inputLines[1].split(":")[1].trim());
  const regC = Number(inputLines[2].split(":")[1].trim());
  const instructions = inputLines[4]
    .split(":")[1]
    .trim()
    .split(",")
    .map(Number);

  return { regA, regB, regC, instructions };
}
