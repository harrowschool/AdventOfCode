const fs = require('fs');
const input = fs.readFileSync('./2024/day5/input.txt', 'utf8');

const [rules_string, updates_string] = input.split("\n\n");

const rules = rules_string.split("\n").map(
    s => s.split("|").map(s => +s)
);

const updates = updates_string.split("\n").map(
    s => s.split(",").map(s => +s)
);

var total1 = 0;
var incorrectly_ordered_updates = []
for (const update of updates) {
    if (
        rules.filter(rule => 
            update.includes(rule[0]) && update.includes(rule[1])
        ).every(rule => 
            update.slice(update.indexOf(rule[0])).includes(rule[1])
        )
    ) {
        total1 += update[Math.floor(update.length / 2)]
    } else {
        incorrectly_ordered_updates.push(update)
    }
};

console.log(total1);

function re_sort(update, rule) {
    
}

var total2 = 0;

for (let update of incorrectly_ordered_updates) {
    
    let swaps = 0

    do {
        swaps = 0
        for (const rule of rules) {
            if (
                update.includes(rule[0]) 
                && update.includes(rule[1])
                && update.indexOf(rule[0]) > update.indexOf(rule[1])
            ) {
                [update[update.indexOf(rule[0])], update[update.indexOf(rule[1])]] = [update[update.indexOf(rule[1])], update[update.indexOf(rule[0])]]
                swaps += 1
            }
        }
    } while (swaps > 0)

    total2 += update[Math.floor(update.length / 2)];
}

console.log(total2)