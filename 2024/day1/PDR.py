import os

current_directory = os.path.dirname(os.path.abspath(__file__))
filename = "input.txt"
file_path = os.path.join(current_directory, filename)

with open(file_path, "r") as file:
    lines = file.read().split("\n")

list1 = []
list2 = []
for line in lines:
    strings = line.split("   ")
    list1.append(int(strings[0]))
    list2.append(int(strings[1]))

print(list1)
print(list2)

list1.sort()
list2.sort()

total = 0
for index in range(len(list1)):
    total += abs(list1[index] - list2[index])

print(total)