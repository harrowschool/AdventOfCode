import re

with open("4/input.txt") as f:
    lines = [i.strip() for i in f.readlines()]

output = 0
matchlist = []
for line in lines:
    output += 1
    line = line.split(": ")
    line[0] = line[0].replace("Card ", "")
    line = line[1].split("|")
    win = [int(i) for i in re.findall("\d+", line[0])]
    guess = [int(i) for i in re.findall("\d+", line[1])]
    match = set(win) & set(guess)
    matchlist.append(len(match))

cards = [1]*output
for i in range(len(cards)):
    for out in range(i+1, min(i+matchlist[i]+1, len(matchlist))):
        cards[out] += cards[i]
    output += min(matchlist[i], len(matchlist)-i)*cards[i]

print(output)
        
