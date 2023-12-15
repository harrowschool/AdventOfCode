from __future__ import annotations
import math

with open("8/input.txt") as f:
    data = f.read().split("\n\n")
instructions = data[0]
related = {line[:3]: (line[7:10], line[12:15]) for line in data[1].split("\n")}

class Loop:
    def __init__(self, modulus: int, remainder: int, minloops: int=0) -> None:
        self.modulus = modulus
        self.remainder = remainder
        self.minloops = minloops
        
    def __add__(self, other: Loop) -> Loop:
        modulus = math.lcm(self.modulus, other.modulus)
        minsteps = max(self.minloops*self.modulus+self.remainder, other.minloops*other.modulus+other.remainder)
        y = self.remainder
        while y % other.modulus != other.remainder:
            y += self.modulus
            if y % other.modulus == self.remainder % other.modulus:
                return False
        k = (minsteps)//modulus
        return Loop(modulus, y, math.ceil(max(self.minloops*self.modulus/modulus, other.minloops*other.modulus/modulus)))

def findLoops(node) -> list[Loop]:
    loop = []
    steps = 0
    while not (node in loop and not (steps - loop.index(node)) % len(instructions)):
        loop.append(node)
        if instructions[steps % len(instructions)] == "L":
            node = related[node][0]
        else:
            node = related[node][1]
        steps += 1
    offset = loop.index(node)
    loop = loop[offset:]
    return [Loop(len(loop), (offset+i)%len(loop), (offset+i)//len(loop)) for i in range(len(loop)) if loop[i][-1] == "Z"]

loops = [findLoops(node) for node in related.keys() if node[-1] == "A"]

outLoops = [Loop(1, 0)]
for loopGroup in loops:
    assert(loopGroup != [])
    outLoops = [n for l in outLoops for m in loopGroup if (n:=l+m)]

print(min([loop.remainder + loop.modulus*loop.minloops for loop in outLoops]))
