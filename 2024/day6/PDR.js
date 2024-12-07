const fs = require('fs');
const input = fs.readFileSync('./2024/day6/input.txt', 'utf8');

var cells = input.split("\n").map(
    s => s.split("")
);


Array.prototype.deepIncludes = function(target) {
    return this.some(item =>
        item.length === target.length &&
        item.every((value, index) => value === target[index])
    );
};

function deepCopyArray(arr) {
    return arr.map(item => (Array.isArray(item) ? deepCopyArray(item) : item));
};

function printCells(cells, positions) {
    const result = cells.map((row, i) =>
        row.map((cell, j) => {
            if (positions.deepIncludes([i, j])) {
                return "X";
            } else if (row == i && column == j) {
                switch(direction) {
                    case "up":
                        return "^";
                        break;
                    case "down":
                        return "v";
                        break;
                    case "left":
                        return "<";
                        break;
                    case "right":
                        return ">";
                        break;
                }
            } else {
                return cell;
            }
        }).join("")
    ).join("\n") + "\n"

    console.log(result)
}

function run_path(input_cells) {
    var row = 0
    var column = 0
    var direction = "up"
    var positions = []
    var path = []
    var cells = deepCopyArray(input_cells)

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[0].length; j++) {
            if (cells[i][j] == "^") {
                row = i;
                column = j;
                positions.push([i, j]);
                path.push([i, j, direction])
                cells[i][j] = ".";
            }
        }
    }

    function isLeavingMap(row, column, direction) {
        if (row == 0 && direction == "up") {
            return true;
        } else if (row == cells.length - 1 && direction == "down") {
            return true;
        } else if (column == 0 && direction == "left") {
            return true;
        } else if (column == cells[0].length - 1 && direction == "right") {
            return true;
        } else {
            return false;
        }
    }

    while(!isLeavingMap(row, column, direction)) {
        switch(direction) {
            case "up":
                if (cells[row - 1][column] == "#") {
                    direction = "right";
                } else {
                    row -= 1;
                }
                break;
            case "down":
                if (cells[row + 1][column] == "#") {
                    direction = "left";
                } else {
                    row += 1;
                } 
                break
            case "left":
                if (cells[row][column - 1] == "#") {
                    direction = "up";
                } else {
                    column -= 1;
                }
                break;
            case "right":
                if (cells[row][column + 1] == "#") {
                    direction = "down";
                } else {
                    column += 1;
                }
                break;
        }
        if (!positions.deepIncludes([row, column])) {
            positions.push([row, column]);
        }

        if (path.deepIncludes([row, column, direction])) {
            return { 
                positions: positions,
                count_distinct: 0
            }
        } else {
            path.push([row, column, direction])
        }
    }

    return { 
        positions: positions,
        count_distinct: positions.length
    }
}

const result = run_path(cells)

console.log(result.count_distinct)

// Part 2

// This is extremely inefficient. There must be a better way.

var count2 = 0
var obstruction_positions = []
var progress = 0
for (position of result.positions.slice(1)) {
    const cells_with_obstruction = deepCopyArray(cells);
    cells_with_obstruction[position[0]][position[1]] = "#";

    let result = run_path(cells_with_obstruction)

    if (result.count_distinct == 0) {
        count2 += 1
        obstruction_positions.push(position)
    }
    progress += 1
    console.log(progress)
}

console.log(count2)