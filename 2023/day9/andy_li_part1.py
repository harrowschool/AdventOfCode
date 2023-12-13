from scipy.interpolate import barycentric_interpolate
print(round(sum([barycentric_interpolate(range(len(sequence)),sequence,len(sequence))for sequence in [[int(j)for j in i.strip().split(" ")]for i in open("9/input.txt").readlines()]])))
