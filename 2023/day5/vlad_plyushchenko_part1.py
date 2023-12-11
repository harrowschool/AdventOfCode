import re

with open('almanac.txt', 'r') as f:
    lines = f.read().split('\n')

pattern = re.compile('\d')
seeds = [int(i) for i in re.findall('\d+', lines[0])]
smallest_location = 9999999999
done = False

for seed in seeds:
    for line in range(3, len(lines)):
        if bool(pattern.search(lines[line])):
            current = [int(i) for i in re.findall('\d+', lines[line])]
            if (seed < current[1] + current[2]) and (seed > current[1] - 1):
                next = (seed - current[1]) + (current[0])
                done = True
            elif line == len(lines) - 1:
                seed = next
                done = False
            else:
                if not done:
                    next = seed
                continue
        else:
            seed = next
            done = False
    if int(seed) < smallest_location:
        smallest_location = seed

print(smallest_location)
