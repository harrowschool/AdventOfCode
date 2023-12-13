with open("7/input.txt") as f:
    lines = [i.strip() for i in f.readlines()]

cards = "J23456789TQKA"
def key(hand) -> int:
    k = 13**5
    cardNum = [i[1] for i in {(cardValue, hand[:6].count(cardValue)) for cardValue in hand[:5] if cardValue != "J"}]
    cardNum.sort(reverse=True)
    if len(cardNum) == 0:
        cardNum = [0]
    cardNum[0] += hand[:5].count("J")
    return 6*k*cardNum.count(5) + 5*k*cardNum.count(4) + 3*k*cardNum.count(3) + k*cardNum.count(2) + sum(cards.index(hand[i])*13**(4-i) for i in range(5))

lines.sort(key=key)
print(sum([int(lines[i].split(" ")[1]) * (i+1) for i in range(len(lines))]))
