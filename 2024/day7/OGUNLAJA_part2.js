async function main(input) {
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
      const operator = operatorList[i - 1];
      if (operator === "0") {
        return total + number;
      } else if (operator === "1") {
        return total * number;
      } else {
        return Number(String(total) + String(number));
      }
    }, numbers[0]);
    if (aim === numbersTotal) return true;
  }

  return false;
}

function generateOperators(N) {
  const ternaryStrings = [];

  function generate(current, remaining) {
    if (remaining === 0) {
      ternaryStrings.push(current);
      return;
    }

    for (let i = 0; i <= 2; i++) {
      generate(current + i, remaining - 1);
    }
  }

  generate("", N);
  return ternaryStrings;
}
