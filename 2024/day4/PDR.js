const fs = require('fs');
const input = fs.readFileSync('./2024/day4/input.txt', 'utf8');

const rows = input.split("\n")
const length = rows.length

const columns = Array.from({length: length}, (_, j) => 
    Array.from({length: length}, (_, i) => 
        rows[i][j]
    )
    .join("")
);

const upper_right_diagonals = Array.from({length: length}, (_, j) =>
    Array.from({length: length - j}, (_, i) =>
        rows[i][i + j]
    )
    .join("")
);

const lower_left_diagonals = Array.from({length: length - 1}, (_, j) =>
    Array.from({length: length - j - 1}, (_, i) =>
        rows[i + j + 1][i]
    )
    .join("")
);

const upper_left_diagonals = Array.from({length: length}, (_, j) =>
    Array.from({length: length - j}, (_, i) =>
        rows[length - 1 - i - j][i]
    )
    .join("")
);

const lower_right_diagonals = Array.from({length: length - 1}, (_, j) =>
    Array.from({length: length - j - 1}, (_, i) =>
        rows[length - 1 - i][i + j + 1]
    )
    .join("")
);

const regex = /(?=(XMAS|SAMX))/g;
const lines = [
    ...rows, 
    ...columns, 
    ...upper_right_diagonals, 
    ...upper_left_diagonals, 
    ...lower_left_diagonals, 
    ...lower_right_diagonals
]

counter1 = 0
for (const line of lines) {
    const matches = line.match(regex)
    counter1 += matches ? matches.length : 0
}

console.log(counter1)

// Part 2

counter2 = 0
for (let i = 1; i < length - 1; i++) {
    for (let j = 1; j < length - 1; j++) {
        if (rows[i][j] == "A") {
            if (
                ["MS", "SM"].includes(rows[i-1][j-1] + rows[i+1][j+1]) 
                && ["MS", "SM"].includes(rows[i-1][j+1] + rows[i+1][j-1])
            ) {
                counter2++
            }
        }
    }
}

console.log(counter2)