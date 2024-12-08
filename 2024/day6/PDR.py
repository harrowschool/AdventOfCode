with open("example.txt", "r") as file:
    cells = [list(row) for row in file.read().split("\n")]

i_max = len(cells)
j_max = len(cells[0])

obstructions = []
for i in range(i_max):
    obstructions.append([])
    for j in range(j_max):
        if cells[i][j] == "#":
            obstructions[i].append((i, j))

print(obstructions)

turns = []
for i in range(i_max):
    if i > 0:
        turns.append((i - 1, j, "down"))
    if i < i_max:
        turns.append((i + 1, j, "up"))
    if j > 0:
        turns.append((i, j - 1, "right"))
    if j < j_max:
        turns.append((i, j + 1, "left"))

portals = {}
for turn in turns:
    if turn[2] == "up":
        pass