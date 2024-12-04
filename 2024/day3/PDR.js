// Part 1

const fs = require('fs');
const input = fs.readFileSync('./2024/day3/input.txt', 'utf8');

const mul_regex = /mul\((\d+),(\d+)\)/g;

const matches = input.matchAll(mul_regex)

var total1 = 0
for (const match of matches) {
    total1 += +match[1] * +match[2]
}

console.log(total1)

// Part 2

const mul_regex2 = /mul\((\d+),(\d+)\)/;
const do_regex = /do\(\)/;
const dont_regex = /don't\(\)/;
const combined_regex = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

const matches2 = input.matchAll(combined_regex);

var total2 = 0
var enabled = true
for (const match of matches2) {
    const mul_match = match[0].match(mul_regex2)

    if (mul_match && enabled) {
        total2 += +mul_match[1] * +mul_match[2];
    } else if (match[0].match(do_regex)) {
        enabled = true
    } else if (match[0].match(dont_regex)) {
        enabled = false
    }
}

console.log(total2);