const fs = require('fs');
const input = fs.readFileSync('./2024/day7/input.txt', 'utf8');

const data = input.split("\n").map(s => 
    s.split(": ")
).map(([x, y]) =>
    [+x, y.split(" ").map(s => +s)]
);

function possible_values(numbers) {
    if (numbers.length == 1) {
        return [numbers[0]];
    } else if (numbers.length == 2) {
        return [numbers[0] + numbers[1], numbers[0] * numbers[1]];
    } else {
        return possible_values(numbers.slice(0, -1)).flatMap(
            possible_value => possible_values([possible_value, numbers.at(-1)])
        );
    }
}

var total1 = 0
for (item of data) {
    if (possible_values(item[1]).includes(item[0])) {
        total1 += item[0]
    }
}

console.log(total1)

// Part 2

function possible_values_with_concatenation(numbers) {
    let result;
    
    if (numbers.length == 1) {
        result = [numbers[0]];
    } else if (numbers.length == 2) {
        result = [numbers[0] + numbers[1], numbers[0] * numbers[1], Number(`${numbers[0]}${numbers[1]}`)];
    } else {
        result = possible_values_with_concatenation(numbers.slice(0, -1)).flatMap(
            possible_value => possible_values_with_concatenation([possible_value, numbers.at(-1)])
        );
    };

    return result;
}

var total2 = 0;
for (item of data) {
    if (possible_values_with_concatenation(item[1]).includes(item[0])) {
        total2 += item[0];
    }
}

console.log(total2);