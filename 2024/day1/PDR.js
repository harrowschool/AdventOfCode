const fs = require('fs');
const data = fs.readFileSync('./2024/day1/input.txt', 'utf8');

const list1 = new Array()
const list2 = new Array()

data.split("\n").map(line => 
    line.split("   ").map(str => +str)
).forEach(arr => {
    list1.push(arr[0]);
    list2.push(arr[1]);
})

list1.sort()
list2.sort()

result1 = list1.map((num1, index) =>
    Math.abs(num1 - list2[index])
).reduce((x, y) => x + y, 0);

console.log(result1)

count2 = list2.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {})

result2 = list1.reduce((acc, item) => acc + item * (count2[item] || 0), 0)

console.log(result2)