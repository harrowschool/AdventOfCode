import numpy as np
from math import gcd

with open("input.txt", "r") as file:
    data = file.read()

lines = data.split("\n")
locations = [list(line) for line in lines]
i_max = len(locations)
j_max = len(locations[0])

freq_to_antennas = {}
for i in range(i_max):
    for j in range(j_max):
        location = locations[i][j]

        if location != ".":
            if location in freq_to_antennas:
                freq_to_antennas[location].append(np.array([i, j]))
            else:
                freq_to_antennas[location] = [np.array([i, j])]

def is_in_bounds(antinode):
    return 0 <= antinode[0] < i_max and 0 <= antinode[1] < j_max

def antinode_pair(antenna1, antenna2):
    antinodes = [antenna1 * 2 - antenna2, antenna2 * 2 - antenna1]
    return [a for a in antinodes if is_in_bounds(a)]

def antinodes_for_freq(antennas):
    antinodes = []
    for i in range(len(antennas) - 1):
        for j in range(i + 1, len(antennas)):
            antinodes += antinode_pair(antennas[i], antennas[j])

    return antinodes

all_antinodes = set()
for antennas in freq_to_antennas.values():
    for antinode in antinodes_for_freq(antennas):
        all_antinodes.add(tuple(antinode))

print(len(all_antinodes))

# Part 2

def antinode_set(antenna1, antenna2):
    antinodes = set()
    delta = antenna1 - antenna2
    delta = delta // gcd(delta[0], delta[1])
    antinode = antenna1.copy()
    
    while is_in_bounds(antinode):
        antinodes.add(tuple(antinode))
        antinode += delta

    antinode = antenna1 - delta
    while is_in_bounds(antinode):
        antinodes.add(tuple(antinode))
        antinode -= delta
    
    return antinodes

def antinodes_for_freq2(antennas):
    antinodes = set()
    for i in range(len(antennas) - 1):
        for j in range(i + 1, len(antennas)):
            antinodes.update(antinode_set(antennas[i], antennas[j])) 
    
    return antinodes

all_antinodes = []
for antennas in freq_to_antennas.values():
    for antinode in antinodes_for_freq2(antennas):
        if not any(np.array_equal(antinode, existing) for existing in all_antinodes):
            all_antinodes.append(antinode)

print(len(all_antinodes))