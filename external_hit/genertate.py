paths = [
    'IMG_0007',
]
methods = [
    'dcnn',
    'global',
    'comprehensive',
    'knn',
    'learning',
    'close-form',
    'shared',
    'ours'
]

inputfile = open('hit.input', 'w+')
inputfile.write('vid\n')
for path in paths:
    for idx1 in range(len(methods)-1):
	for idx2 in range(idx1+1,len(methods)):
            inputfile.write('%s/,%s,%s\n'%(path, methods[idx1], methods[idx2]))
inputfile.close()
