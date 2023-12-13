with open("8/input.txt") as f:
    data = f.read().split("\n\n")
instructions = data[0]
related = {line[:3]: (line[7:10], line[12:15]) for line in data[1].split("\n")}

current = "AAA"
steps = 0
while current != "ZZZ":
    if instructions[steps % len(instructions)] == "L":
        current = related[current][0]
    else:
        current = related[current][1]
    steps += 1

print(steps)
