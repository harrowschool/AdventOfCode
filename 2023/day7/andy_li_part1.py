with open("7/input.txt") as f:
    lines = [i.strip() for i in f.readlines()]

cards = "23456789TJQKA"
k = 13**5

def key(hand) -> int:
    cardNum = [i[1] for i in {(cardValue, hand[:6].count(cardValue)) for cardValue in hand[:6]}]
    return 6*k*cardNum.count(5) + 5*k*cardNum.count(4) + 3*k*cardNum.count(3) + k*cardNum.count(2) + sum(cards.index(hand[i])*13**(4-i) for i in range(5))

lines.sort(key=key)
print(sum([int(lines[i].split(" ")[1]) * (i+1) for i in range(len(lines))]))
