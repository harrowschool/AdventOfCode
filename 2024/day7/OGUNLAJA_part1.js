function main(input) {
  const lines = input.split("\n");
  let overall = 0;

  lines.forEach((line) => {
    let [total, numbersString] = line.split(":");
    total = Number(total);
    const numbers = numbersString
      .trim()
      .split(" ")
      .map((val) => Number(val));
    if (areValidNumbers(total, numbers)) overall += total;
  });

  console.log(overall);
}

function areValidNumbers(aim, numbers) {
  const operatorsList = generateOperators(numbers.length - 1);
  for (const operatorList of operatorsList) {
    const numbersTotal = numbers.reduce((total, number, i) => {
      if (i === 0) return total;
      return operatorList[i - 1] === "0" ? total + number : total * number;
    }, numbers[0]);
    if (aim === numbersTotal) return true;
  }

  return false;
}

function generateOperators(N) {
  const binaryStrings = [];
  for (let i = 0; i < Math.pow(2, N); i++) {
    let binaryString = i.toString(2);
    while (binaryString.length < N) {
      binaryString = "0" + binaryString;
    }
    binaryStrings.push(binaryString);
  }
  return binaryStrings;
}
