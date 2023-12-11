with open("hands.txt", "r") as f:
    hands = f.read().split("\n")

hand_values = []
card_values = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]


def get_hand(hand):
    hand = hand.split(" ")
    repeats1 = []
    repeats2 = []
    for card in hand[0]:
        num = 0
        for i in range(5):
            if card == hand[0][i]:
                num += 1
        if num >= 2:
            if repeats1 == [] or repeats1[0] == card:
                repeats1.append(card)
            else:
                repeats2.append(card)
    if len(repeats1) == 5:
        hand_values.append([7, hand])
    elif len(repeats1) == 4:
        hand_values.append([6, hand])
    elif (len(repeats1) == 3 and len(repeats2) == 2) or (len(repeats1) == 2 and len(repeats2) == 3):
        hand_values.append([5, hand])
    elif len(repeats1) == 3 and len(repeats2) == 0:
        hand_values.append([4, hand])
    elif len(repeats1) == 2 and len(repeats2) == 2:
        hand_values.append([3, hand])
    elif len(repeats1) == 2 and len(repeats2) == 0:
        hand_values.append([2, hand])
    else:
        hand_values.append([1, hand])


def bubblesort(arr):
    temp = []  # Temporary storage of number
    j = 0
    swap = True
    while swap:
        swap = False
        j += 1
        for i in range(len(arr) - j):
            if arr[i][0] > arr[i + 1][0]:
                swap = True
                temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
    return arr


def bubblesort_internal(hand_value, arr):
    temp = []  # Temporary storage of number
    j = 0
    swap = True
    limit1 = 0
    limit2 = 0
    for x in arr:
        if x[0] == hand_value:
            limit1 = arr.index(x)
            break
    for x in arr:
        if x[0] == hand_value + 1:
            limit2 = arr.index(x)
            break
    while swap:
        swap = False
        j += 1
        for i in range(limit1, limit2 - 1):
            for k in range(5):
                if card_values.index(arr[i][1][0][k]) < card_values.index(arr[i + 1][1][0][k]):
                    swap = True
                    temp = arr[i]
                    arr[i] = arr[i + 1]
                    arr[i + 1] = temp
                    break
                elif card_values.index(arr[i][1][0][k]) == card_values.index(arr[i + 1][1][0][k]):
                    continue
                else:
                    break
    return arr


for hand in hands:
    get_hand(hand)

bubblesort(hand_values)
for i in range(1, 8):
    bubblesort_internal(i, hand_values)

total = 0

for i in range(len(hand_values)):
    total += (i + 1) * int(hand_values[i][1][1])

print(total)
