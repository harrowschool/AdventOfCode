from numpy import prod

with open("2/input.txt") as f:
    data = [i.strip() for i in f.readlines()]
    
output = []

for datum in data:
    datum = datum.split(": ")
    id = int(datum[0][5:])
    datum = datum[1]
    datum = datum.split("; ")
    cubetotal = {
        "red": 0,
        "green": 0,
        "blue": 0,
    }
    for datumum in datum:
        cube = {
            "red": 0,
            "green": 0,
            "blue": 0,
        }
        datumum = datumum.split(", ")
        for iranoutofnames in datumum:
            iranoutofnames = iranoutofnames.split(" ")
            cube[iranoutofnames[1]] = int(iranoutofnames[0])
        for key in cubetotal.keys():
            if cube[key] > cubetotal[key]:
                cubetotal[key] = cube[key]
    output.append(prod([cubetotal[key] for key in cube.keys()]))
print(sum(output))