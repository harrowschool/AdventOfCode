const fs = require('fs');
const data = fs.readFileSync('./2024/day2/input.txt', 'utf8');

reports = data.split("\n").map(line =>
    line.split(" ").map(str => +str)
);

const deltas = report => report.map((level, index, levels) =>
    index > 0 ? level - levels[index - 1] : null
)
.filter(delta => delta != null);

const increasing_safely = report => deltas(report).every(delta =>
    delta >= 1 && delta <= 3
);
const decreasing_safely = report => deltas(report).every(delta =>
    -delta >= 1 && -delta <= 3
);

const safe = report => increasing_safely(report) || decreasing_safely(report);

const result1 = reports.filter(safe).length;

console.log(result1);

const dampen = report => report.map((_, index) =>
    [...report.slice(0, index), ...report.slice(index + 1)]
)

const safe_with_dampening = report => dampen(report).some(safe);

const result2 = result1 + reports.filter(report => !safe(report)).filter(safe_with_dampening).length;

console.log(result2);