# part 1
def d(time, record_distance):
    possibilities = 0
    for hold in range(time):
        time_left = time
        time_left -= hold
        distance = time_left * hold
        if distance > record_distance:
            possibilities += 1
    return possibilities


print(int(d(54, 302)) * int(d(94, 1476)) * int(d(65, 1029)) * int(d(92, 1404)))

# part 2
print(int(d(54946592, 302147610291404)))
