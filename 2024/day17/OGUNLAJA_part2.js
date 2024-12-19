function main(inputString) {
  let possibleSolutions = [];
  let { instructions } = parse(inputString.trim());

  getSolutions(0, instructions.length - 1, possibleSolutions, inputString);
  console.log(Math.min(...possibleSolutions));
}

function getSolutions(previousRegA, index, answers, inputString) {
  const { instructions } = parse(inputString.trim());
  const target = instructions.reverse().join("");

  for (let x = 0; x < 8; x++) {
    const regA = previousRegA + Math.pow(8, index) * x;

    let output = runProgram(regA, inputString);
    let reversedOutput = output.reverse().join("");

    if (reversedOutput === target) {
      answers.push(regA);
      return;
    } else {
      let startOutput = reversedOutput.substring(0, target.length - index);
      if (target.startsWith(startOutput)) {
        getSolutions(regA, index - 1, answers, inputString);
      }
    }
  }
}

function runProgram(regA, inputString) {
  const output = [];
  let { regB, regC, instructions } = parse(inputString.trim());

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
        regB = comboOperand & 7;
        break;
      case 3:
        if (regA !== 0) i = literalOperand - 2;
        break;
      case 4:
        regB = regB ^ regC;
        break;
      case 5:
        output.push(comboOperand & 7);
      case 6:
        regB = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case 7:
        regC = Math.floor(regA / Math.pow(2, comboOperand));
        break;
    }
  }

  return output;
}

function calculateOperand(operand, regA, regB, regC) {
  switch (operand) {
    case 4:
      return regA;
    case 5:
      return regB;
    case 6:
      return regC;
  }

  return operand;
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
