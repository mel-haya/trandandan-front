randoms = [5, 3 ,1 , 6, 2]
num = 7

tmp = []
ret = 0
for random in randoms:
    if random in tmp:
        ret+=1
    else:
        tmp.append(num - random)
print(ret * num)